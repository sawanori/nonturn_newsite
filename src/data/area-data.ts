/**
 * 地域別ページのデータ定義
 * SEOスパムを避けるため、各地域に独自の価値あるコンテンツを提供
 */

export interface AreaData {
  id: string
  name: string
  nameEn: string
  title: string
  description: string
  metaDescription: string
  coordinates: {
    latitude: number
    longitude: number
  }
  serviceRadius: number // km
  features: string[]
  popularCuisines: string[]
  shootingStats: {
    totalShops: string
    popularPlan: string
    bestTime: string
  }
  localInfo: {
    access: string
    parking: string
    specialNotes: string
  }
  cases: {
    shopType: string
    area: string
    result: string
    comment: string
  }[]
  faqs: {
    question: string
    answer: string
  }[]
  nearbyStations: string[]
  coveredAreas: string[]
  seoKeywords: string[]
}

export const areaData: Record<string, AreaData> = {
  shibuya: {
    id: 'shibuya',
    name: '渋谷',
    nameEn: 'Shibuya',
    title: '渋谷エリアの飲食店撮影サービス',
    description: '渋谷駅周辺の飲食店専門撮影。センター街、道玄坂、宮益坂など渋谷全域に出張。若者向けSNS映え重視の撮影が得意です。',
    metaDescription: '渋谷の飲食店撮影ならPhotoStudio。渋谷駅周辺、センター街、道玄坂、宮益坂の飲食店に出張撮影。SNS映えする料理写真でInstagram集客をサポート。',
    coordinates: {
      latitude: 35.658034,
      longitude: 139.701636
    },
    serviceRadius: 2,
    features: [
      'SNS映えを意識した撮影スタイル',
      '若者向け店舗の撮影実績多数',
      'トレンド感のある構図提案',
      '深夜営業店舗にも対応'
    ],
    popularCuisines: [
      'イタリアン',
      'カフェ・スイーツ',
      '創作居酒屋',
      'エスニック料理',
      'ラーメン'
    ],
    shootingStats: {
      totalShops: '渋谷エリアで50店舗以上の撮影実績',
      popularPlan: 'スタンダードプラン（SNS用多数カット）',
      bestTime: 'ランチ前（11:00-12:00）が人気'
    },
    localInfo: {
      access: '渋谷駅から徒歩圏内は出張費無料',
      parking: '近隣コインパーキング利用（撮影費に含む）',
      specialNotes: '人通りの多いエリアでも配慮した撮影を実施'
    },
    cases: [
      {
        shopType: 'イタリアンバル',
        area: 'センター街',
        result: 'Instagram経由の予約が3倍増加',
        comment: 'ピザの湯気とチーズの伸びを完璧に撮影していただきました。投稿のいいね数が以前の5倍になり、実際の来店にも繋がっています。'
      },
      {
        shopType: 'カフェ',
        area: '宮益坂',
        result: '新メニューの売上が200%アップ',
        comment: 'パンケーキの断面やクリームの質感まで美しく撮影していただき、SNSでバズりました。撮影後1週間で予約が満席になりました。'
      },
      {
        shopType: '創作和食',
        area: '道玄坂',
        result: '客単価が2,000円向上',
        comment: 'コース料理全体の流れがわかる撮影で、高級感が伝わる写真になりました。予約時のコース注文率が大幅に上がりました。'
      }
    ],
    faqs: [
      {
        question: '渋谷駅から離れた場所でも出張可能ですか？',
        answer: '渋谷区内であれば基本料金内で出張いたします。代々木、原宿、恵比寿方面も対応可能です。'
      },
      {
        question: 'センター街の雑踏でも撮影できますか？',
        answer: 'はい、可能です。店内撮影を中心に、必要に応じて人通りの少ない時間帯での外観撮影も提案させていただきます。'
      },
      {
        question: '深夜営業の居酒屋ですが対応できますか？',
        answer: 'もちろん対応可能です。営業時間に合わせて撮影時間を調整いたします。ランチ営業前の撮影も人気です。'
      }
    ],
    nearbyStations: [
      '渋谷駅',
      '表参道駅',
      '原宿駅',
      '代々木駅',
      '恵比寿駅'
    ],
    coveredAreas: [
      'センター街',
      '道玄坂',
      '宮益坂',
      '渋谷マークシティ周辺',
      '桜丘町',
      '神泉エリア'
    ],
    seoKeywords: [
      '渋谷 飲食店 撮影',
      '渋谷 料理撮影 カメラマン',
      '渋谷 レストラン 写真',
      'センター街 飲食店 撮影',
      '道玄坂 料理写真'
    ]
  },
  
  shinjuku: {
    id: 'shinjuku',
    name: '新宿',
    nameEn: 'Shinjuku',
    title: '新宿エリアの飲食店撮影サービス',
    description: '新宿駅周辺、歌舞伎町、西新宿の飲食店撮影。ビジネス街から繁華街まで、多様な飲食店の撮影経験豊富。',
    metaDescription: '新宿の飲食店撮影ならPhotoStudio。新宿駅周辺、歌舞伎町、西新宿の飲食店に出張撮影。ビジネスランチから深夜営業店まで幅広く対応。',
    coordinates: {
      latitude: 35.689487,
      longitude: 139.691711
    },
    serviceRadius: 2,
    features: [
      'ビジネス街の高級店撮影',
      '繁華街の大衆店にも対応',
      '24時間対応可能',
      '多言語メニュー撮影経験豊富'
    ],
    popularCuisines: [
      '高級和食',
      '焼肉・ホルモン',
      '中華料理',
      'ビジネスランチ',
      '居酒屋・バー'
    ],
    shootingStats: {
      totalShops: '新宿エリアで80店舗以上の撮影実績',
      popularPlan: 'プレミアムプラン（コース料理撮影）',
      bestTime: '14:00-16:00（アイドルタイム）'
    },
    localInfo: {
      access: '新宿駅各出口から徒歩圏内は出張費無料',
      parking: '西新宿は駐車場完備ビル多数',
      specialNotes: '高層ビル内の店舗も機材運搬対応'
    },
    cases: [
      {
        shopType: '高級寿司店',
        area: '西新宿',
        result: '予約単価が15,000円アップ',
        comment: '握りの美しさ、ネタの輝きを見事に表現していただきました。ホームページを見て来店されるお客様が倍増しました。'
      },
      {
        shopType: '焼肉店',
        area: '歌舞伎町',
        result: '土日の予約が常に満席に',
        comment: '肉の断面、脂の照り、炭火の雰囲気まで完璧でした。Google評価も4.5に上昇し、新規客が途切れません。'
      },
      {
        shopType: 'ビストロ',
        area: '南新宿',
        result: 'ランチ売上が40%増加',
        comment: 'ランチメニューを魅力的に撮影していただき、近隣のオフィスワーカーの来店が急増しました。'
      }
    ],
    faqs: [
      {
        question: '歌舞伎町の深夜営業店でも撮影できますか？',
        answer: 'はい、24時間対応可能です。深夜・早朝の撮影も追加料金なしで承ります。'
      },
      {
        question: '高層ビルの上階でも機材持ち込みは可能ですか？',
        answer: '問題ございません。必要な機材は全て持ち込み、エレベーター利用で対応いたします。'
      },
      {
        question: 'ビジネス街なので平日昼は避けたいのですが？',
        answer: '土日祝日の撮影も対応しております。営業時間外の早朝撮影も人気です。'
      }
    ],
    nearbyStations: [
      '新宿駅',
      '新宿三丁目駅',
      '西新宿駅',
      '代々木駅',
      '新宿御苑前駅'
    ],
    coveredAreas: [
      '歌舞伎町',
      '西新宿',
      '南新宿',
      '新宿三丁目',
      '代々木',
      '高田馬場'
    ],
    seoKeywords: [
      '新宿 飲食店 撮影',
      '新宿 料理撮影 出張',
      '歌舞伎町 レストラン 写真',
      '西新宿 飲食店 カメラマン',
      '新宿三丁目 料理写真'
    ]
  },
  
  yokohama: {
    id: 'yokohama',
    name: '横浜',
    nameEn: 'Yokohama',
    title: '横浜エリアの飲食店撮影サービス',
    description: '横浜駅周辺、みなとみらい、関内、中華街の飲食店撮影。港町の雰囲気を活かした撮影が得意です。',
    metaDescription: '横浜の飲食店撮影ならPhotoStudio。横浜駅、みなとみらい、関内、中華街の飲食店に出張撮影。横浜の魅力を引き出す撮影で集客アップ。',
    coordinates: {
      latitude: 35.443708,
      longitude: 139.638026
    },
    serviceRadius: 5,
    features: [
      '港町の雰囲気を活かした撮影',
      '中華街専門店の撮影経験',
      'デートスポット向け演出',
      'オーシャンビュー店舗の撮影'
    ],
    popularCuisines: [
      '中華料理',
      'イタリアン',
      'シーフード',
      'フレンチ',
      'カフェ・ベーカリー'
    ],
    shootingStats: {
      totalShops: '横浜エリアで60店舗以上の撮影実績',
      popularPlan: 'スタンダードプラン（店内雰囲気重視）',
      bestTime: '午前中（自然光活用）'
    },
    localInfo: {
      access: '横浜駅・みなとみらい駅から徒歩圏内は出張費無料',
      parking: 'みなとみらい地区は駐車場充実',
      specialNotes: '観光地の雰囲気を活かした撮影提案'
    },
    cases: [
      {
        shopType: '中華料理店',
        area: '中華街',
        result: '観光客の来店が2倍に',
        comment: '本場感あふれる料理写真で、食べログ評価も3.8に上昇。外国人観光客の予約も増えました。'
      },
      {
        shopType: 'イタリアン',
        area: 'みなとみらい',
        result: 'ディナー予約が30%増加',
        comment: '夜景と料理のコラボレーション撮影が大成功。記念日利用のお客様が大幅に増えました。'
      },
      {
        shopType: 'カフェ',
        area: '元町',
        result: 'インスタフォロワー3000人増',
        comment: 'おしゃれな店内と映えるスイーツの撮影で、若い女性客が連日来店するようになりました。'
      }
    ],
    faqs: [
      {
        question: '中華街の狭い店舗でも撮影可能ですか？',
        answer: 'はい、狭小店舗での撮影経験も豊富です。限られたスペースでも効果的な撮影を行います。'
      },
      {
        question: 'みなとみらいの高層階でも出張できますか？',
        answer: 'もちろん可能です。オーシャンビューを活かした撮影も得意としています。'
      },
      {
        question: '横浜駅から離れた場所は追加料金がかかりますか？',
        answer: '横浜市内であれば基本料金内で対応いたします。鎌倉方面も相談可能です。'
      }
    ],
    nearbyStations: [
      '横浜駅',
      'みなとみらい駅',
      '関内駅',
      '桜木町駅',
      '元町・中華街駅'
    ],
    coveredAreas: [
      'みなとみらい',
      '関内',
      '中華街',
      '元町',
      '馬車道',
      '野毛'
    ],
    seoKeywords: [
      '横浜 飲食店 撮影',
      '横浜 料理撮影 カメラマン',
      'みなとみらい レストラン 写真',
      '中華街 飲食店 撮影',
      '関内 料理写真'
    ]
  },

  ikebukuro: {
    id: 'ikebukuro',
    name: '池袋',
    nameEn: 'Ikebukuro',
    title: '池袋エリアの飲食店撮影サービス',
    description: '池袋の多様な飲食店に対応。ラーメン店から高級レストランまで、豊富な撮影実績があります。',
    metaDescription: '池袋エリアの飲食店撮影なら飲食店撮影PhotoStudio。西口・東口・南口すべてのエリアに対応。ラーメン激戦区での撮影実績多数。',
    coordinates: {
      latitude: 35.7295,
      longitude: 139.7109
    },
    serviceRadius: 5,
    features: [
      'ラーメン激戦区での豊富な撮影実績',
      '大型商業施設内の店舗撮影対応',
      '深夜営業店舗の撮影も可能',
      '多国籍料理の撮影経験豊富'
    ],
    popularCuisines: ['ラーメン', '中華料理', '焼肉', '居酒屋', 'イタリアン', 'エスニック', '寿司', 'カフェ'],
    shootingStats: {
      totalShops: '280店舗以上',
      popularPlan: 'ラーメン特化プラン',
      bestTime: '14:00-17:00'
    },
    localInfo: {
      access: 'JR・私鉄・地下鉄の主要ターミナル駅',
      parking: 'コインパーキング多数（30分300円程度）',
      specialNotes: '商業施設内は事前申請が必要な場合あり'
    },
    cases: [
      {
        shopType: 'ラーメン店',
        area: '西口エリア',
        result: 'SNS投稿数300%増加',
        comment: 'スープの湯気まで美しく撮影していただき、来店数が大幅に増えました'
      },
      {
        shopType: '大衆居酒屋',
        area: '東口エリア',
        result: '団体予約50%増加',
        comment: '賑やかな雰囲気が伝わる写真で、会社の宴会予約が増えました'
      },
      {
        shopType: 'エスニック料理',
        area: '南池袋',
        result: '新規客40%増加',
        comment: '本場の雰囲気が伝わる撮影で、エスニック料理ファンが増えました'
      }
    ],
    faqs: [
      {
        question: '池袋の繁華街での撮影は可能ですか？',
        answer: 'はい、可能です。西口・東口の繁華街でも多数の撮影実績があります。混雑時間を避けた撮影プランもご提案可能です。'
      },
      {
        question: '大型商業施設内の店舗撮影の注意点は？',
        answer: '施設によっては事前申請が必要な場合があります。申請手続きのサポートも行っておりますので、お気軽にご相談ください。'
      }
    ],
    nearbyStations: ['池袋駅', '東池袋駅', '要町駅', '雑司が谷駅', '目白駅'],
    coveredAreas: ['西池袋', '東池袋', '南池袋', '池袋本町', '上池袋', '要町', '高田', '雑司が谷'],
    seoKeywords: ['池袋 飲食店撮影', '池袋 ラーメン撮影', '池袋 料理写真', '池袋 メニュー撮影']
  },

  shinagawa: {
    id: 'shinagawa',
    name: '品川',
    nameEn: 'Shinagawa',
    title: '品川エリアの飲食店撮影サービス',
    description: 'ビジネス街品川の洗練された飲食店撮影。オフィスワーカー向けの訴求力ある写真を提供します。',
    metaDescription: '品川エリアの飲食店撮影は飲食店撮影PhotoStudioへ。港南・高輪・大崎エリア対応。ビジネスランチ需要に強い撮影。',
    coordinates: {
      latitude: 35.6284,
      longitude: 139.7387
    },
    serviceRadius: 5,
    features: [
      'ビジネスランチの撮影に特化',
      'ホテル内レストランの撮影実績',
      '早朝・深夜の撮影対応',
      'オフィスケータリング撮影も可能'
    ],
    popularCuisines: ['和食', 'フレンチ', '鉄板焼き', 'ビストロ', '定食', 'カフェ', '寿司', 'イタリアン'],
    shootingStats: {
      totalShops: '220店舗以上',
      popularPlan: 'ビジネスランチプラン',
      bestTime: '15:00-17:00'
    },
    localInfo: {
      access: '品川駅から徒歩圏内',
      parking: 'ビル併設駐車場利用可（有料）',
      specialNotes: 'オフィスビル内は入館手続きが必要'
    },
    cases: [
      {
        shopType: '高級和食',
        area: '高輪エリア',
        result: '接待利用200%増加',
        comment: '上品な雰囲気が伝わる撮影で、ビジネス利用が大幅に増加しました'
      },
      {
        shopType: 'ビストロ',
        area: '港南エリア',
        result: 'ランチ売上30%増加',
        comment: 'オフィスワーカーに響く写真で、ランチタイムが満席続きです'
      },
      {
        shopType: 'ホテルレストラン',
        area: '品川駅前',
        result: '記念日利用150%増加',
        comment: '特別感のある写真で、記念日やお祝いの予約が増えました'
      }
    ],
    faqs: [
      {
        question: '品川のオフィスビル内での撮影は可能ですか？',
        answer: 'はい、可能です。入館手続きなど必要な場合はサポートいたします。多くのオフィスビル内レストランでの撮影実績があります。'
      },
      {
        question: 'ビジネスランチ向けの撮影とは？',
        answer: 'スピーディーな提供が伝わる構図や、ボリューム感、価格訴求力のある撮影を心がけています。'
      }
    ],
    nearbyStations: ['品川駅', '北品川駅', '新馬場駅', '大崎駅', '五反田駅'],
    coveredAreas: ['港南', '高輪', '北品川', '東品川', '南品川', '大崎', '西五反田', '東五反田'],
    seoKeywords: ['品川 飲食店撮影', '品川 ビジネスランチ撮影', '品川 レストラン撮影', '港南 料理写真']
  },

  ginza: {
    id: 'ginza',
    name: '銀座',
    nameEn: 'Ginza',
    title: '銀座エリアの飲食店撮影サービス',
    description: '高級飲食店が集まる銀座での洗練された撮影。ミシュラン掲載店の撮影実績も豊富です。',
    metaDescription: '銀座エリアの高級飲食店撮影なら飲食店撮影PhotoStudio。一流の料理を一流の技術で撮影。有名店の実績多数。',
    coordinates: {
      latitude: 35.6717,
      longitude: 139.7650
    },
    serviceRadius: 3,
    features: [
      '高級店撮影の豊富な実績',
      'ミシュラン掲載店の撮影経験',
      '懐石・会席料理の専門知識',
      'ワイン・日本酒の撮影も対応'
    ],
    popularCuisines: ['懐石', 'フレンチ', '鮨', '天ぷら', '鉄板焼き', 'イタリアン', '中華', 'バー'],
    shootingStats: {
      totalShops: '180店舗以上',
      popularPlan: 'プレミアムプラン',
      bestTime: '14:00-16:00'
    },
    localInfo: {
      access: '銀座駅・有楽町駅から徒歩圏',
      parking: '時間貸し駐車場（30分600円〜）',
      specialNotes: '高級店は撮影時間に制限がある場合あり'
    },
    cases: [
      {
        shopType: '高級鮨店',
        area: '銀座中央通り',
        result: '予約3ヶ月待ち',
        comment: '職人の技と素材の美しさを完璧に表現していただきました'
      },
      {
        shopType: 'フレンチレストラン',
        area: '銀座6丁目',
        result: 'コース予約80%増加',
        comment: '芸術的な盛り付けを美しく撮影していただき、高級感が伝わります'
      },
      {
        shopType: '老舗料亭',
        area: '銀座8丁目',
        result: '若年層客60%増加',
        comment: '伝統と革新を感じる写真で、新しい客層を開拓できました'
      }
    ],
    faqs: [
      {
        question: '銀座の高級店での撮影料金は高くなりますか？',
        answer: '基本料金は変わりません。ただし、店舗のご要望により追加オプションをご利用いただく場合があります。'
      },
      {
        question: 'ミシュラン掲載店での撮影経験は？',
        answer: '複数のミシュラン掲載店での撮影実績があります。高級店特有の雰囲気を大切にした撮影を心がけています。'
      }
    ],
    nearbyStations: ['銀座駅', '有楽町駅', '銀座一丁目駅', '東銀座駅', '新橋駅'],
    coveredAreas: ['銀座1〜8丁目', '有楽町', '新橋', '築地', '京橋', '日比谷'],
    seoKeywords: ['銀座 高級レストラン撮影', '銀座 料理撮影', '銀座 飲食店カメラマン', '銀座 メニュー写真']
  },

  roppongi: {
    id: 'roppongi',
    name: '六本木',
    nameEn: 'Roppongi',
    title: '六本木エリアの飲食店撮影サービス',
    description: '国際色豊かな六本木の飲食店撮影。外国人客にもアピールする写真を提供します。',
    metaDescription: '六本木エリアの飲食店撮影は飲食店撮影PhotoStudioへ。インターナショナルな雰囲気の撮影が得意。バー・クラブの撮影も対応。',
    coordinates: {
      latitude: 35.6627,
      longitude: 139.7316
    },
    serviceRadius: 3,
    features: [
      '多国籍料理の撮影経験豊富',
      'バー・クラブの雰囲気撮影',
      '外国人向けメニュー撮影',
      '深夜営業店舗の撮影対応'
    ],
    popularCuisines: ['イタリアン', 'フレンチ', 'アメリカン', 'メキシカン', '創作料理', 'バー', '焼肉', '和食'],
    shootingStats: {
      totalShops: '200店舗以上',
      popularPlan: 'インターナショナルプラン',
      bestTime: '15:00-18:00'
    },
    localInfo: {
      access: '六本木駅・乃木坂駅から徒歩圏',
      parking: '時間貸し駐車場多数',
      specialNotes: '夜間撮影の需要が高いエリア'
    },
    cases: [
      {
        shopType: 'イタリアンバー',
        area: '六本木交差点付近',
        result: '外国人客70%増加',
        comment: 'インスタ映えする写真で、海外からのお客様が増えました'
      },
      {
        shopType: 'モダン和食',
        area: '六本木ヒルズ',
        result: 'ディナー予約60%増加',
        comment: '洗練された雰囲気が伝わる写真で、特別な日の利用が増えました'
      },
      {
        shopType: 'ルーフトップバー',
        area: '六本木7丁目',
        result: '週末売上40%増加',
        comment: '夜景と料理の美しい写真で、週末の集客が大幅アップしました'
      }
    ],
    faqs: [
      {
        question: '六本木の夜間撮影は可能ですか？',
        answer: 'はい、深夜営業のバーやクラブでの撮影も対応しています。照明を活かした雰囲気のある撮影が可能です。'
      },
      {
        question: '外国人向けのメニュー撮影とは？',
        answer: '英語メニューの撮影はもちろん、視覚的に料理内容が伝わる撮影を心がけています。多言語対応も可能です。'
      }
    ],
    nearbyStations: ['六本木駅', '乃木坂駅', '六本木一丁目駅', '麻布十番駅', '神谷町駅'],
    coveredAreas: ['六本木', '西麻布', '麻布十番', '赤坂', '虎ノ門', '神谷町', '乃木坂'],
    seoKeywords: ['六本木 飲食店撮影', '六本木 バー撮影', '六本木 レストラン写真', '六本木 料理カメラマン']
  }
}

// 地域リストを取得
export const getAreaList = () => {
  return Object.values(areaData).map(area => ({
    id: area.id,
    name: area.name,
    title: area.title
  }))
}

// 特定の地域データを取得
export const getAreaData = (areaId: string): AreaData | null => {
  return areaData[areaId] || null
}