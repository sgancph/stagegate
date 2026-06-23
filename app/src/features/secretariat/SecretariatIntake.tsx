import { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';

const queue = [
  { name: 'Arena', gate: 'Stage Gate 3', date: 'Received 11 Jun', dot: 'blue' },
  { name: 'Sports Park Infrastructure', gate: 'Stage Gate 2', date: 'In review', dot: 'amber' },
  { name: 'Velodrome', gate: 'Stage Gate 2', date: 'In review', dot: 'amber' },
];

const facts = [
  { k: 'Sector', v: 'Sports' },
  { k: 'Stage Gate', v: 'SG3' },
  { k: 'Capital ask', v: 'SAR 1.84bn' },
  { k: 'Submitted', v: '11 Jun 2026' },
];

const docs = [
  'Executive summary v2.pdf|PDF · 1.2 MB',
  'Arena stage gate report.pdf|PDF · 8.4 MB',
  'Financial model.xlsx|XLSX · 2.0 MB',
  'Cost plan.xlsx|XLSX · 1.2 MB',
  'Concept design report.pdf|PDF · 6.2 MB',
].map((s) => { const [name, meta] = s.split('|'); return { name, meta }; });

export function SecretariatIntake() {
  const { navigate } = useApp();
  const [tab, setTab] = useState<'intake' | 'outcomes'>('intake');
  return (
    <div className="sec-reports">
      <section className="greeting">
        <h1 className="greeting__title">Submissions</h1>
        <p className="greeting__sub">Receive, check and route Stage Gate submissions for review.</p>
      </section>

      <div className="ws-tabs">
        <button className={`ws-tab${tab === 'intake' ? ' is-active' : ''}`} onClick={() => setTab('intake')}>Intake<span className="sec-tab-count">7</span></button>
        <button className={`ws-tab${tab === 'outcomes' ? ' is-active' : ''}`} onClick={() => setTab('outcomes')}>Outcomes<span className="sec-tab-count">11</span></button>
      </div>

      {tab === 'intake' ? (
        <div className="sec-rep-grid">
          <section className="card sec-rep-list">
            <div className="sec-rep-list__head"><h2 className="ws-h">Active submissions</h2><p className="ws-h-sub">Newest first.</p></div>
            {queue.map((q, i) => (
              <div key={q.name} className={`sec-rep-item${i === 0 ? ' is-selected' : ''}`}>
                <span className="dot" style={{ background: q.dot === 'blue' ? '#0BC0FF' : 'var(--amber)' }} />
                <div className="sec-rep-item__body"><p className="sec-rep-item__name">{q.name}</p><p className="sec-rep-item__sub">{q.gate}</p><p className="sec-rep-item__date">{q.date}</p></div>
                <span className="sec-rep-item__chev"><Icon name="chevronRight" size={16} strokeWidth={2} /></span>
              </div>
            ))}
          </section>

          <div className="sec-rep-detail">
            <div className="sec-rep-detailhead">
              <div className="sec-rep-titlewrap"><p className="sec-rep-name">Arena</p><p className="sec-rep-subline">Stage Gate 3 · Received 11 Jun 2026</p></div>
              <div className="sec-rep-actions">
                <button className="btn btn--navy" onClick={() => navigate('scan')}><Icon name="shield" size={15} /> Run Completeness Scan</button>
              </div>
            </div>
            <section className="card">
              <div className="sec-sum-facts">
                {facts.map((f) => <div key={f.k} className="sec-sum-fact"><span className="sec-sum-fact__k">{f.k}</span><span className="sec-sum-fact__v">{f.v}</span></div>)}
              </div>
              <div className="sec-sum-block"><h3 className="ws-h">Project overview</h3><p className="sec-sum-text">Arena is a 20,000-seat multi-use sports and entertainment venue at the heart of Qiddiya. This SG3 submission seeks design sign-off and capital release ahead of main works procurement.</p></div>
              <div className="sec-sum-block"><h3 className="ws-h">Submission highlights</h3>
                <ul className="sec-sum-list">
                  <li>Detailed design is complete across all stages; value engineering has run for the Arena SG3.</li>
                  <li>Procurement moves to a two-stage design-and-build with an early contractor involvement plan.</li>
                  <li>A new operational readiness plan covers event operations, security and crowd movement.</li>
                </ul>
              </div>
              <div className="sec-sum-block"><h3 className="ws-h">Decision sought</h3><p className="sec-sum-text">Approval to complete detailed design sign-off, appoint the main works contractor, and release the SAR 1.84bn delivery budget.</p></div>
              <div className="sec-sum-block"><h3 className="ws-h">Documents submitted</h3>
                <div className="sec-doctable-wrap">
                  <table className="sec-doctable">
                    <thead><tr><th>Document</th><th>Format / size</th></tr></thead>
                    <tbody>
                      {docs.map((d) => <tr key={d.name}><td><Icon name="file" size={13} className="sec-doctable__ic" />{d.name}</td><td className="dt-size">{d.meta}</td></tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="sec-out-empty">Outcome letters &amp; minutes are being ported to React — available in the prototype.</div>
      )}
    </div>
  );
}
