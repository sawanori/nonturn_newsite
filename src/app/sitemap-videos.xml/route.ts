import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://non-turn.com'
  const currentDate = new Date().toISOString()

  // Video content for portfolio
  const videoContent = [
    {
      loc: `${baseUrl}/`,
      video: [
        {
          thumbnail_loc: `${baseUrl}/thumbnails/demo-reel-thumb.jpg`,
          title: 'NonTurn.LLC デモリール 2024',
          description: 'NonTurn.LLCの映像制作サンプル。企業プロモーション、商品紹介、イベント記録など様々なジャンルの制作実績をまとめたデモリール。',
          content_loc: `${baseUrl}/videos/demo-reel-2024.mp4`,
          duration: 180,
          expiration_date: '2025-12-31T23:59:59+09:00',
          rating: 4.9,
          view_count: 15000,
          publication_date: '2024-01-01T00:00:00+09:00',
          family_friendly: 'yes',
          restriction: 'JP',
          gallery_loc: `${baseUrl}/portfolio`,
          price: 'JPY:0',
          requires_subscription: 'no',
          uploader: 'NonTurn.LLC',
          platform: 'web',
          live: 'no',
          tag: ['映像制作', '動画制作', '企業プロモーション', '横浜', 'みなとみらい']
        }
      ]
    },
    {
      loc: `${baseUrl}/portfolio`,
      video: [
        {
          thumbnail_loc: `${baseUrl}/thumbnails/corporate-promo-thumb.jpg`,
          title: '企業プロモーション動画制作事例',
          description: '中小企業向けの企業プロモーション動画制作事例。ブランドストーリーと企業価値を効果的に伝える高品質な映像コンテンツ。',
          content_loc: `${baseUrl}/videos/corporate-promo-sample.mp4`,
          duration: 120,
          expiration_date: '2025-12-31T23:59:59+09:00',
          rating: 4.8,
          view_count: 8500,
          publication_date: '2024-03-15T00:00:00+09:00',
          family_friendly: 'yes',
          restriction: 'JP',
          gallery_loc: `${baseUrl}/portfolio/corporate`,
          price: 'JPY:0',
          requires_subscription: 'no',
          uploader: 'NonTurn.LLC',
          platform: 'web',
          live: 'no',
          tag: ['企業プロモーション', 'コーポレート動画', 'ブランディング', '中小企業']
        },
        {
          thumbnail_loc: `${baseUrl}/thumbnails/product-showcase-thumb.jpg`,
          title: '商品紹介動画制作事例',
          description: '商品の魅力を最大限に引き出すプロモーション映像。マクロ撮影とプロダクトビジュアライゼーションで商品価値を向上。',
          content_loc: `${baseUrl}/videos/product-showcase-sample.mp4`,
          duration: 90,
          expiration_date: '2025-12-31T23:59:59+09:00',
          rating: 4.7,
          view_count: 6200,
          publication_date: '2024-02-20T00:00:00+09:00',
          family_friendly: 'yes',
          restriction: 'JP',
          gallery_loc: `${baseUrl}/portfolio/product`,
          price: 'JPY:0',
          requires_subscription: 'no',
          uploader: 'NonTurn.LLC',
          platform: 'web',
          live: 'no',
          tag: ['商品紹介', 'プロダクト動画', 'マクロ撮影', 'Eコマース']
        },
        {
          thumbnail_loc: `${baseUrl}/thumbnails/event-documentary-thumb.jpg`,
          title: 'イベント記録動画制作事例',
          description: '企業イベントやセミナーの記録動画制作。マルチカメラ撮影と音響収録で感動的な瞬間を永続的に記録。',
          content_loc: `${baseUrl}/videos/event-documentary-sample.mp4`,
          duration: 240,
          expiration_date: '2025-12-31T23:59:59+09:00',
          rating: 4.9,
          view_count: 4800,
          publication_date: '2024-04-10T00:00:00+09:00',
          family_friendly: 'yes',
          restriction: 'JP',
          gallery_loc: `${baseUrl}/portfolio/event`,
          price: 'JPY:0',
          requires_subscription: 'no',
          uploader: 'NonTurn.LLC',
          platform: 'web',
          live: 'no',
          tag: ['イベント記録', 'ドキュメンタリー', 'マルチカメラ', 'ライブ録画']
        }
      ]
    },
    {
      loc: `${baseUrl}/services/movie`,
      video: [
        {
          thumbnail_loc: `${baseUrl}/thumbnails/services-overview-thumb.jpg`,
          title: '映像制作サービス紹介',
          description: 'NonTurn.LLCの映像制作サービスの全体像。企画から撮影、編集、納品まで一貫したサービスフローをご紹介。',
          content_loc: `${baseUrl}/videos/services-overview.mp4`,
          duration: 150,
          expiration_date: '2025-12-31T23:59:59+09:00',
          rating: 4.6,
          view_count: 3200,
          publication_date: '2024-01-15T00:00:00+09:00',
          family_friendly: 'yes',
          restriction: 'JP',
          gallery_loc: `${baseUrl}/services`,
          price: 'JPY:0',
          requires_subscription: 'no',
          uploader: 'NonTurn.LLC',
          platform: 'web',
          live: 'no',
          tag: ['サービス紹介', '映像制作', 'ワークフロー', 'プロセス']
        }
      ]
    }
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videoContent.map(page => `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${currentDate}</lastmod>
${page.video.map(vid => `    <video:video>
      <video:thumbnail_loc>${vid.thumbnail_loc}</video:thumbnail_loc>
      <video:title>${vid.title}</video:title>
      <video:description>${vid.description}</video:description>
      <video:content_loc>${vid.content_loc}</video:content_loc>
      <video:duration>${vid.duration}</video:duration>
      <video:expiration_date>${vid.expiration_date}</video:expiration_date>
      <video:rating>${vid.rating}</video:rating>
      <video:view_count>${vid.view_count}</video:view_count>
      <video:publication_date>${vid.publication_date}</video:publication_date>
      <video:family_friendly>${vid.family_friendly}</video:family_friendly>
      <video:restriction relationship="allow">${vid.restriction}</video:restriction>
      <video:gallery_loc title="ポートフォリオギャラリー">${vid.gallery_loc}</video:gallery_loc>
      <video:price currency="JPY" type="own">${vid.price}</video:price>
      <video:requires_subscription>${vid.requires_subscription}</video:requires_subscription>
      <video:uploader info="${baseUrl}/about">${vid.uploader}</video:uploader>
      <video:platform relationship="allow">${vid.platform}</video:platform>
      <video:live>${vid.live}</video:live>
${vid.tag.map(tag => `      <video:tag>${tag}</video:tag>`).join('\n')}
    </video:video>`).join('\n')}
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}