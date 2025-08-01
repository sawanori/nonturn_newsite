# NonTurn.LLC ウェブサイト開発 作業工程・方針

## 1. 開発方針

### 1.1 基本方針
1. **段階的進化**: 現在のLPを基盤として、段階的にサイトを拡張
2. **アセット継承**: 既存の3Dアニメーション・デザイン資産を最大限活用
3. **モジュラー設計**: 再利用可能なコンポーネント中心の開発
4. **パフォーマンス重視**: 3Dアニメーションを維持しながら最適化
5. **ユーザビリティ向上**: より直感的で使いやすいサイトを目指す

### 1.2 技術方針
- **フレームワーク**: Next.js 15 (App Router) を継続使用
- **スタイリング**: Tailwind CSS v4 を継続使用
- **アニメーション**: Framer Motion + Three.js の継続活用
- **TypeScript**: 型安全性の確保
- **ESLint/Prettier**: コード品質の統一

## 2. 作業工程（全体：5-6週間）

### フェーズ1: プロジェクト基盤構築（1週間）
**目標**: 開発環境の整備とアーキテクチャの設計

#### 1.1 環境構築・設定（1-2日）
- [ ] 現在のプロジェクト構造の分析・整理
- [ ] 新しいページ用ディレクトリ構造の作成
- [ ] 開発環境の最適化（ESLint、TypeScript設定調整）
- [ ] Git ブランチ戦略の設定

#### 1.2 共通コンポーネント設計（2-3日）
- [ ] Layout コンポーネントのリファクタリング
- [ ] Navigation コンポーネントの拡張（サブメニュー対応）
- [ ] Footer コンポーネントの作成
- [ ] Loading・Error状態のコンポーネント

#### 1.3 ルーティング・ページ構造（2日）
- [ ] Next.js App Router でのページ構造設計
- [ ] 動的ルーティングの設定（services/[slug]）
- [ ] メタデータ管理システムの構築
- [ ] サイトマップ生成の設定

### フェーズ2: コアページ実装（2週間）

#### 2.1 ホームページのリニューアル（3-4日）
- [ ] 既存ヒーローセクションの改良
- [ ] サービス概要セクションの追加
- [ ] ポートフォリオプレビューセクションの実装
- [ ] About プレビューセクションの実装
- [ ] レスポンシブ対応の調整

#### 2.2 About ページ実装（2-3日）
- [ ] 会社概要セクションの実装
- [ ] 代表プロフィールセクションの実装
- [ ] チーム紹介セクションの実装
- [ ] 企業価値観セクションの実装

#### 2.3 Services 関連ページ実装（4-5日）
- [ ] Services一覧ページの実装
- [ ] Movie制作詳細ページの実装
- [ ] Photo撮影詳細ページの実装
- [ ] Web制作詳細ページの実装
- [ ] サービス間の連携・導線設計

#### 2.4 Portfolio ページ実装（2-3日）
- [ ] ポートフォリオ一覧の実装
- [ ] 動画埋め込みプレーヤーの実装
- [ ] フィルタリング機能の実装
- [ ] プロジェクト詳細モーダルの実装

### フェーズ3: 機能実装・データ統合（1週間）

#### 3.1 Contact・Form機能強化（2-3日）
- [ ] 既存お問い合わせフォームの拡張
- [ ] サービス別お問い合わせ機能
- [ ] バリデーション強化
- [ ] 送信確認・エラーハンドリング

#### 3.2 Pricing ページ実装（1-2日）
- [ ] 料金表コンポーネントの実装
- [ ] 見積もり依頼フォームの実装
- [ ] 価格計算ロジック（将来拡張用）

#### 3.3 Access ページ実装（1日）
- [ ] Google Map埋め込み
- [ ] アクセス情報の実装
- [ ] オフィス情報の表示

#### 3.4 コンテンツ統合（1-2日）
- [ ] 既存サイトからのコンテンツ移行
- [ ] 動画リンクの統合・テスト
- [ ] 画像最適化・WebP対応

### フェーズ4: 最適化・品質向上（1週間）

#### 4.1 パフォーマンス最適化（2-3日）
- [ ] 3Dアニメーションの最適化
- [ ] 画像の遅延読み込み実装
- [ ] コード分割・バンドル最適化
- [ ] Core Web Vitals の改善

#### 4.2 SEO・アクセシビリティ対応（2日）
- [ ] メタタグ・構造化データの実装
- [ ] サイトマップ・robots.txtの生成
- [ ] アクセシビリティテスト・改善
- [ ] キーボードナビゲーション対応

#### 4.3 レスポンシブ・クロスブラウザ対応（1-2日）
- [ ] モバイル表示の最適化
- [ ] タブレット表示の調整
- [ ] 各ブラウザでの表示確認・修正

### フェーズ5: テスト・デプロイ（1週間）

