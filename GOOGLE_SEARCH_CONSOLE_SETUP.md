# Google Search Console 設定ガイド

## foodphoto-pro.com の所有権確認手順

### 1. HTMLファイル確認方法

#### ステップ1: ファイルの配置
Google Search Consoleから提供される確認用HTMLファイル（例：`google1234567890abcdef.html`）を以下の場所に配置：

```
/public/google********.html
```

**重要:** 
- ファイル名は変更しない
- ファイル内容も変更しない
- `/public/`ディレクトリ直下に配置

#### ステップ2: ミドルウェアの確認
`src/middleware.ts`に以下の設定が追加されていることを確認（既に設定済み）：
```typescript
// Google Search Console verification files - pass through for both domains
if (url.pathname.startsWith("/google") && url.pathname.endsWith(".html")) {
  const res = NextResponse.next();
  res.headers.set("x-mw", "pass:google-verification");
  return res;
}
```

#### ステップ3: デプロイ
```bash
git add public/google********.html
git commit -m "Add Google Search Console verification file"
git push
```

#### ステップ4: 確認
デプロイ完了後、以下のURLでファイルにアクセスできることを確認：
- `https://foodphoto-pro.com/google********.html`

### 2. 代替方法：メタタグ確認

HTMLファイル確認が難しい場合は、メタタグ確認も可能です：

1. Google Search Consoleで「HTMLタグ」確認方法を選択
2. 提供されたメタタグをコピー
3. `src/app/services/photo/foodphoto/page.tsx`のメタデータに追加

例：
```typescript
export const metadata: Metadata = {
  // 既存のメタデータ...
  other: {
    'google-site-verification': 'ここに確認コード'
  }
}
```

### 3. 所有権確認後の作業

#### サイトマップの送信
Google Search Consoleで以下のサイトマップを送信：

1. メインサイトマップ：
   - `https://foodphoto-pro.com/sitemap.xml`
   - `https://foodphoto-pro.com/foodphoto-sitemap.xml`

2. サイトマップの送信方法：
   - Google Search Consoleにログイン
   - 「サイトマップ」セクションに移動
   - 上記URLを入力して「送信」

#### インデックス登録のリクエスト
重要なページのインデックス登録をリクエスト：
1. URL検査ツールを使用
2. 以下のURLを検査：
   - `https://foodphoto-pro.com/`
   - `https://foodphoto-pro.com/form`
   - `https://foodphoto-pro.com/sitemap`
   - 各エリアページ（`/area/shibuya`など）

### 4. トラブルシューティング

#### 確認ファイルが404エラーの場合：
1. ファイルが`/public/`ディレクトリに正しく配置されているか確認
2. ファイル名が正確か確認（大文字小文字も含む）
3. Vercelのデプロイが完了しているか確認

#### 確認が失敗する場合：
1. ファイル内容が改変されていないか確認
2. HTTPSでアクセスできているか確認
3. リダイレクトが発生していないか確認

### 5. 両ドメインの管理

non-turn.comとfoodphoto-pro.comの両方を管理する場合：

1. **それぞれ別々に所有権確認が必要**
   - non-turn.com用の確認ファイル
   - foodphoto-pro.com用の確認ファイル

2. **同じpublicディレクトリに配置可能**
   ```
   /public/
   ├── google********.html  # non-turn.com用
   └── google########.html  # foodphoto-pro.com用
   ```

3. **ミドルウェアが両方のドメインで確認ファイルを配信**

### 6. 確認完了後の最適化

1. **Search Consoleの設定**
   - 国際ターゲティング：日本
   - 優先するドメイン：https://foodphoto-pro.com

2. **パフォーマンス監視**
   - 検索パフォーマンスレポートの確認
   - インデックスカバレッジの監視
   - モバイルユーザビリティの確認

3. **定期的な更新**
   - サイトマップの自動更新（ビルド時）
   - 新規ページの手動インデックス登録リクエスト