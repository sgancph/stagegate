import { useApp, type View } from '../../app/AppContext';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { ProjectSelector } from './ProjectSelector';

type Tab = 'authoring' | 'execsummary' | 'readiness';
const TABS: { view: Tab; label: string; icon: 'sparkle' | 'shield' }[] = [
  { view: 'authoring', label: 'Draft Co-Pilot', icon: 'sparkle' },
  { view: 'execsummary', label: 'Exec. Summary Generator', icon: 'sparkle' },
  { view: 'readiness', label: 'Readiness Scan', icon: 'shield' },
];

export function WorkspaceHeader({ active }: { active: Tab }) {
  const { navigate } = useApp();
  return (
    <>
      <div className="ws-head">
        <button className="ws-back" aria-label="Back to dashboard" onClick={() => navigate('dashboard')}>
          <Icon name="back" />
        </button>
        <div>
          <h1 className="ws-title">Authoring workspace</h1>
        </div>
        <div className="ws-head-right">
          <span className="ws-projsel-label">Report</span>
          <ProjectSelector />
        </div>
      </div>
      <div className="ws-tabs" role="tablist" aria-label="Authoring tools">
        {TABS.map((t) => (
          <button
            key={t.view}
            className={`ws-tab${t.view === active ? ' is-active' : ''}`}
            role="tab"
            aria-selected={t.view === active}
            onClick={() => t.view !== active && navigate(t.view as View)}
          >
            {t.icon === 'sparkle' ? <Sparkle size={15} /> : <Icon name="shield" size={15} />}
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}
