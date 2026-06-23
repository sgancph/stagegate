export const config = { matcher: ['/(.*)'] };

function reply(status, body, authenticate = false) {
  const headers = { 'Cache-Control': 'no-store' };
  if (authenticate) headers['WWW-Authenticate'] = 'Basic realm="Stage Gate Intelligence", charset="UTF-8"';
  return new Response(body, { status, headers });
}

export default function middleware(request) {
  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;
  if (!expectedUser || !expectedPass) return reply(503, 'Authentication is not configured');

  try {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Basic ')) return reply(401, 'Unauthorized', true);

    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(':');
    const user = decoded.slice(0, separator);
    const pass = decoded.slice(separator + 1);
    if (separator >= 0 && user === expectedUser && pass === expectedPass) return;
  } catch {
    // Malformed credentials fall through to the standard challenge.
  }

  return reply(401, 'Unauthorized', true);
}
