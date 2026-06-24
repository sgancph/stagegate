type Message = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type LlmConfig = {
  baseUrl?: string;
  model?: string;
  apiKey?: string;
};

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

  let body: { messages?: Message[]; temperature?: number };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Request body must be valid JSON' }, 400);
  }

  const messages = body.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.some(
      (message) =>
        !['system', 'user', 'assistant'].includes(message?.role) ||
        typeof message?.content !== 'string' ||
        message.content.length === 0,
    )
  ) {
    return json({ error: 'A non-empty messages array is required' }, 400);
  }

  try {
    const upstream = await fetch(`${config.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
      },
      body: JSON.stringify({
        model: config.model,
        messages,
        stream: false,
        ...(typeof body.temperature === 'number' ? { temperature: body.temperature } : {}),
      }),
    });

    if (!upstream.ok) {
      console.error('LLM request failed', upstream.status, await upstream.text());
      return json({ error: 'LLM inference request failed' }, 502);
    }

    const result = await upstream.json();
    const text = result?.choices?.[0]?.message?.content;
    if (typeof text !== 'string') {
      console.error('LLM response did not contain generated text');
      return json({ error: 'LLM inference response was invalid' }, 502);
    }

    return json({ text, model: result.model || config.model });
  } catch (error) {
    console.error('Unable to reach LLM inference server', error);
    return json({ error: 'Unable to reach LLM inference server' }, 502);
  }
}
