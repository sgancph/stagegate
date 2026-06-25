import type { ReactNode } from 'react';
import type { Tone } from '../../lib/types';

export type { Tone };

/** A status as one pill: coloured dot + label in a subtly tinted background. */
export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`status-pill status-pill--${tone}`}>
      <span className="status-pill__dot" />
      {children}
    </span>
  );
}
