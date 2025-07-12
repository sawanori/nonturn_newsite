import { Metadata } from 'next'
import MovieServicePageClient from '@/components/services/MovieServicePageClient'

export const metadata: Metadata = {
  title: '映像制作サービス',
  description: '企業プロモーション、商品紹介、イベント記録まで幅広い映像制作に対応。4K撮影、ドローン撮影、モーショングラフィックスなど最新技術で高品質な映像を制作します。',
  keywords: '映像制作,動画制作,企業VP,プロモーション動画,4K撮影,ドローン撮影,モーショングラフィックス,東京,横浜',
  openGraph: {
    title: '映像制作サービス | NonTurn.LLC',
    description: '企業プロモーション、商品紹介、イベント記録まで幅広い映像制作に対応。最新技術で高品質な映像を制作',
    url: 'https://non-turn.com/services/movie',
    images: [
      {
        url: '/og-movie-service.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn.LLC 映像制作サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '映像制作サービス | NonTurn.LLC',
    description: '企業プロモーション、4K撮影、ドローン撮影対応の映像制作',
    images: ['/og-movie-service.jpg'],
  },
}

export default function MovieServicePage() {
  return <MovieServicePageClient />
}
