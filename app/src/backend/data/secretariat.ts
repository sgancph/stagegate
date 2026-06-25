import type { SecretariatData } from '../../lib/types';

export const SECRETARIAT: SecretariatData = {
  kpis: [
    { label: 'Total submissions', num: '143', tag: '+12 this month', variant: 'green' },
    { label: 'Awaiting your action', num: '7', tag: '3 overdue', variant: 'amber' },
    { label: 'Approved (YTD)', num: '61', tag: '43% approval rate', variant: 'green' },
    { label: 'Avg. review time', num: '4.2d', tag: '−1.3d vs last quarter', variant: 'green' },
  ],
  funnel: [
    { label: 'Intake', num: 34, mod: 'intake' },
    { label: 'Completeness Scan', num: 28, mod: 'scan' },
    { label: 'Review', num: 19, mod: 'review' },
    { label: 'Decision', num: 11, mod: 'decision' },
    { label: 'Closed', num: 51, mod: 'closed' },
  ],
  submissions: [
    { name: 'Arena', gate: 'Stage Gate 3', chip: 'New intake', dot: 'blue' },
    { name: 'Sports Park Infrastructure', gate: 'Stage Gate 2', chip: 'In review', dot: 'amber' },
    { name: 'Velodrome', gate: 'Stage Gate 2', chip: 'In review', dot: 'amber' },
    { name: 'Music Theme Park', gate: 'Stage Gate 3', chip: 'In review', dot: 'amber' },
    {
      name: 'Public Golf Apartments Phase 2',
      gate: 'Stage Gate 2',
      chip: 'Incomplete',
      dot: 'red',
      chipMod: 'red',
    },
  ],
  recs: [
    {
      title: 'Review & send outcome letter',
      sub: 'Review outcome for Music Theme Park SG3 synced from Teams this morning.',
      mod: 'blue',
    },
    {
      title: 'Return Public Golf Apartments SG2 to team',
      sub: 'Completeness scan failed. 2 mandatory documents are missing.',
      mod: 'amber',
    },
  ],
  panels: [
    { name: 'Arena · Stage Gate 3', date: '17 Jun', pill: 'Prep needed' },
    { name: 'Stadium · Stage Gate 5', date: '24 Jun', pill: 'Not started' },
  ],
  intake: {
    queue: [
      { name: 'Arena', gate: 'Stage Gate 3', date: 'Received 11 Jun', dot: 'blue' },
      { name: 'Sports Park Infrastructure', gate: 'Stage Gate 2', date: 'In review', dot: 'amber' },
      { name: 'Velodrome', gate: 'Stage Gate 2', date: 'In review', dot: 'amber' },
    ],
    facts: [
      { k: 'Sector', v: 'Sports' },
      { k: 'Stage Gate', v: 'SG3' },
      { k: 'Capital ask', v: 'SAR 1.84bn' },
      { k: 'Submitted', v: '11 Jun 2026' },
    ],
    docs: [
      { name: 'Executive summary v2.pdf', meta: 'PDF · 1.2 MB' },
      { name: 'Arena stage gate report.pdf', meta: 'PDF · 8.4 MB' },
      { name: 'Financial model.xlsx', meta: 'XLSX · 2.0 MB' },
      { name: 'Cost plan.xlsx', meta: 'XLSX · 1.2 MB' },
      { name: 'Concept design report.pdf', meta: 'PDF · 6.2 MB' },
    ],
    overview:
      'Arena is a 20,000-seat multi-use sports and entertainment venue at the heart of Qiddiya. This SG3 submission seeks design sign-off and capital release ahead of main works procurement.',
    highlights: [
      'Detailed design is complete across all stages; value engineering has run for the Arena SG3.',
      'Procurement moves to a two-stage design-and-build with an early contractor involvement plan.',
      'A new operational readiness plan covers event operations, security and crowd movement.',
    ],
    decisionSought:
      'Approval to complete detailed design sign-off, appoint the main works contractor, and release the SAR 1.84bn delivery budget.',
  },
  scanPanel: [
    { initials: 'HA', color: '#001B72' },
    { initials: 'SN', color: '#0072BC' },
    { initials: 'MR', color: '#3F6A12' },
    { initials: 'LH', color: '#FF7800' },
  ],
  outcomes: {
    list: [
      {
        name: 'Music Theme Park',
        sub: 'SG3 · Session 14',
        date: '10 Jun 2026',
        pill: 'Conditional',
        variant: 'amber',
        selected: true,
      },
      {
        name: 'National Aquatic Centre',
        sub: 'SG2 · Session 13',
        date: '2 May 2026',
        pill: 'Approved',
        variant: 'green',
      },
    ],
    conditions: [
      'Phase 2 contingency justification to be expanded and re-submitted within 30 days.',
      'Updated operational readiness plan to be evidenced in the QIC platform before SG4.',
    ],
    minutes: [
      'Committee endorsed the strategic alignment and readiness threshold.',
      'Two conditions raised; both must be closed and evidenced before SG4 progression.',
      'Secretariat to monitor condition closure and notify the project team.',
    ],
    minutesSummary:
      'The committee endorsed Music Theme Park SG3 subject to two conditions. Discussion centred on Phase 2 contingency and operational readiness evidencing.',
  },
};
