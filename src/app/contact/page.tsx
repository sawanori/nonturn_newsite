import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { ContactClient } from '@/components/contact/ContactClient'

export const metadata: Metadata = {
  title: 'お問い合わせ | NonTurn株式会社',
  description: 'サービスに関するご相談・お見積り・取材依頼はこちらから。お気軽にNonTurn株式会社へお問い合わせください。',
}

export default function ContactPage() {
  return (
    <MainLayout>
      <ContactClient />
    </MainLayout>
  )
}