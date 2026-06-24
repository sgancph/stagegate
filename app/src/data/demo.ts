export type Persona = 'project' | 'secretariat';
export type ProjectView = 'dashboard' | 'authoring' | 'execsummary' | 'readiness' | 'reports';
export type SecretariatView = 'dashboard' | 'reports' | 'scan';
export type View = ProjectView | SecretariatView;

export const PROJECTS = [
  {
    id: 'arena',
    name: 'Arena',
    initials: 'AR',
    stageGate: 'Stage Gate 3',
    stageGateShort: 'SG3',
    sector: 'Sports',
    capitalAsk: 'SAR 1.84bn',
  },
  {
    id: 'velodrome',
    name: 'Velodrome',
    initials: 'VE',
    stageGate: 'Stage Gate 2',
    stageGateShort: 'SG2',
    sector: 'Sports',
    capitalAsk: 'SAR 860m',
  },
  {
    id: 'national-tennis-centre',
    name: 'National Tennis Centre',
    initials: 'NT',
    stageGate: 'Stage Gate 4',
    stageGateShort: 'SG4',
    sector: 'Sports',
    capitalAsk: 'SAR 740m',
  },
  {
    id: 'national-aquatic-centre',
    name: 'National Aquatic Centre',
    initials: 'NA',
    stageGate: 'Stage Gate 2',
    stageGateShort: 'SG2',
    sector: 'Sports',
    capitalAsk: 'SAR 620m',
  },
] as const;

export const DEFAULT_PROJECT_ID = PROJECTS[0].id;

export function getProject(projectId: string) {
  return PROJECTS.find((project) => project.id === projectId) ?? PROJECTS[0];
}

/** Canonical label for a report reference, used everywhere: "Arena · Stage Gate 3". */
export function reportLabel(projectId: string) {
  const p = getProject(projectId);
  return `${p.name} · ${p.stageGate}`;
}

export const USERS = {
  project: {
    initials: 'RH',
    shortName: 'R. Hassan',
    fullName: 'Rashid Hassan',
    role: 'Project team',
    email: 'r.hassan@qiddiya.sa',
    color: '#001B72',
  },
  secretariat: {
    initials: 'FO',
    shortName: 'F. Osman',
    fullName: 'Farhan Osman',
    role: 'SGRP Secretariat',
    email: 'f.osman@qiddiya.sa',
    color: '#0E7C86',
  },
} satisfies Record<
  Persona,
  { initials: string; shortName: string; fullName: string; role: string; email: string; color: string }
>;

export function otherPersona(persona: Persona): Persona {
  return persona === 'project' ? 'secretariat' : 'project';
}
