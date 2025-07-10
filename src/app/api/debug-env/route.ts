import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 本番環境でのデバッグ用（一時的）
  const envStatus = {
    NODE_ENV: process.env.NODE_ENV,
    hasApiKey: !!process.env.SENDGRID_API_KEY,
    apiKeyPrefix: process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY.substring(0, 10) + '...' : 'NOT SET',
    hasContactEmailTo: !!process.env.CONTACT_EMAIL_TO,
    contactEmailTo: process.env.CONTACT_EMAIL_TO || 'NOT SET',
    hasSendGridFromEmail: !!process.env.SENDGRID_FROM_EMAIL,
    sendGridFromEmail: process.env.SENDGRID_FROM_EMAIL || 'NOT SET',
    hasSendGridFromName: !!process.env.SENDGRID_FROM_NAME,
    sendGridFromName: process.env.SENDGRID_FROM_NAME || 'NOT SET',
    vercelUrl: process.env.VERCEL_URL,
    region: process.env.VERCEL_REGION || 'unknown'
  }

  return NextResponse.json(envStatus, { status: 200 })
}