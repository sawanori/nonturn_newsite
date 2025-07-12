import { Metadata } from 'next'
import { MainLayout } from '@/components/layout/MainLayout'
import { PortfolioClient } from '@/components/portfolio/PortfolioClient'

export const metadata: Metadata = {
  title: '制作実績 | 映像・写真・WEBの事例紹介',
  description: 'NonTurnが手がけた映像制作・写真撮影・WEB制作の事例をご紹介。クオリティと成果にこだわった実績をご覧ください。',
}

export default function PortfolioPage() {
  return (
    <MainLayout>
      <PortfolioClient />
    </MainLayout>
  )
}
