# NonTurn.LLC サイト構造・ページ設計書

## 1. サイト全体構造

```
NonTurn.LLC Website
├── Home (/)
├── About (/about)
├── Services (/services)
│   ├── Movie Production (/services/movie)
│   ├── Photography (/services/photo)
│   └── Web Production (/services/web)
├── Portfolio (/portfolio)
├── Pricing (/pricing)
├── Contact (/contact)
└── Access (/access)
```

## 2. ナビゲーション構造

### 2.1 メインナビゲーション
```
Logo | Services | Portfolio | About | Pricing | Contact
```

### 2.2 サブナビゲーション（Services）
```
Services ▼
├── Movie Production
├── Photography  
└── Web Production
```

### 2.3 モバイルナビゲーション
- ハンバーガーメニュー
- フルスクリーンオーバーレイ
- アニメーション付きメニュー項目

## 3. 各ページ詳細設計

### 3.1 ホームページ (/)

#### 3.1.1 セクション構成
1. **Hero Section**
   - 3Dアニメーション背景（継承）
   - メインキャッチコピー: "POWERING BUSINESS WITH CREATIVE SOLUTIONS"
   - サブキャッチコピー: "課題解決にクリエイティブに解決"
   - CTAボタン: "お問い合わせ", "制作実績を見る"

2. **Services Overview**
   - 3つのサービスカード
   - ホバーエフェクト付きアイコン
   - 詳細ページへのリンク

3. **Portfolio Showcase**
   - 厳選された5作品の動画サムネイル
   - 再生ボタン付きオーバーレイ
   - "全ての実績を見る"ボタン

4. **About Preview**
   - 会社概要の簡潔な紹介
   - 数値実績（プロジェクト数、経験年数等）
   - "詳細を見る"リンク

5. **Contact CTA**
   - 問い合わせフォームへの導線
   - 連絡先情報

#### 3.1.2 3Dアニメーション要素
- FloatingCubes（既存継承）
- ParticleField（既存継承）
- AnimatedSphere（既存継承）
- カスタムカーソル（既存継承）

### 3.2 会社概要 (/about)

#### 3.2.1 セクション構成
1. **Company Vision**
   - 企業理念・ビジョン
   - 代表メッセージ

2. **Representative Profile**
   - 澤田憲孝 プロフィール
   - 経歴・実績

3. **Company Information**
   - 会社概要テーブル
   - 事業内容詳細
   - 沿革

4. **Team Introduction**
   - チームメンバー紹介
   - 各専門分野の説明

5. **Company Values**
   - 3つの価値観
   - アニメーション付きアイコン

### 3.3 サービス一覧 (/services)

#### 3.3.1 セクション構成
1. **Services Overview**
   - 3つのメインサービス
   - 大型カード形式

2. **Service Comparison**
   - サービス比較表
   - 料金帯の目安

3. **Process Flow**
   - 制作フロー共通部分
   - インタラクティブなステップ表示

4. **FAQ Section**
   - よくある質問
   - アコーディオン形式

### 3.4 映像制作詳細 (/services/movie)

#### 3.4.1 セクション構成
1. **Service Hero**
   - 映像制作の特徴
   - 料金表示: "¥220,000〜"

2. **Production Process**
   - 4ステップ詳細説明
   - 企画設定（7日）→撮影→編集（1ヶ月）→納品
   - タイムライン形式

3. **Service Types**
   - 企業VP・採用動画・ブランディング
   - 各種類の特徴説明

4. **Technical Specifications**
   - 4K対応、ドローン撮影、クロマキー等
   - 機材・技術情報

5. **Portfolio Gallery**
   - 制作実績動画
   - フィルタリング機能

### 3.5 撮影サービス詳細 (/services/photo)

#### 3.5.1 セクション構成
1. **Service Hero**
   - 撮影サービスの特徴
   - 料金表示

2. **Service Plans**
   - イベント撮影プラン（¥20,000〜）
   - 商品撮影プラン（¥40,000〜）
   - 詳細料金表

3. **Shooting Process**
   - 撮影フロー（3ステップ）
   - ヒアリング→撮影→納品

4. **Gallery**
   - 撮影実績ギャラリー
   - ライトボックス表示

### 3.6 Web制作詳細 (/services/web)

