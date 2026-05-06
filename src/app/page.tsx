import type { Metadata } from 'next'
import PostGenerator from '@/components/PostGenerator'

export const metadata: Metadata = {
  title: 'LinkedIn Post Generator — AI-Powered Posts That Get Engagement',
  description:
    'Turn any brief into a scroll-stopping LinkedIn post. Strong hook, structured body, engagement-driving CTA. No account required.',
  openGraph: {
    url: 'https://linkedin-generator.vercel.app',
  },
}

export default function Home() {
  return <PostGenerator />
}
