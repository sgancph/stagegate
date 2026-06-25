import 'server-only';
import type { Persona, SeedData, UserProfile } from '../../lib/types';
import { PROJECTS } from './projects';
import { USERS } from './users';
import { ACTIONS } from './actions';
import { PROJECT_DASHBOARD } from './project-dashboard';
import { MY_REPORTS } from './my-reports';
import { AUTHORING } from './authoring';
import { SECRETARIAT } from './secretariat';
import { NOTIFICATIONS } from './notifications';
import { getDb } from '../db';
import { actions as actionsTable, projects as projectsTable, users as usersTable } from '../db/schema';

// Server-only access to the application data. This is the ONE place that knows
// where data comes from: Postgres when DATABASE_URL is set, fixtures otherwise.
// The API contract and the entire client stay the same either way.
export { PROJECTS, USERS, ACTIONS };

// Collections not yet backed by a database table are served from fixtures and
// merged with the DB-backed core (projects/users/actions).
const extras = {
  projectDashboard: PROJECT_DASHBOARD,
  myReports: MY_REPORTS,
  authoring: AUTHORING,
  secretariat: SECRETARIAT,
  notifications: NOTIFICATIONS,
};

const fixtures = (): SeedData => ({
  projects: PROJECTS,
  users: USERS,
  actions: ACTIONS,
  ...extras,
});

export async function getSeed(): Promise<SeedData> {
  const db = getDb();
  if (!db) return fixtures();

  try {
    const [projects, userRows, actions] = await Promise.all([
      db.select().from(projectsTable),
      db.select().from(usersTable),
      db.select().from(actionsTable),
    ]);

    const users = Object.fromEntries(userRows.map(({ persona, ...profile }) => [persona, profile])) as Record<
      Persona,
      UserProfile
    >;

    return { projects, users, actions: actions as SeedData['actions'], ...extras };
  } catch (error) {
    // A configured-but-unreachable database must not white-screen the app.
    console.error('Database read failed; serving fixtures instead.', error);
    return fixtures();
  }
}
