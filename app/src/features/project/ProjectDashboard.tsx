import { useApp } from '../../app/AppContext';
import { Icon, Sparkle } from '../../components/ui/Icon';

type Dot = 'orange' | 'green' | 'grey' | 'red' | 'blue';
type PillVariant = 'amber' | 'green' | 'grey';

const reports: {
  name: string;
  gate: string;
  dot: Dot;
  pill: string;
  pillVariant: PillVariant;
  sub: string;
}[] = [
  {
    name: 'Arena',
    gate: 'Stage Gate 3',
    dot: 'orange',
    pill: 'Drafting: 16/19',
    pillVariant: 'amber',
    sub: '19 documents uploaded',
  },
  {
    name: 'Velodrome',
    gate: 'Stage Gate 2',
    dot: 'green',
    pill: 'Submitted & awaiting review',
    pillVariant: 'green',
    sub: 'Submitted 5 Jun',
  },
  {
    name: 'National Tennis Centre',
    gate: 'Stage Gate 4',
    dot: 'grey',
    pill: 'Not started',
    pillVariant: 'grey',
    sub: 'SGRP planned 15 Aug',
  },
  {
    name: 'National Aquatic Centre',
    gate: 'Stage Gate 2',
    dot: 'green',
    pill: 'SG2 completed',
    pillVariant: 'green',
    sub: 'Approved 2 May',
  },
];

const actions: { title: string; sub: string; dot: Dot; due: string; dueVariant: 'red' | 'amber' | 'grey' }[] =
  [
    {
      title: 'Fix ESG commitments gap: upload environmental impact report',
      sub: 'Arena SG3',
      dot: 'red',
      due: 'Due today',
      dueVariant: 'red',
    },
    {
      title: 'Add contingency justification: required for SG3 readiness scan',
      sub: 'Arena SG3',
      dot: 'orange',
      due: 'Due 15 Jun',
      dueVariant: 'amber',
    },
    {
      title: 'Review Financial summary section traceability',
      sub: 'Arena SG3',
      dot: 'grey',
      due: 'No deadline',
      dueVariant: 'grey',
    },
  ];

const deadlines: { title: string; sub: string; days: string }[] = [
  { title: 'SG3 readiness scan must pass before submission', sub: 'Arena SG3', days: '7 days' },
  { title: 'Arena SGRP submission deadline', sub: 'Arena SG3', days: '10 days' },
  {
    title: 'SG4 submission opens: National Tennis Centre',
    sub: 'National Tennis Centre SG4',
    days: '18 days',
  },
];

const tools: { title: string; desc: string; chip: string; tag: string; illus: string; muted?: boolean }[] = [
  {
    title: 'Stage Gate Report Co-Pilot',
    desc: 'Draft your stage gate report from source inputs. Every section traceable.',
    chip: 'Arena SG3 draft in progress — step 4/8',
    tag: 'AI',
    illus: 'linear-gradient(160deg,#EFF6FF,#DBEDFF)',
  },
  {
    title: 'Restructuring Word Engine',
    desc: 'Convert consultant documents into QIC template format automatically.',
    chip: '1 consultant document for Arena SG3',
    tag: 'AI Word add-in',
    illus: 'linear-gradient(160deg,#E9FAFF,#D2F1FA)',
  },
  {
    title: 'Readiness Scan',
    desc: 'Pre-submission completeness checker.',
    chip: 'Available once all sections are reviewed',
    tag: 'AI',
    illus: 'linear-gradient(160deg,#F3FAE3,#E2F3C6)',
    muted: true,
  },
];

