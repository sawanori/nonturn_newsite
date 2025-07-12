import { Metadata } from 'next'
import AboutClient from './about-client'

export const metadata: Metadata = {
  title: '会社概要 | NonTurn',
  description: 'NonTurnの理念や活動内容、チームについてご紹介します。',
  openGraph: {
    title: '会社概要 | NonTurn',
    description: 'NonTurnの理念や活動内容、チームについてご紹介します。',
    url: 'https://non-turn.com/about',
    siteName: 'NonTurn',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/about.jpg',
        width: 1200,
        height: 630,
        alt: '会社概要 | NonTurn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '会社概要 | NonTurn',
    description: 'NonTurnの理念や活動内容、チームについてご紹介します。',
    images: ['https://non-turn.com/ogp/about.jpg'],
  },
}

export default function AboutPage() {
  return <AboutClient />
}