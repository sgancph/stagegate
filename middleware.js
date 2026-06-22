export const config = {
  matcher: ['/', '/stage-gate-intelligence_f2.html'],
};

export default function middleware(request) {
  const expectedUser = process.env.BASIC_AUTH_USER || 'qiddiya';
  const expectedPass = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedPass) return;

  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const [user, pass] = atob(authHeader.split(' ')[1]).split(':');
    if (user === expectedUser && pass === expectedPass) return;
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Qiddiya Dashboard"' },
  });
}
