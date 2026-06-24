import type { Persona, UserProfile } from '../../lib/types';

export const USERS: Record<Persona, UserProfile> = {
  project: {
    initials: 'RH',
    shortName: 'R. Hassan',
    fullName: 'Rashid Hassan',
    role: 'Project team',
    email: 'r.hassan@qiddiya.sa',
    color: '#001B72',
  },
  secretariat: {
    initials: 'FO',
    shortName: 'F. Osman',
    fullName: 'Farhan Osman',
    role: 'SGRP Secretariat',
    email: 'f.osman@qiddiya.sa',
    color: '#0E7C86',
  },
};
