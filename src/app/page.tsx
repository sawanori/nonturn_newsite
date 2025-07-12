import { Metadata } from 'next'
import HomeClient from './home-client'

export const metadata: Metadata = {
  title: 'NonTurn | 映像・写真・Web制作のトータルサポート',
  description: '企業プロモーションに強い、映像制作・写真撮影・Web制作のNonTurn。東京・横浜対応。',
  openGraph: {
    title: 'NonTurn | 映像・写真・Web制作のトータルサポート',
    description: '企業プロモーションに強い、映像制作・写真撮影・Web制作のNonTurn。東京・横浜対応。',
    url: 'https://non-turn.com',
    siteName: 'NonTurn',
    images: [
      {
        url: 'https://non-turn.com/ogp/default.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn - 映像・写真・Web制作のトータルサポート',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NonTurn | 映像・写真・Web制作のトータルサポート',
    description: '企業プロモーションに強い、映像制作・写真撮影・Web制作のNonTurn。東京・横浜対応。',
    images: ['https://non-turn.com/ogp/default.jpg'],
  },
}

export default function HomePage() {
  return <HomeClient />
}