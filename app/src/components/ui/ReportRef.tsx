import { getProject, reportLabel } from '../../data/store';

/** A report's identity avatar (initials), reused everywhere a report appears. */
export function ReportAvatar({ id, sm }: { id: string; sm?: boolean }) {
  return (
    <span className={`report-ava${sm ? ' report-ava--sm' : ''}`} aria-hidden="true">
      {getProject(id).initials}
    </span>
  );
}

/** Inline reference to a report: avatar + canonical "Name · Stage Gate N". */
export function ReportRef({ id }: { id: string }) {
  return (
    <span className="report-ref">
      <ReportAvatar id={id} sm /> {reportLabel(id)}
    </span>
  );
}
