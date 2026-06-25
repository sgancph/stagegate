import { useState, useRef } from 'react';
import { WorkspaceHeader } from './WorkspaceHeader';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';
import { useApp } from '../../app/AppContext';
import { getAuthoring } from '../../data/store';

export function AuthoringWorkspace() {
  const { selectedProject } = useApp();
  const { files: initialFiles, sections, sectionBodies } = getAuthoring();
  const [files, setFiles] = useState(initialFiles);
  const [reviewedSections, setReviewedSections] = useState<Set<number>>(() => new Set());
  const [showProjectPlan, setShowProjectPlan] = useState(true);
  const [section, setSection] = useState(2); // 0-indexed → section 3 active
  const fileInput = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    if (!picked.length) return;
    setFiles((f) => [
      ...picked.map((p) => ({ name: p.name, meta: `${(p.size / 1048576).toFixed(1)} MB` })),
      ...f,
    ]);
    toast(`${picked.length} file${picked.length > 1 ? 's' : ''} added`);
    e.target.value = '';
  };

  const sectionBody = sectionBodies.find((b) => b.section === section);

  return (
    <div className="view view--authoring is-active">
      <WorkspaceHeader active="authoring" />
      <div className="ws-grid">
        {/* LEFT: source deliverables */}
        <aside className="ws-left">
          <section className="ws-panel">
            <h2 className="ws-h">Source deliverables</h2>
            <p className="ws-h-sub">Upload the deliverables the AI will draft from.</p>
            <input
              ref={fileInput}
              type="file"
              multiple
              hidden
              onChange={onPick}
              accept=".pdf,.doc,.docx,.xls,.xlsx"
            />
            <button
              type="button"
              className="ws-dropzone"
              style={{ width: '100%', cursor: 'pointer' }}
              onClick={() => fileInput.current?.click()}
            >
              <div className="ws-dropzone__ic">
                <Icon name="uploadCloud" size={26} strokeWidth={1.6} />
              </div>
              <p className="ws-dropzone__t">Drop files here or browse</p>
              <p className="ws-dropzone__s">Accepts PDF, Word, Excel</p>
            </button>
            <div className="ws-files">
              {showProjectPlan && (
                <div className="ws-restructure">
                  <div className="ws-restructure__top">
                    <span className="ws-file__ic ws-file__ic--red">
                      <Icon name="file" size={15} />
                    </span>
                    <div className="ws-file__body">
                      <p className="ws-file__name">Project Execution Plan</p>
                      <p className="ws-file__size">DOCX · 2.2 MB</p>
                    </div>
                    <button
                      className="ws-file-del"
                      aria-label="Remove deliverable"
                      onClick={() => setShowProjectPlan(false)}
                    >
                      <Icon name="x" size={10} strokeWidth={2.6} />
                    </button>
                  </div>
                  <p className="ws-restructure__note">
                    Uploaded in a non-standard layout. Restructure it in Word before drafting.
                  </p>
                  <button
                    className="ws-restructure__btn"
                    onClick={() => toast("The Word add-in isn't connected in this prototype")}
                  >
                    <Icon name="external" size={14} strokeWidth={1.9} />
                    Open in Word
                  </button>
                </div>
              )}
              {files.map((f) => (
                <div key={f.name} className="ws-file">
                  <span className="ws-file__ic ws-file__ic--green">
                    <Icon name="file" size={15} />
                  </span>
                  <div className="ws-file__body">
                    <p className="ws-file__name">{f.name}</p>
                    <p className="ws-file__size">{f.meta}</p>
                  </div>
                  <button
                    className="ws-file-del"
                    aria-label={`Remove ${f.name}`}
                    onClick={() => setFiles((list) => list.filter((x) => x.name !== f.name))}
                  >
                    <Icon name="x" size={10} strokeWidth={2.6} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* MIDDLE: draft */}
        <section className="ws-mid">
          <section className="ws-panel">
            <div className="ws-draft-head">
              <div>
                <p className="ws-draft-title">
                  {selectedProject.name} · {selectedProject.stageGate}
                </p>
                <p className="ws-draft-sub">
                  Generated from {files.length} source deliverables · SGRP Template v2.1
                </p>
              </div>
              <div className="ws-draft-meta">
                <span className="ws-draft-meta__count">
                  <strong>{Math.min(19, 16 + reviewedSections.size)}/19</strong> sections reviewed
                </span>
              </div>
            </div>

            <div className="ws-secnav">
              <p className="ws-secnav__label">
                Section {section + 1} of {sections.length}
              </p>
              <nav className="ws-pager" aria-label="Report sections">
                <button
                  className="ws-page ws-page--nav"
                  disabled={section === 0}
                  aria-label="Previous section"
                  onClick={() => setSection((s) => Math.max(0, s - 1))}
                >
                  <Icon name="back" size={14} strokeWidth={2.2} />
                </button>
                {sections.map((label, idx) => (
                  <button
                    key={label}
                    className={`ws-page${idx === section ? ' is-current' : ''}`}
                    title={label}
                    aria-label={label}
                    aria-current={idx === section ? 'page' : undefined}
                    onClick={() => setSection(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
                <button
                  className="ws-page ws-page--nav"
                  disabled={section === sections.length - 1}
                  aria-label="Next section"
                  onClick={() => setSection((s) => Math.min(sections.length - 1, s + 1))}
                >
                  <Icon name="chevronRight" size={14} strokeWidth={2.2} />
                </button>
              </nav>
            </div>

            <div className="ws-gen">
              <span className="ws-gen__ic">
                <Sparkle size={16} />
              </span>
              <p className="ws-gen__t">
                Generated from the <strong>Financial Model</strong> and cross-referenced with the{' '}
                <strong>Cost Plan</strong>. IRR and TDC figures are consistent across both sources.
              </p>
            </div>

            <div className="ws-sec-head">
              <h3 className="ws-sec-title">{sections[section]}</h3>
              <div className="ws-sec-meta">
                <span className="ws-pill-soft">{reviewedSections.has(section) ? 'Reviewed' : 'Drafted'}</span>
              </div>
            </div>
            {sectionBody ? (
              <p className="ws-prose">
                {sectionBody.body.map((part, i) =>
                  part.strong ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>,
                )}
              </p>
            ) : (
              <p className="ws-prose">
                This section has been drafted from the source deliverables and is ready for your review.
              </p>
            )}

            <div className="ws-actbar">
              <div className="ws-tools">
                <button
                  className="ws-tool"
                  aria-label="Regenerate section"
                  title="Regenerate"
                  onClick={() => toast("Regeneration isn't connected in this prototype")}
                >
                  <Sparkle size={16} />
                </button>
                <button
                  className="ws-tool"
                  aria-label="Copy section"
                  title="Copy"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(sections[section]);
                      toast('Section title copied');
                    } catch {
                      toast('Clipboard access is unavailable');
                    }
                  }}
                >
                  <Icon name="file" size={16} />
                </button>
              </div>
              <div className="ws-actbar-right">
                {reviewedSections.has(section) && (
                  <span className="ws-reviewed">
                    <Icon name="shield" size={14} /> Reviewed by you
                  </span>
                )}
                <button
                  className={`btn btn--sm ${reviewedSections.has(section) ? 'btn--green' : 'btn--navy'}`}
                  onClick={() => {
                    setReviewedSections((current) => new Set(current).add(section));
                    toast('Section marked as reviewed');
                  }}
                >
                  {reviewedSections.has(section) ? 'Reviewed ✓' : 'Acknowledge review'}
                </button>
              </div>
            </div>
          </section>
        </section>

        {/* RIGHT: readiness preview */}
        <aside className="ws-right">
          <section className="ws-panel">
            <p className="ws-panel__t">Readiness preview</p>
            <div className="ws-ring-wrap">
              <svg className="ws-ring" width="58" height="58" viewBox="0 0 58 58">
                <circle cx="29" cy="29" r="25" fill="none" stroke="var(--border)" strokeWidth="6" />
                <circle
                  cx="29"
                  cy="29"
                  r="25"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 25}
                  strokeDashoffset={2 * Math.PI * 25 * 0.16}
                  transform="rotate(-90 29 29)"
                />
              </svg>
              <div>
                <div className="ws-ring-c">84%</div>
                <div className="ws-ring-l">readiness</div>
              </div>
            </div>
            <p className="ws-att-h">Needs attention</p>
            <div className="ws-att">
              <span className="ws-att__n">2</span> sections with open gaps
              <span className="ws-att__warn">
                <Icon name="alert" size={15} />
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
