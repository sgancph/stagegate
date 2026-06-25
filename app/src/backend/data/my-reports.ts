import type { MyReportsData } from '../../lib/types';

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
