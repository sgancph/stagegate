import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../../app/AppContext';
import { TOUR_STEPS, type TourStep } from './tourSteps';

const DONE_KEY = 'sgi_tour_done';
type Box = { top: number; left: number; width: number; height: number };

export function GuidedTour() {
  const { persona, navigate } = useApp();
  const [active, setActive] = useState(false);
  const [i, setI] = useState(0);
  const [spot, setSpot] = useState<Box | null>(null);
  const [tip, setTip] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const tipRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const steps = useMemo(() => TOUR_STEPS.filter((s) => s.role === persona), [persona]);
  const step: TourStep | undefined = steps[i];
  const last = i === steps.length - 1;

  const finish = useCallback(() => {
    setActive(false);
    try {
      localStorage.setItem(DONE_KEY, '1');
    } catch {
      /* ignore */
    }
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }, []);

  // Start on Help click; auto-start once for first-time users.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.('[data-tour-help]')) {
        returnFocusRef.current = document.activeElement as HTMLElement;
        setI(0);
        setActive(true);
      }
    };
    document.addEventListener('click', onClick);
    let done = '1';
    try {
      done = localStorage.getItem(DONE_KEY) ?? '';
    } catch {
      /* ignore */
    }
    const t = !done
      ? window.setTimeout(() => {
          setI(0);
          setActive(true);
        }, 600)
      : undefined;
    return () => {
      document.removeEventListener('click', onClick);
      if (t) clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') finish();
      if (event.key !== 'Tab' || !tipRef.current) return;
      const focusable = Array.from(tipRef.current.querySelectorAll<HTMLElement>('button:not(:disabled)'));
      if (!focusable.length) return;
      const first = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        lastFocusable.focus();
      }
      if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    window.setTimeout(() => tipRef.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active, finish]);

  // Navigate to the step's screen, then measure + place the spotlight/tooltip.
  useEffect(() => {
    if (!active || !step) return;
    navigate(step.view);
    const place = () => {
      const el = step.target ? document.querySelector(step.target) : null;
      const r = el?.getBoundingClientRect();
      const visible = !!(r && r.width > 1 && r.height > 1 && r.bottom > 0 && r.top < innerHeight);
      const tipW = 300,
        tipH = 168,
        m = 12;
      if (visible && r) {
        el!.scrollIntoView({ block: 'center', inline: 'nearest' });
        const rr = el!.getBoundingClientRect();
        setSpot({ top: rr.top - 6, left: rr.left - 6, width: rr.width + 12, height: rr.height + 12 });
        let top = rr.bottom + m,
          left = rr.left;
        if (step.placement === 'right') {
          left = rr.right + m;
          top = rr.top;
        } else if (step.placement === 'left') {
          left = rr.left - tipW - m;
          top = rr.top;
        } else if (step.placement === 'top') {
          top = rr.top - tipH - m;
          left = rr.left;
        }
        setTip({ top: clamp(top, m, innerHeight - tipH - m), left: clamp(left, m, innerWidth - tipW - m) });
      } else {
        setSpot(null);
        setTip({ top: (innerHeight - tipH) / 2, left: (innerWidth - tipW) / 2 });
      }
    };
    const t = window.setTimeout(place, 130);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, i, step?.view]);

  if (!active || !step) return null;
  return (
    <>
      <div className="tour-overlay" onClick={finish} />
      {spot && <div className="tour-spot" style={spot} />}
      <div
        className="tour-tip"
        ref={tipRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
        style={{ ...tip, width: 300 }}
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
            Skip tour
          </button>
          <div className="tour-tip__nav">
            <button className="tour-btn" disabled={i === 0} onClick={() => setI((n) => Math.max(0, n - 1))}>
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
  );
}

function clamp(v: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(v, hi));
}
