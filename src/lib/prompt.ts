import type { Tone } from '@/types'

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  Analytical: 'Use a data-driven, logical tone. Include frameworks, stats, and structured insights. The reader should feel they learned something concrete.',
  Actionable: 'Use a direct, practical tone. Every paragraph should give the reader something they can do today. Focus on steps, not theory.',
  Inspirational: 'Use an emotionally resonant, motivating tone. Tell a story or paint a vision. Leave the reader energized and reflective.',
}

function buildPrompt(tone: Tone, toneValue: number): string {
  const humanScore = toneValue
  const styleNote =
    humanScore <= 33
      ? 'Write in a polished, formal professional style. Sentences should be tight and authoritative.'
      : humanScore <= 66
        ? 'Balance professionalism with personality. Feel approachable but credible.'
        : 'Write in a raw, authentic, conversational style. It should feel like a real human wrote it — imperfect, direct, relatable.'

  return `You are an expert LinkedIn content creator who understands viral content mechanics deeply.

Tone: ${tone}
${TONE_INSTRUCTIONS[tone]}

Style (${humanScore}/100 — 0=fully professional, 100=fully human/casual):
${styleNote}

Generate a complete LinkedIn post with three distinct sections:

1. HOOK (1-2 lines): A scroll-stopping opening that creates immediate curiosity, tension, or a bold claim. Never start with "I". Use pattern interrupts, surprising statistics, or counterintuitive statements.

2. BODY (3-5 short paragraphs): Mobile-optimized formatting with single-sentence lines and white space. Each paragraph 1-3 lines max. Use line breaks liberally.

3. CLOSE (1-2 lines): A CTA that invites engagement — a question, a prompt to share, or a natural call to action.

Rules:
- No hashtags, no emojis unless the brief specifically calls for them
- Vary sentence length for rhythm
- The hook must stand alone — it should compel someone to tap "see more"
- Total length: 150-300 words

Return ONLY the post text. No labels, no section headers, no commentary.

Brief: `
}

export function buildDynamicPrompt(tone: Tone, toneValue: number): string {
  return process.env.LINKEDIN_PROMPT ?? buildPrompt(tone, toneValue)
}
