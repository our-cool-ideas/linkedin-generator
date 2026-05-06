import { NextResponse } from 'next/server'
import { COOKIE_TOKEN, COOKIE_PERSON, COOKIE_NAME } from '@/lib/linkedin'

export async function POST() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete(COOKIE_TOKEN)
  res.cookies.delete(COOKIE_PERSON)
  res.cookies.delete(COOKIE_NAME)
  return res
}
