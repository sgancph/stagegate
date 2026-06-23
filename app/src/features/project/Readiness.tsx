import { WorkspaceHeader } from './WorkspaceHeader';
import { Icon } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';

export function Readiness() {
  return (
    <div className="view view--readiness is-active is-config">
      <WorkspaceHeader active="readiness" />
      <div className="ws-grid">
        <div className="ws-empty">
          <span className="ws-empty__ic"><Icon name="shield" size={28} /></span>
          <h3 className="ws-empty__t">Run a readiness scan to see results</h3>
          <p className="ws-empty__d">Confirm the checklist on the left, then run the scan. We'll check your report against the Stage Gate mandatory checklist and show what passes, what's missing, and any advisory warnings right here.</p>
          <div className="ws-empty__steps">
            <span className="ws-empty__step"><span className="ws-empty__num">1</span>Confirm checklist</span>
            <span className="ws-empty__step"><span className="ws-empty__num">2</span>Run scan</span>
            <span className="ws-empty__step"><span className="ws-empty__num">3</span>Review passes &amp; gaps</span>
          </div>
        </div>
        <aside className="ws-left">
          <section className="ws-panel">
            <h2 className="ws-h">Report documents</h2>
            <p className="rs-sub-label">Included in this scan:</p>
            <div className="rs-doclist">
              <div className="rs-doc"><Icon name="file" size={14} /><span>Executive summary v2.pdf</span></div>
              <div className="rs-doc"><Icon name="file" size={14} /><span>Arena stage gate report.pdf</span></div>
            </div>
          </section>
          <section className="ws-panel">
            <h2 className="ws-h">Scan settings</h2>
            <div className="scan-field">
              <div className="scan-select"><span>Stage Gate&nbsp;&nbsp;<strong>SG3</strong></span><Icon name="chevronDown" size={14} strokeWidth={2.2} className="scan-select__ch" /></div>
            </div>
            <div className="scan-field">
              <div className="scan-select"><span>Checklist&nbsp;&nbsp;<strong>SG3 · v2.1</strong></span><Icon name="chevronDown" size={14} strokeWidth={2.2} className="scan-select__ch" /></div>
            </div>
            <button className="btn btn--navy rs-scan-go" style={{ display: 'flex' }} onClick={() => toast('Running readiness scan…')}><Icon name="search" size={16} strokeWidth={2} />Scan</button>
          </section>
        </aside>
      </div>
    </div>
  );
}
