/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', '@react-three/fiber', '@react-three/drei'],
  },

  // Turbopack configuration
  // SVG handling is done through webpack config below

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'non-turn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'rpk6snz1bj3dcdnk.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Compression and bundling optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Bundle analyzer (enable when needed)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          // Content Security Policy - More secure without unsafe-inline when possible
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://maps.googleapis.com https://maps.gstatic.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://maps.gstatic.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com https://maps.googleapis.com https://maps.gstatic.com https://streetviewpixels-pa.googleapis.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com https://maps.googleapis.com https://maps.gstatic.com",
              "media-src 'self' blob: data:",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "frame-src 'self' https://www.google.com",
              "frame-ancestors 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          // Performance headers
          {
            key: 'X-Powered-By',
            value: ''
          }
        ]
      },
      {
        source: '/sw.js',
        headers: process.env.NODE_ENV === 'development' ? [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate'
          }
        ] : [
          {
            key: 'Cache-Control',
            value: 'public, max-age=43200, must-revalidate'
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/'
          }
        ]
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*\\.(?:ico|png|jpg|jpeg|gif|webp|avif|svg))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/(.*\\.(?:js|css))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600'
          }
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      }
    ]
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/works',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/company',
        destination: '/about',
        permanent: true,
      }
    ]
  },

  // Rewrites for clean URLs and SEO
  async rewrites() {
    return [
      {
        source: '/video-production',
        destination: '/services/movie',
      },
      {
        source: '/photography',
        destination: '/services/photo',
      },
      {
        source: '/web-development',
        destination: '/services/web',
      },
      {
        source: '/corporate-video',
        destination: '/services/movie?category=corporate',
      },
      {
        source: '/product-video',
        destination: '/services/movie?category=product',
      },
      {
        source: '/event-video',
        destination: '/services/movie?category=event',
      }
    ]
  },

  // Output configuration for deployment
  output: 'standalone',
  
  // Webpack configuration is commented out since we're using Turbopack
  // If you need to switch back to Webpack, uncomment this section
  /*
  webpack: (config, { dev, isServer }) => {
    // Add your webpack configurations here
    return config
  },
  */

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig