import { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';

const kpis = [
  { label: 'Total submissions', num: '143', tag: '+12 this month', variant: 'green' },
  { label: 'Awaiting your action', num: '7', tag: '3 overdue', variant: 'amber' },
  { label: 'Approved (YTD)', num: '61', tag: '43% approval rate', variant: 'green' },
  { label: 'Avg. review time', num: '4.2d', tag: '−1.3d vs last quarter', variant: 'green' },
];

const funnel = [
  { label: 'Intake', num: 34, mod: 'intake' },
  { label: 'Completeness Scan', num: 28, mod: 'scan' },
  { label: 'Review', num: 19, mod: 'review' },
  { label: 'Decision', num: 11, mod: 'decision' },
  { label: 'Closed', num: 51, mod: 'closed' },
];

const subs: { name: string; gate: string; chip: string; dot: string; chipMod?: string }[] = [
  { name: 'Arena', gate: 'Stage Gate 3', chip: 'New intake', dot: 'blue' },
  { name: 'Sports Park Infrastructure', gate: 'Stage Gate 2', chip: 'In review', dot: 'amber' },
  { name: 'Velodrome', gate: 'Stage Gate 2', chip: 'In review', dot: 'amber' },
  { name: 'Music Theme Park', gate: 'Stage Gate 3', chip: 'In review', dot: 'amber' },
  {
    name: 'Public Golf Apartments Phase 2',
    gate: 'Stage Gate 2',
    chip: 'Incomplete',
    dot: 'red',
    chipMod: 'red',
  },
];

const recs = [
  {
    title: 'Review & send outcome letter',
    sub: 'Music Theme Park SG3 — review outcome synced from Teams this morning.',
    mod: 'blue',
  },
  {
    title: 'Return Public Golf Apartments SG2 to team',
    sub: 'Completeness scan failed — 2 mandatory documents missing.',
    mod: 'amber',
  },
];

const panels = [
  { name: 'Arena Stage Gate 3', date: '17 Jun', pill: 'Prep needed' },
  { name: 'Stadium Stage Gate 5', date: '24 Jun', pill: 'Not started' },
];

export function SecretariatDashboard() {
  const { navigate } = useApp();
  const [queueView, setQueueView] = useState<'all' | 'mine' | 'overdue'>('mine');
  const visibleSubmissions =
    queueView === 'all'
      ? subs
      : queueView === 'overdue'
        ? subs.filter((submission) => submission.dot === 'red')
        : subs.slice(0, 3);
  return (
    <div className="sec-dash">
      <section className="greeting">
        <h1 className="greeting__title">Good morning, Farhan</h1>
        <p className="greeting__sub">Wednesday, 10 June 2026</p>
      </section>

      <section className="banner">
        <div className="banner__left">
          <span className="banner__icon">
            <Icon name="bell" />
          </span>
          <div className="banner__content">
            <p className="banner__title">
              New submission: <strong>Arena · Stage Gate 3</strong> just arrived in your intake queue.
            </p>
          </div>
        </div>
        <div className="banner__right">
          <span className="banner__meta">Received 08:30</span>
          <button className="btn btn--white" onClick={() => navigate('reports')}>
            Review submission
            <Icon name="arrowRight" size={15} strokeWidth={2} />
          </button>
        </div>
      </section>

      <div className="sec-kpis">
        {kpis.map((k) => (
          <div key={k.label} className="sec-kpi">
            <p className="sec-kpi__label">{k.label}</p>
            <p className="sec-kpi__num">{k.num}</p>
            <div className="sec-kpi__stat">
              <span className={`ws-tag ws-tag--${k.variant}`}>{k.tag}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="sec-grid">
        <section className="card">
          <div className="card__head">
            <div>
              <h2 className="card__title">Pipeline overview</h2>
            </div>
          </div>
          <div className="sec-funnel">
            {funnel.map((s) => (
              <div key={s.label} className={`sec-stage sec-stage--${s.mod}`}>
                <span className="sec-stage__label">{s.label}</span>
                <div className="sec-stage__box">
                  <span className="sec-stage__num">{s.num}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="sec-aibar">
            <Sparkle size={17} />
            <span className="sec-aibar__txt">
              <strong>AI insight:</strong> 19 reports are in Review. 3 are overdue. Consider sending reminders
              to keep reviews on track.
            </span>
            <button
              className="sec-aibar__link"
              onClick={() => toast('Prototype only — reminders were not sent')}
            >
              Send reminders
            </button>
          </div>
          <div className="sec-tabs" role="tablist" aria-label="Submission queue">
            <button
              className={`ws-tab${queueView === 'all' ? ' is-active' : ''}`}
              role="tab"
              aria-selected={queueView === 'all'}
              onClick={() => setQueueView('all')}
            >
              All submissions<span className="sec-tab-count">143</span>
            </button>
            <button
              className={`ws-tab${queueView === 'mine' ? ' is-active' : ''}`}
              role="tab"
              aria-selected={queueView === 'mine'}
              onClick={() => setQueueView('mine')}
            >
              My queue<span className="sec-tab-count">7</span>
            </button>
            <button
              className={`ws-tab${queueView === 'overdue' ? ' is-active' : ''}`}
              role="tab"
              aria-selected={queueView === 'overdue'}
              onClick={() => setQueueView('overdue')}
            >
              Overdue<span className="sec-tab-count sec-tab-count--alert">3</span>
            </button>
          </div>
          <div className="sec-subs">
            {visibleSubmissions.map((s) => (
              <button key={s.name} className="sec-sub" type="button" onClick={() => navigate('reports')}>
                <span
                  className="dot"
                  style={{
                    background: (
                      { blue: '#0BC0FF', amber: 'var(--amber)', red: 'var(--red)' } as Record<string, string>
                    )[s.dot],
                  }}
                />
                <div className="sec-sub__text">
                  <p className="sec-sub__name">{s.name}</p>
                  <p className="sec-sub__sub">{s.gate}</p>
                </div>
                <div className="sec-sub__act">
                  <span className={`sec-chip${s.chipMod ? ` sec-chip--${s.chipMod}` : ''}`}>{s.chip}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <aside className="sec-side">
          <section className="card">
            <h2 className="card__title">Recommended actions</h2>
            <div className="sec-recs">
              {recs.map((r) => (
                <button key={r.title} className="sec-rec" type="button" onClick={() => navigate('reports')}>
                  <span className={`sec-rec__ic sec-rec__ic--${r.mod}`}>
                    <Icon name={r.mod === 'blue' ? 'reports' : 'bell'} size={16} />
                  </span>
                  <div className="sec-rec__body">
                    <p className="sec-rec__title">{r.title}</p>
                    <p className="sec-rec__sub">{r.sub}</p>
                  </div>
                  <span className="sec-rec__arrow">
                    <Icon name="chevronRight" size={16} strokeWidth={2} />
                  </span>
                </button>
              ))}
            </div>
          </section>
          <section className="card">
            <h2 className="card__title">Upcoming SG Review Panels</h2>
            <div className="sec-panels">
              {panels.map((p) => (
                <div key={p.name} className="sec-panel">
                  <div>
                    <p className="sec-panel__name">{p.name}</p>
                    <p className="sec-panel__date">{p.date}</p>
                  </div>
                  <span className="ws-tag ws-tag--chip">{p.pill}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
