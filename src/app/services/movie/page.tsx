import { Metadata } from 'next'
import MovieServicePageClient from '@/components/services/MovieServicePageClient'

export const metadata: Metadata = {
  title: '映像制作サービス | NonTurn',
  description: '企業VP、採用動画、商品・イベント撮影などの映像制作サービスを提供しています。',
  keywords: '映像制作,動画制作,企業VP,プロモーション動画,4K撮影,ドローン撮影,モーショングラフィックス,東京,横浜',
  alternates: {
    canonical: 'https://non-turn.com/services/movie',
  },
  openGraph: {
    title: '映像制作サービス | NonTurn',
    description: '企業VP、採用動画、商品・イベント撮影などの映像制作サービスを提供しています。',
    url: 'https://non-turn.com/services/movie',
    siteName: 'NonTurn',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/movie.jpg',
        width: 1200,
        height: 630,
        alt: '映像制作サービス | NonTurn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '映像制作サービス | NonTurn',
    description: '企業VP、採用動画、商品・イベント撮影などの映像制作サービスを提供しています。',
    images: ['https://non-turn.com/ogp/movie.jpg'],
  },
}

export default function MovieServicePage() {
  return <MovieServicePageClient />
}
