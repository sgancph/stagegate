import { useState, useRef, useEffect, useMemo } from 'react';
import { Icon, Sparkle } from '../ui/Icon';

type Item = { g: string; t: string; s: string };
const ITEMS: Item[] = [
  { g: 'Projects', t: 'Arena', s: 'Stage Gate 3' },
  { g: 'Projects', t: 'Velodrome', s: 'Stage Gate 2' },
  { g: 'Projects', t: 'National Tennis Centre', s: 'Stage Gate 4' },
  { g: 'Projects', t: 'National Aquatic Centre', s: 'Stage Gate 2' },
  { g: 'AI tools', t: 'Draft Co-Pilot', s: 'Generate a report draft' },
  { g: 'AI tools', t: 'Executive Summary', s: 'Leadership-ready summary' },
  { g: 'AI tools', t: 'Readiness Scan', s: 'Validate before submission' },
  { g: 'AI tools', t: 'Completeness Scan', s: 'Secretariat document check' },
  { g: 'Activity', t: 'Pending actions', s: 'Tasks awaiting you' },
  { g: 'Activity', t: 'SGRP Session 15', s: '17 Jun 2026' },
  { g: 'Activity', t: 'Outcome letters', s: 'Committee decisions' },
];
const GROUP_ICON: Record<string, JSX.Element> = {
  Projects: <Icon name="reports" size={15} />,
  'AI tools': <Sparkle size={15} />,
  Activity: <Icon name="info" size={15} />,
};

function highlight(text: string, q: string) {
  if (!q) return text;
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return text;
  return <>{text.slice(0, i)}<mark>{text.slice(i, i + q.length)}</mark>{text.slice(i + q.length)}</>;
}

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const ql = q.trim().toLowerCase();
  const matches = useMemo(() => ITEMS.filter((it) => !ql || `${it.t} ${it.s} ${it.g}`.toLowerCase().includes(ql)), [ql]);

  let lastG: string | null = null;
  return (
    <div className="searchbox" ref={box}>
      <label className="nav-search" aria-label="Search">
        <span className="nav-search__icon"><Icon name="search" size={16} strokeWidth={2} /></span>
        <input className="nav-search__input" type="search" placeholder="Search projects, stage gates, documents…" aria-label="Search"
          autoComplete="off" value={q} onChange={(e) => { setQ(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} />
      </label>
      {open && (
        <div className="search-sugg" role="listbox">
          {matches.length === 0 && <div className="search-sugg__empty">No matches for “{q}”</div>}
          {matches.map((it) => {
            const head = it.g !== lastG ? (lastG = it.g) : null;
            return (
              <div key={it.t}>
                {head && <div className="search-sugg__group">{it.g}</div>}
                <button className="search-sugg__item" type="button" onMouseDown={(e) => { e.preventDefault(); setQ(it.t); setOpen(false); }}>
                  <span className="search-sugg__ic">{GROUP_ICON[it.g]}</span>
                  <span className="search-sugg__tx"><p className="search-sugg__t">{highlight(it.t, ql)}</p><p className="search-sugg__s">{it.s}</p></span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
