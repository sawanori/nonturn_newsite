/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://non-turn.com',
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
    additionalSitemaps: [
      'https://non-turn.com/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // ページごとの優先度を設定
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