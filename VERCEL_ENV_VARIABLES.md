# Vercel環境変数設定ガイド

## 必須のSupabase環境変数

以下の環境変数をVercelのダッシュボードで設定してください：

### 1. Supabase関連（最重要）

```
NEXT_PUBLIC_SUPABASE_URL=[あなたのSupabase URL]
```
- 説明: SupabaseプロジェクトのURL
- 環境: Production, Preview, Development

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=[あなたのSupabase Anon Key]
```
- 説明: Supabase公開用APIキー
- 環境: Production, Preview, Development

```
SUPABASE_SERVICE_ROLE_KEY=[Supabaseダッシュボードから取得した新しいService Role Key]
```
- 説明: Supabase管理用APIキー（管理画面で必須）
- 環境: Production, Preview, Development
- **重要**: これがないと管理画面でデータが表示されません

### 2. チャット機能設定

```
NEXT_PUBLIC_USE_MOCK=false
```
- 説明: モックデータを使用しない（本番データを使用）
- 環境: Production, Preview, Development

```
NEXT_PUBLIC_CHAT_ENABLED=true
```
- 説明: チャット機能を有効化
- 環境: Production, Preview, Development

```
NEXT_PUBLIC_FEATURE_LINE=false
```
- 説明: LINE連携機能（現在は無効）
- 環境: Production, Preview, Development

### 3. サイト設定

```
NEXT_PUBLIC_BASE_URL=https://foodphoto-pro.com
```
- 説明: foodphoto-pro.comドメインのベースURL
- 環境: Production

### 4. その他の必要な環境変数

```
CONTACT_EMAIL_TO=info@non-turn.com
```
- 説明: お問い合わせメール送信先
- 環境: Production, Preview, Development

```
SENDGRID_FROM_EMAIL=info@non-turn.com
```
- 説明: SendGrid送信元メールアドレス
- 環境: Production, Preview, Development

```
MICROCMS_API_KEY=[あなたのMicroCMS APIキー]
```
- 説明: MicroCMS APIキー
- 環境: Production, Preview, Development

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=[あなたのGoogle Maps APIキー]
```
- 説明: Google Maps APIキー
- 環境: Production, Preview, Development

```
NEXT_PUBLIC_GTM_ID=[あなたのGTM ID]
```
- 説明: Google Tag Manager ID
- 環境: Production

```
NEXT_PUBLIC_GA_ID=[あなたのGA ID]
```
- 説明: Google Analytics ID
- 環境: Production

## 設定手順

1. Vercelダッシュボードにログイン
2. プロジェクトを選択
3. Settings → Environment Variables
4. 上記の変数を追加
5. 各変数について：
   - Key: 変数名をコピー
   - Value: 値をコピー
   - Environment: 指定された環境にチェック
6. 全て追加後、Redeployを実行

## 確認事項

- [ ] SUPABASE_SERVICE_ROLE_KEY が設定されているか（管理画面に必須）
- [ ] NEXT_PUBLIC_SUPABASE_URL が設定されているか
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されているか
- [ ] NEXT_PUBLIC_USE_MOCK が false に設定されているか
- [ ] NEXT_PUBLIC_CHAT_ENABLED が true に設定されているか

## トラブルシューティング

### 管理画面にデータが表示されない場合
1. SUPABASE_SERVICE_ROLE_KEY が正しく設定されているか確認
2. Vercelでのredeployが完了しているか確認
3. ブラウザのコンソールでエラーを確認

### チャットウィジェットが動作しない場合
1. NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されているか確認
2. NEXT_PUBLIC_CHAT_ENABLED が true になっているか確認
3. NEXT_PUBLIC_USE_MOCK が false になっているか確認