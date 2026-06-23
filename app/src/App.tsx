import { AppProvider, useApp } from './app/AppContext';
import { ProtoBar } from './components/layout/ProtoBar';
import { Topbar } from './components/layout/Topbar';
import { Sidebar } from './components/layout/Sidebar';
import { ProjectDashboard } from './features/project/ProjectDashboard';
import { SecretariatDashboard } from './features/secretariat/SecretariatDashboard';
import { Placeholder } from './features/Placeholder';

const VIEW_TITLES: Record<string, string> = {
  authoring: 'Authoring workspace',
  execsummary: 'Executive Summary Generator',
  readiness: 'Readiness Scan',
  reports: 'My reports',
  scan: 'Completeness Scan',
};

function Shell() {
  const { persona, view } = useApp();

  const body = (() => {
    if (view === 'dashboard') return persona === 'secretariat' ? <SecretariatDashboard /> : <ProjectDashboard />;
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
