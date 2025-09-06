export type MockPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  cover_image_url?: string;
  category?: { slug: string; name: string };
  published_at: string;
};

const POSTS: MockPost[] = [
  {
    id: 1,
    slug: "menu-photo-pricing",
    title: "飲食媒体でCVを上げる料理写真：価格表記と構図の黄金比",
    excerpt: "「1枚目で勝つ」写真の作り方を、価格表記と構図から解説。",
    cover_image_url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2011.jpg",
    category: { slug: "howto", name: "撮影ノウハウ" },
    content_html: `
      <h2>ポイント1：余白と情報量のバランス</h2>
      <p>飲食店の料理写真において、最も重要なのは「第一印象」です。特に食べログやぐるなびなどの媒体では、サムネイル段階でユーザーの興味を引けるかが勝負の分かれ目となります。</p>
      <img src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2023.jpg" alt="料理写真の構図例" />
      <h3>価格表記の黄金ルール</h3>
      <ul>
        <li>価格は写真の右下に配置（日本人の視線の流れに合わせる）</li>
        <li>フォントサイズは画像全体の1/15〜1/20程度</li>
        <li>背景との明度差を50%以上確保する</li>
      </ul>
      <h2>ポイント2：テカリと湯気の演出</h2>
      <p>料理の「シズル感」を演出する上で、適度なテカリと湯気は欠かせません。しかし過度な演出は逆効果。実際の提供状態に近い自然な状態を心がけましょう。</p>
      <blockquote>
        <p>「写真と実物が違う」というクレームを避けるためにも、過度な加工は控えめに。信頼性が売上に直結します。</p>
      </blockquote>
      <h3>撮影時のチェックリスト</h3>
      <ol>
        <li>料理の温度感が伝わるか</li>
        <li>食材の質感が活きているか</li>
        <li>盛り付けのボリューム感は適切か</li>
        <li>背景がうるさくないか</li>
      </ol>
      <p>これらの要素を意識することで、CVR（コンバージョン率）の向上が期待できます。実際に弊社のクライアント様では、写真の改善により予約率が平均23%向上しました。</p>
    `,
    published_at: "2025-09-06T12:00:00.000Z",
  },
  {
    id: 2,
    slug: "tabelog-top-image",
    title: "食べログ1枚目でクリック率を上げるレンズ選定",
    excerpt: "35mm/50mm/85mmの使い分けと料理距離の指標。",
    cover_image_url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2012.jpg",
    category: { slug: "media", name: "媒体運用" },
    content_html: `
      <h2>レンズ選びが決める第一印象</h2>
      <p>食べログのトップ画像は、お店の「顔」です。適切なレンズ選定により、料理の魅力を最大限に引き出すことができます。</p>
      <h3>レンズ別の特徴と使い分け</h3>
      <h4>35mm - 空間も含めた演出</h4>
      <p>広角寄りの35mmレンズは、料理だけでなく店内の雰囲気も含めて撮影したい場合に最適です。特にカウンター席からの撮影や、コース料理全体を見せたい場合に効果的です。</p>
      <img src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%2022.jpg" alt="35mmレンズでの撮影例" />
      <h4>50mm - 自然な遠近感</h4>
      <p>標準レンズと呼ばれる50mmは、人間の視野に最も近い画角です。違和感のない自然な料理写真が撮影でき、初心者にも扱いやすいレンズです。</p>
      <h4>85mm - 料理のディテール重視</h4>
      <p>中望遠の85mmは、料理のディテールを美しく表現できます。背景のボケも綺麗で、高級感のある演出が可能です。</p>
      <h3>撮影距離の黄金比</h3>
      <table>
        <thead>
          <tr>
            <th>レンズ</th>
            <th>推奨距離</th>
            <th>向いている料理</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>35mm</td>
            <td>30-50cm</td>
            <td>定食・コース全体</td>
          </tr>
          <tr>
            <td>50mm</td>
            <td>40-70cm</td>
            <td>単品料理・丼物</td>
          </tr>
          <tr>
            <td>85mm</td>
            <td>60-100cm</td>
            <td>寿司・デザート</td>
          </tr>
        </tbody>
      </table>
      <p>これらの指標を参考に、料理の特性に合わせたレンズ選定を行うことで、食べログでのクリック率向上が期待できます。</p>
    `,
    published_at: "2025-09-05T12:00:00.000Z",
  },
  {
    id: 3,
    slug: "ginza-night-shoot",
    title: "銀座の夜間撮影：反射と看板の対処術",
    excerpt: "夜反射/色かぶり/ネオンサインに強い撮影手順。",
    cover_image_url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%202.jpg",
    category: { slug: "area", name: "エリア運用" },
    content_html: `
      <h2>銀座エリア特有の撮影課題</h2>
      <p>銀座は東京を代表する高級飲食店街ですが、夜間撮影には特有の難しさがあります。ネオンサインの反射、ガラス面の映り込み、色温度のばらつきなど、プロでも苦労する要素が満載です。</p>
      <h3>偏光フィルタの活用法</h3>
      <p>ガラス面の反射を除去する最も効果的な方法は、偏光フィルタ（PLフィルタ）の使用です。</p>
      <ul>
        <li>角度：ガラス面に対して30-40度の角度から撮影</li>
        <li>回転調整：フィルタを回転させて反射が最小になる位置を探す</li>
        <li>注意点：完全に反射を消すと不自然になるため、適度に残す</li>
      </ul>
      <img src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%201.jpg" alt="偏光フィルタ使用例" />
      <h3>露出ブラケティングの実践</h3>
      <p>夜間の明暗差が激しい環境では、露出ブラケティングが有効です。</p>
      <ol>
        <li>基準露出で1枚</li>
        <li>-1EV（暗め）で1枚</li>
        <li>+1EV（明るめ）で1枚</li>
      </ol>
      <p>後処理でHDR合成することで、看板の白飛びと店内の黒つぶれを同時に解決できます。</p>
      <h3>ホワイトバランスの調整</h3>
      <p>銀座の夜間は様々な光源が混在します：</p>
      <ul>
        <li>街灯：4000K前後</li>
        <li>ネオンサイン：2500-6500K（色により変動）</li>
        <li>店内照明：2700-3500K</li>
      </ul>
      <blockquote>
        <p>プロのコツ：RAW撮影を必須とし、後処理で部分的に色温度を調整する「マスク処理」を活用しましょう。</p>
      </blockquote>
      <h3>実践的な撮影手順</h3>
      <ol>
        <li>三脚を設置（手ブレ防止）</li>
        <li>ISO感度は800-1600に設定（ノイズと明るさのバランス）</li>
        <li>絞りはF5.6-F8（シャープネスの最適値）</li>
        <li>シャッター速度は1/60秒以上（通行人のブレ防止）</li>
        <li>PLフィルタで反射調整</li>
        <li>露出ブラケティングで3枚撮影</li>
      </ol>
      <p>これらの技術を組み合わせることで、銀座の高級感を損なわない美しい夜間撮影が可能になります。</p>
    `,
    published_at: "2025-09-04T12:00:00.000Z",
  },
  {
    id: 4,
    slug: "instagram-reel-food",
    title: "Instagramリールで注目される料理動画の撮り方",
    excerpt: "15秒で食欲をそそる動画構成とトランジション技法。",
    cover_image_url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%203.jpg",
    category: { slug: "howto", name: "撮影ノウハウ" },
    content_html: `
      <h2>リール動画が変える集客力</h2>
      <p>Instagram リールは、飲食店の集客において最も費用対効果の高いツールの一つです。適切に制作された15秒の動画は、静止画の10倍以上のエンゲージメントを生み出します。</p>
      <h3>黄金の構成パターン</h3>
      <ol>
        <li><strong>0-3秒：フック</strong> - 最も美味しそうな瞬間でスタート</li>
        <li><strong>3-10秒：プロセス</strong> - 調理や盛り付けの様子</li>
        <li><strong>10-15秒：完成形</strong> - 360度回転や接写でフィニッシュ</li>
      </ol>
      <img src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%204.jpg" alt="リール構成例" />
      <h3>効果的なトランジション技法</h3>
      <h4>1. マッチカット</h4>
      <p>同じ構図で食材が変化していく演出。視聴者の目を釘付けにします。</p>
      <h4>2. スピードランプ</h4>
      <p>緩急をつけた速度変化で、重要な瞬間を強調します。</p>
      <h4>3. オーバーヘッドスピン</h4>
      <p>真上からの回転ショット。料理全体を美しく見せる定番技法です。</p>
      <h3>撮影のテクニカルポイント</h3>
      <ul>
        <li>フレームレート：60fps以上（スローモーション用）</li>
        <li>解像度：縦型1080×1920（9:16）</li>
        <li>手ブレ補正：ジンバルまたはスタビライザー使用推奨</li>
        <li>照明：自然光＋補助LED（色温度5600K）</li>
      </ul>
      <p>実際の成功事例：渋谷のイタリアンレストランでは、週1回のリール投稿により、3ヶ月で予約数が45%増加しました。</p>
    `,
    published_at: "2025-09-04T12:00:00.000Z",
  },
  {
    id: 5,
    slug: "google-map-photo-seo",
    title: "Googleマップの写真でMEO対策を強化する方法",
    excerpt: "ローカルSEOに効く写真の撮り方とアップロード戦略。",
    cover_image_url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%205.jpg",
    category: { slug: "media", name: "媒体運用" },
    content_html: `
      <h2>Googleマップ写真がMEOに与える影響</h2>
      <p>Googleマップ上の写真は、単なる視覚情報以上の価値があります。適切な写真戦略により、ローカル検索順位を大幅に向上させることができます。</p>
      <h3>MEOに効果的な写真カテゴリー</h3>
      <ol>
        <li><strong>外観写真</strong>：正面、看板、入り口（各2-3枚）</li>
        <li><strong>内装写真</strong>：カウンター、テーブル席、個室（各3-5枚）</li>
        <li><strong>料理写真</strong>：人気メニュートップ5（各2-3枚）</li>
        <li><strong>スタッフ写真</strong>：笑顔の接客シーン（2-3枚）</li>
      </ol>
      <h3>写真のメタデータ最適化</h3>
      <p>Googleは写真のEXIFデータも解析します。以下の情報を正確に設定しましょう：</p>
      <ul>
        <li>撮影日時：最新の情報であることを示す</li>
        <li>位置情報：店舗の正確な緯度経度</li>
        <li>ファイル名：「店名_料理名_地域名.jpg」形式</li>
      </ul>
      <img src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%206.jpg" alt="Googleマップ写真例" />
      <h3>アップロード戦略</h3>
      <h4>頻度とタイミング</h4>
      <ul>
        <li>週2-3回の定期的なアップロード</li>
        <li>ランチタイム前（11:00-11:30）</li>
        <li>ディナータイム前（17:00-17:30）</li>
      </ul>
      <h4>季節性を活かす</h4>
      <p>季節限定メニューや期間限定の装飾など、タイムリーな写真は特に評価されます。</p>
      <blockquote>
        <p>重要：オーナー確認済みアカウントからの投稿は、一般ユーザーの投稿より3倍の重み付けがされます。</p>
      </blockquote>
      <p>これらの施策により、「地域名＋料理ジャンル」検索で上位3位以内の表示率が平均67%向上した実績があります。</p>
    `,
    published_at: "2025-09-03T12:00:00.000Z",
  },
  {
    id: 6,
    slug: "seasonal-menu-photography",
    title: "季節メニューを魅力的に撮影する5つのコツ",
    excerpt: "春夏秋冬、季節感を演出する小道具と構図の選び方。",
    cover_image_url: "https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%207.jpg",
    category: { slug: "howto", name: "撮影ノウハウ" },
    content_html: `
      <h2>季節感が売上を左右する</h2>
      <p>日本の飲食店において、季節メニューは売上の30-40%を占める重要な要素です。写真で季節感を適切に表現することで、顧客の購買意欲を大きく刺激できます。</p>
      <h3>春：新緑と花を活かす</h3>
      <ul>
        <li>桜の花びらを散らす（食用花使用）</li>
        <li>淡いピンクや若草色の食器を選ぶ</li>
        <li>自然光を多用し、明るめの露出で撮影</li>
      </ul>
      <h3>夏：涼感と鮮やかさ</h3>
      <ul>
        <li>ガラス食器で透明感を演出</li>
        <li>氷や水滴で涼しさを表現</li>
        <li>青や白を基調とした背景選び</li>
      </ul>
      <img src="https://rpk6snz1bj3dcdnk.public.blob.vercel-storage.com/LP_food_%208.jpg" alt="夏の料理撮影例" />
      <h3>秋：温かみと豊かさ</h3>
      <ul>
        <li>紅葉や木の実を小道具に</li>
        <li>暖色系の照明で温かみを演出</li>
        <li>土鍋や陶器で季節感を強調</li>
      </ul>
      <h3>冬：湯気と温もり</h3>
      <ul>
        <li>湯気を強調（ドライアイス活用も）</li>
        <li>暖色のライティングで温かさを</li>
        <li>厚手の器で冬らしさを演出</li>
      </ul>
      <h3>実践的な撮影セットアップ</h3>
      <table>
        <thead>
          <tr>
            <th>季節</th>
            <th>色温度</th>
            <th>推奨背景</th>
            <th>小道具例</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>春</td>
            <td>5500K</td>
            <td>白木・パステル</td>
            <td>桜・若葉</td>
          </tr>
          <tr>
            <td>夏</td>
            <td>6500K</td>
            <td>青・ガラス</td>
            <td>氷・貝殻</td>
          </tr>
          <tr>
            <td>秋</td>
            <td>4500K</td>
            <td>木目・暖色布</td>
            <td>紅葉・栗</td>
          </tr>
          <tr>
            <td>冬</td>
            <td>3500K</td>
            <td>黒・深緑</td>
            <td>雪結晶・松</td>
          </tr>
        </tbody>
      </table>
      <p>季節感のある写真は、SNSでのシェア率が通常の2.3倍になるというデータもあります。ぜひ積極的に取り入れてみてください。</p>
    `,
    published_at: "2024-12-10T12:00:00.000Z",
  }
];

export const getAllPosts = () =>
  POSTS.slice().sort((a, b) => +new Date(b.published_at) - +new Date(a.published_at));

export const getLatestPosts = (n: number) => getAllPosts().slice(0, n);

export const getPostBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);