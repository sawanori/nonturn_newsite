import { Metadata } from 'next'
import WebServicePageClient from '@/components/services/WebServicePageClient'

export const metadata: Metadata = {
  title: 'Web制作サービス | NonTurn',
  description: 'WordPressやReactを活用した高品質なWeb制作。SEO・UI/UX設計も対応。',
  keywords: 'Web制作,ホームページ制作,コーポレートサイト,LP制作,ECサイト,Next.js,React,東京,横浜',
  openGraph: {
    title: 'Web制作サービス | NonTurn',
    description: 'WordPressやReactを活用した高品質なWeb制作。SEO・UI/UX設計も対応。',
    url: 'https://non-turn.com/services/web',
    siteName: 'NonTurn',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/web.jpg',
        width: 1200,
        height: 630,
        alt: 'Web制作サービス | NonTurn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web制作サービス | NonTurn',
    description: 'WordPressやReactを活用した高品質なWeb制作。SEO・UI/UX設計も対応。',
    images: ['https://non-turn.com/ogp/web.jpg'],
  },
}

export default function WebServicePage() {
  return <WebServicePageClient />
}