import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon, Logomark, Sparkle } from '../ui/Icon';
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

/** DEMO button: opens the guided tour. Shows a one-time suggestion bubble on open
 *  (auto-hides, or dismiss with ×); afterwards the bubble only appears on hover. */
function DemoButton() {
  const [hint, setHint] = useState(() => {
    try {
      return !localStorage.getItem('sgi_demo_dismissed') && !localStorage.getItem('sgi_tour_done');
    } catch {
      return true;
    }
  });
  const [hover, setHover] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hint) return;
    const t = window.setTimeout(() => setHint(false), 7000);
    // Any interaction elsewhere (e.g. opening notifications) dismisses the suggestion,
    // so it can never sit on top of a menu the user just opened.
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setHint(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => {
      clearTimeout(t);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [hint]);

  const dismiss = () => {
    setHint(false);
    try {
      localStorage.setItem('sgi_demo_dismissed', '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      className="demo-wrap"
      ref={wrapRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button className="demo-btn" data-tour-help aria-label="Start the guided demo tour" onClick={dismiss}>
        <Sparkle size={14} />
        DEMO
      </button>
      {(hint || hover) && (
        <div className={`demo-tip${hint ? ' demo-tip--hint' : ''}`} role="status">
          <span>Take a guided tour of the key features</span>
          {hint && (
            <button
              className="demo-tip__x"
              aria-label="Dismiss suggestion"
              onClick={(e) => {
                e.stopPropagation();
                dismiss();
              }}
            >
              <Icon name="x" size={12} strokeWidth={2.6} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export function Topbar() {
  const { persona, navigate } = useApp();
  const c = COPY[persona];
  return (
    <header className="topbar">
      <button
        className="nav-left"
        aria-label="Stage Gate Intelligence, home"
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
        <DemoButton />
        <NotifMenu />
        <button className="btn btn--navy" onClick={() => navigate(c.ctaView)}>
          <Icon name={c.ctaIcon} size={15} strokeWidth={2} />
          <span className="topbar__cta-label">{c.cta}</span>
        </button>
      </div>
    </header>
  );
}
