type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type LlmConfig = {
  baseUrl?: string;
  model?: string;
  apiKey?: string;
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 20_000;
const MAX_TOTAL_LENGTH = 50_000;
const REQUEST_TIMEOUT_MS = 120_000;

const json = (body: unknown, status = 200) =>
  Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });

export async function handleLlmRequest(request: Request, config: LlmConfig) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!config.baseUrl || !config.model) {
    return json({ error: 'LLM inference server is not configured' }, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Request body must be valid JSON' }, 400);
  }

  if (!body || typeof body !== 'object') return json({ error: 'Request body must be a JSON object' }, 400);

  const { messages, temperature } = body as { messages?: Message[]; temperature?: unknown };
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    messages.some(
      (message) =>
        !['system', 'user', 'assistant'].includes(message?.role) ||
        typeof message?.content !== 'string' ||
        message.content.trim().length === 0 ||
        message.content.length > MAX_MESSAGE_LENGTH,
    ) ||
    messages.reduce((total, message) => total + message.content.length, 0) > MAX_TOTAL_LENGTH
  ) {
    return json({ error: 'Messages are missing, invalid, or too large' }, 400);
  }
  if (
    temperature !== undefined &&
    (typeof temperature !== 'number' || !Number.isFinite(temperature) || temperature < 0 || temperature > 2)
  )
    return json({ error: 'Temperature must be between 0 and 2' }, 400);

  try {
    const upstream = await fetch(`${config.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        stream: false,
        ...(typeof temperature === 'number' ? { temperature } : {}),
      }),
    });

    if (!upstream.ok) {
      console.error('LLM request failed', upstream.status, await upstream.text());
      return json({ error: 'LLM inference request failed' }, 502);
    }

    const result = (await upstream.json()) as {
      model?: unknown;
      choices?: { message?: { content?: unknown } }[];
    };
    const text = result?.choices?.[0]?.message?.content;
    if (typeof text !== 'string') {
      console.error('LLM response did not contain generated text');
      return json({ error: 'LLM inference response was invalid' }, 502);
    }

    return json({ text, model: typeof result.model === 'string' ? result.model : config.model });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      console.error('LLM inference request timed out');
      return json({ error: 'LLM inference request timed out' }, 504);
    }
    console.error('Unable to reach LLM inference server', error);
    return json({ error: 'Unable to reach LLM inference server' }, 502);
  }
}
