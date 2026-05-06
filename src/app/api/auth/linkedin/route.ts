import { NextRequest, NextResponse } from 'next/server'
import { buildAuthUrl, COOKIE_STATE, stateCookieOpts } from '@/lib/linkedin'

export async function GET(req: NextRequest) {
  if (!process.env.LINKEDIN_CLIENT_ID || !process.env.LINKEDIN_CLIENT_SECRET) {
    return NextResponse.json(
      { error: 'LinkedIn OAuth is not configured.' },
      { status: 503 },
    )
  }

  const state = Array.from(
    crypto.getRandomValues(new Uint8Array(16)),
  ).map((b) => b.toString(16).padStart(2, '0')).join('')

  const authUrl = buildAuthUrl(req, state)
  const res = NextResponse.redirect(authUrl)
  res.cookies.set(COOKIE_STATE, state, stateCookieOpts)
  return res
}
