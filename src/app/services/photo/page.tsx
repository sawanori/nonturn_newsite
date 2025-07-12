import { Metadata } from 'next'
import PhotoServicePageClient from '@/components/services/PhotoServicePageClient'

export const metadata: Metadata = {
  title: '写真撮影サービス | NonTurn',
  description: '飲食店・商品・人物など、受賞歴あるプロによる写真撮影サービス',
  keywords: '写真撮影,商品撮影,ポートレート,イベント撮影,EC撮影,建築写真,東京,横浜',
  openGraph: {
    title: '写真撮影サービス | NonTurn',
    description: '飲食店・商品・人物など、受賞歴あるプロによる写真撮影サービス',
    url: 'https://non-turn.com/services/photo',
    siteName: 'NonTurn',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/photo.jpg',
        width: 1200,
        height: 630,
        alt: '写真撮影サービス | NonTurn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '写真撮影サービス | NonTurn',
    description: '飲食店・商品・人物など、受賞歴あるプロによる写真撮影サービス',
    images: ['https://non-turn.com/ogp/photo.jpg'],
  },
}

export default function PhotoServicePage() {
  return <PhotoServicePageClient />
}