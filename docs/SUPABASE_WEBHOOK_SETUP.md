# Supabase Webhook設定手順

## 概要
メッセージがデータベースに登録されたタイミングで直接LINE通知を送信する方法です。
これにより、ドメインリダイレクトの影響を受けずに確実に通知を送信できます。

## 手順

### 1. Supabase Dashboardにアクセス
1. https://supabase.com/dashboard にログイン
2. `foodphoto_pro`プロジェクトを選択

### 2. Database Webhookを作成
1. 左メニューから「Database」→「Webhooks」を選択
2. 「Create a new webhook」をクリック
3. 以下の設定を入力：

```
Name: line_notification_webhook
Table: messages
Events: Insert
Method: POST
URL: https://foodphoto-pro.com/api/supabase-webhook
Headers:
  Content-Type: application/json
  x-webhook-secret: (任意のシークレットキー)
```

### 3. 環境変数の追加（Vercel）
```env
SUPABASE_WEBHOOK_SECRET=（上記で設定したシークレットキー）
```

### 4. デプロイ
```bash
git add -A
git commit -m "feat: Add Supabase webhook for LINE notifications"
git push
```

## メリット
- ドメインリダイレクトの影響を受けない
- データベースレベルで確実にイベントをキャッチ
- より信頼性の高い通知システム

## テスト方法
1. チャットでメッセージを送信
2. Supabase Dashboard → Database → Webhooks でリクエストログを確認
3. LINE通知が届くことを確認

## トラブルシューティング

### Webhookが発火しない
- Supabase DashboardのWebhooksページでステータスを確認
- エラーログを確認

### 通知が届かない
- Vercelのログで`/api/supabase-webhook`のログを確認
- 環境変数が正しく設定されているか確認