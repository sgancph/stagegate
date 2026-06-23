import { useState, useEffect } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';

const WHO = {
  project: { initials: 'RH', name: 'R. Hassan', full: 'Rashid Hassan', role: 'Project team', email: 'r.hassan@qiddiya.sa', color: '#001B72', otherLabel: 'Switch to Secretariat', other: 'secretariat' as const },
  secretariat: { initials: 'FO', name: 'F. Osman', full: 'Farhan Osman', role: 'SGRP Secretariat', email: 'f.osman@qiddiya.sa', color: '#0E7C86', otherLabel: 'Switch to Project team', other: 'project' as const },
};
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
  const w = WHO[persona];

  useEffect(() => {
    const onOpen = () => { setPane('profile'); setOpen(true); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('sgi-open-settings', onOpen);
    document.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('sgi-open-settings', onOpen); document.removeEventListener('keydown', onKey); };
  }, []);

  if (!open) return null;
  return (
    <div className="settings-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
      style={{ ['--persona-active' as string]: w.color }}>
      <div className="settings">
        <div className="settings__top">
          <span className="settings__title">Settings</span>
          <button className="settings__x" aria-label="Close" onClick={() => setOpen(false)}><Icon name="x" size={18} strokeWidth={2.2} /></button>
        </div>
        <div className="settings__body">
          <nav className="settings__nav">
            {NAV.map((n) => (
              <button key={n.id} className={`settings__navitem${pane === n.id ? ' is-active' : ''}`} onClick={() => setPane(n.id)}>
                <Icon name={n.icon} size={17} />{n.label}
              </button>
            ))}
          </nav>
          <div className="settings__panes">
            {pane === 'profile' && (
              <section className="settings__pane is-active">
                <h2 className="set-h">Profile</h2>
                <p className="set-sub">Your account details for this workspace.</p>
                <div className="set-profile">
                  <span className="set-profile__ava">{w.initials}</span>
                  <div><p className="set-profile__name">{w.name}</p><p className="set-profile__meta">{w.role}</p></div>
                </div>
                <div className="set-row"><div><p className="set-row__t">Full name</p></div><span className="set-row__v">{w.full}</span></div>
                <div className="set-row"><div><p className="set-row__t">Email</p></div><span className="set-row__v">{w.email}</span></div>
                <div className="set-row"><div><p className="set-row__t">Role</p></div><span className="set-row__v">{w.role}</span></div>
                <div className="set-row"><div><p className="set-row__t">Organisation</p></div><span className="set-row__v">Qiddiya Investment Company</span></div>
                <button className="set-switchuser" onClick={() => { setOpen(false); switchPersona(w.other); }}>
                  <Icon name="external" size={16} /><span>{w.otherLabel}</span>
                </button>
              </section>
            )}
            {pane === 'notifications' && (
              <section className="settings__pane is-active">
                <h2 className="set-h">Notifications</h2>
                <p className="set-sub">Decide what reaches you and how.</p>
                {TOGGLES.map((label, idx) => (
                  <div key={label} className="set-row">
                    <div><p className="set-row__t">{label}</p></div>
                    <button className={`set-switch${toggles[idx] ? ' is-on' : ''}`} role="switch" aria-checked={toggles[idx]} aria-label={label}
                      onClick={() => setToggles((t) => t.map((v, i) => (i === idx ? !v : v)))} />
                  </div>
                ))}
              </section>
            )}
            {pane === 'about' && (
              <section className="settings__pane is-active">
                <h2 className="set-h">About</h2>
                <p className="set-sub">Stage Gate Intelligence — AI-powered stage gate reporting and quality assurance for Qiddiya capital projects.</p>
                <div className="set-row"><div><p className="set-row__t">Version</p></div><span className="set-row__v">Prototype · 2026.06</span></div>
                <div className="set-row"><div><p className="set-row__t">Environment</p></div><span className="set-row__v">Illustrative</span></div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