#### 3.6.1 セクション構成
1. **Service Hero**
   - Web制作の特徴
   - 企画・制作・運営

2. **Service Scope**
   - コーポレートサイト
   - LP制作
   - ECサイト
   - 保守・運営

3. **Technology Stack**
   - Next.js, React, WordPress等
   - 技術選定の理由

4. **Web Portfolio**
   - 制作実績
   - スクリーンショット付き

### 3.7 制作実績 (/portfolio)

#### 3.7.1 セクション構成
1. **Portfolio Hero**
   - 実績概要
   - フィルタリング機能

2. **Video Projects**
   - 5つの主要プロジェクト
   - 動画埋め込み
   - プロジェクト詳細

3. **Photo Projects**
   - 撮影実績ギャラリー
   - カテゴリ別表示

4. **Web Projects**
   - サイト制作実績
   - 業界別分類

#### 3.7.2 プロジェクト詳細情報
各プロジェクトには以下を含む：
- クライアント名
- プロジェクト概要
- 使用技術・手法
- 制作期間
- 成果・効果

### 3.8 料金表 (/pricing)

#### 3.8.1 セクション構成
1. **Pricing Hero**
   - 料金体系の説明
   - 透明性の重視

2. **Movie Production Pricing**
   - 基本プラン: ¥220,000〜
   - オプション料金
   - 追加費用説明

3. **Photography Pricing**
   - イベント撮影: ¥20,000〜
   - 商品撮影: ¥40,000〜
   - 時間延長料金

4. **Web Production Pricing**
   - サイト種別ごとの料金
   - 保守費用

5. **Quote Request**
   - 見積もり依頼フォーム
   - プロジェクト詳細入力

### 3.9 お問い合わせ (/contact)

#### 3.9.1 セクション構成
1. **Contact Hero**
   - お問い合わせの促進
   - 対応時間の明記

2. **Contact Form**
   - 既存フォームの拡張
   - サービス別問い合わせ
   - バリデーション強化

3. **Contact Information**
   - 住所・電話・メール
   - SNSリンク
   - 営業時間

4. **FAQ**
   - よくある質問
   - 回答までの流れ

### 3.10 アクセス (/access)

#### 3.10.1 セクション構成
1. **Access Hero**
   - 所在地情報
   - アクセス方法

2. **Map & Address**
   - GoogleMap埋め込み
   - 詳細住所
   - 最寄り駅からの道順

3. **Office Information**
   - オフィス写真
   - 設備情報
   - 駐車場情報

## 4. レスポンシブデザイン

### 4.1 ブレークポイント
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### 4.2 各デバイス対応
#### 4.2.1 モバイル (< 768px)
- ハンバーガーメニュー
- 縦積みレイアウト
- 簡素化されたアニメーション
- タップ操作最適化

#### 4.2.2 タブレット (768px - 1024px)
- 2カラムレイアウト
- 中程度のアニメーション
- タッチ操作対応

#### 4.2.3 デスクトップ (> 1024px)
- フルアニメーション
- 3Dエフェクト最大活用
- ホバーエフェクト
- マウス操作最適化

## 5. アニメーション・インタラクション

### 5.1 ページ遷移アニメーション
- フェードイン・アウト
- スライドトランジション
- プログレスバー

### 5.2 スクロールアニメーション
- パララックス効果
- 要素の段階的表示
- スクロール進捗表示

### 5.3 ホバーエフェクト
- ボタンのトランスフォーム
- カードの3D回転
- 画像のズーム効果

## 6. SEO・アクセシビリティ

### 6.1 SEO対策
- セマンティックHTML
- メタタグ最適化
- 構造化データ
- サイトマップ

### 6.2 アクセシビリティ
- ARIA属性
- キーボードナビゲーション
- 十分なコントラスト比
- 画像のalt属性

## 7. パフォーマンス最適化

### 7.1 画像最適化
- WebP形式対応
- 遅延読み込み
- レスポンシブ画像

### 7.2 コード最適化
- コード分割
- Tree shaking
- バンドルサイズ最適化

### 7.3 読み込み最適化
- Critical CSS
- プリロード
- キャッシュ戦略

---

**作成日**: 2024年12月21日  
**更新日**: -  
**作成者**: AI Assistant