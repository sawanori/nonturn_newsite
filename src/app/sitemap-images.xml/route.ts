import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://non-turn.com'
  const currentDate = new Date().toISOString()

  // Portfolio images
  const portfolioImages = [
    {
      loc: `${baseUrl}/`,
      image: [
        {
          src: `${baseUrl}/og-image.jpg`,
          caption: 'NonTurn.LLC - 映像制作・写真撮影・Web制作の専門会社',
          title: 'NonTurn.LLC メインビジュアル',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/portfolio/corporate-promo-1.jpg`,
          caption: '企業プロモーション動画制作事例',
          title: 'コーポレートプロモーション',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/portfolio/product-showcase-1.jpg`,
          caption: '商品紹介動画制作事例',
          title: 'プロダクトショーケース',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/portfolio/event-documentary-1.jpg`,
          caption: 'イベント記録動画制作事例',
          title: 'イベントドキュメンタリー',
          license: `${baseUrl}/license`,
        }
      ]
    },
    {
      loc: `${baseUrl}/portfolio`,
      image: [
        {
          src: `${baseUrl}/portfolio/corporate-promo-2.jpg`,
          caption: '企業ブランディング動画制作',
          title: 'ブランディング動画',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/portfolio/product-showcase-2.jpg`,
          caption: '商品撮影・動画制作',
          title: '商品撮影',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/portfolio/architectural-tour.jpg`,
          caption: '建築紹介動画制作',
          title: '建築ツアー動画',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/portfolio/music-video.jpg`,
          caption: 'ミュージックビデオ制作',
          title: 'ミュージックビデオ',
          license: `${baseUrl}/license`,
        }
      ]
    },
    {
      loc: `${baseUrl}/services`,
      image: [
        {
          src: `${baseUrl}/services/video-production-hero.jpg`,
          caption: '映像制作サービス',
          title: '動画制作',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/services/photography-hero.jpg`,
          caption: '写真撮影サービス',
          title: '写真撮影',
          license: `${baseUrl}/license`,
        },
        {
          src: `${baseUrl}/services/post-production-hero.jpg`,
          caption: 'ポストプロダクションサービス',
          title: 'ポストプロダクション',
          license: `${baseUrl}/license`,
        }
      ]
    }
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${portfolioImages.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${currentDate}</lastmod>
${page.image.map(img => `    <image:image>
      <image:loc>${img.src}</image:loc>
      <image:caption>${img.caption}</image:caption>
      <image:title>${img.title}</image:title>
      <image:license>${img.license}</image:license>
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}