# Vercel Sitemap Configuration for foodphoto-pro.com

## 必要な設定

### 1. 環境変数の設定
Vercelダッシュボードで以下の環境変数を設定してください：

```
NEXT_PUBLIC_SITE_DOMAIN=foodphoto-pro.com
```

この環境変数は`next-sitemap.config.js`でドメインごとの設定を切り替えるために使用されます。

### 2. ビルドコマンド
`package.json`の`postbuild`スクリプトで自動的にサイトマップが生成されます：
```bash
npm run build  # これによりpostbuildも実行される
```

### 3. 配信されるファイル

#### foodphoto-pro.comでアクセス可能なファイル：
- `/robots.txt` → `/public/foodphoto-robots.txt`を配信
- `/sitemap.xml` → `/public/foodphoto-sitemap.xml`を配信
- `/sitemap` → HTMLサイトマップページ

#### ミドルウェアによるルーティング：
`src/middleware.ts`で以下のリライトが設定されています：
- `foodphoto-pro.com/robots.txt` → `foodphoto-robots.txt`
- `foodphoto-pro.com/sitemap.xml` → `foodphoto-sitemap.xml`
- `foodphoto-pro.com/sitemap` → `/services/photo/foodphoto/sitemap`

### 4. Google Search Consoleへの登録

1. [Google Search Console](https://search.google.com/search-console)にアクセス
2. `https://foodphoto-pro.com`をプロパティとして追加
3. 所有権の確認（DNSレコードまたはHTMLファイル）
4. サイトマップの送信：
   - `https://foodphoto-pro.com/sitemap.xml`
   - `https://foodphoto-pro.com/foodphoto-sitemap.xml`

### 5. 確認方法

デプロイ後、以下のURLでアクセスできることを確認：

```bash
# robots.txt
curl https://foodphoto-pro.com/robots.txt

# XMLサイトマップ
curl https://foodphoto-pro.com/sitemap.xml
curl https://foodphoto-pro.com/foodphoto-sitemap.xml

# HTMLサイトマップ
curl https://foodphoto-pro.com/sitemap
```

### 6. サイトマップの更新頻度

- 自動生成：ビルド時（`npm run build`実行時）
- 更新頻度：デプロイごと
- キャッシュ：1時間（Cache-Control設定済み）

### 7. トラブルシューティング

#### サイトマップが404になる場合：
1. `public/foodphoto-sitemap.xml`が存在することを確認
2. ミドルウェアのログを確認：`x-mw`ヘッダー
3. Vercelのファンクションログを確認

#### Google Search Consoleでエラーが出る場合：
1. robots.txtでサイトマップURLが正しく記載されているか確認
2. XMLフォーマットが正しいか確認
3. URLが正規化されているか確認（httpsで統一）

### 8. 追加の最適化

#### サイトマップの分割（必要に応じて）：
大規模サイトの場合、以下のように分割可能：
- `foodphoto-sitemap-pages.xml` - 静的ページ
- `foodphoto-sitemap-areas.xml` - エリアページ
- `foodphoto-sitemap-images.xml` - 画像サイトマップ

#### インデックス促進：
- Ping送信：`https://www.google.com/ping?sitemap=https://foodphoto-pro.com/sitemap.xml`
- Bing Webmaster Tools への登録
- 構造化データの追加（既に実装済み）