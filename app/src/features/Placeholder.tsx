import { useApp } from '../app/AppContext';
import { Icon } from '../components/ui/Icon';

/**
 * Stand-in for feature views still being ported from the HTML prototype
 * (authoring, readiness, exec summary, reports detail, completeness scan…).
 * Keeps navigation working and nothing broken while the port continues.
 */
export function Placeholder({ title }: { title: string }) {
  const { navigate } = useApp();
  return (
    <div className="view view--dashboard is-active" style={{ paddingTop: 20 }}>
      <div className="ws-empty" style={{ display: 'flex' }}>
        <span className="ws-empty__ic">
          <Icon name="draft" size={28} />
        </span>
        <h3 className="ws-empty__t">{title}</h3>
        <p className="ws-empty__d">
          This screen is being ported to React from the prototype. The shell, navigation, design system and
          dashboards are live. The remaining views are being ported, reusing these same components.
        </p>
        <div className="ws-empty__steps">
          <button className="btn btn--navy" style={{ marginTop: 4 }} onClick={() => navigate('dashboard')}>
            Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
