import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
  const session = await getToken({ req });
  const url = req.nextUrl;
  const loginUrl = new URL('/auth/login', url.origin);
  const dashboardUrl = new URL('/dashboard', url.origin);
  if (url.pathname.startsWith('/dashboard') && !session) {
    return NextResponse.redirect(loginUrl);
  }
  if (url.pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}
