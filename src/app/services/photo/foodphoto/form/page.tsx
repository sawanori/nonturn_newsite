import { Metadata } from 'next'
import { FoodPhotoFormClient } from './FoodPhotoFormClient'

export const metadata: Metadata = {
  title: '撮影お申し込み | 飲食店写真 Art Studio',
  description: '飲食店写真 Art Studioの撮影サービスお申し込みフォーム。プロフェッショナルな料理写真撮影のご予約はこちらから。',
  robots: {
    index: false,
    follow: false,
  },
}

export default function FoodPhotoFormPage() {
  return <FoodPhotoFormClient />
}