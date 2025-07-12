import { Metadata } from 'next'
import PhotoServicePageClient from '@/components/services/PhotoServicePageClient'

export const metadata: Metadata = {
  title: '写真撮影サービス',
  description: '商品撮影、ポートレート、建築写真など高品質な写真撮影サービス。ECサイト用商品撮影からイベント撮影まで幅広く対応します。',
  keywords: '写真撮影,商品撮影,ポートレート,イベント撮影,EC撮影,建築写真,東京,横浜',
  openGraph: {
    title: '写真撮影サービス | NonTurn.LLC',
    description: '商品撮影、ポートレート、建築写真など高品質な写真撮影サービス',
    url: 'https://non-turn.com/services/photo',
    images: [
      {
        url: '/og-photo-service.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn.LLC 写真撮影サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '写真撮影サービス | NonTurn.LLC',
    description: '商品撮影、イベント撮影などプロフェッショナルな写真撮影',
    images: ['/og-photo-service.jpg'],
  },
}

export default function PhotoServicePage() {
  return <PhotoServicePageClient />
}