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
  return (
    <main className="flex-1 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            LinkedIn Post Generator
          </h1>
          <p className="mt-3 text-base text-gray-600">
            Paste a brief. Get a scroll-stopping post in seconds.
          </p>
        </header>
        <PostGenerator />
      </div>
    </main>
  )
}
