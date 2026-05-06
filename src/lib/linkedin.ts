// ── OAuth helpers ──────────────────────────────────────────────────────────

export const LI_SCOPES = ['openid', 'profile', 'w_member_social']

export const COOKIE_TOKEN   = 'li_token'
export const COOKIE_PERSON  = 'li_person'
export const COOKIE_NAME    = 'li_name'    // non-httpOnly — client reads for display
export const COOKIE_STATE   = 'li_state'

function redirectUri(req: Request): string {
  const url = new URL(req.url)
  return `${url.protocol}//${url.host}/api/auth/linkedin/callback`
}

export function buildAuthUrl(req: Request, state: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID ?? '',
    redirect_uri: redirectUri(req),
    scope: LI_SCOPES.join(' '),
    state,
  })
  return `https://www.linkedin.com/oauth/v2/authorization?${params}`
}

export async function exchangeCode(
  req: Request,
  code: string,
): Promise<{ access_token: string; expires_in: number }> {
  const res = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri(req),
      client_id: process.env.LINKEDIN_CLIENT_ID ?? '',
      client_secret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`LinkedIn token exchange failed ${res.status}: ${text}`)
  }
  return res.json()
}

export async function getUserInfo(
  accessToken: string,
): Promise<{ sub: string; name: string; picture?: string }> {
  const res = await fetch('https://api.linkedin.com/v2/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error(`LinkedIn userinfo failed: ${res.status}`)
  return res.json()
}

// ── Posting ────────────────────────────────────────────────────────────────

export function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s?/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/__/g, '')
    .replace(/_([^_]+)_/g, '$1')
    .trim()
}

export async function createLinkedInPost(
  accessToken: string,
  personId: string,
  text: string,
): Promise<void> {
  const res = await fetch('https://api.linkedin.com/rest/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'LinkedIn-Version': '202401',
      'X-Restli-Protocol-Version': '2.0.0',
    },
    body: JSON.stringify({
      author: `urn:li:person:${personId}`,
      commentary: text,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: [],
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`LinkedIn post failed ${res.status}: ${body}`)
  }
}

// ── Cookie config ──────────────────────────────────────────────────────────

const isProduction = process.env.NODE_ENV === 'production'

export const authCookieOpts = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
}

export const nameCookieOpts = {
  httpOnly: false,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
}

export const stateCookieOpts = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 5, // 5 min
}
