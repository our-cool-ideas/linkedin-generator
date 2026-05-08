import type { Metadata } from 'next'
import LandingContent from '@/components/LandingContent'

export const metadata: Metadata = {
  title: 'LinkedIn Post Generator — AI Posts That Actually Get Engagement',
  description:
    'Turn a rough idea into a scroll-stopping LinkedIn post in seconds. Choose tone, style, and options. 100% free — no account required.',
  openGraph: {
    url: 'https://linkedin-generator.vercel.app',
    title: 'LinkedIn Post Generator — AI Posts That Actually Get Engagement',
    description: 'Turn a rough idea into a scroll-stopping LinkedIn post in seconds. Free, no account required.',
  },
}

export default function LandingPage() {
  return <LandingContent />
}
