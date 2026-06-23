import { AppProvider, useApp } from './app/AppContext';
import { ProtoBar } from './components/layout/ProtoBar';
import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { ProjectDashboard } from './features/project/ProjectDashboard';
import { AuthoringWorkspace } from './features/project/AuthoringWorkspace';
import { ExecSummary } from './features/project/ExecSummary';
import { Readiness } from './features/project/Readiness';
import { Reports } from './features/project/Reports';
import { SecretariatDashboard } from './features/secretariat/SecretariatDashboard';
import { Placeholder } from './features/Placeholder';

const VIEW_TITLES: Record<string, string> = {
  reports: 'My reports',
  scan: 'Completeness Scan',
};

function Shell() {
  const { persona, view } = useApp();

  const body = (() => {
    if (view === 'dashboard') return persona === 'secretariat' ? <SecretariatDashboard /> : <ProjectDashboard />;
    if (persona === 'project') {
      if (view === 'authoring') return <AuthoringWorkspace />;
      if (view === 'execsummary') return <ExecSummary />;
      if (view === 'readiness') return <Readiness />;
      if (view === 'reports') return <Reports />;
    }
    return <Placeholder title={VIEW_TITLES[view] ?? 'Workspace'} />;
  })();

  return (
    <div className="app" data-persona={persona}>
      <Topbar />
      <div className="layout">
        <Sidebar />
        <main className="main">{body}</main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <>
      <ProtoBar />
      <AppProvider>
        <Shell />
      </AppProvider>
    </>
  );
}
