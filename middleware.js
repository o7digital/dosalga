import { NextResponse } from 'next/server'

export function middleware(request) {
  const maintenance = process.env.MAINTENANCE === '1' || process.env.NEXT_PUBLIC_MAINTENANCE === '1'
  if (!maintenance) return NextResponse.next()

  const { pathname } = request.nextUrl
  // Allow the maintenance page itself and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/maintenance'
  ) {
    return NextResponse.next()
  }

  return NextResponse.rewrite(new URL('/maintenance', request.url))
}

export const config = {
  matcher: '/:path*'
}
