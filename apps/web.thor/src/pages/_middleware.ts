import { NextRequest, NextResponse } from 'next/server';

import { Environment } from '@app/env';

export default function middleware(req: NextRequest) {
  const port = 3005;
  const url = req.nextUrl.clone();
  const pathname = req.nextUrl.pathname;
  const hostname = req.headers.get('host');

  if (!hostname) {
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found!',
    });
  } else if (pathname.startsWith('/_sites')) {
    return new Response(null, { status: 404 });
  }

  const currentHost = Environment.isDev
    ? hostname.replace(`.localhost:${port}`, '')
    : hostname.replace('.vercel.pub', '');

  if (!pathname.includes('.') && !pathname.startsWith('/api')) {
    if (currentHost == 'app') {
      if (
        pathname === '/login' &&
        (req.cookies['next-auth.session-token'] ||
          req.cookies['__Secure-next-auth.session-token'])
      ) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }

      url.pathname = `/app${pathname}`;
      return NextResponse.rewrite(url);
    }

    if (
      hostname === `localhost:${port}` ||
      hostname === 'platformize.vercel.app'
    ) {
      url.pathname = `/home${pathname}`;
      return NextResponse.rewrite(url);
    }

    url.pathname = `/_sites/${currentHost}${pathname}`;
    return NextResponse.rewrite(url);
  }
}
