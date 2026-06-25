import type { ProjectDashboardData } from '../../lib/types';

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
