import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fraunces, Geist } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Boon Inn Kottakkal — Premium Hotel & Stays in the City of Ayurveda, Kerala',
  description:
    'Experience refined comfort and authentic Kerala hospitality at Boon Inn Kottakkal. Located on NH-17, Parambilangadi, near Arya Vaidya Sala with suite & superior rooms, restaurant, and modern amenities.',
  keywords: [
    'Boon Inn Kottakkal',
    'Hotel in Kottakkal',
    'Kottakkal Kerala Hotel',
    'Arya Vaidya Sala accommodation',
    'NH-17 Parambilangadi hotel',
    'Malappuram hotel',
    'Kerala boutique stays',
  ],
  openGraph: {
    title: 'Boon Inn Kottakkal — Premium Hotel in the City of Ayurveda, Kerala',
    description:
      'Warm hospitality, refined comfort, and peaceful rooms on NH-17, Parambilangadi, Kottakkal, Kerala.',
    url: 'https://booninn.com',
    siteName: 'Boon Inn Kottakkal',
    locale: 'en_IN',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3ede1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${geist.variable} bg-background`}>
      <body className="antialiased font-sans">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
