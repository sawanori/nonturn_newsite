import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { ContactClient } from '@/components/contact/ContactClient'

export const metadata: Metadata = {
  title: 'お問い合わせ | NonTurn',
  description: '映像・写真・Web制作のご相談はこちらからお気軽にお問い合わせください。',
  openGraph: {
    title: 'お問い合わせ | NonTurn',
    description: '映像・写真・Web制作のご相談はこちらからお気軽にお問い合わせください。',
    url: 'https://non-turn.com/contact',
    siteName: 'NonTurn',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: 'https://non-turn.com/ogp/contact.jpg',
        width: 1200,
        height: 630,
        alt: 'お問い合わせ | NonTurn',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お問い合わせ | NonTurn',
    description: '映像・写真・Web制作のご相談はこちらからお気軽にお問い合わせください。',
    images: ['https://non-turn.com/ogp/contact.jpg'],
  },
}

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactClient />
    </MainLayout>
  )
}