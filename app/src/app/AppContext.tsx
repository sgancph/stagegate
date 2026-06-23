import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Persona = 'project' | 'secretariat';
export type ProjectView = 'dashboard' | 'authoring' | 'execsummary' | 'readiness' | 'reports';
export type SecretariatView = 'dashboard' | 'reports' | 'scan';
export type View = ProjectView | SecretariatView;

interface AppState {
  persona: Persona;
  view: View;
  navigate: (view: View) => void;
  switchPersona: (persona: Persona) => void;
}

const AppCtx = createContext<AppState | null>(null);

/** Single source of truth for "who am I / where am I", mirrored into browser history. */
export function AppProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>('project');
  const [view, setView] = useState<View>('dashboard');

  const push = useCallback((p: Persona, v: View) => {
    const cur = history.state as { persona?: Persona; view?: View } | null;
    if (cur && cur.persona === p && cur.view === v) return;
    history.pushState({ persona: p, view: v }, '', `#${p}-${v}`);
  }, []);

  const navigate = useCallback((v: View) => { setView(v); push(persona, v); }, [persona, push]);
  const switchPersona = useCallback((p: Persona) => {
    setPersona(p); setView('dashboard'); push(p, 'dashboard');
  }, [push]);

  // Back/forward walks the prototype like a normal site.
  useEffect(() => {
    const onPop = (e: PopStateEvent) => {
      const st = (e.state || { persona: 'project', view: 'dashboard' }) as { persona: Persona; view: View };
      setPersona(st.persona); setView(st.view);
    };
    window.addEventListener('popstate', onPop);
    history.replaceState({ persona, view }, '');
    return () => window.removeEventListener('popstate', onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppCtx.Provider value={{ persona, view, navigate, switchPersona }}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
