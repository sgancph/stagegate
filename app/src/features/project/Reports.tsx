import { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';

type Tab = 'active' | 'drafts' | 'completed';

const timeline: { label: string; date?: string; state: 'done' | 'current' | 'todo'; cur?: boolean }[] = [
  { label: 'Intake', date: '8 Jun', state: 'done' },
  { label: 'Completeness Scan', date: '9 Jun', state: 'done' },
  { label: 'Review', state: 'current', cur: true },
  { label: 'Decision', state: 'todo' },
  { label: 'Closed', state: 'todo' },
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
  const { navigate } = useApp();
  const [tab, setTab] = useState<Tab>('active');
  return (
    <div className="view view--reports is-active">
      <section className="greeting">
        <h1 className="greeting__title">My reports</h1>
        <p className="greeting__sub">
          Track your active reports, respond to reviewer requests, and view past decisions.
        </p>
      </section>

      <div className="ws-tabs" role="tablist" aria-label="Report status">
        <button
          className={`ws-tab${tab === 'active' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'active'}
          onClick={() => setTab('active')}
        >
          Active reports <span className="rp-tcount rp-tcount--amber">1 action needed</span>
        </button>
        <button
          className={`ws-tab${tab === 'drafts' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'drafts'}
          onClick={() => setTab('drafts')}
        >
          Drafts <span className="rp-tcount">2 drafts</span>
        </button>
        <button
          className={`ws-tab${tab === 'completed' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'completed'}
          onClick={() => setTab('completed')}
        >
          Completed <span className="rp-tcount">3 decisions</span>
        </button>
      </div>

      {tab === 'active' && (
        <div className="rp-grid">
          <aside className="rp-left">
            <section className="ws-panel">
              <h2 className="ws-h">Active reports</h2>
              <p className="ws-h-sub">Reports currently in the review pipeline.</p>
              <div className="rp-list">
                <div className="rp-item is-selected">
                  <div className="rp-item__head">
                    <span className="dot dot--orange" />
                    <div>
                      <p className="rp-item__name">Arena</p>
                      <p className="rp-item__sub">Stage Gate 3</p>
                    </div>
                  </div>
                  <div className="rp-item__pills">
                    <span className="ws-tag ws-tag--blue">Review · SGRP Session 15</span>
                  </div>
                </div>
                <div className="rp-item">
                  <div className="rp-item__head">
                    <span className="dot dot--blue" />
                    <div>
                      <p className="rp-item__name">Velodrome</p>
                      <p className="rp-item__sub">Stage Gate 2</p>
                    </div>
                  </div>
                  <div className="rp-item__pills">
                    <span className="ws-tag ws-tag--newblue">Awaiting SGRP review</span>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          <div className="rp-main">
            <section className="ws-panel">
              <p className="rp-rtitle">Arena</p>
              <p className="rp-rsub">Stage Gate 3</p>
              <div className="rp-tl">
                {timeline.map((s) => (
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
                <span className="rp-kv__v">
                  <span className="ws-avatar ws-avatar--soft">AE</span> A. ElHusseini (CDU lead)
                </span>
              </div>
              <div className="rp-kv__row">
                <span className="rp-kv__k">SGRP session</span>
                <span className="rp-kv__v">Session 15 · 17 Jun 2026</span>
              </div>
              <div className="rp-kv__row">
                <span className="rp-kv__k">Completeness Scan</span>
                <span className="rp-kv__v">
                  <span className="ws-tag ws-tag--green">Passed</span>
                </span>
              </div>
            </section>

            <section className="ws-panel rp-rfi">
              <div className="rp-rfi__head">
                <span className="rp-rfi__title">
                  <Icon name="alert" size={18} /> Response required
                </span>
                <div className="rp-rfi__hr">
                  <span className="rp-rfi__meta">Received 10 Jun · 2 days ago</span>
                  <span className="rp-tcount rp-tcount--amber">Due 14 Jun (2 days)</span>
                </div>
              </div>
              <div className="rp-rfi__msgbox">
                <div className="rp-rfi__from">
                  <span className="ws-avatar ws-avatar--soft">AE</span> A. ElHusseini, CDU reviewer
                </div>
                <p className="rp-rfi__msg">
                  The submission is strong overall and has been progressed to Review. Could you confirm
                  whether the <strong>contingency justification on page 12 covers Phase 2</strong> — the
                  current narrative only references Phase 1. I need this before Session 15 on 17 Jun.
                </p>
              </div>
              <label className="rp-label" htmlFor="review-response">
                Your response
              </label>
              <textarea
                id="review-response"
                className="rp-response"
                placeholder="Address the point raised: Phase 2 contingency justification…"
              />
              <button
                className="rp-attach"
                type="button"
                onClick={() => toast('Prototype only — file attachment is not connected')}
              >
                <Icon name="paperclip" size={15} /> Attach files (optional)
              </button>
              <div className="rp-infobar">
                <Icon name="info" size={15} /> Your response will be sent to A. ElHusseini and logged to the
                repository. The reviewer will be notified immediately.
              </div>
              <div className="rp-rfi__actions">
                <button
                  className="btn btn--navy"
                  onClick={() => toast('Prototype only — response was not sent')}
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
          </div>
        </div>
      )}

      {tab === 'drafts' && (
        <div className="rp-tabpane">
          <section className="ws-panel">
            <h2 className="ws-h">Drafts</h2>
            <p className="ws-h-sub">Reports you're still preparing — not yet submitted to the secretariat.</p>
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
