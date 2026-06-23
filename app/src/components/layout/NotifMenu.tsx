import { useState, useRef, useEffect } from 'react';
import { useApp, type View } from '../../app/AppContext';
import { Icon } from '../ui/Icon';

type Note = { t: string; meta: string; read?: boolean };
const NOTES: Record<'project' | 'secretariat', { items: Note[]; go: View; footer: string }> = {
  project: {
    go: 'reports',
    footer: 'View all in My reports',
    items: [
      { t: 'A. ElHusseini requested a change on Arena SG3', meta: 'Review · 2h ago' },
      { t: 'Velodrome SG2 passed the completeness scan', meta: 'Intake · Yesterday' },
      { t: 'SGRP Session 15 scheduled for 17 Jun', meta: 'Schedule · 2 days ago', read: true },
    ],
  },
  secretariat: {
    go: 'reports',
    footer: 'View all submissions',
    items: [
      { t: 'New submission: Arena · Stage Gate 3 arrived in intake', meta: 'Intake · 08:30' },
      { t: 'Music Theme Park SG3 review outcome synced from Teams', meta: 'Review · 1h ago' },
      { t: '3 reviews are overdue and need a reminder', meta: 'Action · Today' },
    ],
  },
};

export function NotifMenu() {
  const { persona, navigate } = useApp();
  const [open, setOpen] = useState(false);
  const [clearedPersona, setClearedPersona] = useState<typeof persona | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const cfg = NOTES[persona];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('click', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);
  const cleared = clearedPersona === persona;
  const unread = persona === 'secretariat' ? 3 : 2;
  return (
    <div className="notif" ref={wrap}>
      <button
        className="icon-btn"
        aria-label="Notifications"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
      >
        <Icon name="bell" size={19} />
        {!cleared && <span className="badge">{unread}</span>}
      </button>
      {open && (
        <div className="notif__pop" role="menu">
          <div className="notif__head">
            <span className="notif__title">Notifications</span>
            <button className="notif__clear" type="button" onClick={() => setClearedPersona(persona)}>
              Mark all read
            </button>
          </div>
          <div className="notif__list">
            {cfg.items.map((n) => (
              <button
                key={n.t}
                className={`notif__item${n.read || cleared ? ' is-read' : ''}`}
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  navigate(cfg.go);
                }}
              >
                <span className="notif__dot" />
                <span className="notif__body">
                  <p className="notif__t">{n.t}</p>
                  <p className="notif__meta">{n.meta}</p>
                </span>
              </button>
            ))}
          </div>
          <div className="notif__foot">
            <button
              className="link"
              onClick={() => {
                setOpen(false);
                navigate(cfg.go);
              }}
            >
              {cfg.footer}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
