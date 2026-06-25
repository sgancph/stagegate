import { useApp } from '../../app/AppContext';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { ReportAvatar, ReportRef } from '../../components/ui/ReportRef';
import { StatusPill } from '../../components/ui/StatusPill';
import { getActions, getProject, getProjectDashboard, reportLabel } from '../../data/store';
import { toast } from '../../lib/toast';

export function ProjectDashboard() {
  const { navigate, selectProject } = useApp();
  const { reports, deadlines, tools } = getProjectDashboard();
  const openReport = (id: string) => {
    selectProject(id);
    navigate('reports');
  };

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
              Continue your{' '}
              <button className="banner__link" onClick={() => navigate('authoring')}>
                {reportLabel('arena')}
              </button>{' '}
              submission to stay on schedule.
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
              <p className="card__sub">The reports you’re preparing and submitting for approval.</p>
            </div>
            <button className="link" onClick={() => navigate('authoring')}>
              <Icon name="plus" size={15} strokeWidth={2} />
              Start new draft
            </button>
          </div>
          <div className="reports">
            {reports.map((r) => (
              <button
                key={r.id}
                className="report-row"
                type="button"
                title={`Open ${reportLabel(r.id)}`}
                onClick={() => openReport(r.id)}
              >
                <div className="report-main">
                  <ReportAvatar id={r.id} />
                  <div className="report-text">
                    <p className="report-name">{getProject(r.id).name}</p>
                    <p className="report-sub">{getProject(r.id).stageGate}</p>
                  </div>
                </div>
                <div className="report-right">
                  <StatusPill tone={r.tone}>{r.status}</StatusPill>
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
              {getActions().map((a) => (
                <button
                  key={a.id}
                  className="action-row"
                  type="button"
                  title={`Open ${reportLabel(a.reportId)}`}
                  onClick={() => openReport(a.reportId)}
                >
                  <div className="action-body">
                    <p className="action-title">{a.title}</p>
                    <p className="action-sub">
                      <ReportRef id={a.reportId} />
                    </p>
                  </div>
                  <StatusPill tone={a.dueVariant}>{a.due}</StatusPill>
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
                  title={`Open ${reportLabel(d.reportId)}`}
                  onClick={() => openReport(d.reportId)}
                >
                  <span className="deadline-date">
                    <span className="deadline-date__d">{d.day}</span>
                    <span className="deadline-date__m">{d.mon}</span>
                  </span>
                  <div className="deadline-body">
                    <p className="deadline-title">{d.title}</p>
                    <p className="deadline-sub">
                      <ReportRef id={d.reportId} />
                    </p>
                  </div>
                  <span className="days-pill">{d.rel}</span>
                </button>
              ))}
            </div>
            <div className="card__foot">
              <button
                className="link"
                onClick={() => toast("The full schedule isn't built out in this prototype")}
              >
                <Icon name="calendar" size={14} />
                View full schedule
              </button>
            </div>
          </section>
        </div>
      </div>

      <section className="card tools">
        <div className="card__head">
          <div>
            <h2 className="card__title">AI tools</h2>
            <p className="card__sub">
              AI helpers that draft, reformat and check your submissions before they reach the secretariat.
            </p>
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
