# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 corporate landing page for NonTurn.LLC, a video production company. Features advanced 3D animations, portfolio showcase, multi-location service pages, and specialized food photography service (飲食店撮影PhotoStudio). Deployed on Vercel with dual-domain configuration.

## Dual-Domain Architecture

Two domains serve from a single codebase:
- **non-turn.com**: Main corporate video production site
- **foodphoto-pro.com**: Specialized food photography service

**Current routing behavior:**
1. **Middleware** (`src/middleware.ts`): Redirects all foodphoto-pro.com requests to non-turn.com (301 permanent redirect)
2. **Vercel.json**: Redirects `/services/photo/foodphoto/*` on non-turn.com to foodphoto-pro.com
3. **Sitemap generation**: Uses `NEXT_PUBLIC_SITE_DOMAIN` env var to generate domain-specific sitemaps

**Development testing:**
```bash
NEXT_PUBLIC_SITE_DOMAIN=foodphoto-pro.com npm run dev  # Test foodphoto sitemap generation
```

## Common Development Commands

```bash
npm run dev          # Development server at http://localhost:3000
npm run build        # Production build (includes sitemap via postbuild)
npm run lint         # ESLint code quality check
npm run analyze      # Bundle size analysis with webpack-bundle-analyzer
npm start            # Production server
```

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript (strict mode, ES2017 target, `@/*` path alias → `./src/*`)
- **Styling**: Tailwind CSS v4 with PostCSS
- **3D Graphics**: Three.js + React Three Fiber + React Three Drei
- **Animation**: Framer Motion
- **Email**: SendGrid API with CSRF protection
- **Maps**: Google Maps API via @react-google-maps/api
- **Validation**: Zod schemas
- **Database**: Supabase (chat/admin features)
- **Notifications**: LINE integration for admin alerts

### Key Architectural Patterns

**Component Organization:**
- `src/components/3d/`: Three.js components with lazy loading (DynamicScene3D)
- `src/components/layout/`: MainLayout, Navigation
- `src/components/ui/`: Reusable UI (HeroSection, AnimatedSection, GoogleMap)
- `src/components/services/`: Service-specific page components
- `src/components/chat/`: Chat interface (ChatWidget, ChatInterface)
- `src/components/admin/`: Admin dashboard

**Data Layer:**
- Static data in `src/data/` for services, portfolio, company info
- Supabase for dynamic data (chat messages, conversations)
- LINE for real-time admin notifications

**API Routes** (`src/app/api/`):
- `/api/contact`, `/api/send-email`: Email functionality
- `/api/csrf`: CSRF token handling
- `/api/foodphoto-order`, `/api/checkform`: Form submissions
- `/api/chat/*`: Chat endpoints (start, send, history, update-contact)
- `/api/admin/*`: Admin endpoints (auth/login, auth/logout, auth/verify, conversations, messages, reply)
- `/api/line/webhook`, `/api/supabase-webhook`: Webhook handlers

### Critical Implementation Details

**3D Animations:**
- Always use DynamicScene3D for lazy loading
- ConditionalScene3D for device-based rendering
- Scene3DFallback for non-WebGL browsers
- Test on mobile devices for performance

**Form Handling:**
- Use `useCSRFToken` hook from `src/lib/csrf.ts`
- Zod schemas from `src/lib/validation.ts`
- Rate limiting via `src/lib/rate-limit.ts`

**Chat System:**
- Supabase Realtime for instant messaging
- Session-based anonymous chat for visitors
- Admin inbox at `/admin/inbox` with password auth
- Chat widget on foodphoto pages

## Environment Variables

```
# Required
SENDGRID_API_KEY=                     # Email functionality

# Database (chat/admin)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=            # Server-side only

# LINE Integration
LINE_NOTIFY_TOKEN=
LINE_CHANNEL_ACCESS_TOKEN=
LINE_CHANNEL_SECRET=

# Admin
ADMIN_PASSWORD=                        # /admin/inbox access

# Analytics (optional)
NEXT_PUBLIC_GTM_ID=                   # GTM-KCXJ8G5Q for foodphoto
NEXT_PUBLIC_GA_ID=                    # G-P9TFCN1658

# Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Site Configuration
NEXT_PUBLIC_SITE_DOMAIN=              # non-turn.com or foodphoto-pro.com
```

## Development Guidelines

1. **New Pages**: Create directory in `src/app/` with `page.tsx` and optional `metadata.ts`
2. **3D Components**: Always use DynamicScene3D. Test across browsers
3. **Forms**: Always implement CSRF protection, use Zod schemas
4. **Images**: Use Next.js Image component, monitor bundle with `npm run analyze`
5. **Multi-Location Pages**: Tokyo/Yokohama use client components (TokyoClient, YokohamaClient)

## Configuration

- **Output**: Standalone deployment mode
- **Regions**: hnd1 (Tokyo), sfo1 (San Francisco) - configured in vercel.json and middleware
- **Image formats**: WebP, AVIF
- **URL Rewrites**:
  - `/video-production` → `/services/movie`
  - `/photography` → `/services/photo`
  - `/web-development` → `/services/web`

## Testing

No automated testing configured. Manual testing required for:
- Form submissions and email delivery
- 3D animations across browsers
- Chat functionality with Supabase
- Admin inbox at `/admin/inbox`
- LINE notifications

## Analytics & Tracking

GTM conditionally loaded for foodphoto-pro.com. CTAs use tracking IDs:
- Pattern: `cta-[section]-[action]` (e.g., `cta-header-apply`, `cta-pricing-{plan}-apply`)
