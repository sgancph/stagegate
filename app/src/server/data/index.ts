import 'server-only';
import type { Persona, SeedData, UserProfile } from '../../lib/types';
import { PROJECTS } from './projects';
import { USERS } from './users';
import { ACTIONS } from './actions';
import { getDb } from '../db';
import { actions as actionsTable, projects as projectsTable, users as usersTable } from '../db/schema';

// Server-only access to the application data. This is the ONE place that knows
// where data comes from: Postgres when DATABASE_URL is set, fixtures otherwise.
// The API contract and the entire client stay the same either way.
export { PROJECTS, USERS, ACTIONS };

export async function getSeed(): Promise<SeedData> {
  const db = getDb();
  if (!db) return { projects: PROJECTS, users: USERS, actions: ACTIONS };

  const [projects, userRows, actions] = await Promise.all([
    db.select().from(projectsTable),
    db.select().from(usersTable),
    db.select().from(actionsTable),
  ]);

  const users = Object.fromEntries(userRows.map(({ persona, ...profile }) => [persona, profile])) as Record<
    Persona,
    UserProfile
  >;

  return { projects, users, actions: actions as SeedData['actions'] };
}
