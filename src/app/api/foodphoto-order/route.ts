import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { formSchema, calcTotalJPY } from "@/lib/foodOrderSchema";

// SendGrid初期化
const apiKey = process.env.SENDGRID_API_KEY;
if (apiKey) {
  sgMail.setApiKey(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    // リクエストボディをパース
    const body = await req.json();
    
    // Zodでバリデーション
    const parsed = formSchema.parse(body);
    
    // 合計金額を計算
    const { total, breakdown } = calcTotalJPY(parsed);
    
    // メール送信先を環境変数から取得
    const to = process.env.SENDGRID_TO || process.env.SENDGRID_FROM_EMAIL;
    const from = process.env.SENDGRID_FROM || process.env.SENDGRID_FROM_EMAIL;
    
    if (!to || !from || !apiKey) {
      console.error("SendGrid環境変数が設定されていません");
      return NextResponse.json(
        { ok: false, message: "メール設定エラー" },
        { status: 500 }
      );
    }
    
    // メール件名
    const subject = `【飲食店写真撮影申込】${parsed.store.name} / ${parsed.applicantName}`;
    
    // メール本文を構築
    const text = [
      "━━━━━━━━━━━━━━━━━━━━━━",
      "飲食店撮影PhotoStudio 撮影お申し込み",
      "━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "【申込者情報】",
      `区分: ${parsed.applicantType === "corporate" ? "法人" : "個人"}`,
      `申込者名: ${parsed.applicantName} (${parsed.applicantKana})`,
      `住所: 〒${parsed.applicantAddress?.postal || ''}`,
      `     ${parsed.applicantAddress?.prefecture || ''}${parsed.applicantAddress?.city || ''}`,
      `     ${parsed.applicantAddress?.address1 || ''}`,
      `電話: ${parsed.applicantPhone}`,
      `メール: ${parsed.applicantEmail}`,
      "",
      ...(parsed.applicantType === "corporate" && parsed.corporate ? [
        "【法人情報】",
        `担当者名: ${parsed.corporate.contactName} (${parsed.corporate.contactKana})`,
        `店舗との関係: ${parsed.corporate.relation}`,
        "",
      ] : []),
      "【撮影店舗情報】",
      `店舗名: ${parsed.store.name}`,
      `住所: 〒${parsed.store.address.postal}`,
      `     ${parsed.store.address.prefecture}${parsed.store.address.city}`,
      `     ${parsed.store.address.address1}`,
      `電話: ${parsed.store.phone}`,
      `責任者: ${parsed.store.managerName} (${parsed.store.managerKana})`,
      `撮影調整担当: ${formatCoordinator(parsed.store.coordinator)}`,
      `撮影同席者: ${parsed.store.attendees.map(formatCoordinator).join(", ")}`,
      "",
      "【請求先】",
      `種別: ${formatBillingTo(parsed.billingTo)}`,
      ...(parsed.billingTo === "separate" && parsed.billingAddress ? [
        `住所: 〒${parsed.billingAddress.postal}`,
        `     ${parsed.billingAddress.prefecture}${parsed.billingAddress.city}`,
        `     ${parsed.billingAddress.address1}`,
      ] : []),
      "",
      "【プラン・オプション】",
      `プラン: ${formatPlan(parsed.plan)}`,
      `追加時間: ${parsed.extraMinutes}分`,
      `ロケハン: ${parsed.locationScout ? "あり" : "なし"}`,
      `販促サイトブラッシュアップ: ${parsed.siteImprovement ? "あり" : "なし"}`,
      "",
      "【合計金額】",
      `内訳: ${breakdown.join(" / ")}`,
      `合計: ¥${total.toLocaleString()}（税込）`,
      "",
      "【希望撮影日時】",
      `第1希望: ${parsed.wish1.date} ${parsed.wish1.time}`,
      ...(parsed.wish2 ? [`第2希望: ${parsed.wish2.date} ${parsed.wish2.time}`] : []),
      ...(parsed.wish3 ? [`第3希望: ${parsed.wish3.date} ${parsed.wish3.time}`] : []),
      "",
      "【希望撮影内容】",
      `料理: ${parsed.cuts.food}カット`,
      `内観: ${parsed.cuts.interior}カット`,
      `外観: ${parsed.cuts.exterior}カット`,
      `人物: ${parsed.cuts.people}カット`,
      ...(parsed.cuts.note ? [`備考: ${parsed.cuts.note}`] : []),
      "",
      "【画像利用媒体】",
      `Web: ${parsed.media.web ? "○" : "－"}`,
      `紙媒体: ${parsed.media.print ? "○" : "－"}`,
      `デジタルサイネージ: ${parsed.media.signage ? "○" : "－"}`,
      "",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `送信日時: ${new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}`,
      "━━━━━━━━━━━━━━━━━━━━━━",
    ].filter(Boolean).join("\n");
    
    // HTMLメール本文（テキストメールの整形版）
    const html = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="background: linear-gradient(to right, #fb923c, #ef4444); color: white; padding: 20px; margin: 0;">
          飲食店撮影PhotoStudio 撮影お申し込み
        </h2>
        <div style="padding: 20px; background: #f9f9f9;">
          <pre style="font-family: monospace; white-space: pre-wrap; word-wrap: break-word;">
${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
          </pre>
        </div>
      </div>
    `;
    
    // メール送信
    await sgMail.send({
      to,
      from,
      subject,
      text,
      html,
    });
    
    // 成功レスポンス
    return NextResponse.json({ ok: true });
    
  } catch (error: any) {
    console.error("メール送信エラー:", error);
    
    // Zodバリデーションエラー
    if (error.issues) {
      const message = error.issues[0]?.message || "入力内容に誤りがあります";
      return NextResponse.json(
        { ok: false, message },
        { status: 400 }
      );
    }
    
    // その他のエラー
    const message = error?.message || "送信に失敗しました";
    return NextResponse.json(
      { ok: false, message },
      { status: 500 }
    );
  }
}

// ヘルパー関数
function formatCoordinator(value: string): string {
  const map: Record<string, string> = {
    applicant: "申込者",
    corporateContact: "法人担当者",
    storeManager: "店舗責任者",
  };
  return map[value] || value;
}

function formatBillingTo(value: string): string {
  const map: Record<string, string> = {
    applicant: "申込者と同じ",
    store: "店舗と同じ",
    separate: "別途入力",
  };
  return map[value] || value;
}

function formatPlan(value: string): string {
  const map: Record<string, string> = {
    light: "ライトプラン（1時間）",
    standard: "スタンダードプラン（2時間）",
    premium: "プレミアムプラン（4時間）",
  };
  return map[value] || value;
}