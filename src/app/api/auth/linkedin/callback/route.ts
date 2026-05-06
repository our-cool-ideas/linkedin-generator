import { NextRequest, NextResponse } from 'next/server'
import {
  exchangeCode,
  getUserInfo,
  COOKIE_STATE,
  COOKIE_TOKEN,
  COOKIE_PERSON,
  COOKIE_NAME,
  authCookieOpts,
  nameCookieOpts,
} from '@/lib/linkedin'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code  = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  const home = new URL('/', req.url).toString()

  if (error) {
    return NextResponse.redirect(`${home}?li_error=${encodeURIComponent(error)}`)
  }

  const storedState = req.cookies.get(COOKIE_STATE)?.value
  if (!code || !state || state !== storedState) {
    return NextResponse.redirect(`${home}?li_error=invalid_state`)
  }

  try {
    const { access_token, expires_in } = await exchangeCode(req, code)
    const { sub, name } = await getUserInfo(access_token)

    const maxAge = expires_in ?? 60 * 60 * 24 * 60 // fallback: 60 days

    const res = NextResponse.redirect(home)

    res.cookies.delete(COOKIE_STATE)
    res.cookies.set(COOKIE_TOKEN,  access_token, { ...authCookieOpts, maxAge })
    res.cookies.set(COOKIE_PERSON, sub,          { ...authCookieOpts, maxAge })
    res.cookies.set(COOKIE_NAME,   name,         { ...nameCookieOpts, maxAge })

    return res
  } catch (err) {
    console.error('[LinkedIn callback]', err)
    return NextResponse.redirect(`${home}?li_error=auth_failed`)
  }
}
