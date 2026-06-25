import 'server-only';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Lazily create one shared connection. Returns null when DATABASE_URL is unset
// so the app can fall back to fixtures (see src/server/data/index.ts).
// ponytail: single connection is fine here; add pooling config if throughput grows.
let cached: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  cached = drizzle(postgres(url), { schema });
  return cached;
}
