import { NextResponse } from 'next/server'

const images = [
  {
    loc: 'https://non-turn.com/',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg',
        title: 'NonTurn.LLC メインビジュアル',
        caption: 'プロフェッショナルな動画・映像制作サービス'
      }
    ]
  },
  {
    loc: 'https://non-turn.com/services/photo',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2019.jpg',
        title: 'フォトグラフィーサービス',
        caption: 'プロフェッショナルなフォトグラフィーサービス'
      }
    ]
  },
  {
    loc: 'https://non-turn.com/portfolio',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg',
        title: 'ポートフォリオ',
        caption: 'NonTurn.LLCのポートフォリオ'
      }
    ]
  },
  {
    loc: 'https://non-turn.com/',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%201.jpg',
        title: 'サンプル1',
        caption: 'プロフェッショナル制作'
      },
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%202.jpg',
        title: 'サンプル2',
        caption: '高品質映像'
      },
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%203.jpg',
        title: 'サンプル3',
        caption: 'クリエイティブ制作'
      }
    ]
  }
]

export async function GET() {
  const siteUrl = 'https://non-turn.com'
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(page => `  <url>
    <loc>${page.loc}</loc>
${page.images.map(img => `    <image:image>
      <image:loc>${img.url}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`).join('\n')}
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}