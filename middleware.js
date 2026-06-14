import { NextResponse } from 'next/server'

export function middleware(request) {
  const host = request.headers.get('host') || ''
  const productionHosts = new Set(['dosalga.store', 'www.dosalga.store'])
  if (!productionHosts.has(host)) return NextResponse.next()

  const maintenanceValue = String(process.env.MAINTENANCE || process.env.NEXT_PUBLIC_MAINTENANCE || '').toLowerCase()
  const maintenanceDisabled = maintenanceValue === '0' || maintenanceValue === 'false' || maintenanceValue === 'off'
  if (maintenanceDisabled) return NextResponse.next()

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
