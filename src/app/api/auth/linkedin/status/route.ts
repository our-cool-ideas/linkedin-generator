import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_TOKEN, COOKIE_NAME } from '@/lib/linkedin'

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_TOKEN)?.value
  const name  = req.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.json({ connected: false })
  }
  return NextResponse.json({ connected: true, name: name ?? 'LinkedIn User' })
}
