import { MetadataRoute } from 'next'
import { getAreaList } from '@/data/area-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://non-turn.com'
  const now = new Date()
  const lastModified = now.toISOString()

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