# Supabase チャット機能 マイグレーションガイド

## 概要
このガイドでは、foodphoto_proプロジェクトにチャット機能の完全なデータベーススキーマを実装する手順を説明します。

## 前提条件
- Supabaseプロジェクト（foodphoto_pro）が作成済み
- プロジェクトURL: `https://saeakxyazamxgmwpriqo.supabase.co`
- Service Role Keyが取得済み（Supabaseダッシュボードから取得）

## マイグレーションファイル

以下のファイルが作成されています：

1. `003_enhanced_chat_extensions.sql` - 拡張機能とENUM型
2. `004_enhanced_chat_tables.sql` - コアテーブル
3. `005_enhanced_chat_rls.sql` - RLSポリシー
4. `006_enhanced_chat_functions.sql` - ヘルパー関数とトリガー
5. `007_seed_data.sql` - シードデータ
6. `008_smoke_tests.sql` - スモークテスト

## 実行方法

### 方法1: Supabaseダッシュボード経由（推奨）

1. [Supabaseダッシュボード](https://app.supabase.com)にログイン
2. foodphoto_proプロジェクトを選択
3. 左メニューから「SQL Editor」を選択
4. 各SQLファイルの内容を順番にコピー＆ペーストして実行：
   - まず `003_enhanced_chat_extensions.sql`
   - 次に `004_enhanced_chat_tables.sql`
   - 続いて `005_enhanced_chat_rls.sql`
   - その後 `006_enhanced_chat_functions.sql`
   - 最後に `007_seed_data.sql`

### 方法2: Supabase CLI経由

```bash
# 1. Supabase CLIをインストール（未インストールの場合）
npm install -g supabase

# 2. プロジェクトにリンク
supabase link --project-ref saeakxyazamxgmwpriqo

# 3. マイグレーションを実行
supabase db push
```

### 方法3: 直接SQL接続

```bash
# Service Role Keyを環境変数に設定
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key-here"

# PostgreSQL接続文字列を使用
psql "postgresql://postgres.[project-ref]:[password]@[host]:5432/postgres"
```

## 重要な設定項目

### 1. 管理者ユーザーの設定

`007_seed_data.sql`ファイルの以下の部分を編集してください：

```sql
-- YOUR-ADMIN-USER-ID-HEREを実際の管理者ユーザーIDに置き換える
insert into public.profiles (user_id, role, display_name)
values ('YOUR-ADMIN-USER-ID-HERE', 'admin', 'Owner')
on conflict (user_id) do update set role = 'admin';
```

管理者ユーザーIDは以下の方法で取得できます：
1. Supabaseダッシュボード > Authentication > Users
2. 管理者にしたいユーザーのUUIDをコピー

### 2. 環境変数の設定

`.env.local`ファイルに以下を追加：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://saeakxyazamxgmwpriqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Chat Configuration
NEXT_PUBLIC_CHAT_ENABLED=true
NEXT_PUBLIC_USE_MOCK=false
NEXT_PUBLIC_FEATURE_LINE=false
```

## 検証方法

### スモークテストの実行

`008_smoke_tests.sql`を実行して以下を確認：

1. **テーブル作成確認**
   ```sql
   select * from pg_tables where schemaname = 'public';
   ```

2. **ENUM型確認**
   ```sql
   select typname from pg_type where typnamespace = 'public'::regnamespace;
   ```

3. **RLS有効化確認**
   ```sql
   select tablename, rowsecurity from pg_tables where schemaname = 'public';
   ```

### 機能テスト

1. **会話作成テスト**
   ```sql
   insert into public.conversations (channel, status, session_token)
   values ('web', 'new', 'test-' || gen_random_uuid())
   returning *;
   ```

2. **メッセージ送信テスト**
   ```sql
   -- 上記で取得したconversation_idを使用
   insert into public.messages (conversation_id, role, source, content)
   values ('{conversation_id}', 'user', 'web', 'テストメッセージ')
   returning *;
   ```

## Realtime設定

Supabaseダッシュボードで以下のRealtimeを有効化：

1. Database > Replication
2. 以下のテーブルでRealtimeを有効化：
   - `conversations` (INSERT, UPDATE)
   - `messages` (INSERT)

## トラブルシューティング

### エラー: "permission denied for schema public"

Service Role Keyが正しく設定されていない可能性があります。

### エラー: "type does not exist"

`003_enhanced_chat_extensions.sql`が実行されていない可能性があります。

### エラー: "relation already exists"

既存のテーブルとの競合です。`004_enhanced_chat_tables.sql`の冒頭のDROP文のコメントを外して実行してください（データが失われる可能性があるので注意）。

## 次のステップ

1. フロントエンドのチャットコンポーネントを新しいスキーマに対応
2. 管理画面を新しいテーブル構造に更新
3. APIルートを新しいスキーマに合わせて調整
4. Realtime購読の実装

## サポート

問題が発生した場合は、以下を確認してください：

1. Supabaseダッシュボードのログ
2. ブラウザの開発者コンソール
3. Next.jsのサーバーログ