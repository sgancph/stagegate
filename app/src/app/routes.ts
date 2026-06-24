import type { Persona, View } from '../lib/types';

const VALID_VIEWS: Record<Persona, readonly View[]> = {
  project: ['dashboard', 'authoring', 'execsummary', 'readiness', 'reports'],
  secretariat: ['dashboard', 'reports', 'scan'],
};

export interface RouteState {
  persona: Persona;
  view: View;
}
const DEFAULT_ROUTE: RouteState = { persona: 'project', view: 'dashboard' };

export function isValidRoute(persona: unknown, view: unknown): persona is Persona {
  return (
    (persona === 'project' || persona === 'secretariat') &&
    typeof view === 'string' &&
    VALID_VIEWS[persona].includes(view as View)
  );
}

export function parseHash(hash: string): RouteState {
  const match = /^#(project|secretariat)-([a-z]+)$/.exec(hash);
  if (!match || !isValidRoute(match[1], match[2])) return DEFAULT_ROUTE;
  return { persona: match[1], view: match[2] as View };
}
