import { useState, useRef } from 'react';
import { WorkspaceHeader } from './WorkspaceHeader';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';
import { useApp } from '../../app/AppContext';

const INITIAL_FILES = [
  'Concept Design Report - Exterior|PDF · 6.2 MB',
  'Design Strategy - Interior|PDF · 4.8 MB',
  'Business Plan|PDF · 3.1 MB',
  'Financial Model|XLSX · 2.0 MB',
  'Cost Plan|XLSX · 1.2 MB',
  'Development Program|PDF · 2.6 MB',
  'Sales & Leasing Strategy|DOCX · 1.4 MB',
  'Marketing Strategy|DOCX · 1.1 MB',
].map((s) => {
  const [name, meta] = s.split('|');
  return { name, meta };
});

const SECTIONS = [
  '1 · Strategic Case',
  '2 · Scope & Design',
  '3 · Commercial & Financial Case',
  '4 · Delivery & Procurement',
  '5 · Risk & Assurance',
  '6 · Operational Readiness',
];
const SECTION_BODY: Record<number, JSX.Element> = {
  2: (
    <p className="ws-prose">
      Detailed design is complete across all disciplines. The exterior concept has been value-engineered
      against the approved <strong>Cost Plan</strong>, with a 6% saving reallocated to operational readiness
      scope.
    </p>
  ),
  3: (
    <p className="ws-prose">
      The Arena delivers a projected <strong>IRR of 12.4%</strong> against a total development cost of{' '}
      <strong>SAR 1.84bn</strong>. Phase 1 contingency is set at 8% of construction value, consistent with the
      approved Cost Plan. Revenue is underpinned by a blended events calendar and anchor-tenant commitments
      covering 64% of leasable area.
    </p>
  ),
  4: (
    <p className="ws-prose">
      Procurement moves to a two-stage design-and-build with early contractor involvement. The recommended
      main works contractor shortlist is evidenced in the <strong>Consultant Procurement Strategy</strong>.
    </p>
  ),
};

export function AuthoringWorkspace() {
  const { selectedProject } = useApp();
  const [files, setFiles] = useState(INITIAL_FILES);
  const [reviewedSections, setReviewedSections] = useState<Set<number>>(() => new Set());
  const [showProjectPlan, setShowProjectPlan] = useState(true);
  const [section, setSection] = useState(2); // 0-indexed → section 3 active
  const fileInput = useRef<HTMLInputElement>(null);

  const stepMod = (idx: number): 'done' | 'current' | 'warn' | 'todo' => {
    if (idx === section) return 'current';
    if (idx < section) return 'done';
    if (idx === 3) return 'warn';
    return 'todo';
  };

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

  return (
    <div className="view view--authoring is-active">
      <WorkspaceHeader active="authoring" />
      <div className="ws-grid">
        {/* LEFT — source deliverables */}
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
                    Uploaded in a non-standard layout — restructure in Word before drafting.
                  </p>
                  <button
                    className="ws-restructure__btn"
                    onClick={() => toast('Prototype only — the Word add-in is not connected')}
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

        {/* MIDDLE — draft */}
        <section className="ws-mid">
          <section className="ws-panel">
            <div className="ws-draft-head">
              <div>
                <p className="ws-draft-title">
                  {selectedProject.name} {selectedProject.stageGateShort} — Stage Gate Report
                </p>
                <p className="ws-draft-sub">
                  Generated from {files.length} source deliverables · SGRP Template v2.1
                </p>
              </div>
              <div className="ws-draft-meta">
                <span className="ws-draft-meta__count">
                  {Math.min(19, 16 + reviewedSections.size)} / 19 sections reviewed
                </span>
              </div>
            </div>

            <div className="ws-secnav">
              <p className="ws-secnav__label">Jump to section</p>
              <div className="ws-steps">
                {SECTIONS.map((label, idx) => (
                  <button
                    key={label}
                    className={`ws-step ws-step--${stepMod(idx)}`}
                    title={label}
                    aria-label={label}
                    aria-current={idx === section ? 'true' : undefined}
                    onClick={() => setSection(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
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
              <h3 className="ws-sec-title">{SECTIONS[section]}</h3>
              <div className="ws-sec-meta">
                <span className="ws-pill-soft">{reviewedSections.has(section) ? 'Reviewed' : 'Drafted'}</span>
              </div>
            </div>
            {SECTION_BODY[section] ?? (
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
                  onClick={() => toast('Prototype only — regeneration requires the AI service')}
                >
                  <Sparkle size={16} />
                </button>
                <button
                  className="ws-tool"
                  aria-label="Copy section"
                  title="Copy"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(SECTIONS[section]);
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

        {/* RIGHT — readiness preview */}
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
