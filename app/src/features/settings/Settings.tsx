import { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';
import { getUser, otherPersona } from '../../data/store';
type Pane = 'profile' | 'notifications' | 'about';
const NAV: { id: Pane; label: string; icon: 'home' | 'bell' | 'info' }[] = [
  { id: 'profile', label: 'Profile', icon: 'home' },
  { id: 'notifications', label: 'Notifications', icon: 'bell' },
  { id: 'about', label: 'About', icon: 'info' },
];
const TOGGLES = ['Email notifications', 'Stage gate reminders', 'Reviewer responses', 'Weekly digest'];

export function Settings() {
  const { persona, switchPersona } = useApp();
  const [open, setOpen] = useState(false);
  const [pane, setPane] = useState<Pane>('profile');
  const [toggles, setToggles] = useState([true, true, true, false]);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const profile = getUser(persona);
  const other = otherPersona(persona);
  const otherLabel = other === 'secretariat' ? 'Switch to Secretariat' : 'Switch to Project team';
  const closeSettings = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      returnFocusRef.current = document.activeElement as HTMLElement;
      setPane('profile');
      setOpen(true);
      window.setTimeout(() => dialogRef.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSettings();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('sgi-open-settings', onOpen);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('sgi-open-settings', onOpen);
      document.removeEventListener('keydown', onKey);
    };
  }, [closeSettings]);

  if (!open) return null;
  return (
    <div
      className="settings-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSettings();
      }}
      style={{ ['--persona-active' as string]: profile.color }}
    >
      <div
        className="settings"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
      >
        <div className="settings__top">
          <span className="settings__title" id="settings-title">
            Settings
          </span>
          <button className="settings__x" aria-label="Close" onClick={closeSettings}>
            <Icon name="x" size={18} strokeWidth={2.2} />
          </button>
        </div>
        <div className="settings__body">
          <nav className="settings__nav">
            {NAV.map((n) => (
              <button
                key={n.id}
                className={`settings__navitem${pane === n.id ? ' is-active' : ''}`}
                onClick={() => setPane(n.id)}
              >
                <Icon name={n.icon} size={17} />
                {n.label}
              </button>
            ))}
          </nav>
          <div className="settings__panes">
            {pane === 'profile' && (
              <section className="settings__pane is-active">
                <h2 className="set-h">Profile</h2>
                <p className="set-sub">Your account details for this workspace.</p>
                <div className="set-profile">
                  <span className="set-profile__ava">{profile.initials}</span>
                  <div>
                    <p className="set-profile__name">{profile.shortName}</p>
                    <p className="set-profile__meta">{profile.role}</p>
                  </div>
                </div>
                <div className="set-row">
                  <div>
                    <p className="set-row__t">Full name</p>
                  </div>
                  <span className="set-row__v">{profile.fullName}</span>
                </div>
                <div className="set-row">
                  <div>
                    <p className="set-row__t">Email</p>
                  </div>
                  <span className="set-row__v">{profile.email}</span>
                </div>
                <div className="set-row">
                  <div>
                    <p className="set-row__t">Role</p>
                  </div>
                  <span className="set-row__v">{profile.role}</span>
                </div>
                <div className="set-row">
                  <div>
                    <p className="set-row__t">Organisation</p>
                  </div>
                  <span className="set-row__v">Qiddiya Investment Company</span>
                </div>
                <button
                  className="set-switchuser"
                  onClick={() => {
                    setOpen(false);
                    switchPersona(other);
                  }}
                >
                  <Icon name="external" size={16} />
                  <span>{otherLabel}</span>
                </button>
              </section>
            )}
            {pane === 'notifications' && (
              <section className="settings__pane is-active">
                <h2 className="set-h">Notifications</h2>
                <p className="set-sub">Decide what reaches you and how.</p>
                {TOGGLES.map((label, idx) => (
                  <div key={label} className="set-row">
                    <div>
                      <p className="set-row__t">{label}</p>
                    </div>
                    <button
                      className={`set-switch${toggles[idx] ? ' is-on' : ''}`}
                      role="switch"
                      aria-checked={toggles[idx]}
                      aria-label={label}
                      onClick={() => setToggles((t) => t.map((v, i) => (i === idx ? !v : v)))}
                    />
                  </div>
                ))}
              </section>
            )}
            {pane === 'about' && (
              <section className="settings__pane is-active">
                <h2 className="set-h">About</h2>
                <p className="set-sub">
                  Stage Gate Intelligence. AI-assisted stage gate reporting and quality assurance for Qiddiya
                  capital projects.
                </p>
                <div className="set-row">
                  <div>
                    <p className="set-row__t">Version</p>
                  </div>
                  <span className="set-row__v">Prototype · 2026.06</span>
                </div>
                <div className="set-row">
                  <div>
                    <p className="set-row__t">Environment</p>
                  </div>
                  <span className="set-row__v">Illustrative</span>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
