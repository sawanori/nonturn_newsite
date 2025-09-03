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