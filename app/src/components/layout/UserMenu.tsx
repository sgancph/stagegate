import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../ui/Icon';
import { otherPersona, USERS } from '../../data/demo';
import { toast } from '../../lib/toast';

export function UserMenu() {
  const { persona, switchPersona } = useApp();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const profile = USERS[persona];
  const other = otherPersona(persona);
  const otherLabel = other === 'secretariat' ? 'Switch to Secretariat' : 'Switch to Project team';

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

  return (
    <div className="usermenu" ref={wrap}>
      <button
        className="avatar"
        aria-label={`${profile.shortName}, account menu`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        {profile.initials}
      </button>
      {open && (
        <div className="usermenu__pop" role="menu">
          <div className="usermenu__head">
            <span className="usermenu__ava">{profile.initials}</span>
            <span className="usermenu__id">
              <strong>{profile.shortName}</strong>
              <span>{profile.role}</span>
            </span>
          </div>
          <button
            className="usermenu__item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              switchPersona(other);
            }}
          >
            <Icon name="external" size={16} />
            {otherLabel}
          </button>
          <button
            className="usermenu__item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new CustomEvent('sgi-open-settings'));
            }}
          >
            <Icon name="info" size={16} />
            Settings
          </button>
          <button
            className="usermenu__item"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              toast("Sign-out isn't connected in this prototype");
            }}
          >
            <Icon name="external" size={16} />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
