import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../../app/AppContext';
import { TOUR_STEPS, type TourStep, type Placement } from './tourSteps';

const DONE_KEY = 'sgi_tour_done';
type Box = { top: number; left: number; width: number; height: number };

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(v, hi));

/** Place the tooltip near the target, trying the requested side then falling back to one that fits. */
function placeTip(r: DOMRect, placement: Placement, tw: number, th: number) {
  const m = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const candidate = (p: Placement) => {
    switch (p) {
      case 'right':
        return { left: r.right + m, top: r.top };
      case 'left':
        return { left: r.left - tw - m, top: r.top };
      case 'top':
        return { left: r.left, top: r.top - th - m };
      default:
        return { left: r.left, top: r.bottom + m };
    }
  };
  const fits = (c: { left: number; top: number }) =>
    c.left >= m && c.left + tw <= vw - m && c.top >= m && c.top + th <= vh - m;
  // On narrow screens always go below/above the target; otherwise honour the requested side first.
  const order: Placement[] = vw < 600 ? ['bottom', 'top'] : [placement, 'bottom', 'top', 'right', 'left'];
  const chosen = order.map(candidate).find(fits) ?? candidate(vw < 600 ? 'bottom' : placement);
  return { top: clamp(chosen.top, m, vh - th - m), left: clamp(chosen.left, m, vw - tw - m) };
}

