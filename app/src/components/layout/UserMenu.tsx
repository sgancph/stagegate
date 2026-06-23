import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../ui/Icon';

const WHO = {
  project: { initials: 'RH', name: 'R. Hassan', role: 'Project team', other: 'secretariat' as const, otherLabel: 'Switch to Secretariat' },
  secretariat: { initials: 'FO', name: 'F. Osman', role: 'SGRP Secretariat', other: 'project' as const, otherLabel: 'Switch to Project team' },
};

export function UserMenu() {
  const { persona, switchPersona } = useApp();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const w = WHO[persona];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className="usermenu" ref={wrap}>
      <button className="avatar" aria-label={`${w.name} — account menu`} aria-haspopup="true" aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>{w.initials}</button>
      {open && (
        <div className="usermenu__pop" role="menu">
          <div className="usermenu__head">
            <span className="usermenu__ava">{w.initials}</span>
            <span className="usermenu__id"><strong>{w.name}</strong><span>{w.role}</span></span>
          </div>
          <button className="usermenu__item" role="menuitem" onClick={() => { setOpen(false); switchPersona(w.other); }}>
            <Icon name="external" size={16} />{w.otherLabel}
          </button>
          <button className="usermenu__item" role="menuitem" onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent('sgi-open-settings')); }}>
            <Icon name="info" size={16} />Settings
          </button>
        </div>
      )}
    </div>
  );
}