#### 5.1 総合テスト（3-4日）
- [ ] 機能テスト（フォーム、ナビゲーション等）
- [ ] リンクチェック・404エラー確認
- [ ] パフォーマンステスト
- [ ] セキュリティテスト

#### 5.2 コンテンツ最終確認（1-2日）
- [ ] 文言・画像の最終チェック
- [ ] 動画リンクの動作確認
- [ ] 連絡先情報の確認

#### 5.3 デプロイ・公開（1日）
- [ ] 本番環境への デプロイ
- [ ] DNS設定・SSL証明書確認
- [ ] Google Analytics設定
- [ ] サーチコンソール登録

## 3. 技術実装詳細

### 3.1 ディレクトリ構造
```
src/
├── app/
│   ├── (pages)/
│   │   ├── about/
│   │   ├── services/
│   │   │   ├── movie/
│   │   │   ├── photo/
│   │   │   └── web/
│   │   ├── portfolio/
│   │   ├── pricing/
│   │   ├── contact/
│   │   └── access/
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── 3d/
│   │   └── forms/
│   ├── lib/
│   └── styles/
```

### 3.2 コンポーネント設計指針

#### 3.2.1 レイアウトコンポーネント
```typescript
// Layout関連
- Header/Navigation
- Footer
- Sidebar (必要に応じて)
- Container/Wrapper

// 3Dアニメーション（既存継承）
- FloatingCubes
- ParticleField
- AnimatedSphere
- CustomCursor
```

#### 3.2.2 UIコンポーネント
```typescript
// 基本UI
- Button (既存スタイル継承)
- Card
- Modal
- Form要素
- Loading States

// 特殊機能
- VideoPlayer
- ImageGallery
- ContactForm
- PricingTable
```

### 3.3 データ管理

#### 3.3.1 コンテンツデータ
```typescript
// 静的データ管理
- services.ts (サービス情報)
- portfolio.ts (実績情報)
- company.ts (会社情報)
- pricing.ts (料金情報)
```

#### 3.3.2 動的データ（将来拡張）
```typescript
// CMS連携用（将来対応）
- Headless CMS (Strapi, Contentful等)
- 問い合わせデータの管理
- ブログ記事管理
```

## 4. 品質管理・テスト戦略

### 4.1 コード品質
- **ESLint**: コード規約の統一
- **TypeScript**: 型安全性の確保
- **Prettier**: フォーマット統一
- **Husky**: コミット前チェック

### 4.2 テスト戦略
- **手動テスト**: 各機能の動作確認
- **視覚テスト**: デザイン確認
- **パフォーマンステスト**: Core Web Vitals
- **アクセシビリティテスト**: WAVE、Lighthouse

### 4.3 ブラウザ対応
- **モダンブラウザ**: Chrome, Firefox, Safari, Edge (最新2バージョン)
- **モバイルブラウザ**: iOS Safari, Android Chrome
- **後方互換性**: 必要最小限（IE11は非対応）

## 5. 運用・保守計画

### 5.1 継続的改善
- **パフォーマンス監視**: Google Analytics, Core Web Vitals
- **ユーザビリティ改善**: ヒートマップ分析
- **SEO監視**: サーチコンソール
- **セキュリティ更新**: 定期的な依存関係更新

### 5.2 将来拡張計画
- **CMS機能**: ブログ・お知らせ機能
- **多言語対応**: 英語版サイト
- **予約システム**: オンライン相談予約
- **顧客ポータル**: プロジェクト進捗確認

## 6. リスク管理

### 6.1 技術的リスク
| リスク | 対策 |
|--------|------|
| 3Dアニメーションのパフォーマンス影響 | 段階的読み込み、デバイス別最適化 |
| 動画コンテンツの読み込み遅延 | 遅延読み込み、プレースホルダー表示 |
| モバイル端末での表示品質低下 | レスポンシブテスト強化、軽量化 |

### 6.2 プロジェクト管理リスク
| リスク | 対策 |
|--------|------|
| 開発スケジュール遅延 | マイルストーン管理、優先度設定 |
| 仕様変更・追加 | 変更管理プロセス、影響度評価 |
| 品質問題 | 段階的テスト、レビュープロセス |

## 7. 成功指標・KPI

### 7.1 技術指標
- **Core Web Vitals**: 全項目「良好」評価達成
- **Lighthouse Score**: Performance 90+, Accessibility 95+
- **Bundle Size**: 初期読み込み 1MB以下

### 7.2 ビジネス指標
- **コンバージョン率**: 問い合わせ数 20%向上
- **エンゲージメント**: 平均セッション時間 30%向上
- **SEO**: 主要キーワードでの検索順位向上

---

**作成日**: 2024年12月21日  
**更新日**: -  
**作成者**: AI Assistant  
**承認者**: 澤田憲孝（NonTurn.LLC代表）