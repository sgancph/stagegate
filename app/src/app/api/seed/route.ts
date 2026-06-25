import { NextResponse } from 'next/server';
import { getSeed } from '../../../backend/data';

// All application data the client needs at boot. The client never hardcodes it.
// Dynamic so a connected database is read live rather than baked in at build.
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await getSeed(), { headers: { 'Cache-Control': 'no-store' } });
}
