import { NextRequest, NextResponse } from 'next/server'

const AB_COOKIE_NAME = 'ab_variant'

export type ABVariant = 'A' | 'B'

/**
 * Get or assign A/B test variant from cookies (server-side / middleware)
 */
export function getOrAssignVariant(request: NextRequest): { variant: ABVariant; response: NextResponse } {
  const response = NextResponse.next()
  const existingVariant = request.cookies.get(AB_COOKIE_NAME)?.value as ABVariant | undefined

  if (existingVariant === 'A' || existingVariant === 'B') {
    return { variant: existingVariant, response }
  }

  // Assign randomly with 50/50 split
  const variant: ABVariant = Math.random() < 0.5 ? 'A' : 'B'
  response.cookies.set(AB_COOKIE_NAME, variant, {
    httpOnly: false, // Readable by client JS for rendering
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })

  return { variant, response }
}

/**
 * Read A/B variant from cookie on client side
 */
export function getClientVariant(): ABVariant {
  if (typeof document === 'undefined') return 'A'
  const match = document.cookie.match(new RegExp(`${AB_COOKIE_NAME}=([AB])`))
  return (match?.[1] as ABVariant) || 'A'
}
