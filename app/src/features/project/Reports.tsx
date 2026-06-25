import { useState, type ReactNode } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';
import { StatusPill } from '../../components/ui/StatusPill';
import { actionsForReport } from '../../data/store';
import { toast } from '../../lib/toast';

type Tab = 'drafts' | 'active' | 'completed';
type Step = { label: string; date?: string; state: 'done' | 'current' | 'todo'; cur?: boolean };

type ActiveReport = {
  id: string;
  name: string;
  gate: string;
  dot: string;
  pillClass: string;
  pillText: string;
  timeline: Step[];
  reviewer: string;
  session: string;
  rfi?: { from: string; meta: string; due: string; message: ReactNode };
};

const ACTIVE: ActiveReport[] = [
  {
    id: 'arena',
    name: 'Arena',
    gate: 'Stage Gate 3',
    dot: 'orange',
    pillClass: 'ws-tag--blue',
    pillText: 'Review · SGRP Session 15',
    timeline: [
      { label: 'Intake', date: '8 Jun', state: 'done' },
      { label: 'Completeness Scan', date: '9 Jun', state: 'done' },
      { label: 'Review', state: 'current', cur: true },
      { label: 'Decision', state: 'todo' },
      { label: 'Closed', state: 'todo' },
    ],
    reviewer: 'A. ElHusseini (CDU lead)',
    session: 'Session 15 · 17 Jun 2026',
    rfi: {
      from: 'A. ElHusseini, CDU reviewer',
      meta: 'Received 10 Jun · 2 days ago',
      due: 'Due 14 Jun (2 days)',
      message: (
        <>
          The submission is strong overall and has been progressed to Review. Could you confirm whether the{' '}
          <strong>contingency justification on page 12 covers Phase 2</strong>. The current narrative only
          references Phase 1. I need this before Session 15 on 17 Jun.
        </>
      ),
    },
  },
  {
    id: 'velodrome',
    name: 'Velodrome',
    gate: 'Stage Gate 2',
    dot: 'blue',
    pillClass: 'ws-tag--newblue',
    pillText: 'Awaiting SGRP review',
    timeline: [
      { label: 'Intake', date: '4 Jun', state: 'done' },
      { label: 'Completeness Scan', date: '5 Jun', state: 'done' },
      { label: 'Review', state: 'current', cur: true },
      { label: 'Decision', state: 'todo' },
      { label: 'Closed', state: 'todo' },
    ],
    reviewer: 'Not yet assigned',
    session: 'Session 16 · 24 Jun 2026',
  },
];

const drafts = [
  { name: 'Arena', sub: 'Stage Gate 3 · Drafting 16 of 19 sections', dot: 'orange' },
  { name: 'National Tennis Centre', sub: 'Stage Gate 4 · Not started', dot: 'grey' },
];
const completed = [
  {
    name: 'National Aquatic Centre',
    sub: 'Stage Gate 2 · Approved 2 May 2026',
    pill: 'Approved',
    variant: 'green',
  },
  {
    name: 'Sports Park Infrastructure',
    sub: 'Stage Gate 1 · Approved 14 Mar 2026',
    pill: 'Approved',
    variant: 'green',
  },
  {
    name: 'Music Theme Park',
    sub: 'Stage Gate 3 · Approved with conditions, 10 Jun 2026',
    pill: 'Approved w/ conditions',
    variant: 'amber',
  },
];

