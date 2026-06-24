import { handleLlmRequest } from './_llm';

declare const process: { env: Record<string, string | undefined> };

export const maxDuration = 300;

export function POST(request: Request) {
  return handleLlmRequest(request, {
    baseUrl: process.env.LLM_BASE_URL,
    model: process.env.LLM_MODEL,
    apiKey: process.env.LLM_API_KEY,
  });
}
