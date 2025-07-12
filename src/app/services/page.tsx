import { Metadata } from 'next'
import ServicesPageClient from '@/components/services/ServicesPageClient'

export const metadata: Metadata = {
  title: 'サービス紹介 | NonTurn',
  description: '映像・写真・Web制作など、NonTurnの提供サービス一覧',
  openGraph: {
    title: 'サービス紹介 | NonTurn',
    description: '映像・写真・Web制作など、NonTurnの提供サービス一覧',
    url: 'https://non-turn.com/services',
    siteName: 'NonTurn',
    images: [
      {
        url: 'https://non-turn.com/ogp/services.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn サービス紹介',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'サービス紹介 | NonTurn',
    description: '映像・写真・Web制作など、NonTurnの提供サービス一覧',
    images: ['https://non-turn.com/ogp/services.jpg'],
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}