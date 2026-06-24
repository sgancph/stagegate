import type { ReactNode } from 'react';

export type Tone = 'amber' | 'green' | 'grey' | 'blue' | 'red';

/** A status as one pill: coloured dot + label in a subtly tinted background. */
export function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={`status-pill status-pill--${tone}`}>
      <span className="status-pill__dot" />
      {children}
    </span>
  );
}
