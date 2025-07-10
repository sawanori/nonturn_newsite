import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { Metadata } from 'next'
import { TokyoClient } from './TokyoClient'

export const metadata: Metadata = {
  title: "東京の企業向け動画制作 | 縦型動画・プロモーション映像制作",
  description: "東京都内の企業向け動画制作・映像制作を提供。縦型動画、プロモーション映像、企業PR動画など幅広く対応。東京23区内の法人様向けのプロフェッショナルな動画制作なら NonTurn.LLC にお任せください。出張撮影・スタジオ撮影対応。",
  keywords: "動画制作,映像制作,企業,東京,東京都,23区,縦型動画,プロモーション,法人,商品紹介,会社紹介,出張撮影,スタジオ撮影,高品質,プロフェッショナル",
  openGraph: {
    title: "東京の企業向け動画制作 | 縦型動画・プロモーション映像制作",
    description: "東京都内の企業向け動画制作を提供。縦型動画、プロモーション映像制作のプロフェッショナル集団。",
  },
}

export default function TokyoPage() {
  return (
    <MainLayout>
      <HeroSection
        title="東京の企業向け動画制作"
        subtitle="高品質な映像制作サービス"
        description="東京都内の企業様向けに動画制作・映像制作を提供。縦型動画、プロモーション映像、企業PR動画など幅広く対応いたします。"
        icon="🏙️"
        gradient="from-red-400 via-pink-500 to-purple-600"
        backgroundOpacity={0.4}
      >
        <TokyoClient isHeroButtons={true} />
      </HeroSection>
      <TokyoClient />
    </MainLayout>
  )
}