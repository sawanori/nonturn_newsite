# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 corporate landing page for NonTurn.LLC, a video production company. The site features advanced 3D animations, portfolio showcase, multi-location service pages, and specialized service offerings including food photography (飲食店撮影PhotoStudio). Configured for dual-domain deployment (non-turn.com and foodphoto-pro.com).

## Common Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production Build & Deploy
npm run build        # Build for production (also generates sitemap via postbuild)
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint to check code quality

# Bundle Analysis
npm run analyze      # Analyze bundle size with webpack-bundle-analyzer
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript with strict type checking (ES2017 target)
- **Styling**: Tailwind CSS v4 with PostCSS
- **3D Graphics**: Three.js (0.177.0) + React Three Fiber + React Three Drei
- **Animation**: Framer Motion (12.18.1) for UI animations
- **Email**: SendGrid API for contact forms with CSRF protection
- **Maps**: Google Maps API via @react-google-maps/api
- **Validation**: Zod for schema validation
- **Caching**: LRU-Cache for performance optimization
- **Sitemap**: next-sitemap for automatic generation

### Key Architectural Patterns

1. **App Router Structure**: All pages use Next.js App Router in `src/app/`. Each route has its own `page.tsx` and optional `metadata.ts`.

2. **Component Organization**:
   - `src/components/3d/`: Three.js components (AnimatedSphere, FloatingCubes, ParticleField, Scene3D with DynamicScene3D lazy loading)
   - `src/components/layout/`: MainLayout, Navigation
   - `src/components/ui/`: Reusable UI components (HeroSection, AnimatedSection, GoogleMap, etc.)
   - `src/components/services/`: Service-specific page components
   - `src/components/portfolio/`: Portfolio showcase components
   - Components use client/server separation with `"use client"` directive

3. **Data Layer**: Static data in `src/data/` files for services, portfolio, and company information.

4. **API Routes**: Located in `src/app/api/` handling:
   - `/api/contact`: Contact form submission with SendGrid
   - `/api/send-email`: General email sending endpoint  
   - `/api/csrf`: CSRF token generation and validation
   - `/api/foodphoto-order`: Food photography order form submission
   - `/api/checkform`: Check form submission endpoint
   - `/api/test-sendgrid`: SendGrid testing endpoint
   - `/api/debug-env`: Environment debugging (dev only)

5. **Type Safety**: Comprehensive TypeScript types in `src/types/` directory and Zod schema validation in `src/lib/validation.ts`.

### Critical Implementation Details

1. **3D Animations**: WebGL-based 3D graphics with performance considerations:
   - DynamicScene3D uses lazy loading for performance
   - ConditionalScene3D provides device-based rendering
   - Scene3DFallback for non-WebGL browsers
   - Test performance on mobile devices

2. **Email Integration**: 
   - SendGrid requires `SENDGRID_API_KEY` environment variable
   - Contact forms include CSRF protection via `src/lib/csrf.ts`
   - Rate limiting implemented in `src/lib/rate-limit.ts`

3. **SEO & Sitemap**: 
   - Metadata managed per-page using Next.js metadata API
   - Sitemap auto-generated on build via next-sitemap
   - Custom sitemap routes: `/sitemap-videos.xml`, `/sitemap-images.xml`
   - Dual-domain configuration in `next-sitemap.config.js`
   - URL redirects and rewrites for clean URLs

4. **Security Configuration**: 
   - CSP headers (currently relaxed for www.non-turn.com compatibility)
   - HSTS with preload enabled
   - XSS protection, frame options, referrer policy
   - CSRF protection on all forms
   - Permissions policy restricting camera/microphone/geolocation

5. **Performance Optimizations**:
   - Image optimization with WebP/AVIF formats
   - Bundle optimization via optimizePackageImports
   - Service Worker support (PWA)
   - LRU cache for rate limiting
   - Lazy loading for heavy components

## Environment Variables Required

```
# Email Service (Required)
SENDGRID_API_KEY=                     # SendGrid API key for email functionality

# Analytics
NEXT_PUBLIC_GA_ID=                    # Google Analytics tracking ID

# Maps  
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=      # Google Maps API key

# Site Configuration
NEXT_PUBLIC_SITE_DOMAIN=               # Domain setting (non-turn.com or foodphoto-pro.com)

# Optional/Legacy
MICROCMS_SERVICE_DOMAIN=               # microCMS service domain (if used)
MICROCMS_API_KEY=                      # microCMS API key (if used)
NEXTAUTH_URL=                          # NextAuth URL (optional)
NEXTAUTH_SECRET=                       # NextAuth secret (optional)
```

## Development Guidelines

1. **Adding New Pages**: Create directory in `src/app/` with `page.tsx` and optionally `metadata.ts`.

2. **Modifying 3D Components**: Test thoroughly as WebGL can behave differently across browsers. Always use DynamicScene3D for lazy loading.

3. **Form Handling**: 
   - Always implement CSRF protection using `useCSRFToken` hook
   - Use Zod schemas from `src/lib/validation.ts`
   - Test email delivery with SendGrid

4. **Performance Best Practices**: 
   - Use Next.js Image component for all images
   - Implement lazy loading with LazyLoader component
   - Monitor bundle size with `npm run analyze`
   - Use optimizePackageImports for heavy dependencies

5. **TypeScript Guidelines**: 
   - Strict mode enabled - no `any` types
   - Check existing types in `src/types/`
   - Path alias `@/*` maps to `./src/*`

6. **Multi-Location Pages**: Tokyo (`/tokyo`) and Yokohama (`/yokohama`) pages use client components (TokyoClient, YokohamaClient) for interactive features.

## Configuration Details

- **Output**: Standalone deployment mode
- **Compression**: Enabled with Brotli/Gzip
- **Image Optimization**: 
  - Formats: WebP, AVIF
  - Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048, 3840
  - Remote patterns configured for Vercel blob storage, YouTube, and Unsplash
- **Cache Strategy**: 
  - Static assets: 1 year cache
  - Service worker: 12 hours cache (dev: no-cache)
  - Sitemap: 1 hour cache
- **URL Rewrites**: 
  - `/video-production` → `/services/movie`
  - `/photography` → `/services/photo`
  - `/web-development` → `/services/web`
  - Category-specific rewrites for video types

## Testing Approach

Currently no automated testing framework is configured. Manual testing required for:
- Form submissions (contact, food photography order, check form)
- 3D animation rendering across browsers
- Responsive design breakpoints
- Cross-browser compatibility
- WebGL fallbacks
- Email delivery via SendGrid
- CSRF token validation
- Rate limiting functionality