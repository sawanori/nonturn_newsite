import { NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    const token = await generateCSRFToken()
    
    const response = NextResponse.json({ token })
    
    // Set CSRF token as httpOnly cookie as well for additional security
    response.cookies.set('csrf-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 2, // 2 hours
      path: '/'
    })
    
    return response
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}