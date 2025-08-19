import { z } from "zod";

export const ORDER_TYPES = ["individual", "corporate"] as const;
export const BILL_TO = ["applicant", "store", "separate"] as const;
export const PLANS = ["light", "standard", "premium"] as const;
export const EXTRA_MINUTES = [0, 30, 60, 90, 120] as const;

export const mediaSchema = z.object({
  web: z.boolean().optional(),
  print: z.boolean().optional(),
  signage: z.boolean().optional(),
}).refine(v => v.web || v.print || v.signage, { message: "少なくとも1つ選択してください" });

export const dateTimeSchema = z.object({
  date: z.string().min(1, "日付は必須です"),
  time: z.string().min(1, "時間は必須です"),
});

const jpZip = /^\d{3}-?\d{4}$/;
const phone = /^[0-9\-+() ]{9,16}$/;

export const addressSchema = z.object({
  postal: z.string().regex(jpZip, "郵便番号の形式が不正です"),
  prefecture: z.string().min(1, "都道府県は必須です"),
  city: z.string().min(1, "市区郡は必須です"),
  address1: z.string().min(1, "町村番地以下は必須です"),
});

export const formSchema = z.object({
  applicantType: z.enum(ORDER_TYPES),
  applicantName: z.string().min(1, "申込者名称は必須です"),
  applicantKana: z.string().min(1, "フリガナは必須です"),
  applicantAddress: addressSchema,
  applicantPhone: z.string().regex(phone, "電話番号の形式が不正です"),
  applicantEmail: z.string().email("メールアドレスの形式が不正です"),

  corporate: z.object({
    contactName: z.string().min(1, "担当者名は必須です"),
    contactKana: z.string().min(1, "フリガナは必須です"),
    relation: z.string().min(1, "店舗との関係は必須です"),
  }).optional(),

  store: z.object({
    name: z.string().min(1, "店舗名は必須です"),
    address: addressSchema,
    phone: z.string().regex(phone, "電話番号の形式が不正です"),
    managerName: z.string().min(1, "責任者名は必須です"),
    managerKana: z.string().min(1, "フリガナは必須です"),
    coordinator: z.enum(["applicant", "corporateContact", "storeManager"]),
    attendees: z.array(z.enum(["applicant", "corporateContact", "storeManager"])).min(1, "同席者を1名以上選択してください"),
  }),

  billingTo: z.enum(BILL_TO),
  billingAddress: addressSchema.optional(),

  plan: z.enum(PLANS),
  extraMinutes: z.enum(EXTRA_MINUTES.map(String) as [string, ...string[]]),
  phoneCall: z.boolean().optional(),
  locationScout: z.boolean().optional(),
  namedPhotographer: z.boolean().optional(),

  wish1: dateTimeSchema,
  wish2: dateTimeSchema.optional(),
  wish3: dateTimeSchema.optional(),

  cuts: z.object({
    food: z.coerce.number().min(0).max(999),
    interior: z.coerce.number().min(0).max(999),
    exterior: z.coerce.number().min(0).max(999),
    people: z.coerce.number().min(0).max(999),
    note: z.string().optional(),
  }),

  media: mediaSchema,

  campaignCode: z.string().optional(),
  referralCode: z.string().optional(),

  agree: z.boolean().refine(v => v === true, { message: "利用規約への同意が必要です" }),

  // honeypot
  website: z.string().max(0).optional(),
})
.superRefine((data, ctx) => {
  if (data.applicantType === "corporate" && !data.corporate) {
    ctx.addIssue({ 
      code: "custom", 
      message: "法人情報は必須です",
      path: ["corporate"]
    });
  }
  if (data.billingTo === "separate" && !data.billingAddress) {
    ctx.addIssue({ 
      code: "custom", 
      message: "請求先住所は必須です",
      path: ["billingAddress"]
    });
  }
  if (data.phoneCall && data.locationScout) {
    ctx.addIssue({ 
      code: "custom", 
      message: "電話打合せとロケハンは同時選択できません",
      path: ["phoneCall"]
    });
  }
});

export type FoodOrder = z.infer<typeof formSchema>;

export function calcTotalJPY(payload: FoodOrder): { total: number; breakdown: string[] } {
  const planPrice: Record<FoodOrder["plan"], number> = {
    light: 33000,
    standard: 44000,
    premium: 66000,
  };
  
  const extraPrice: Record<string, number> = { 
    "0": 0, 
    "30": 5500, 
    "60": 11000, 
    "90": 16500, 
    "120": 22000 
  };
  
  const items: string[] = [];
  let total = 0;
  
  // プラン料金
  total += planPrice[payload.plan]; 
  items.push(`プラン: ¥${planPrice[payload.plan].toLocaleString()}`);
  
  // 追加時間
  const extraCost = extraPrice[payload.extraMinutes] || 0;
  if (extraCost > 0) {
    total += extraCost;
    items.push(`追加時間: ¥${extraCost.toLocaleString()}`);
  }
  
  // オプション
  if (payload.phoneCall) { 
    total += 1100; 
    items.push("電話打合せ: ¥1,100"); 
  }
  if (payload.locationScout) { 
    total += 11000; 
    items.push("ロケハン: ¥11,000"); 
  }
  if (payload.namedPhotographer) { 
    total += 5500; 
    items.push("カメラマン指名: ¥5,500"); 
  }

  return { total, breakdown: items };
}