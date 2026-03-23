import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })
import { QueryProvider } from '@/lib/query-provider'

export const metadata: Metadata = {
  title: 'RemindWell - AI-Powered Habit Tracking & Reminders',
  description: 'Build better habits with AI-powered reminders delivered via Telegram. Smart, contextual notifications that help you stay hydrated, take breaks, and reach your wellness goals.',
  keywords: 'habit tracking, reminders, wellness, AI, productivity, Telegram notifications',
  authors: [{ name: 'RemindWell' }],
  creator: 'RemindWell',
  publisher: 'RemindWell',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://remindwell.app',
    siteName: 'RemindWell',
    title: 'RemindWell - AI-Powered Habit Tracking',
    description: 'Build better habits with AI-powered reminders delivered via Telegram.',
    images: [
      {
        url: 'https://remindwell.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RemindWell - AI-Powered Habit Tracking',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RemindWell - AI-Powered Habit Tracking',
    description: 'Build better habits with AI-powered reminders.',
    creator: '@remindwell',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#6B72CF',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><QueryProvider>{children}</QueryProvider></body>
    </html>
  )
}
