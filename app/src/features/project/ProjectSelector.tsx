import { useState, useRef, useEffect } from 'react';
import { Icon } from '../../components/ui/Icon';
import { useApp } from '../../app/AppContext';
import { getProjects } from '../../data/store';

export function ProjectSelector() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const { selectedProject, selectedProjectId, selectProject } = useApp();

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
    <div className={`ws-projsel${open ? ' is-open' : ''}`} ref={wrap}>
      <button
        className="ws-projsel__btn"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((value) => !value);
        }}
      >
        <span className="ws-projsel__label">
          {selectedProject.name} · {selectedProject.stageGate}
        </span>
        <Icon name="chevronDown" size={14} strokeWidth={2.2} className="ws-projsel__ch" />
      </button>
      <div className="ws-projsel__menu" role="listbox">
        {getProjects().map((p) => (
          <button
            key={p.id}
            className={`ws-projsel__opt${p.id === selectedProjectId ? ' is-current' : ''}`}
            role="option"
            aria-selected={p.id === selectedProjectId}
            onClick={() => {
              selectProject(p.id);
              setOpen(false);
            }}
          >
            {p.name} <span className="ws-projsel__sg">{p.stageGate}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
