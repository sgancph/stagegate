import { NextResponse } from 'next/server';
import { getSeed } from '../../../server/data';

// All application data the client needs at boot. The client never hardcodes it.
export function GET() {
  return NextResponse.json(getSeed(), { headers: { 'Cache-Control': 'no-store' } });
}
