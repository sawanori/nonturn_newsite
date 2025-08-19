# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 corporate landing page for NonTurn.LLC, a video production company. The site features advanced 3D animations, portfolio showcase, multi-location service pages, and specialized service offerings including food photography (飲食店撮影PhotoStudio).

## Common Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production Build
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
   - `src/components/3d/`: Three.js components (Sphere, Cubes, Particles)
   - `src/components/layout/`: Header, Footer, Navigation
   - `src/components/ui/`: Reusable UI components
   - `src/components/services/`: Service-specific page components
   - Components use client/server separation with `"use client"` directive

3. **Data Layer**: Static data in `src/data/` files for services, portfolio, and company information.

4. **API Routes**: Located in `src/app/api/` handling:
   - `/api/contact`: Contact form submission with SendGrid
   - `/api/send-email`: Email sending endpoint
   - `/api/csrf`: CSRF token management
   - `/api/foodphoto-order`: Food photography order form submission
   - `/api/test-sendgrid`: SendGrid testing endpoint
   - `/api/debug-env`: Environment debugging (dev only)

5. **Type Safety**: Comprehensive TypeScript types in `src/types/` directory and schema validation with Zod in `src/lib/`.

### Critical Implementation Details

1. **3D Animations**: The site uses WebGL-based 3D graphics. When modifying 3D components:
   - Check browser console for WebGL errors
   - Test performance on mobile devices
   - Ensure fallbacks for non-WebGL browsers

2. **Email Integration**: SendGrid requires `SENDGRID_API_KEY` environment variable. Contact forms include CSRF protection.

3. **SEO Configuration**: 
   - Metadata is managed per-page using Next.js metadata API
   - Sitemap auto-generated on build via next-sitemap
   - Custom sitemap routes for videos and images
   - Robots.txt configuration included
   - URL redirects and rewrites for clean URLs

4. **Security**: 
   - CSP headers configured (currently relaxed for www.non-turn.com)
   - HSTS with preload
   - XSS protection, frame options, and referrer policy
   - CSRF protection on forms
   - Permissions policy restricting camera/microphone/geolocation

## Environment Variables Required

```
# Email Service
SENDGRID_API_KEY=                     # SendGrid API key for email functionality

# Analytics
NEXT_PUBLIC_GA_ID=                    # Google Analytics tracking ID

# Maps (from .env.example)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=      # Google Maps API key

# Legacy/Optional (from .env.example)
MICROCMS_SERVICE_DOMAIN=               # microCMS service domain (if used)
MICROCMS_API_KEY=                      # microCMS API key (if used)
NEXTAUTH_URL=                          # NextAuth URL (optional)
NEXTAUTH_SECRET=                       # NextAuth secret (optional)
```

## Development Guidelines

1. **Adding New Pages**: Create directory in `src/app/` with `page.tsx` and optionally `metadata.ts`.

2. **Modifying 3D Components**: Test thoroughly as WebGL can behave differently across browsers. Components located in `src/components/3d/`.

3. **Contact Form Changes**: Ensure CSRF protection remains intact and test email delivery.

4. **Performance**: 
   - Use Next.js Image component for all images
   - Implement lazy loading for heavy components
   - Leverage optimizePackageImports in next.config.js
   - Use bundle analyzer to monitor size

5. **TypeScript**: 
   - Strict mode enabled
   - Always define proper types, avoid `any`
   - Check existing types in `src/types/`
   - Path alias `@/*` maps to `./src/*`

6. **Form Validation**: Use Zod schemas in `src/lib/` for form validation with security patterns (regex for phone, postal codes, etc.)

## Configuration Details

- **Output**: Standalone deployment mode
- **Compression**: Enabled with Brotli/Gzip
- **Image Optimization**: WebP/AVIF formats, multiple device sizes
- **Image Remote Patterns**: Configured for Vercel blob storage (rpk6snz1bj3dcdnk.public.blob.vercel-storage.com)
- **Cache Strategy**: 
  - Static assets: 1 year cache
  - Service worker: 12 hours cache
  - Sitemap: 1 hour cache
- **URL Rewrites**: Clean URLs for services (e.g., /video-production → /services/movie)

## Testing Approach

Currently no automated testing framework is configured. Manual testing is required for:
- Form submissions
- 3D animation rendering
- Responsive design breakpoints
- Cross-browser compatibility
- WebGL fallbacks
- Email delivery