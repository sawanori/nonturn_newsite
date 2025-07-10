import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { Metadata } from 'next'
import { YokohamaClient } from './YokohamaClient'

export const metadata: Metadata = {
  title: "横浜の企業向け動画制作 | 縦型動画・プロモーション映像制作",
  description: "横浜・みなとみらい・神奈川県内の企業向け動画制作・映像制作を提供。縦型動画、プロモーション映像、企業PR動画など幅広く対応。横浜エリアの法人様向けのプロフェッショナルな動画制作なら NonTurn.LLC にお任せください。",
  keywords: "動画制作,映像制作,企業,横浜,神奈川,みなとみらい,縦型動画,プロモーション,法人,商品紹介,会社紹介,高品質,プロフェッショナル",
  openGraph: {
    title: "横浜の企業向け動画制作 | 縦型動画・プロモーション映像制作",
    description: "横浜・みなとみらいエリアの企業向け動画制作を提供。縦型動画、プロモーション映像制作のプロフェッショナル集団。",
  },
}

export default function YokohamaPage() {
  return (
    <MainLayout>
      <HeroSection
        title="横浜の企業向け動画制作"
        subtitle="みなとみらいから始まる映像制作"
        description="横浜・みなとみらい・神奈川県内の企業様向けに動画制作・映像制作を提供。横浜の美しい景観を活かした印象的な動画制作をお任せください。"
        icon="🌉"
        gradient="from-blue-400 via-cyan-500 to-teal-600"
        backgroundOpacity={0.4}
      >
        <YokohamaClient isHeroButtons={true} />
      </HeroSection>
      <YokohamaClient />
    </MainLayout>
  )
}