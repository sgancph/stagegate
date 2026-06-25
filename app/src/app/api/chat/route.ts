import { handleLlmRequest } from '../../../lib/llm';
import type { Persona } from '../../../lib/types';
import { getSeed } from '../../../server/data';

export const maxDuration = 300;

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const badRequest = (error: string) =>
  Response.json({ error }, { status: 400, headers: { 'Cache-Control': 'no-store' } });

const exactActionAnswer = (reportName: string, actions: { title: string; due: string }[]) =>
  actions.length
    ? `The pending actions for ${reportName} are:\n\n${actions
        .map((action, index) => `${index + 1}. ${action.title} (${action.due})`)
        .join('\n')}`
    : `There are no pending actions recorded for ${reportName}.`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest('Request body must be valid JSON');
  }

  if (!body || typeof body !== 'object') return badRequest('Request body must be a JSON object');
  const { messages, persona, selectedProjectId } = body as {
    messages?: ChatMessage[];
    persona?: Persona;
    selectedProjectId?: string;
  };
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 10 ||
    messages.some(
      (message) =>
        !['user', 'assistant'].includes(message?.role) ||
        typeof message?.content !== 'string' ||
        message.content.trim().length === 0 ||
        message.content.length > 2_000,
    ) ||
    messages.at(-1)?.role !== 'user'
  ) {
    return badRequest('Conversation messages are missing, invalid, or too large');
  }
  if (persona !== 'project' && persona !== 'secretariat') return badRequest('Persona is invalid');

  const seed = await getSeed();
  const selectedProject = seed.projects.find((project) => project.id === selectedProjectId);
  const question = messages.at(-1)?.content.toLowerCase() ?? '';
  const focusedProject =
    seed.projects.find((project) => question.includes(project.name.toLowerCase())) ?? selectedProject;
  const focusedActions = focusedProject
    ? seed.actions.filter((action) => action.reportId === focusedProject.id)
    : [];
  const asksAboutActions = /\bactions?\b/.test(question);
  const reportLines = seed.projects.map(
    (project) =>
      `REPORT | id=${project.id} | name=${project.name} | gate=${project.stageGate} | sector=${project.sector} | capital ask=${project.capitalAsk}`,
  );
  const actionLines = seed.actions.map((action) => {
    const report = seed.projects.find((project) => project.id === action.reportId);
    return `ACTION | id=${action.id} | report=${report?.name ?? action.reportId} | title=${action.title} | due=${action.due}`;
  });
  const focusLines = focusedActions.map(
    (action, index) => `${index + 1}. ${action.title} | due=${action.due}`,
  );
  const groundedMessages = [
    {
      role: 'system' as const,
      content: `You are the Stage Gate Intelligence assistant for the ${persona} persona. Answer only from the exhaustive workspace records below. Treat every ACTION as belonging to its named REPORT. When asked what, which, or how many records match, check every line and include every match. "Pending actions" means every ACTION record, including due=No deadline. If a requested fact is absent, say it is not available in the workspace; never infer or invent it. Use concise plain language. The currently selected report is ${selectedProject?.name ?? 'not specified'}.\n\nFOCUSED REPORT: ${focusedProject?.name ?? 'none'}\nEXACT ACTION COUNT: ${focusedActions.length}\nIf answering about this report's actions, list all ${focusedActions.length} actions below and do not omit no-deadline actions.\n${focusLines.length ? focusLines.join('\n') : 'No actions recorded.'}\n\nALL WORKSPACE RECORDS\n${[...reportLines, ...actionLines].join('\n')}`,
    },
    ...messages.slice(-8),
  ];
  const response = await handleLlmRequest(
    new Request(request.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: groundedMessages, temperature: 0.1 }),
    }),
    {
      baseUrl: process.env.LLM_BASE_URL,
      model: process.env.LLM_MODEL,
      apiKey: process.env.LLM_API_KEY,
    },
  );

  if (!response.ok) return response;
  const result = (await response.json()) as { text: string; model: string };
  if (
    asksAboutActions &&
    focusedProject &&
    focusedActions.some((action) => !result.text.toLowerCase().includes(action.title.toLowerCase()))
  ) {
    result.text = exactActionAnswer(focusedProject.name, focusedActions);
  }
  return Response.json(
    {
      ...result,
      grounding: `${seed.projects.length} reports · ${seed.actions.length} actions`,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
