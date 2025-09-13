import { NextResponse } from 'next/server';

export async function GET() {
  // 環境変数の状態を確認（値の一部をマスク）
  const envCheck = {
    LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET ? 
      `Set (${process.env.LINE_CHANNEL_SECRET.substring(0, 5)}...)` : 'NOT SET',
    LINE_CHANNEL_ACCESS_TOKEN: process.env.LINE_CHANNEL_ACCESS_TOKEN ? 
      `Set (${process.env.LINE_CHANNEL_ACCESS_TOKEN.substring(0, 10)}...)` : 'NOT SET',
    LINE_ADMIN_GROUP_ID: process.env.LINE_ADMIN_GROUP_ID || 'NOT SET',
    LINE_ADMIN_USER_IDS: process.env.LINE_ADMIN_USER_IDS || 'NOT SET',
    ADMIN_INBOX_URL: process.env.ADMIN_INBOX_URL || 'NOT SET',
    ADMIN_NOTIFY_ENABLED: process.env.ADMIN_NOTIFY_ENABLED || 'NOT SET',
    ADMIN_NOTIFY_COOLDOWN_MINUTES: process.env.ADMIN_NOTIFY_COOLDOWN_MINUTES || 'NOT SET',
  };

  return NextResponse.json({ envCheck });
}