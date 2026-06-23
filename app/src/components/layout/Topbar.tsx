import { useApp } from '../../app/AppContext';
import { Icon, Logomark } from '../ui/Icon';
import { SearchBox } from './SearchBox';
import { NotifMenu } from './NotifMenu';

const COPY = {
  project: {
    label: 'Project team',
    cta: 'New SG Report Draft',
    ctaIcon: 'pen' as const,
    ctaView: 'authoring' as const,
  },
  secretariat: {
    label: 'Secretariat',
    cta: 'New submission',
    ctaIcon: 'upload' as const,
    ctaView: 'reports' as const,
  },
};

export function Topbar() {
  const { persona, navigate } = useApp();
  const c = COPY[persona];
  return (
    <header className="topbar">
      <button
        className="nav-left"
        aria-label="Stage Gate Intelligence — home"
        type="button"
        onClick={() => navigate('dashboard')}
      >
        <span className="logomark" aria-hidden="true">
          <Logomark />
        </span>
        <span className="logo-wordmark">
          <span className="logo-title">Stage Gate</span>
          <span className="logo-sub">Intelligence</span>
        </span>
      </button>
      <span className="nav-divider" />
      <SearchBox />
      <div className="topbar__right">
        <span className="persona-label">{c.label}</span>
        <button className="icon-btn" data-tour-help aria-label="Help &amp; guided tour" title="Guided tour">
          <Icon name="help" size={19} />
        </button>
        <NotifMenu />
        <button className="btn btn--navy" onClick={() => navigate(c.ctaView)}>
          <Icon name={c.ctaIcon} size={15} strokeWidth={2} />
          <span className="topbar__cta-label">{c.cta}</span>
        </button>
      </div>
    </header>
  );
}
