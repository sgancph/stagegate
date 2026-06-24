'use client';

import dynamic from 'next/dynamic';

// The whole UI is a client-only SPA today (reads localStorage and the URL hash
// during render), so we mount it without server rendering. Server components
// can be adopted per feature later.
// ponytail: ssr:false keeps Phase 0 a straight port; drop it when a view goes server-rendered.
const App = dynamic(() => import('../App').then((mod) => mod.App), { ssr: false });

export default function Page() {
  return <App />;
}
