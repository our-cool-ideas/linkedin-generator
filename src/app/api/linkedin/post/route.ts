import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_TOKEN, COOKIE_PERSON, createLinkedInPost, stripMarkdown } from '@/lib/linkedin'
import { z } from 'zod'

const Schema = z.object({
  post: z.string().min(1).max(3000),
})

export async function POST(req: NextRequest) {
  const token    = req.cookies.get(COOKIE_TOKEN)?.value
  const personId = req.cookies.get(COOKIE_PERSON)?.value

  if (!token || !personId) {
    return NextResponse.json({ error: 'Not connected to LinkedIn.' }, { status: 401 })
  }

  let post: string
  try {
    const body = await req.json()
    const parsed = Schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid post content.' }, { status: 400 })
    }
    post = parsed.data.post
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const plainText = stripMarkdown(post)

  try {
    await createLinkedInPost(token, personId, plainText)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[LinkedIn post]', err)
    const message = err instanceof Error ? err.message : 'Unknown error'
    if (message.includes('401') || message.includes('403')) {
      return NextResponse.json(
        { error: 'LinkedIn session expired. Please reconnect.' },
        { status: 401 },
      )
    }
    return NextResponse.json(
      { error: 'Failed to post to LinkedIn. Please try again.' },
      { status: 502 },
    )
  }
}