export function ProjectDashboard() {
  const { navigate } = useApp();
  return (
    <div className="view view--dashboard is-active">
      <section className="greeting">
        <h1 className="greeting__title">Good morning, Hassan</h1>
        <p className="greeting__sub">Thursday, 11 June 2026</p>
      </section>

      <section className="banner">
        <div className="banner__left">
          <span className="banner__icon">
            <Sparkle />
          </span>
          <div className="banner__content">
            <p className="banner__title">
              Continue your <strong>Arena · Stage Gate 3</strong> submission to stay on schedule.
            </p>
            <div className="banner__pills">
              <span className="banner-pill">
                <span className="pdot pdot--green" />2 sections reviewed
              </span>
              <span className="banner-pill">
                <span className="pdot pdot--amber" />2 gaps need fixing
              </span>
            </div>
          </div>
        </div>
        <div className="banner__right">
          <span className="banner__meta">Last edited 2h ago</span>
          <button className="btn btn--white" onClick={() => navigate('authoring')}>
            Continue drafting
            <Icon name="arrowRight" size={15} strokeWidth={2} />
          </button>
        </div>
      </section>

      <div className="grid">
        <section className="card">
          <div className="card__head">
            <div>
              <h2 className="card__title">My stage gate reports</h2>
            </div>
            <button className="link" onClick={() => navigate('authoring')}>
              <Icon name="plus" size={15} strokeWidth={2} />
              Start new draft
            </button>
          </div>
          <div className="reports">
            {reports.map((r) => (
              <button
                key={r.name}
                className="report-row"
                type="button"
                title="Open in My reports"
                onClick={() => navigate('reports')}
              >
                <div className="report-main">
                  <span className={`dot dot--${r.dot}`} />
                  <div className="report-text">
                    <p className="report-name">{r.name}</p>
                    <p className="report-sub">{r.gate}</p>
                  </div>
                </div>
                <div className="report-right">
                  <span className={`badge-pill badge-pill--${r.pillVariant}`}>{r.pill}</span>
                  <span className="report-substatus">{r.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="col-right">
          <section className="card">
            <div className="card__head">
              <h2 className="card__title">Pending actions</h2>
            </div>
            <div className="actions">
              {actions.map((a) => (
                <button
                  key={a.title}
                  className="action-row"
                  type="button"
                  title="Open in My reports"
                  onClick={() => navigate('reports')}
                >
                  <span className={`dot dot--${a.dot} action-dot`} />
                  <div className="action-body">
                    <p className="action-title">{a.title}</p>
                    <p className="action-sub">{a.sub}</p>
                  </div>
                  <span className={`action-due action-due--${a.dueVariant}`}>{a.due}</span>
                </button>
              ))}
            </div>
            <div className="card__foot">
              <button className="link" onClick={() => navigate('reports')}>
                View all actions
                <Icon name="chevronRight" size={14} strokeWidth={2} />
              </button>
            </div>
          </section>

          <section className="card">
            <div className="card__head">
              <h2 className="card__title">Upcoming deadlines</h2>
            </div>
            <div className="deadlines">
              {deadlines.map((d) => (
                <button
                  key={d.title}
                  className="deadline-row"
                  type="button"
                  title="Open in My reports"
                  onClick={() => navigate('reports')}
                >
                  <span className="deadline-icon">
                    <Icon name="calendar" size={17} />
                  </span>
                  <div className="deadline-body">
                    <p className="deadline-title">{d.title}</p>
                    <p className="deadline-sub">{d.sub}</p>
                  </div>
                  <span className="days-pill">{d.days}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="card tools">
        <div className="card__head">
          <div>
            <h2 className="card__title">AI tools</h2>
            <p className="card__sub">Your intelligent authoring and quality tools.</p>
          </div>
        </div>
        <div className="tools__grid">
          {tools.map((t) => (
            <button
              key={t.title}
              className={`tool-card${t.muted ? ' is-muted' : ''}`}
              type="button"
              disabled={t.muted}
              onClick={t.muted ? undefined : () => navigate('authoring')}
            >
              <span className="tool-tag">{t.tag}</span>
              <div className="tool-illus" style={{ background: t.illus }} />
              <div className="tool-body">
                <p className="tool-title">{t.title}</p>
                <p className="tool-desc">{t.desc}</p>
                <span className="tool-chip">{t.chip}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
