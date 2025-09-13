import { NextResponse } from 'next/server';
import { notifyAdminViaLine } from '@/lib/line/adminNotify';

export const runtime = 'nodejs';

export async function GET() {
  try {
    // 環境変数チェック
    const envStatus = {
      LINE_CHANNEL_SECRET: !!process.env.LINE_CHANNEL_SECRET,
      LINE_CHANNEL_ACCESS_TOKEN: !!process.env.LINE_CHANNEL_ACCESS_TOKEN,
      LINE_ADMIN_GROUP_ID: process.env.LINE_ADMIN_GROUP_ID || 'NOT SET',
      LINE_ADMIN_USER_IDS: process.env.LINE_ADMIN_USER_IDS || 'NOT SET',
      ADMIN_INBOX_URL: process.env.ADMIN_INBOX_URL || 'NOT SET',
      ADMIN_NOTIFY_ENABLED: process.env.ADMIN_NOTIFY_ENABLED || 'NOT SET',
    };

    // テスト通知を送信
    const testMessage = `【テスト通知】${new Date().toLocaleString('ja-JP')}`;
    
    console.log('Attempting to send LINE notification...');
    console.log('Environment status:', envStatus);
    
    await notifyAdminViaLine({
      title: 'システムテスト通知',
      preview: testMessage,
      url: process.env.ADMIN_INBOX_URL || 'https://foodphoto-pro.com/admin/inbox'
    });

    return NextResponse.json({
      success: true,
      message: 'Test notification sent',
      envStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test notification error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      envStatus: {
        LINE_CHANNEL_SECRET: !!process.env.LINE_CHANNEL_SECRET,
        LINE_CHANNEL_ACCESS_TOKEN: !!process.env.LINE_CHANNEL_ACCESS_TOKEN,
        LINE_ADMIN_GROUP_ID: process.env.LINE_ADMIN_GROUP_ID || 'NOT SET',
        LINE_ADMIN_USER_IDS: process.env.LINE_ADMIN_USER_IDS || 'NOT SET',
        ADMIN_INBOX_URL: process.env.ADMIN_INBOX_URL || 'NOT SET',
        ADMIN_NOTIFY_ENABLED: process.env.ADMIN_NOTIFY_ENABLED || 'NOT SET',
      }
    }, { status: 500 });
  }
}