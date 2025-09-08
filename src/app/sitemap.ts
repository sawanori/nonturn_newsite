import { MetadataRoute } from 'next'
import { getAreaList } from '@/data/area-data'

export default function sitemap(): MetadataRoute.Sitemap {
  // 環境変数でドメインを判定
  const isFoodPhotoSite = process.env.NEXT_PUBLIC_SITE_DOMAIN === 'foodphoto-pro.com'
  const baseUrl = isFoodPhotoSite ? 'https://foodphoto-pro.com' : 'https://non-turn.com'
  const now = new Date()
  const lastModified = now.toISOString()
  
  // foodphoto-pro.com用のサイトマップ
  if (isFoodPhotoSite) {
    const areas = getAreaList()
    
    const areaUrls: MetadataRoute.Sitemap = areas.map(area => ({
      url: `${baseUrl}/services/photo/foodphoto/area/${area.id}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: area.id === 'shibuya' || area.id === 'shinjuku' ? 0.85 : 
                area.id === 'yokohama' || area.id === 'ginza' || area.id === 'ebisu' || area.id === 'omotesando' ? 0.8 :
                area.id === 'kichijoji' ? 0.7 : 0.75,
    }))
    
    // ブログ記事は静的に定義
    const blogSlugs = [
      'menu-photo-pricing',
      'tabelog-top-image',
      'steam-effect-hot-dishes',
      'restaurant-photo-beginner',
      'smartphone-food-photo-tips',
      'light-adjustment-restaurant'
    ]
    
    const blogUrls: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
      url: `${baseUrl}/services/photo/foodphoto/blog/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
    
    return [
      {
        url: baseUrl,
        lastModified,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/services/photo/foodphoto`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.95,
      },
      {
        url: `${baseUrl}/services/photo/foodphoto/form`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/services/photo/foodphoto/checkform`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/services/photo/foodphoto/contact`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.75,
      },
      {
        url: `${baseUrl}/services/photo/foodphoto/blog`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      ...areaUrls,
      ...blogUrls,
      {
        url: `${baseUrl}/terms`,
        lastModified,
        changeFrequency: 'yearly',
        priority: 0.3,
      },
    ]
  }

  // Static pages with high priority
  const staticPages = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/movie`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/photo`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/web`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/access`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    }
  ]

  // Additional SEO-friendly URLs
  const categoryPages = [
    {
      url: `${baseUrl}/services/corporate-video`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/product-video`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/event-video`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services/commercial-photography`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ]

  // Portfolio category pages
  const portfolioCategories = [
    {
      url: `${baseUrl}/portfolio/corporate`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/product`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio/event`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ]

  // Location-based SEO pages
  const locationPages = [
    {
      url: `${baseUrl}/yokohama`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tokyo`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ]

  // Vertical video and specialized services
  const specializedServices = [
    {
      url: `${baseUrl}/services/vertical-video`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  ]

  // Combine all pages
  return [
    ...staticPages,
    ...categoryPages,
    ...portfolioCategories,
    ...locationPages,
    ...specializedServices
  ]
}