/** Single source for the line-icon set. Stroke icons inherit `currentColor`. */
const PATHS: Record<string, JSX.Element> = {
  home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.4V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.4" /><path d="M9.5 21v-6h5v6" /></>,
  draft: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  reports: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.45 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.9A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.1Z" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  help: <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 2.5" /><path d="M12 17h.01" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  chevronRight: <><path d="m9 6 6 6-6 6" /></>,
  upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></>,
  pen: <><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9.5h18" /><path d="M8 3v4M16 3v4" /></>,
};

type IconProps = { name: keyof typeof PATHS; size?: number; strokeWidth?: number; className?: string };

export function Icon({ name, size = 18, strokeWidth = 1.8, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

/** The brand sparkle (filled, not stroked). */
export function Sparkle({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l1.7 5 5 1.7-5 1.7L12 16l-1.7-5-5-1.7 5-1.7L12 2.5Z" />
      <path d="M18.5 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6Z" />
    </svg>
  );
}

/** Wordmark logomark bars. */
export function Logomark() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true">
      <path d="M4 18V13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 18V9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 18V6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M20 5.5l.6 1.8 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.8Z" fill="currentColor" />
    </svg>
  );
}
