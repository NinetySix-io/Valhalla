import { NextRequest, NextResponse } from 'next/server';

const isDev = Boolean(process.env.IS_DEV);
const GQL_SERVER = '/api/graphql';

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
  const currentHost = isDev
    ? hostname.replace(`.localhost:${port}`, '')
    : hostname.replace('.vercel.pub', '');

  if (!pathname.includes('.') && !url.pathname.startsWith('/api')) {
    if (hostname === `localhost:${port}`) {
      url.pathname = `/root${pathname}`;
    } else {
      url.pathname = `/_tenants/${currentHost}${pathname}`;
    }

    return NextResponse.rewrite(url);
  } else if (url.pathname.startsWith('/api/graphql')) {
    return NextResponse.rewrite(GQL_SERVER);
  }

  return NextResponse.next();
}
