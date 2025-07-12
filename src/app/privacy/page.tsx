import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { PrivacyClient } from '@/components/privacy/PrivacyClient'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | NonTurn株式会社',
  description: 'NonTurn株式会社の個人情報の取扱いに関する方針を掲載しています。安心してご利用いただくために明確な運用を行っています。',
  openGraph: {
    title: 'プライバシーポリシー | NonTurn株式会社',
    description: 'NonTurn株式会社の個人情報の取扱いに関する方針を掲載しています。安心してご利用いただくために明確な運用を行っています。',
    url: 'https://non-turn.com/privacy',
    siteName: 'NonTurn',
    images: [
      {
        url: 'https://non-turn.com/ogp/default.jpg',
        width: 1200,
        height: 630,
        alt: 'NonTurn プライバシーポリシー',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'プライバシーポリシー | NonTurn株式会社',
    description: 'NonTurn株式会社の個人情報の取扱いに関する方針を掲載しています。',
    images: ['https://non-turn.com/ogp/default.jpg'],
  },
}

export default function Privacy() {
  return (
    <MainLayout>
      <PrivacyClient />
    </MainLayout>
  )
}
