import { useApp, type View } from '../../app/AppContext';
import { Icon, Sparkle } from '../../components/ui/Icon';

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
        <button className="ws-back" aria-label="Back to dashboard" onClick={() => navigate('dashboard')}><Icon name="back" /></button>
        <div><h1 className="ws-title">Authoring workspace</h1></div>
        <div className="ws-head-right">
          <div className="ws-projsel">
            <button className="ws-projsel__btn" aria-haspopup="listbox">
              <span className="ws-projsel__label">Arena · Stage Gate 3</span>
              <Icon name="chevronDown" size={14} strokeWidth={2.2} className="ws-projsel__ch" />
            </button>
          </div>
        </div>
      </div>
      <div className="ws-tabs">
        {TABS.map((t) => (
          <button key={t.view} className={`ws-tab${t.view === active ? ' is-active' : ''}`} onClick={() => t.view !== active && navigate(t.view as View)}>
            {t.icon === 'sparkle' ? <Sparkle size={15} /> : <Icon name="shield" size={15} />}
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}
