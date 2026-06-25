import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { actions as actionsTable, projects as projectsTable, users as usersTable } from './schema';
import { PROJECTS } from '../data/projects';
import { USERS } from '../data/users';
import { ACTIONS } from '../data/actions';
import type { Persona } from '../../lib/types';

// Seeds the database from the same fixtures the app ships with (single source of
// truth). Run with `npm run db:seed` after `npm run db:migrate`. The script owns
// its own connection so it never depends on the app's server-only db client.
async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL is not set; cannot seed.');

  const sql = postgres(url);
  const db = drizzle(sql);

  const userRows = (Object.keys(USERS) as Persona[]).map((persona) => ({
    persona,
    ...USERS[persona],
  }));

  await db.delete(actionsTable);
  await db.delete(projectsTable);
  await db.delete(usersTable);
  await db.insert(projectsTable).values(PROJECTS);
  await db.insert(usersTable).values(userRows);
  await db.insert(actionsTable).values(ACTIONS);

  await sql.end();
  console.log(`Seeded ${PROJECTS.length} projects, ${userRows.length} users, ${ACTIONS.length} actions.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
