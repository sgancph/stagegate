import type { Persona, Project, ReportAction, SeedData, UserProfile } from '../lib/types';

// Client-side cache of the application data, hydrated once from GET /api/seed at
// app startup (see Bootstrap in App.tsx). Components read from here synchronously,
// exactly as before — the data simply comes from the server now instead of a
// hardcoded module.

let seed: SeedData | null = null;

export const DEFAULT_PROJECT_ID = 'arena';

export function hydrate(data: SeedData) {
  seed = data;
}

export function isHydrated() {
  return seed !== null;
}

function data(): SeedData {
  if (!seed) throw new Error('Application data accessed before it was loaded');
  return seed;
}

export const getProjects = (): Project[] => data().projects;

export function getProject(projectId: string): Project {
  const projects = data().projects;
  return projects.find((project) => project.id === projectId) ?? projects[0];
}

/** Canonical label for a report reference, used everywhere: "Arena · Stage Gate 3". */
export function reportLabel(projectId: string): string {
  const project = getProject(projectId);
  return `${project.name} · ${project.stageGate}`;
}

export const getUser = (persona: Persona): UserProfile => data().users[persona];

export const getActions = (): ReportAction[] => data().actions;

export const actionsForReport = (reportId: string): ReportAction[] =>
  getActions().filter((action) => action.reportId === reportId);

export function otherPersona(persona: Persona): Persona {
  return persona === 'project' ? 'secretariat' : 'project';
}
