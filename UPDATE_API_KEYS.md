# Supabase新APIキー移行ガイド

## 1. Vercel環境変数の更新

以下の環境変数を更新してください：

### 公開キー（Publishable Key）
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_FDKdXgwPO-xBHoa4HaFu1Q_w7L7E8sC
```

### シークレットキー（Secret Key）
```
SUPABASE_SERVICE_ROLE_KEY=[Supabaseダッシュボードでdefaultキーの完全な値をコピー]
```

## 2. コードの更新

新しいAPIキーシステムでは、ヘッダーの指定方法が異なる場合があります。

### 現在のコード（そのまま動作する可能性）
```typescript
createClient(supabaseUrl, supabaseServiceKey)
```

### 新しいAPIキーシステムで推奨される方法
```typescript
createClient(supabaseUrl, supabaseServiceKey, {
  global: {
    headers: {
      'apikey': supabaseServiceKey,
      'Authorization': `Bearer ${supabaseServiceKey}`
    }
  }
})
```

## 3. 確認手順

1. Vercelで環境変数を更新
2. Redeployを実行
3. 管理画面（/admin/inbox）でデータが表示されるか確認
4. チャット機能が正常に動作するか確認

## 4. トラブルシューティング

もし動作しない場合：
- ブラウザのコンソールでエラーを確認
- Vercelのログを確認
- 新しいキーが正しくコピーされているか再確認