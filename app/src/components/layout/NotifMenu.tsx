import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../ui/Icon';
import { getNotifications } from '../../data/store';

export function NotifMenu() {
  const { persona, navigate } = useApp();
  const [open, setOpen] = useState(false);
  const [clearedPersona, setClearedPersona] = useState<typeof persona | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const cfg = getNotifications(persona);

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
  const unread = cfg.items.filter((n) => !n.read).length;
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
