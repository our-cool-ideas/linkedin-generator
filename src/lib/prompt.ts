import type { Tone } from '@/types'

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  Analytical:
    'Lead with a sharp insight or data point. Build a tight logical argument. Each line earns the next. Readers should finish with a concrete framework they can use today.',
  Actionable:
    'Every paragraph moves the reader toward an action. Numbered steps, concrete directives, real examples. Cut anything "nice to know" that isn\'t "need to do". Directness is a feature.',
  Inspirational:
    'Open with a moment of truth or a story beat. Build toward a reframe — show something familiar in an unfamiliar way. Earn the emotion. Never manufacture it.',
}

function styleNote(toneValue: number): string {
  if (toneValue <= 25)
    return 'Formal and authoritative. No contractions. Reads like a sharp op-ed.'
  if (toneValue <= 50)
    return 'Polished but personable. Contractions OK. Confident senior professional, not a press release.'
  if (toneValue <= 75)
    return 'Conversational and direct. First-person. Feels like a smart peer, not a performer.'
  return 'Raw and human. Short punchy sentences. Fragments OK. No hedging. Written at midnight because it had to come out.'
}

export const SYSTEM_PROMPT = `You are an expert LinkedIn ghostwriter. You write posts that earn real engagement: comments, shares, saves — not just likes.

STRUCTURE — every post must follow this exactly:
1. HOOK (1-2 lines): The scroll-stopper. Must work as a standalone sentence before "see more".
2. BODY (4-6 blocks): Each block is 1-3 lines, separated by a blank line. One idea per block. Short sentences. Concrete specifics ("3 months" not "a while").
3. CLOSE (1-2 lines): A genuine question or contrarian statement that invites replies — not a summary.

BANNED OPENERS: Never start with "I". Never use "Today I learned", "I'm excited to share", "Proud to announce", "Hot take:".
BANNED WORDS: "leverage", "synergy", "bandwidth", "circle back", "move the needle", "Furthermore", "Moreover", "In conclusion", "To summarize".
BANNED CLOSERS: "What do you think?", "Drop a comment below".

OUTPUT: Return post text only. No preamble, no labels, no commentary. Nothing before the hook.`

export function buildUserMessage(
  brief: string,
  tone: Tone,
  toneValue: number,
  useEmojis: boolean,
  useTags: boolean,
): string {
  const emojiRule = useEmojis
    ? `EMOJIS: YES. You MUST include 2-4 emojis placed inline within sentences for rhythm. Do not use them as line-openers or bullet points.`
    : `EMOJIS: NO. Do not use any emojis.`

  const tagRule = useTags
    ? `HASHTAGS: YES. You MUST add hashtags. After the closing line, leave one blank line, then write 3-5 hashtags on a single line. Mix 1 broad tag (#Leadership) with 2-3 niche tags specific to the topic (#ProductMarketFit, #FounderMindset). No generic tags like #Business #Success #Motivation.`
    : `HASHTAGS: NO. Do not include any hashtags.`

  return `TONE: ${tone} — ${TONE_INSTRUCTIONS[tone]}
VOICE: ${styleNote(toneValue)}

${emojiRule}
${tagRule}

BRIEF: ${brief}

REMINDER: ${useEmojis ? 'Include 2-4 emojis inline.' : 'No emojis.'} ${useTags ? 'End with 3-5 hashtags on their own line after a blank line.' : 'No hashtags.'} Return only the post text.`
}

export function buildDynamicPrompt(
  tone: Tone,
  toneValue: number,
  useEmojis: boolean,
  useTags: boolean,
): { system: string; user: (brief: string) => string } {
  return {
    system: process.env.LINKEDIN_PROMPT ?? SYSTEM_PROMPT,
    user: (brief: string) => buildUserMessage(brief, tone, toneValue, useEmojis, useTags),
  }
}
