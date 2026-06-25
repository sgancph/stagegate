import type {
  AuthoringData,
  MyReportsData,
  NotificationFeed,
  Persona,
  ProjectDashboardData,
  SecretariatData,
} from '../../lib/types';

// Demo content served from fixtures only (no database table). The DB-backed
// entities live in their own files: projects, users, actions.

export const PROJECT_DASHBOARD: ProjectDashboardData = {
  reports: [
    { id: 'arena', status: 'Drafting 16/19', tone: 'amber', sub: '19 documents uploaded' },
    { id: 'velodrome', status: 'Submitted · awaiting review', tone: 'blue', sub: 'Submitted 5 Jun' },
    { id: 'national-tennis-centre', status: 'Not started', tone: 'grey', sub: 'SGRP planned 15 Aug' },
    { id: 'national-aquatic-centre', status: 'Completed', tone: 'green', sub: 'Approved 2 May' },
  ],
  deadlines: [
    {
      title: 'Readiness scan must pass before submission',
      reportId: 'arena',
      day: '18',
      mon: 'Jun',
      rel: 'in 7 days',
    },
    { title: 'SGRP submission deadline', reportId: 'arena', day: '21', mon: 'Jun', rel: 'in 10 days' },
    {
      title: 'Stage Gate 4 submission opens',
      reportId: 'national-tennis-centre',
      day: '29',
      mon: 'Jun',
      rel: 'in 18 days',
    },
  ],
  tools: [
    {
      title: 'Stage Gate Report Co-Pilot',
      desc: 'Drafts your report from the source documents, with every section traceable back to where it came from.',
      chip: 'Arena · Stage Gate 3 draft in progress',
      tag: 'AI',
      illus: 'linear-gradient(160deg,#EFF6FF,#DBEDFF)',
    },
    {
      title: 'Restructuring Word Engine',
      desc: 'Turns consultant documents into the QIC template automatically.',
      chip: '1 consultant document for Arena · Stage Gate 3',
      tag: 'AI Word add-in',
      illus: 'linear-gradient(160deg,#E9FAFF,#D2F1FA)',
    },
    {
      title: 'Readiness Scan',
      desc: 'Checks for missing pieces and flags gaps before you submit.',
      chip: 'Available once all sections are reviewed',
      tag: 'AI',
      illus: 'linear-gradient(160deg,#F3FAE3,#E2F3C6)',
      muted: true,
    },
  ],
};

export const MY_REPORTS: MyReportsData = {
  active: [
    {
      id: 'arena',
      name: 'Arena',
      gate: 'Stage Gate 3',
      dot: 'orange',
      pillClass: 'ws-tag--blue',
      pillText: 'Review · SGRP Session 15',
      timeline: [
        { label: 'Intake', date: '8 Jun', state: 'done' },
        { label: 'Completeness Scan', date: '9 Jun', state: 'done' },
        { label: 'Review', state: 'current', cur: true },
        { label: 'Decision', state: 'todo' },
        { label: 'Closed', state: 'todo' },
      ],
      reviewer: 'A. ElHusseini (CDU lead)',
      session: 'Session 15 · 17 Jun 2026',
      rfi: {
        from: 'A. ElHusseini, CDU reviewer',
        meta: 'Received 10 Jun · 2 days ago',
        due: 'Due 14 Jun (2 days)',
        message: [
          {
            text: 'The submission is strong overall and has been progressed to Review. Could you confirm whether the ',
          },
          { text: 'contingency justification on page 12 covers Phase 2', strong: true },
          {
            text: '. The current narrative only references Phase 1. I need this before Session 15 on 17 Jun.',
          },
        ],
      },
    },
    {
      id: 'velodrome',
      name: 'Velodrome',
      gate: 'Stage Gate 2',
      dot: 'blue',
      pillClass: 'ws-tag--newblue',
      pillText: 'Awaiting SGRP review',
      timeline: [
        { label: 'Intake', date: '4 Jun', state: 'done' },
        { label: 'Completeness Scan', date: '5 Jun', state: 'done' },
        { label: 'Review', state: 'current', cur: true },
        { label: 'Decision', state: 'todo' },
        { label: 'Closed', state: 'todo' },
      ],
      reviewer: 'Not yet assigned',
      session: 'Session 16 · 24 Jun 2026',
    },
  ],
  drafts: [
    { name: 'Arena', sub: 'Stage Gate 3 · Drafting 16 of 19 sections', dot: 'orange' },
    { name: 'National Tennis Centre', sub: 'Stage Gate 4 · Not started', dot: 'grey' },
  ],
  completed: [
    {
      name: 'National Aquatic Centre',
      sub: 'Stage Gate 2 · Approved 2 May 2026',
      pill: 'Approved',
      variant: 'green',
    },
    {
      name: 'Sports Park Infrastructure',
      sub: 'Stage Gate 1 · Approved 14 Mar 2026',
      pill: 'Approved',
      variant: 'green',
    },
    {
      name: 'Music Theme Park',
      sub: 'Stage Gate 3 · Approved with conditions, 10 Jun 2026',
      pill: 'Approved w/ conditions',
      variant: 'amber',
    },
  ],
};

