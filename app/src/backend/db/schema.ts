import { pgTable, text } from 'drizzle-orm/pg-core';

// Mirrors the shapes in src/lib/types.ts. Kept deliberately simple (text columns)
// for the prototype; tighten types/constraints when the real domain is confirmed.

export const projects = pgTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  initials: text('initials').notNull(),
  stageGate: text('stage_gate').notNull(),
  stageGateShort: text('stage_gate_short').notNull(),
  sector: text('sector').notNull(),
  capitalAsk: text('capital_ask').notNull(),
});

export const users = pgTable('users', {
  persona: text('persona').primaryKey(), // 'project' | 'secretariat'
  initials: text('initials').notNull(),
  shortName: text('short_name').notNull(),
  fullName: text('full_name').notNull(),
  role: text('role').notNull(),
  email: text('email').notNull(),
  color: text('color').notNull(),
});

export const actions = pgTable('actions', {
  id: text('id').primaryKey(),
  reportId: text('report_id')
    .notNull()
    .references(() => projects.id),
  title: text('title').notNull(),
  due: text('due').notNull(),
  dueVariant: text('due_variant').notNull(), // 'red' | 'amber' | 'grey'
});
