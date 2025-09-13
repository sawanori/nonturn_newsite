import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs'; // Node の crypto を使うため

function verifySignature(body: string, signature: string | null) {
  if (!signature) return false;
  const hmac = crypto.createHmac('sha256', process.env.LINE_CHANNEL_SECRET!);
  hmac.update(body);
  return hmac.digest('base64') === signature;
}

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get('x-line-signature');
  
  if (!verifySignature(raw, sig)) {
    console.warn('LINE webhook: bad signature');
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = JSON.parse(raw);

  // 必要に応じてイベント処理を追加。ここでは ID ログ出力に徹する。
  for (const ev of payload.events ?? []) {
    // グループからのイベント（招待後にグループで発言すると届く）
    if (ev.source?.groupId) {
      console.log('LINE_ADMIN_GROUP_ID candidate:', ev.source.groupId);
    }
    // 1:1 の場合（管理者個人とのトークなど）
    if (ev.source?.userId) {
      console.log('LINE_ADMIN_USER_ID candidate:', ev.source.userId);
    }
  }

  return NextResponse.json({ ok: true });
}