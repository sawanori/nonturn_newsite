import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { PrivacyClient } from '@/components/privacy/PrivacyClient'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | NonTurn株式会社',
  description: 'NonTurn株式会社の個人情報の取扱いに関する方針を掲載しています。安心してご利用いただくために明確な運用を行っています。',
}

export default function Privacy() {
  return (
    <MainLayout>
      <PrivacyClient />
    </MainLayout>
  )
}
