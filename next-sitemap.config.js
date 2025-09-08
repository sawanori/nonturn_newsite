/** @type {import('next-sitemap').IConfig} */

// 環境変数またはビルド時の設定でドメインを判定
const isFoodPhotoSite = process.env.NEXT_PUBLIC_SITE_DOMAIN === 'foodphoto-pro.com';
const siteUrl = isFoodPhotoSite ? 'https://foodphoto-pro.com' : 'https://non-turn.com';

module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  trailingSlash: false,
  exclude: [
    '/api/*',
    '/admin/*',
    '/404',
    '/500',
    '/_error',
    '/server-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/*.json$',
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
          '/*.js.map$',
        ],
      },
    ],
    additionalSitemaps: isFoodPhotoSite ? [
      'https://foodphoto-pro.com/foodphoto-sitemap.xml',
    ] : [
      'https://non-turn.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // foodphoto-pro.com用の設定
    if (isFoodPhotoSite) {
      // foodphoto-pro.com専用のパスのみを含める
      const validPaths = [
        '/',
        '/services/photo/foodphoto',
        '/services/photo/foodphoto/form',
        '/services/photo/foodphoto/form/thank-you',
        '/services/photo/foodphoto/checkform',
        '/services/photo/foodphoto/checkform/thank-you',
        '/services/photo/foodphoto/contact',
        '/terms',
        '/sitemap',
      ];
      
      // エリアページ（ミドルウェアでリライトされるパス）
      const areaPaths = [
        '/area/shibuya',
        '/area/shinjuku',
        '/area/yokohama',
        '/area/ikebukuro',
        '/area/shinagawa',
        '/area/ginza',
        '/area/roppongi',
        '/area/ebisu',
        '/area/omotesando',
        '/area/asakusa',
        '/area/kichijoji',
        '/area/akasaka',
      ];
      
      const allValidPaths = [...validPaths, ...areaPaths];
      
      // 無効なパスは除外
      if (!allValidPaths.some(validPath => path === validPath || path.startsWith(validPath))) {
        return null;
      }
      
      const priorityMap = {
        '/': 1.0,
        '/services/photo/foodphoto': 0.95,
        '/services/photo/foodphoto/form': 0.9,
        '/services/photo/foodphoto/checkform': 0.8,
        '/services/photo/foodphoto/contact': 0.75,
        '/sitemap': 0.5,
        '/terms': 0.3,
      };
      
      // エリアページの優先度（SEO重要度に応じて設定）
      const areaPagePriorities = {
        '/services/photo/foodphoto/area/shibuya': 0.85,
        '/services/photo/foodphoto/area/shinjuku': 0.85,
        '/services/photo/foodphoto/area/yokohama': 0.8,
        '/services/photo/foodphoto/area/ikebukuro': 0.75,
        '/services/photo/foodphoto/area/shinagawa': 0.75,
        '/services/photo/foodphoto/area/ginza': 0.8,
        '/services/photo/foodphoto/area/roppongi': 0.75,
        '/services/photo/foodphoto/area/ebisu': 0.8,
        '/services/photo/foodphoto/area/omotesando': 0.8,
        '/services/photo/foodphoto/area/asakusa': 0.75,
        '/services/photo/foodphoto/area/kichijoji': 0.7,
        '/services/photo/foodphoto/area/akasaka': 0.75,
      };
      
      Object.assign(priorityMap, areaPagePriorities);
      
      return {
        loc: path,
        changefreq: 'weekly',
        priority: priorityMap[path] || 0.5,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      };
    }
    
    // non-turn.com用の既存設定
    const priorityMap = {
      '/': 1.0,
      '/portfolio': 0.9,
      '/services': 0.9,
      '/services/movie': 0.8,
      '/services/photo': 0.8,
      '/services/web': 0.8,
      '/about': 0.7,
      '/contact': 0.7,
    };

    const changefreqMap = {
      '/': 'weekly',
      '/portfolio': 'weekly',
      '/services': 'monthly',
      '/about': 'monthly',
      '/contact': 'yearly',
    };

    return {
      loc: path,
      changefreq: changefreqMap[path] || config.changefreq,
      priority: priorityMap[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};