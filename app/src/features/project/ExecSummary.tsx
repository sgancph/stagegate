import { WorkspaceHeader } from './WorkspaceHeader';
import { Icon, Sparkle } from '../../components/ui/Icon';
import { toast } from '../../lib/toast';
import { useApp } from '../../app/AppContext';

export function ExecSummary() {
  const { selectedProject } = useApp();
  return (
    <div className="view view--execsummary is-active">
      <WorkspaceHeader active="execsummary" />
      <div className="ws-grid">
        <div className="ws-empty">
          <span className="ws-empty__ic">
            <Sparkle size={28} />
          </span>
          <h3 className="ws-empty__t">Generate a summary to see it here</h3>
          <p className="ws-empty__d">
            Choose an output format on the left and generate. We'll draft a committee-ready executive summary
            from your approved source documents. You can review and edit every section before it's final.
          </p>
          <div className="ws-empty__steps">
            <span className="ws-empty__step">
              <span className="ws-empty__num">1</span>Choose format
            </span>
            <span className="ws-empty__step">
              <span className="ws-empty__num">2</span>Generate summary
            </span>
            <span className="ws-empty__step">
              <span className="ws-empty__num">3</span>Review &amp; edit
            </span>
          </div>
        </div>
        <aside className="ws-left">
          <section className="ws-panel">
            <p className="es-label">
              Generate {selectedProject.name} {selectedProject.stageGateShort} Summary
            </p>
            <label className="ws-label">Output format</label>
            <button
              className="ws-select"
              type="button"
              onClick={() => toast('Only SGRP Template v2.1 is available in this prototype')}
            >
              SGRP Template v2.1{' '}
              <Icon name="chevronDown" size={14} strokeWidth={2.2} className="ws-select__ch" />
            </button>
            <button
              className="btn btn--navy es-gen-btn"
              onClick={() => toast("Summary generation isn't connected in this prototype")}
            >
              <Sparkle size={18} />
              Generate Summary
            </button>
            <p className="es-est">Estimated time: 2-3 minutes</p>
          </section>
        </aside>
      </div>
    </div>
  );
}
