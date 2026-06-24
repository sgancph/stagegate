import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleLlmRequest } from '../api/_llm';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'local-llm-api',
        configureServer(server) {
          server.middlewares.use('/api/ai', async (request, response) => {
            let body = '';
            request.setEncoding('utf8');
            for await (const chunk of request) body += chunk;

            const result = await handleLlmRequest(
              new Request('http://localhost/api/ai', {
                method: request.method,
                headers: { 'Content-Type': request.headers['content-type'] || 'application/json' },
                body: request.method === 'POST' ? body : undefined,
              }),
              {
                baseUrl: env.LLM_BASE_URL || 'http://127.0.0.1:11434/v1',
                model: env.LLM_MODEL || 'llama3.2:3b',
                apiKey: env.LLM_API_KEY,
              },
            );

            response.statusCode = result.status;
            result.headers.forEach((value, name) => response.setHeader(name, value));
            response.end(await result.text());
          });
        },
      },
    ],
  };
});