export function Reports() {
  const { navigate, selectedProjectId } = useApp();
  const [tab, setTab] = useState<Tab>('active');
  // Open the report the user clicked through on, when it's an active one.
  const [selectedId, setSelectedId] = useState(() =>
    ACTIVE.some((r) => r.id === selectedProjectId) ? selectedProjectId : ACTIVE[0].id,
  );
  const selected = ACTIVE.find((r) => r.id === selectedId) ?? ACTIVE[0];

  return (
    <div className="view view--reports is-active">
      <div className="ws-head">
        <button className="ws-back" aria-label="Back to dashboard" onClick={() => navigate('dashboard')}>
          <Icon name="back" />
        </button>
        <div>
          <h1 className="ws-title">My reports</h1>
          <p className="ws-h-sub">Draft, track and respond to every Stage Gate report from one place.</p>
        </div>
      </div>

      <div className="ws-tabs" role="tablist" aria-label="Report status">
        <button
          className={`ws-tab${tab === 'drafts' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'drafts'}
          onClick={() => setTab('drafts')}
        >
          <Icon name="draft" size={15} /> Drafts <span className="rp-tcount">2 drafts</span>
        </button>
        <button
          className={`ws-tab${tab === 'active' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'active'}
          onClick={() => setTab('active')}
        >
          <Icon name="reports" size={15} /> In review <span className="rp-tcount">2 reports</span>
        </button>
        <button
          className={`ws-tab${tab === 'completed' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'completed'}
          onClick={() => setTab('completed')}
        >
          <Icon name="shield" size={15} /> Completed <span className="rp-tcount">3 decisions</span>
        </button>
      </div>

      {tab === 'active' && (
        <div className="rp-grid">
          <aside className="rp-left">
            <section className="ws-panel">
              <h2 className="ws-h">Active reports</h2>
              <p className="ws-h-sub">Reports currently in the review pipeline.</p>
              <div className="rp-list">
                {ACTIVE.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    className={`rp-item${r.id === selectedId ? ' is-selected' : ''}`}
                    aria-pressed={r.id === selectedId}
                    onClick={() => setSelectedId(r.id)}
                  >
                    <div className="rp-item__head">
                      <span className={`dot dot--${r.dot}`} />
                      <div>
                        <p className="rp-item__name">{r.name}</p>
                        <p className="rp-item__sub">{r.gate}</p>
                      </div>
                    </div>
                    <div className="rp-item__pills">
                      <span className={`ws-tag ${r.pillClass}`}>{r.pillText}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <div className="rp-main">
            <section className="ws-panel">
              <p className="rp-rtitle">{selected.name}</p>
              <p className="rp-rsub">{selected.gate}</p>
              <div className="rp-tl">
                {selected.timeline.map((s) => (
                  <div key={s.label} className={`rp-tl__step is-${s.state}`}>
                    <span className="rp-tl__dot" />
                    <span className="rp-tl__label">{s.label}</span>
                    {s.date && <span className="rp-tl__date">{s.date}</span>}
                    {s.cur && <span className="rp-tl__cur">In progress</span>}
                  </div>
                ))}
              </div>
              <div className="rp-kv__row">
                <span className="rp-kv__k">Assigned reviewer</span>
                <span className="rp-kv__v">{selected.reviewer}</span>
              </div>
              <div className="rp-kv__row">
                <span className="rp-kv__k">SGRP session</span>
                <span className="rp-kv__v">{selected.session}</span>
              </div>
              <div className="rp-kv__row">
                <span className="rp-kv__k">Completeness Scan</span>
                <span className="rp-kv__v">
                  <span className="ws-tag ws-tag--green">Passed</span>
                </span>
              </div>
            </section>

            {actionsForReport(selected.id).length > 0 && (
              <section className="ws-panel">
                <h2 className="ws-h">Pending actions</h2>
                <p className="ws-h-sub">What you need to do for this report before it can progress.</p>
                <div className="actions">
                  {actionsForReport(selected.id).map((a) => (
                    <div key={a.id} className="action-row action-row--static">
                      <div className="action-body">
                        <p className="action-title">{a.title}</p>
                      </div>
                      <StatusPill tone={a.dueVariant}>{a.due}</StatusPill>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {selected.rfi ? (
              <section className="ws-panel rp-rfi">
                <div className="rp-rfi__head">
                  <span className="rp-rfi__title">
                    <Icon name="alert" size={18} /> Response required
                  </span>
                  <div className="rp-rfi__hr">
                    <span className="rp-rfi__meta">{selected.rfi.meta}</span>
                    <span className="rp-tcount rp-tcount--amber">{selected.rfi.due}</span>
                  </div>
                </div>
                <div className="rp-rfi__msgbox">
                  <div className="rp-rfi__from">
                    <span className="ws-avatar ws-avatar--soft">AE</span> {selected.rfi.from}
                  </div>
                  <p className="rp-rfi__msg">{selected.rfi.message}</p>
                </div>
                <label className="rp-label" htmlFor="review-response">
                  Your response
                </label>
                <textarea
                  id="review-response"
                  className="rp-response"
                  placeholder="Address the point raised…"
                />
                <button
                  className="rp-attach"
                  type="button"
                  onClick={() => toast("File attachments aren't connected in this prototype")}
                >
                  <Icon name="paperclip" size={15} /> Attach files (optional)
                </button>
                <div className="rp-infobar">
                  <Icon name="info" size={15} /> Your response will be sent to the reviewer and logged to the
                  repository.
                </div>
                <div className="rp-rfi__actions">
                  <button
                    className="btn btn--navy"
                    onClick={() => toast("This is a prototype, so your response wasn't sent")}
                  >
                    <Icon name="send" size={15} strokeWidth={2} /> Send response
                  </button>
                  <button
                    className="btn btn--ghost"
                    onClick={() => toast('Draft retained for this session only')}
                  >
                    Save draft
                  </button>
                </div>
              </section>
            ) : (
              <section className="ws-panel">
                <div className="rp-infobar">
                  <Icon name="info" size={15} /> {selected.name} passed all completeness checks and is in the
                  review queue. There’s nothing for you to do right now. The SGRP will review the pack at{' '}
                  {selected.session}.
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {tab === 'drafts' && (
        <div className="rp-tabpane">
          <section className="ws-panel">
            <h2 className="ws-h">Drafts</h2>
            <p className="ws-h-sub">Reports you haven’t submitted to the secretariat yet.</p>
            <div className="rp-list">
              {drafts.map((d) => (
                <button
                  key={d.name}
                  className="rp-item"
                  type="button"
                  title="Open in the authoring workspace"
                  onClick={() => navigate('authoring')}
                >
                  <div className="rp-item__head">
                    <span className={`dot dot--${d.dot}`} />
                    <div>
                      <p className="rp-item__name">{d.name}</p>
                      <p className="rp-item__sub">{d.sub}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {tab === 'completed' && (
        <div className="rp-tabpane">
          <section className="ws-panel">
            <h2 className="ws-h">Completed</h2>
            <p className="ws-h-sub">Reports with a final committee decision.</p>
            <div className="rp-list">
              {completed.map((c) => (
                <div key={c.name} className="rp-item">
                  <div className="rp-item__head">
                    <span className={`dot dot--${c.variant === 'green' ? 'green' : 'orange'}`} />
                    <div>
                      <p className="rp-item__name">{c.name}</p>
                      <p className="rp-item__sub">{c.sub}</p>
                    </div>
                  </div>
                  <div className="rp-item__pills">
                    <span className={`badge-pill badge-pill--${c.variant}`}>{c.pill}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
