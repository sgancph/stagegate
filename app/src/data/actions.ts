// Actions (tasks / RFIs) belong to a Report. Single source of truth so the
// dashboard "Pending actions" and a report's own "Actions" list always match.
export type ActionDue = 'red' | 'amber' | 'grey';

export interface ReportAction {
  id: string;
  reportId: string;
  title: string;
  due: string; // "Due today" | "Due 15 Jun" | "No deadline"
  dueVariant: ActionDue;
}

export const ACTIONS: ReportAction[] = [
  {
    id: 'esg',
    reportId: 'arena',
    title: 'Fix ESG commitments gap: upload environmental impact report',
    due: 'Due today',
    dueVariant: 'red',
  },
  {
    id: 'contingency',
    reportId: 'arena',
    title: 'Add contingency justification for the readiness scan',
    due: 'Due 15 Jun',
    dueVariant: 'amber',
  },
  {
    id: 'traceability',
    reportId: 'arena',
    title: 'Review the Financial summary section traceability',
    due: 'No deadline',
    dueVariant: 'grey',
  },
];

export const dueDot = (v: ActionDue) => (v === 'red' ? 'red' : v === 'amber' ? 'orange' : 'grey');
export const actionsForReport = (reportId: string) => ACTIONS.filter((a) => a.reportId === reportId);