export const AUTHORING: AuthoringData = {
  files: [
    { name: 'Concept Design Report - Exterior', meta: 'PDF · 6.2 MB' },
    { name: 'Design Strategy - Interior', meta: 'PDF · 4.8 MB' },
    { name: 'Business Plan', meta: 'PDF · 3.1 MB' },
    { name: 'Financial Model', meta: 'XLSX · 2.0 MB' },
    { name: 'Cost Plan', meta: 'XLSX · 1.2 MB' },
    { name: 'Development Program', meta: 'PDF · 2.6 MB' },
    { name: 'Sales & Leasing Strategy', meta: 'DOCX · 1.4 MB' },
    { name: 'Marketing Strategy', meta: 'DOCX · 1.1 MB' },
  ],
  sections: [
    '1 · Strategic Case',
    '2 · Scope & Design',
    '3 · Commercial & Financial Case',
    '4 · Delivery & Procurement',
    '5 · Risk & Assurance',
    '6 · Operational Readiness',
  ],
  sectionBodies: [
    {
      section: 2,
      body: [
        {
          text: 'Detailed design is complete across all disciplines. The exterior concept has been value-engineered against the approved ',
        },
        { text: 'Cost Plan', strong: true },
        { text: ', with a 6% saving reallocated to operational readiness scope.' },
      ],
    },
    {
      section: 3,
      body: [
        { text: 'The Arena delivers a projected ' },
        { text: 'IRR of 12.4%', strong: true },
        { text: ' against a total development cost of ' },
        { text: 'SAR 1.84bn', strong: true },
        {
          text: '. Phase 1 contingency is set at 8% of construction value, consistent with the approved Cost Plan. Revenue is underpinned by a blended events calendar and anchor-tenant commitments covering 64% of leasable area.',
        },
      ],
    },
    {
      section: 4,
      body: [
        {
          text: 'Procurement moves to a two-stage design-and-build with early contractor involvement. The recommended main works contractor shortlist is evidenced in the ',
        },
        { text: 'Consultant Procurement Strategy', strong: true },
        { text: '.' },
      ],
    },
  ],
};

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

export const NOTIFICATIONS: Record<Persona, NotificationFeed> = {
  project: {
    go: 'reports',
    footer: 'View all in My reports',
    items: [
      { t: 'A. ElHusseini requested a change on Arena SG3', meta: 'Review · 2h ago' },
      { t: 'Velodrome SG2 passed the completeness scan', meta: 'Intake · Yesterday' },
      { t: 'SGRP Session 15 scheduled for 17 Jun', meta: 'Schedule · 2 days ago', read: true },
    ],
  },
  secretariat: {
    go: 'reports',
    footer: 'View all submissions',
    items: [
      { t: 'New submission: Arena · Stage Gate 3 arrived in intake', meta: 'Intake · 08:30' },
      { t: 'Music Theme Park SG3 review outcome synced from Teams', meta: 'Review · 1h ago' },
      { t: '3 reviews are overdue and need a reminder', meta: 'Action · Today' },
    ],
  },
};
