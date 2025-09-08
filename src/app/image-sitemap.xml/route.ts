import { NextResponse } from 'next/server'

const images = [
  {
    loc: 'https://foodphoto-pro.com/',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg',
        title: '飲食店撮影PhotoStudio メインビジュアル',
        caption: 'プロカメラマンによる料理・店舗撮影サービス'
      }
    ]
  },
  {
    loc: 'https://foodphoto-pro.com/pricing',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2019.jpg',
        title: '料理と店舗内観の撮影イメージ',
        caption: '飲食店専門の出張撮影サービスの料金プラン'
      }
    ]
  },
  {
    loc: 'https://foodphoto-pro.com/area/shibuya',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2024.jpg',
        title: '渋谷エリアの飲食店撮影',
        caption: '渋谷の飲食店専門撮影サービス'
      }
    ]
  },
  // 料理写真サンプル
  {
    loc: 'https://foodphoto-pro.com/',
    images: [
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%201.jpg',
        title: '料理撮影サンプル1',
        caption: 'プロによる料理写真'
      },
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%202.jpg',
        title: '料理撮影サンプル2',
        caption: 'SNS映えする料理写真'
      },
      {
        url: 'https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%203.jpg',
        title: '料理撮影サンプル3',
        caption: 'メニュー用料理写真'
      }
    ]
  }
]

export async function GET() {
  const isFoodPhotoSite = process.env.NEXT_PUBLIC_SITE_DOMAIN === 'foodphoto-pro.com'
  const siteUrl = isFoodPhotoSite ? 'https://foodphoto-pro.com' : 'https://non-turn.com'
  
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