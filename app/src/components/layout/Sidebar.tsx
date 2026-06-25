import { useApp, type Persona, type View } from '../../app/AppContext';
import { Icon } from '../ui/Icon';
import { UserMenu } from './UserMenu';

type NavItem = { view: View; label: string; icon: 'home' | 'draft' | 'reports' };

const NAV: Record<Persona, NavItem[]> = {
  project: [
    { view: 'dashboard', label: 'Home', icon: 'home' },
    { view: 'authoring', label: 'Authoring', icon: 'draft' },
    { view: 'reports', label: 'My reports', icon: 'reports' },
  ],
  secretariat: [
    { view: 'dashboard', label: 'Home', icon: 'home' },
    { view: 'reports', label: 'Inbox', icon: 'reports' },
  ],
};

// authoring sub-views still light up the Authoring icon
const NAV_GROUP: Record<string, View> = { execsummary: 'authoring', readiness: 'authoring', scan: 'reports' };

export function Sidebar() {
  const { persona, view, navigate } = useApp();
  const activeNav = NAV_GROUP[view] ?? view;
  return (
    <nav className="sidebar">
      {NAV[persona].map((item) => {
        const active = item.view === activeNav;
        return (
          <button
            key={item.view}
            className={`side-icon${active ? ' is-active' : ''}`}
            aria-label={item.label}
            aria-current={active ? 'page' : undefined}
            onClick={() => navigate(item.view)}
          >
            <Icon name={item.icon} size={21} />
          </button>
        );
      })}
      <span className="side-spacer" />
      <UserMenu />
    </nav>
  );
}
