import { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';
import { getSecretariat } from '../../data/store';
import { SecretariatOutcomes } from './SecretariatOutcomes';

export function SecretariatIntake() {
  const { navigate } = useApp();
  const { queue, facts, docs, overview, highlights, decisionSought } = getSecretariat().intake;
  const [tab, setTab] = useState<'intake' | 'outcomes'>('intake');
  return (
    <div className="sec-reports">
      <div className="ws-head">
        <button className="ws-back" aria-label="Back to dashboard" onClick={() => navigate('dashboard')}>
          <Icon name="back" />
        </button>
        <div>
          <h1 className="ws-title">Submissions</h1>
        </div>
      </div>

      <div className="ws-tabs" role="tablist" aria-label="Submission workflow">
        <button
          className={`ws-tab${tab === 'intake' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'intake'}
          onClick={() => setTab('intake')}
        >
          <Icon name="reports" size={15} /> Intake<span className="sec-tab-count">7</span>
        </button>
        <button
          className={`ws-tab${tab === 'outcomes' ? ' is-active' : ''}`}
          role="tab"
          aria-selected={tab === 'outcomes'}
          onClick={() => setTab('outcomes')}
        >
          <Icon name="mail" size={15} /> Outcomes<span className="sec-tab-count">11</span>
        </button>
      </div>

      {tab === 'intake' ? (
        <div className="sec-rep-grid">
          <section className="card sec-rep-list">
            <div className="sec-rep-list__head">
              <h2 className="ws-h">Active submissions</h2>
              <p className="ws-h-sub">Newest first.</p>
            </div>
            {queue.map((q, i) => (
              <div key={q.name} className={`sec-rep-item${i === 0 ? ' is-selected' : ''}`}>
                <span className="dot" style={{ background: q.dot === 'blue' ? '#0BC0FF' : 'var(--amber)' }} />
                <div className="sec-rep-item__body">
                  <p className="sec-rep-item__name">{q.name}</p>
                  <p className="sec-rep-item__sub">{q.gate}</p>
                  <p className="sec-rep-item__date">{q.date}</p>
                </div>
                <span className="sec-rep-item__chev">
                  <Icon name="chevronRight" size={16} strokeWidth={2} />
                </span>
              </div>
            ))}
          </section>

          <div className="sec-rep-detail">
            <div className="sec-rep-detailhead">
              <div className="sec-rep-titlewrap">
                <p className="sec-rep-name">Arena</p>
                <p className="sec-rep-subline">Stage Gate 3 · Received 11 Jun 2026</p>
              </div>
              <div className="sec-rep-actions">
                <button className="btn btn--navy" onClick={() => navigate('scan')}>
                  <Icon name="shield" size={15} /> Run Completeness Scan
                </button>
              </div>
            </div>
            <section className="card">
              <div className="sec-sum-facts">
                {facts.map((f) => (
                  <div key={f.k} className="sec-sum-fact">
                    <span className="sec-sum-fact__k">{f.k}</span>
                    <span className="sec-sum-fact__v">{f.v}</span>
                  </div>
                ))}
              </div>
              <div className="sec-sum-block">
                <h3 className="ws-h">Project overview</h3>
                <p className="sec-sum-text">{overview}</p>
              </div>
              <div className="sec-sum-block">
                <h3 className="ws-h">Submission highlights</h3>
                <ul className="sec-sum-list">
                  {highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
              <div className="sec-sum-block">
                <h3 className="ws-h">Decision sought</h3>
                <p className="sec-sum-text">{decisionSought}</p>
              </div>
              <div className="sec-sum-block">
                <h3 className="ws-h">Documents submitted</h3>
                <div className="sec-doctable-wrap">
                  <table className="sec-doctable">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Format / size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {docs.map((d) => (
                        <tr key={d.name}>
                          <td>
                            <Icon name="file" size={13} className="sec-doctable__ic" />
                            {d.name}
                          </td>
                          <td className="dt-size">{d.meta}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <SecretariatOutcomes />
      )}
    </div>
  );
}
