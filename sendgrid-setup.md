# SendGrid セットアップガイド

## 1. SendGridアカウントの作成

1. [SendGrid](https://sendgrid.com)にアクセスし、アカウントを作成します
2. メールアドレスの認証を完了します

## 2. APIキーの取得

1. SendGridダッシュボードにログイン
2. Settings → API Keys にアクセス
3. "Create API Key"をクリック
4. API Key Name: `NonTurn Contact Form`
5. API Key Permissions: `Full Access` を選択
6. 生成されたAPIキーをコピー（一度しか表示されません）

## 3. 送信者認証（Sender Authentication）

1. Settings → Sender Authentication にアクセス
2. Single Sender Verification を選択
3. 以下の情報を入力：
   - From Email: `noreply@non-turn.com`
   - From Name: `NonTurn.LLC`
   - Reply To: `n.sawada@non-turn.com`
4. 確認メールを受信し、認証を完了

## 4. 環境変数の設定

1. `.env.local.example` を `.env.local` にコピー
```bash
cp .env.local.example .env.local
```

2. `.env.local` ファイルを編集：
```
SENDGRID_API_KEY=取得したAPIキー
CONTACT_EMAIL_TO=n.sawada@non-turn.com
SENDGRID_FROM_EMAIL=noreply@non-turn.com
```

## 5. テスト送信

1. 開発サーバーを再起動
```bash
npm run dev
```

2. http://localhost:3000/contact にアクセス
3. フォームを入力して送信
4. メールが届くことを確認

## トラブルシューティング

### メールが届かない場合

1. SendGridダッシュボードのActivity Feedを確認
2. スパムフォルダを確認
3. 送信者認証が完了しているか確認
4. APIキーが正しく設定されているか確認

### エラーが発生する場合

1. ブラウザのコンソールでエラーを確認
2. Next.jsのサーバーログを確認
3. 環境変数が正しく読み込まれているか確認：
```javascript
console.log('API Key exists:', !!process.env.SENDGRID_API_KEY)
```

## 本番環境への展開

Vercelなどのホスティングサービスで環境変数を設定：

1. プロジェクトの設定画面へ
2. Environment Variables セクション
3. 以下の変数を追加：
   - `SENDGRID_API_KEY`
   - `CONTACT_EMAIL_TO`
   - `SENDGRID_FROM_EMAIL`

## セキュリティ注意事項

- APIキーは絶対にGitにコミットしない
- `.env.local` は `.gitignore` に含まれていることを確認
- APIキーは定期的に更新することを推奨