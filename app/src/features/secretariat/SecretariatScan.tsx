import { useApp } from '../../app/AppContext';
import { Icon } from '../../components/ui/Icon';
import { getSecretariat, reportLabel } from '../../data/store';
import { toast } from '../../lib/toast';

export function SecretariatScan() {
  const { navigate } = useApp();
  const panel = getSecretariat().scanPanel;
  return (
    <div className="sec-scan">
      <div className="ws-head">
        <button className="ws-back" aria-label="Back to submissions" onClick={() => navigate('reports')}>
          <Icon name="back" />
        </button>
        <div>
          <h1 className="ws-title">Completeness Scan for {reportLabel('arena')}</h1>
        </div>
      </div>
      <div className="ws-grid">
        <aside className="ws-left">
          <section className="ws-panel">
            <div className="scan-field">
              <p className="scan-field__label">Scan type</p>
              <p className="scan-field__hint">Are you scanning pre or post meeting outcome?</p>
              <button
                className="scan-select"
                type="button"
                onClick={() => toast('Only Pre-Session Scan is available')}
              >
                <span>Pre-Session Scan</span>
                <Icon name="chevronDown" size={14} strokeWidth={2.2} className="scan-select__ch" />
              </button>
            </div>
            <div className="scan-field">
              <p className="scan-field__label">Receiving panel</p>
              <p className="scan-field__hint">Members who will receive this submission</p>
              <div className="scan-people">
                {panel.map((p) => (
                  <span key={p.initials} className="scan-person" style={{ background: p.color }}>
                    {p.initials}
                  </span>
                ))}
                <button
                  className="scan-person-add"
                  aria-label="Add panel member"
                  onClick={() => toast("Editing the panel isn't connected in this prototype")}
                >
                  +
                </button>
              </div>
            </div>
            <div className="scan-field">
              <p className="scan-field__label">Checklist</p>
              <button
                className="scan-select"
                type="button"
                onClick={() => toast('Only SG3 Arena Checklist v2.3 is available')}
              >
                <span>SG3 Arena Checklist v2.3</span>
                <Icon name="chevronDown" size={14} strokeWidth={2.2} className="scan-select__ch" />
              </button>
            </div>
          </section>
          <button
            className="btn btn--navy scan-runbtn"
            onClick={() => toast("Completeness scanning isn't connected in this prototype")}
          >
            <Icon name="shield" size={16} /> Scan
          </button>
        </aside>
      </div>
    </div>
  );
}
