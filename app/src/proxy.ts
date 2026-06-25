import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

function challenge(status: number, body: string, authenticate = false) {
  const headers: Record<string, string> = { 'Cache-Control': 'no-store' };
  if (authenticate) headers['WWW-Authenticate'] = 'Basic realm="Stage Gate Intelligence", charset="UTF-8"';
  return new NextResponse(body, { status, headers });
}

export function proxy(request: NextRequest) {
  // Demo lock applies only to deployed builds; local dev runs open, like the old Vite server.
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  const expectedUser = process.env.BASIC_AUTH_USER || 'qiddiya';
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;
  if (!expectedPass) return challenge(503, 'Authentication is not configured');

  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Basic ')) return challenge(401, 'Unauthorized', true);

    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(':');
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);
    if (separator >= 0 && user === expectedUser && pass === expectedPass) {
      return NextResponse.next();
    }
  } catch {
    // Malformed credentials fall through to the standard challenge.
  }

  return challenge(401, 'Unauthorized', true);
}
