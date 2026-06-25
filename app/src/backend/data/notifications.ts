import type { NotificationFeed, Persona } from '../../lib/types';

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
