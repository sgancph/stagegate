import type { ReportAction } from '../../lib/types';

// Actions (tasks / RFIs) belong to a Report. Single source of truth so the
// dashboard "Pending actions" and a report's own "Actions" list always match.
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
