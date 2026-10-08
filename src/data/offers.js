// ============================================================
//  العروض والأسعار
//  لإضافة عرض جديد: انسخ أي كائن { ... } والصقه وغيّر قيمه
//  - id: رقم فريد لكل عرض
//  - subscribers: عدد المشتركين
//  - price: السعر بالدينار الجزائري
//  - popular: true لإبراز العرض كـ "الأكثر طلباً" (عرض واحد فقط)
//  - features: المزايا (تأكد أنها مطابقة لما تقدمه فعلاً)
// ============================================================

export const OFFERS = [
  {
    id: 1,
    title: 'التجربة 1000 مشترك',
    subscribers: 1000,
    price: 700,
    features: ['بدء التنفيذ خلال 24 ساعة', 'دعم عبر الواتساب'],
    popular: false,
  },
  {
    id: 2,
    title: ' البداية 2000 مشترك',
    subscribers: 2000,
    price: 1300,
    features: ['بدء التنفيذ خلال 24 ساعة', 'دعم عبر الواتساب'],
    popular: false,
  },
  {
    id: 3,
    title: 'الانطلاقة 5000 مشترك',
    subscribers: 5000,
    price: 3000,
    features: ['بدء التنفيذ خلال 24 ساعة', 'دعم عبر الواتساب'],
    popular: false,
  },
  {
    id: 4,
    title: 'الصاروخ 10000 مشترك',
    subscribers: 10000,
    price: 5500,
    features: ['بدء التنفيذ خلال 24 ساعة', 'أولوية في الدعم'],
    popular: true,
  },
  {
    id: 5,
    title: 'التحليق 20000 مشترك',
    subscribers: 20000,
    price: 10000,
    features: ['بدء التنفيذ خلال 24 ساعة', 'أولوية في الدعم'],
    popular: false,
  },
  {
    id: 6,
    title: 'الاحتراف 50000 مشترك',
    subscribers: 50000,
    price: 23000,
    features: ['تسليم تدريجي طبيعي', 'أولوية في الدعم'],
    popular: false,
  },
  {
    id: 7,
    title: 'النخبة 100000 مشترك',
    subscribers: 100000,
    price: 42000,
    features: ['تسليم تدريجي طبيعي', 'متابعة شخصية للطلب'],
    popular: false,
  },
]

// دالة صغيرة لعرض الأرقام بشكل جميل: 10000 → 10,000
export const formatNumber = (n) => n.toLocaleString('en-US')

// عدد المشتركين بشكل مختصر: 10000 → 10K
export const shortNumber = (n) => (n >= 1000 ? `${n / 1000}K` : `${n}`)

// سعر كل 1000 مشترك في العرض (يُحسب تلقائياً)
export const pricePer1000 = (offer) => Math.round((offer.price / offer.subscribers) * 1000)

// نسبة التوفير مقارنة بأصغر عرض (يُحسب تلقائياً من الأسعار)
export const savingPercent = (offer) => {
  const base = pricePer1000(OFFERS[0])
  return Math.round((1 - pricePer1000(offer) / base) * 100)
}
