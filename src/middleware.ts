import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  
  // wwwありなら non-www へ301リダイレクト
  if (host === 'www.non-turn.com') {
    const url = request.nextUrl.clone()
    url.hostname = 'non-turn.com'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}