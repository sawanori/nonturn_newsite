import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { PortfolioClient } from '@/components/portfolio/PortfolioClient'

export const metadata: Metadata = {
  title: '制作実績 | NonTurn',
  description: '映像、写真、Web制作の過去事例を一覧でご紹介。',
  alternates: {
    canonical: 'https://non-turn.com/portfolio',
  },
  openGraph: {
    title: '制作実績 | NonTurn',
    description: '映像、写真、Web制作の過去事例を一覧でご紹介。',
    url: 'https://non-turn.com/portfolio',
    siteName: 'NonTurn',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/portfolio.jpg',
        width: 1200,
        height: 630,
        alt: '制作実績 | NonTurn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '制作実績 | NonTurn',
    description: '映像、写真、Web制作の過去事例を一覧でご紹介。',
    images: ['https://non-turn.com/ogp/portfolio.jpg'],
  },
}

export default function PortfolioPage() {
  return (
    <MainLayout>
      <PortfolioClient />
    </MainLayout>
  )
}
