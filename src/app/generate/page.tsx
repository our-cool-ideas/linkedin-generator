import type { Metadata } from 'next'
import PostGenerator from '@/components/PostGenerator'

export const metadata: Metadata = {
  title: 'Generate Post — LinkedIn Post Generator',
  description: 'Turn any brief into a scroll-stopping LinkedIn post in seconds. Choose your tone, style, and options — free, no account required.',
}

export default function GeneratePage() {
  return <PostGenerator />
}
