import { MainLayout } from '@/components/layout/MainLayout'
import { HeroSection } from '@/components/ui/HeroSection'
import { Metadata } from 'next'
import { VerticalVideoClient } from './VerticalVideoClient'

export const metadata: Metadata = {
  title: "縦型動画制作 | 東京・横浜の企業向けTikTok・Instagram動画制作",
  description: "東京・横浜エリアで企業向け縦型動画制作を提供。TikTok、Instagram、YouTubeショート対応の縦型動画・SNS動画を制作。法人様のバイラル動画制作はNonTurn.LLCにお任せください。",
  keywords: "縦型動画,縦型動画制作,企業,東京,横浜,TikTok,Instagram,YouTubeショート,SNS動画,バイラル動画,法人,高品質,プロフェッショナル",
  openGraph: {
    title: "縦型動画制作 | 東京・横浜の企業向けTikTok・Instagram動画制作",
    description: "東京・横浜エリアで企業向け縦型動画制作を提供。SNS動画・バイラル動画制作のプロ。",
  },
}

export default function VerticalVideoPage() {
  return (
    <MainLayout>
      <HeroSection
        title="縦型動画制作"
        subtitle="TikTok・Instagram・YouTubeショート対応"
        description="東京・横浜エリアで企業向け縦型動画制作を提供。SNS時代に最適化された縦型動画でバイラル効果を狙います。"
        icon="📱"
        gradient="from-pink-400 via-purple-500 to-blue-500"
        backgroundOpacity={0.4}
      >
        <VerticalVideoClient isHeroButtons={true} />
      </HeroSection>
      <VerticalVideoClient />
    </MainLayout>
  )
}