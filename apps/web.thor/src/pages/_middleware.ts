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

  // -----------------------------
  // Main
  // -----------------------------

  const currentHost = Environment.isDev
    ? hostname.replace(`.localhost:${port}`, '')
    : hostname.replace('.vercel.pub', '');

  if (!pathname.includes('.') && !url.pathname.startsWith('/api')) {
    if (hostname === `localhost:${port}`) {
      url.pathname = `/root${pathname}`;
    } else {
      url.pathname = `/_tenants/${currentHost}${pathname}`;
    }

    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
