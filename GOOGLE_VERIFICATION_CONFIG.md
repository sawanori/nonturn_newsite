# Google Search Console 確認ファイル設定

## 現在の設定

### foodphoto-pro.com専用確認ファイル
- **ファイル**: `/public/google26fa748b2feb7d00.html`
- **アクセスURL**: `https://foodphoto-pro.com/google26fa748b2feb7d00.html` ✅
- **non-turn.comからのアクセス**: 404 Not Found ❌ (意図的にブロック)

## ミドルウェアの動作

```typescript
// src/middleware.ts の該当部分

// Google Search Console verification files - ONLY for foodphoto-pro.com
if (url.pathname === "/google26fa748b2feb7d00.html") {
  // foodphoto-pro.comドメインのみ許可
  if (LP.has(host)) {
    const res = NextResponse.next();
    res.headers.set("x-mw", "pass:google-verification-foodphoto");
    return res;
  } else {
    // non-turn.comからのアクセスは404を返す
    return new Response('Not Found', { status: 404 });
  }
}
```

## 動作確認

### ✅ 許可されるアクセス:
- `https://foodphoto-pro.com/google26fa748b2feb7d00.html`
- `https://www.foodphoto-pro.com/google26fa748b2feb7d00.html`

### ❌ ブロックされるアクセス:
- `https://non-turn.com/google26fa748b2feb7d00.html` → 404
- `https://www.non-turn.com/google26fa748b2feb7d00.html` → 404

## 今後の追加設定

### non-turn.com用の確認ファイルを追加する場合:

1. Googleから新しい確認ファイルを取得
2. `/public/`ディレクトリに配置
3. ミドルウェアの以下の部分が自動的に処理:

```typescript
// Other Google verification files for non-turn.com (if any)
if (!LP.has(host) && url.pathname.startsWith("/google") && url.pathname.endsWith(".html")) {
  const res = NextResponse.next();
  res.headers.set("x-mw", "pass:google-verification-nonturn");
  return res;
}
```

## セキュリティ上の利点

1. **ドメイン分離**: 各ドメインの確認ファイルが独立
2. **誤配信防止**: foodphoto-pro.comの確認ファイルがnon-turn.comで表示されない
3. **Search Console管理**: 各ドメインを独立して管理可能

## デプロイ手順

```bash
# 変更をコミット
git add .
git commit -m "Add Google Search Console verification for foodphoto-pro.com only"
git push

# Vercelで自動デプロイ後、確認
curl https://foodphoto-pro.com/google26fa748b2feb7d00.html
# → 200 OK (正常に表示)

curl https://non-turn.com/google26fa748b2feb7d00.html
# → 404 Not Found (意図的にブロック)
```