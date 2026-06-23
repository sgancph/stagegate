import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';

const panel = [
  { initials: 'HA', color: '#001B72' },
  { initials: 'SN', color: '#0072BC' },
  { initials: 'MR', color: '#3F6A12' },
  { initials: 'LH', color: '#FF7800' },
];

export function SecretariatScan() {
  const { navigate } = useApp();
  return (
    <div className="sec-scan">
      <div className="ws-head">
        <button className="ws-back" aria-label="Back to submissions" onClick={() => navigate('reports')}><Icon name="back" /></button>
        <div><h1 className="ws-title">Completeness Scan for Arena SG3</h1></div>
      </div>
      <div className="ws-grid">
        <aside className="ws-left">
          <section className="ws-panel">
            <div className="scan-field">
              <p className="scan-field__label">Scan type</p>
              <p className="scan-field__hint">Are you scanning pre or post meeting outcome?</p>
              <div className="scan-select"><span>Pre-Session Scan</span><Icon name="chevronDown" size={14} strokeWidth={2.2} className="scan-select__ch" /></div>
            </div>
            <div className="scan-field">
              <p className="scan-field__label">Receiving panel</p>
              <p className="scan-field__hint">Members who will receive this submission</p>
              <div className="scan-people">
                {panel.map((p) => <span key={p.initials} className="scan-person" style={{ background: p.color }}>{p.initials}</span>)}
                <button className="scan-person-add" aria-label="Add panel member">+</button>
              </div>
            </div>
            <div className="scan-field">
              <p className="scan-field__label">Checklist</p>
              <div className="scan-select"><span>SG3 Arena Checklist v2.3</span><Icon name="chevronDown" size={14} strokeWidth={2.2} className="scan-select__ch" /></div>
            </div>
          </section>
          <button className="scan-runbtn"><Icon name="shield" size={16} /> Scan</button>
        </aside>
      </div>
    </div>
  );
}
