// ============================================================
//  العروض والأسعار (بالعربية والفرنسية)
//  لإضافة عرض جديد: انسخ أي كائن { ... } والصقه وغيّر قيمه
//  - id: رقم فريد لكل عرض
//  - title: اسم العرض باللغتين (الاسم العربي هو الذي يُسجَّل في Google Sheets)
//  - subscribers: عدد المشتركين
//  - price: السعر بالدينار الجزائري
//  - popular: true لإبراز العرض كـ "الأكثر طلباً" (عرض واحد فقط)
//  - features: المزايا (تأكد أنها مطابقة لما تقدمه فعلاً)
// ============================================================

// المزايا المتكررة (باللغتين)
const START_24H = { ar: 'بدء التنفيذ خلال 24 ساعة', fr: 'Démarrage sous 24 h' }
const WHATSAPP = { ar: 'دعم عبر الواتساب', fr: 'Support via WhatsApp' }
const PRIORITY = { ar: 'أولوية في الدعم', fr: 'Support prioritaire' }
const GRADUAL = { ar: 'تسليم تدريجي طبيعي', fr: 'Livraison progressive et naturelle' }
const PERSONAL = { ar: 'متابعة شخصية للطلب', fr: 'Suivi personnalisé de la commande' }

export const OFFERS = [
  {
    id: 1,
    title: { ar: 'التجربة 1000 مشترك', fr: 'Essai 1 000 abonnés' },
    subscribers: 1000,
    price: 700,
    features: [START_24H, WHATSAPP],
    popular: false,
  },
  {
    id: 2,
    title: { ar: 'البداية 2000 مشترك', fr: 'Débutant 2 000 abonnés' },
    subscribers: 2000,
    price: 1300,
    features: [START_24H, WHATSAPP],
    popular: false,
  },
  {
    id: 3,
    title: { ar: 'الانطلاقة 5000 مشترك', fr: 'Lancement 5 000 abonnés' },
    subscribers: 5000,
    price: 3000,
    features: [START_24H, WHATSAPP],
    popular: false,
  },
  {
    id: 4,
    title: { ar: 'الصاروخ 10000 مشترك', fr: 'Fusée 10 000 abonnés' },
    subscribers: 10000,
    price: 5500,
    features: [START_24H, PRIORITY],
    popular: true,
  },
  {
    id: 5,
    title: { ar: 'التحليق 20000 مشترك', fr: 'Envol 20 000 abonnés' },
    subscribers: 20000,
    price: 10000,
    features: [START_24H, PRIORITY],
    popular: false,
  },
  {
    id: 6,
    title: { ar: 'الاحتراف 50000 مشترك', fr: 'Pro 50 000 abonnés' },
    subscribers: 50000,
    price: 23000,
    features: [GRADUAL, PRIORITY],
    popular: false,
  },
  {
    id: 7,
    title: { ar: 'النخبة 100000 مشترك', fr: 'Élite 100 000 abonnés' },
    subscribers: 100000,
    price: 42000,
    features: [GRADUAL, PERSONAL],
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
