import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_PROJECT_ID, getProject, type Persona, type View } from '../data/demo';
import { isValidRoute, parseHash, type RouteState } from './routes';

export type { Persona, ProjectView, SecretariatView, View } from '../data/demo';

interface AppState extends RouteState {
  selectedProjectId: string;
  selectedProject: ReturnType<typeof getProject>;
  navigate: (view: View) => void;
  switchPersona: (persona: Persona) => void;
  selectProject: (projectId: string) => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(() => parseHash(window.location.hash));
  const [persona, setPersona] = useState<Persona>(initial.persona);
  const [view, setView] = useState<View>(initial.view);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(DEFAULT_PROJECT_ID);

  const push = useCallback((nextPersona: Persona, nextView: View) => {
    if (!isValidRoute(nextPersona, nextView)) return;
    const current = window.history.state as Partial<RouteState> | null;
    if (current?.persona === nextPersona && current.view === nextView) return;
    window.history.pushState({ persona: nextPersona, view: nextView }, '', `#${nextPersona}-${nextView}`);
  }, []);

  const navigate = useCallback(
    (nextView: View) => {
      if (!isValidRoute(persona, nextView)) return;
      setView(nextView);
      push(persona, nextView);
    },
    [persona, push],
  );

  const switchPersona = useCallback(
    (nextPersona: Persona) => {
      setPersona(nextPersona);
      setView('dashboard');
      push(nextPersona, 'dashboard');
    },
    [push],
  );

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const state = event.state as Partial<RouteState> | null;
      const route =
        state && isValidRoute(state.persona, state.view)
          ? { persona: state.persona, view: state.view as View }
          : parseHash(window.location.hash);
      setPersona(route.persona);
      setView(route.view);
    };
    window.addEventListener('popstate', onPopState);
    window.history.replaceState(initial, '', `#${initial.persona}-${initial.view}`);
    return () => window.removeEventListener('popstate', onPopState);
  }, [initial]);

  const selectedProject = useMemo(() => getProject(selectedProjectId), [selectedProjectId]);
  const value = useMemo(
    () => ({
      persona,
      view,
      selectedProjectId,
      selectedProject,
      navigate,
      switchPersona,
      selectProject: setSelectedProjectId,
    }),
    [navigate, persona, selectedProject, selectedProjectId, switchPersona, view],
  );

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const context = useContext(AppCtx);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
