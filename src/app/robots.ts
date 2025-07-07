import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://non-turn.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/admin',
          '/dashboard',
          '/login',
          '/register',
          '/password-reset',
          '*.json',
          '/*?*sort=',
          '/*?*filter=',
          '/*?*utm_',
          '/*?*ref=',
          '/*?*fbclid=',
          '/*?*gclid=',
          '/search?',
          '/404',
          '/500',
          '/*.pdf',
          '/*.doc',
          '/*.docx',
          '/*.xls',
          '/*.xlsx',
          '/temp/',
          '/tmp/',
          '/cache/',
          '/backup/',
          '/test/',
          '/staging/',
          '/dev/',
          '/development/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
        ],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
        ],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
        ],
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: [
          '/admin/',
          '/private/',
        ],
      },
      // Aggressive crawlers
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'DataForSeoBot',
        ],
        disallow: '/',
        crawlDelay: 10,
      },
      // Bad bots
      {
        userAgent: [
          'GPTBot',
          'Google-Extended',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'ChatGPT-User',
          'PerplexityBot',
          'YouBot',
          'ia_archiver',
          'SiteAuditBot',
          'MauiBot',
          'PetalBot',
          'YandexBot',
        ],
        disallow: '/',
      }
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-images.xml`,
      `${baseUrl}/sitemap-videos.xml`,
    ],
    host: baseUrl,
  }
}