import 'server-only';
import type { SeedData } from '../../lib/types';
import { PROJECTS } from './projects';
import { USERS } from './users';
import { ACTIONS } from './actions';

// Server-only access to the application data. Today these are fixtures; when a
// database is connected, this is the single place that changes (read from the
// DB here) — the API contract and the entire client stay the same.
export { PROJECTS, USERS, ACTIONS };

export function getSeed(): SeedData {
  return { projects: PROJECTS, users: USERS, actions: ACTIONS };
}