export function GuidedTour() {
  const { persona, navigate } = useApp();
  const [active, setActive] = useState(false);
  const [i, setI] = useState(0);
  const [spot, setSpot] = useState<Box | null>(null);
  const [tip, setTip] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [ready, setReady] = useState(false); // hides the tooltip until first measured placement
  const [hinting, setHinting] = useState(false); // first-time attention nudge on the Help button
  const [hintPos, setHintPos] = useState<{ top: number; left: number } | null>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const steps = useMemo(() => TOUR_STEPS.filter((s) => s.role === persona), [persona]);
  const step: TourStep | undefined = steps[i];
  const last = i === steps.length - 1;

  const start = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement;
    setHinting(false);
    setReady(false);
    setI(0);
    setActive(true);
  }, []);

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(DONE_KEY, '1');
    } catch {
      /* ignore */
    }
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  const dismissHint = useCallback(() => {
    setHinting(false);
    try {
      localStorage.setItem(DONE_KEY, '1');
    } catch {
      /* ignore */
    }
  }, []);

  // Start on Help click. First-time visitors get a pulse + callout instead of an auto-start.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.('[data-tour-help]')) start();
    };
    document.addEventListener('click', onClick);
    let done = '1';
    try {
      done = localStorage.getItem(DONE_KEY) ?? '';
    } catch {
      /* ignore */
    }
    if (!done) setHinting(true);
    return () => document.removeEventListener('click', onClick);
  }, [start]);

  // Pulse the Help button while the nudge is showing.
  useEffect(() => {
    const btn = document.querySelector('[data-tour-help]');
    if (btn) btn.classList.toggle('tour-help--pulse', hinting);
    return () => document.querySelector('[data-tour-help]')?.classList.remove('tour-help--pulse');
  }, [hinting]);

  // Anchor the callout under the Help button; keep it pinned on resize/scroll.
  useEffect(() => {
    if (!hinting || active) return;
    const place = () => {
      const btn = document.querySelector<HTMLElement>('[data-tour-help]');
      if (!btn) {
        setHintPos(null);
        return;
      }
      const r = btn.getBoundingClientRect();
      const w = 250,
        m = 12;
      setHintPos({ top: r.bottom + 10, left: clamp(r.right - w, m, window.innerWidth - w - m) });
    };
    const t = window.setTimeout(place, 350);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', place, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', place, true);
    };
  }, [hinting, active]);

  // Keyboard: Escape closes, Tab is trapped within the tooltip.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        finish();
        return;
      }
      if (event.key !== 'Tab' || !tipRef.current) return;
      const focusable = Array.from(tipRef.current.querySelectorAll<HTMLElement>('button:not(:disabled)'));
      if (!focusable.length) return;
      const first = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active, finish]);

  // Navigate to the step's screen, measure the real target + tooltip, then position.
  // Re-measures on resize and on scroll (capture catches inner scrollers) so it never drifts.
  useEffect(() => {
    if (!active || !step) return;
    navigate(step.view);

    const measure = () => {
      const el = step.target ? document.querySelector<HTMLElement>(step.target) : null;
      const r = el?.getBoundingClientRect();
      const vw = window.innerWidth,
        vh = window.innerHeight;
      const visible = !!(
        r &&
        r.width > 1 &&
        r.height > 1 &&
        r.bottom > 4 &&
        r.top < vh - 4 &&
        r.right > 4 &&
        r.left < vw - 4
      );
      const tipEl = tipRef.current;
      const tw = tipEl?.offsetWidth || 300;
      const th = tipEl?.offsetHeight || 170;
      if (visible && r) {
        setSpot({
          top: Math.max(8, r.top - 6),
          left: Math.max(8, r.left - 6),
          width: Math.min(r.width + 12, vw - 16),
          height: Math.min(r.height + 12, vh - 16),
        });
        setTip(placeTip(r, step.placement, tw, th));
      } else {
        setSpot(null);
        setTip({ top: (vh - th) / 2, left: (vw - tw) / 2 });
      }
      setReady(true);
    };

    // Let the new view mount, scroll the target into view once, then measure.
    const t = window.setTimeout(() => {
      const el = step.target ? document.querySelector<HTMLElement>(step.target) : null;
      el?.scrollIntoView({ block: 'center', inline: 'nearest' });
      measure();
    }, 60);
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', measure, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', measure);
      window.removeEventListener('scroll', measure, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, i, step?.view]);

  // Move focus into the tooltip once it's placed.
  useEffect(() => {
    if (active && ready) tipRef.current?.querySelector<HTMLElement>('button')?.focus();
  }, [active, ready, i]);

  return (
    <>
      {hinting && !active && hintPos && (
        <div
          className="tour-hint"
          role="dialog"
          aria-label="Guided tour available"
          style={{ top: hintPos.top, left: hintPos.left }}
        >
          <p className="tour-hint__t">New here?</p>
          <p className="tour-hint__d">
            Take a quick {steps.length}-step tour of the key features. You can start it any time from the{' '}
            <strong>?</strong> button.
          </p>
          <div className="tour-hint__row">
            <button className="tour-hint__dismiss" onClick={dismissHint}>
              Not now
            </button>
            <button className="tour-btn tour-btn--primary" onClick={start}>
              Start tour
            </button>
          </div>
        </div>
      )}

      {active && step && (
        <>
          {/* Spotlight reveals the target via its box-shadow scrim; centred steps get a plain dimmer. */}
          {spot ? (
            <div className="tour-spot" style={spot} />
          ) : (
            <div className="tour-overlay" onClick={finish} />
          )}
          <div
            className="tour-tip"
            ref={tipRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tour-title"
            style={{ ...tip, opacity: ready ? 1 : 0 }}
          >
            <p className="tour-tip__eyebrow">
              Step {i + 1} of {steps.length}
            </p>
            <h3 className="tour-tip__title" id="tour-title">
              {step.title}
            </h3>
            <p className="tour-tip__body">{step.body}</p>
            <div className="tour-tip__foot">
              <button className="tour-tip__skip" onClick={finish}>
                {last ? 'Close' : 'Skip tour'}
              </button>
              <div className="tour-tip__nav">
                <button
                  className="tour-btn"
                  disabled={i === 0}
                  onClick={() => setI((n) => Math.max(0, n - 1))}
                >
                  Back
                </button>
                <button
                  className="tour-btn tour-btn--primary"
                  onClick={() => (last ? finish() : setI((n) => n + 1))}
                >
                  {last ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
