# SEO最適化チェックリスト - foodphoto-pro.com

## 🚨 最優先事項（LCP 4秒超の改善）

### 1. 画像最適化
- [ ] **ヒーロー画像にpriority属性を追加**
  - `FoodPhotoClient.tsx`のファーストビュー画像に`priority`属性を設定
  - 現在、priority属性が一切使用されていない

- [ ] **画像の事前読み込み（preload）実装**
  - LCP要素となる画像に`<link rel="preload">`を追加
  - 特にヒーロー画像、ロゴ画像

- [ ] **画像フォーマットの最適化**
  - 現在WebP/AVIF対応済みだが、実際に使用されているか確認
  - 画像サイズの見直し（モバイル用により小さいサイズを用意）

- [ ] **レスポンシブ画像の実装**
  - `sizes`属性を適切に設定してモバイルで小さい画像を配信
  - 現在のdeviceSizes設定を活用

### 2. JavaScript最適化
- [ ] **不要なJavaScriptの削減**
  - 未使用のimportを削除
  - Three.js関連のコードが残っていないか確認（foodphotoページでは未使用）

- [ ] **コード分割の強化**
  - 現在lazy loadされているのはModalとPWAInstallerのみ
  - その他の重いコンポーネントもlazy load化を検討

- [ ] **バンドルサイズの削減**
  - `npm run analyze`でバンドル分析を実行
  - 大きなライブラリの代替を検討

### 3. フォント最適化
- [ ] **フォントのプリロード**
  - 重要なフォントファイルに`<link rel="preload">`を追加
  - `font-display: swap`の設定確認

- [ ] **フォントサブセット化**
  - 日本語フォントのサブセット化で容量削減

### 4. レンダリング最適化
- [ ] **Critical CSSのインライン化**
  - ファーストビューに必要なCSSのみインライン化
  - 残りのCSSは遅延読み込み

- [ ] **不要なCSSの削除**
  - PurgeCSSやTailwind CSSの最適化設定確認
  - 未使用のCSSクラスを削除

### 5. サーバーサイド最適化
- [ ] **静的生成の活用**
  - 動的コンテンツ以外は可能な限り静的生成（SSG）
  - ISR（Incremental Static Regeneration）の検討

- [ ] **キャッシュ戦略の改善**
  - 現在1年のキャッシュ設定があるが、適切に機能しているか確認
  - CDNキャッシュの活用

## 📊 Core Web Vitals改善

### LCP（Largest Contentful Paint）
目標: 2.5秒以内（現在: 4秒超）
- [ ] ヒーロー画像の最適化
- [ ] Critical CSSのインライン化
- [ ] フォントの最適化

### FID（First Input Delay）
目標: 100ms以内
- [ ] JavaScriptの実行時間削減
- [ ] メインスレッドのブロック時間削減

### CLS（Cumulative Layout Shift）
目標: 0.1以下
- [ ] 画像・動画にwidth/height属性を設定
- [ ] フォント読み込み時のレイアウトシフト防止
- [ ] 動的コンテンツの予約スペース確保

## 🔧 実装優先順位

### Phase 1（即実施）
1. ヒーロー画像にpriority属性追加
2. 重要画像のpreload実装
3. 不要なJavaScriptの削除

### Phase 2（1週間以内）
1. コード分割の強化
2. フォント最適化
3. Critical CSSのインライン化

### Phase 3（2週間以内）
1. バンドルサイズの最適化
2. 静的生成の拡大
3. CDNキャッシュ戦略の実装

## 📈 計測ツール

- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/
- **Chrome DevTools Lighthouse**
- **GTmetrix**: https://gtmetrix.com/

## 🎯 目標値

- **モバイルLCP**: 2.5秒以内（現在: 4秒超）
- **デスクトップLCP**: 2.0秒以内
- **PageSpeed Scoreモバイル**: 90以上
- **PageSpeed Scoreデスクトップ**: 95以上

## 📝 追加の推奨事項

1. **Service Workerの活用**
   - オフラインキャッシュ
   - リソースのプリキャッシュ

2. **Resource Hintsの活用**
   - dns-prefetch
   - preconnect
   - prefetch

3. **画像の遅延読み込み**
   - loading="lazy"の適切な使用
   - Intersection Observerの活用

4. **Third-party Scriptsの最適化**
   - GTMの遅延読み込み
   - 不要なトラッキングスクリプトの削除

5. **モバイルファーストの実装**
   - モバイル専用の軽量版コンポーネント
   - タッチデバイス向けの最適化