import { Metadata } from 'next'
import WebServicePageClient from '@/components/services/WebServicePageClient'

export const metadata: Metadata = {
  title: 'Web制作サービス',
  description: '企業サイト、LP、ECサイト等の企画・制作・運営。最新技術を駆使した高性能なWebサイトを満ちて、ビジネスの成長をサポートします。',
  keywords: 'Web制作,ホームページ制作,コーポレートサイト,LP制作,ECサイト,Next.js,React,東京,横浜',
  openGraph: {
    title: 'Web制作サービス | NonTurn.LLC',
    description: '企業サイト、LP、ECサイト等の企画・制作・運営。最新技術で高性能なWebサイトを構築',
    url: 'https://non-turn.com/services/web',
    images: [
      {
        url: '/og-web-service.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn.LLC Web制作サービス',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Web制作サービス | NonTurn.LLC',
    description: '企業サイト、LP、ECサイト制作。Next.js/Reactで高性能なWebサイトを構築',
    images: ['/og-web-service.jpg'],
  },
}

export default function WebServicePage() {
  return <WebServicePageClient />
}