import { WorkspaceHeader } from './WorkspaceHeader';
import { Icon, Sparkle } from '../../components/ui/Icon';

const files = [
  'Concept Design Report - Exterior|PDF · 6.2 MB',
  'Design Strategy - Interior|PDF · 4.8 MB',
  'Business Plan|PDF · 3.1 MB',
  'Financial Model|XLSX · 2.0 MB',
  'Cost Plan|XLSX · 1.2 MB',
  'Development Program|PDF · 2.6 MB',
  'Sales & Leasing Strategy|DOCX · 1.4 MB',
  'Marketing Strategy|DOCX · 1.1 MB',
].map((s) => { const [name, meta] = s.split('|'); return { name, meta }; });

const steps: { n: number; mod: 'done' | 'current' | 'warn' | 'todo' }[] = [
  { n: 1, mod: 'done' }, { n: 2, mod: 'done' }, { n: 3, mod: 'current' },
  { n: 4, mod: 'warn' }, { n: 5, mod: 'todo' }, { n: 6, mod: 'todo' },
];

export function AuthoringWorkspace() {
  return (
    <div className="view view--authoring is-active">
      <WorkspaceHeader active="authoring" />
      <div className="ws-grid">
        {/* LEFT — source deliverables */}
        <aside className="ws-left">
          <section className="ws-panel">
            <h2 className="ws-h">Source deliverables</h2>
            <p className="ws-h-sub">Upload the deliverables the AI will draft from.</p>
            <div className="ws-dropzone">
              <div className="ws-dropzone__ic"><Icon name="uploadCloud" size={26} strokeWidth={1.6} /></div>
              <p className="ws-dropzone__t">Drop files here or browse</p>
              <p className="ws-dropzone__s">Accepts PDF, Word, Excel</p>
            </div>
            <div className="ws-files">
              <div className="ws-restructure">
                <div className="ws-restructure__top">
                  <span className="ws-file__ic ws-file__ic--red"><Icon name="file" size={15} /></span>
                  <div className="ws-file__body"><p className="ws-file__name">Project Execution Plan</p><p className="ws-file__size">DOCX · 2.2 MB</p></div>
                  <button className="ws-file-del" aria-label="Remove deliverable"><Icon name="x" size={10} strokeWidth={2.6} /></button>
                </div>
                <p className="ws-restructure__note">Uploaded in a non-standard layout — restructure in Word before drafting.</p>
                <button className="ws-restructure__btn"><Icon name="external" size={14} strokeWidth={1.9} />Open in Word</button>
              </div>
              {files.map((f) => (
                <div key={f.name} className="ws-file">
                  <span className="ws-file__ic ws-file__ic--green"><Icon name="file" size={15} /></span>
                  <div className="ws-file__body"><p className="ws-file__name">{f.name}</p><p className="ws-file__size">{f.meta}</p></div>
                  <button className="ws-file-del" aria-label="Remove deliverable"><Icon name="x" size={10} strokeWidth={2.6} /></button>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* MIDDLE — draft */}
        <section className="ws-mid">
          <section className="ws-panel">
            <div className="ws-draft-head">
              <div><p className="ws-draft-title">Arena SG3 — Stage Gate Report</p><p className="ws-draft-sub">Generated from 8 source deliverables · SGRP Template v2.1</p></div>
              <div className="ws-draft-meta"><span className="ws-draft-meta__count">16 / 19 sections drafted</span></div>
            </div>
            <div className="ws-steps">
              {steps.map((s) => <span key={s.n} className={`ws-step ws-step--${s.mod}`}>{s.n}</span>)}
            </div>
            <div className="ws-gen">
              <span className="ws-gen__ic"><Sparkle size={16} /></span>
              <p className="ws-gen__t">Generated from the <strong>Financial Model</strong> and cross-referenced with the <strong>Cost Plan</strong>. IRR and TDC figures are consistent across both sources.</p>
            </div>
            <div className="ws-sec-head">
              <h3 className="ws-sec-title">3 · Commercial &amp; Financial Case</h3>
              <div className="ws-sec-meta"><span className="ws-pill-soft">Drafted</span></div>
            </div>
            <p className="ws-prose">The Arena delivers a projected <strong>IRR of 12.4%</strong> against a total development cost of <strong>SAR 1.84bn</strong>. Phase 1 contingency is set at 8% of construction value, consistent with the approved Cost Plan. Revenue is underpinned by a blended events calendar and anchor-tenant commitments covering 64% of leasable area.</p>
            <div className="ws-actbar">
              <div className="ws-tools">
                <button className="ws-tool" aria-label="Regenerate"><Sparkle size={16} /></button>
              </div>
              <div className="ws-actbar-right">
                <span className="ws-reviewed"><Icon name="shield" size={14} /> Reviewed by you</span>
                <button className="btn btn--navy btn--sm">Acknowledge review</button>
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
                <circle cx="29" cy="29" r="25" fill="none" stroke="var(--green)" strokeWidth="6" strokelinecap="round" strokeDasharray={2 * Math.PI * 25} strokeDashoffset={2 * Math.PI * 25 * 0.16} transform="rotate(-90 29 29)" />
              </svg>
              <div><div className="ws-ring-c">84%</div><div className="ws-ring-l">readiness</div></div>
            </div>
            <p className="ws-att-h">Needs attention</p>
            <div className="ws-att"><span className="ws-att__n">2</span> sections with open gaps<span className="ws-att__warn"><Icon name="shield" size={15} /></span></div>
          </section>
        </aside>
      </div>
    </div>
  );
}
