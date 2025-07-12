import { Metadata } from 'next'
import ServicesPageClient from '@/components/services/ServicesPageClient'

export const metadata: Metadata = {
  title: 'サービス一覧',
  description: '映像制作・写真撮影・Web制作の3つのサービスで、企業のビジュアルコミュニケーションを総合的にサポート。東京・横浜エリアで高品質なクリエイティブサービスを提供します。',
  openGraph: {
    title: 'サービス一覧 | NonTurn.LLC',
    description: '映像制作・写真撮影・Web制作の3つのサービスで、企業のビジュアルコミュニケーションを総合的にサポート',
    url: 'https://non-turn.com/services',
    images: [
      {
        url: '/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn.LLC サービス一覧',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'サービス一覧 | NonTurn.LLC',
    description: '映像制作・写真撮影・Web制作の総合クリエイティブサービス',
    images: ['/og-services.jpg'],
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />
}