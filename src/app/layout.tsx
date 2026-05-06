import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'LinkedIn Post Generator — AI-Powered Posts That Get Engagement',
    template: '%s | LinkedIn Post Generator',
  },
  description:
    'Turn any brief into a scroll-stopping LinkedIn post. AI-powered hook, body, and CTA optimized for engagement. No account required.',
  openGraph: {
    type: 'website',
    url: 'https://linkedin-generator.vercel.app',
    title: 'LinkedIn Post Generator — AI-Powered Posts That Get Engagement',
    description:
      'Turn any brief into a scroll-stopping LinkedIn post. AI-powered hook, body, and CTA optimized for engagement.',
    siteName: 'LinkedIn Post Generator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Post Generator',
    description: 'Turn any brief into a scroll-stopping LinkedIn post.',
  },
  keywords: ['LinkedIn post generator', 'AI LinkedIn post writer', 'viral LinkedIn post'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  )
}
