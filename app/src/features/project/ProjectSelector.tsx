import { useState, useRef, useEffect } from 'react';
import { Icon } from '../../components/ui/Icon';

const PROJECTS = [
  { name: 'Arena', sg: 'Stage Gate 3' },
  { name: 'Velodrome', sg: 'Stage Gate 2' },
  { name: 'National Tennis Centre', sg: 'Stage Gate 4' },
  { name: 'National Aquatic Centre', sg: 'Stage Gate 2' },
];

export function ProjectSelector() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(PROJECTS[0]);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className={`ws-projsel${open ? ' is-open' : ''}`} ref={wrap}>
      <button className="ws-projsel__btn" aria-haspopup="listbox" aria-expanded={open} onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        <span className="ws-projsel__label">{sel.name} · {sel.sg}</span>
        <Icon name="chevronDown" size={14} strokeWidth={2.2} className="ws-projsel__ch" />
      </button>
      <div className="ws-projsel__menu" role="listbox">
        {PROJECTS.map((p) => (
          <button key={p.name} className={`ws-projsel__opt${p.name === sel.name ? ' is-current' : ''}`} role="option" aria-selected={p.name === sel.name}
            onClick={() => { setSel(p); setOpen(false); }}>
            {p.name} <span className="ws-projsel__sg">{p.sg}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
