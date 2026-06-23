import { useState, useEffect } from 'react';

/** Fire a transient confirmation — for prototype actions without a real backend. */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent('sgi-toast', { detail: message }));
}

export function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let t: number | undefined;
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      if (t) clearTimeout(t);
      t = window.setTimeout(() => setMsg(null), 2400);
    };
    window.addEventListener('sgi-toast', on);
    return () => {
      window.removeEventListener('sgi-toast', on);
      if (t) clearTimeout(t);
    };
  }, []);
  if (!msg) return null;
  return (
    <div className="toast" role="status">
      {msg}
    </div>
  );
}
