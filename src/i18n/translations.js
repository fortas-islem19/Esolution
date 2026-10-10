// ============================================================
//  نصوص الموقع باللغتين: العربية (ar) والفرنسية (fr)
//  لتعديل أي نص: غيّره هنا في اللغتين
//  (نصوص العروض والأسئلة والآراء موجودة في مجلد data)
// ============================================================

export const LANGUAGES = {
  ar: { label: 'العربية', short: 'ع', dir: 'rtl' },
  fr: { label: 'Français', short: 'FR', dir: 'ltr' },
}

export const DEFAULT_LANG = 'ar'

export const TRANSLATIONS = {
  ar: {
    meta: {
      title: 'Esolutions | زيادة المشتركين',
      description: 'Esolutions - خدمة زيادة المشتركين والمتابعين في حسابات السوشل ميديا',
    },
    nav: {
      offers: 'العروض',
      testimonials: 'آراء العملاء',
      faq: 'الأسئلة',
      order: 'اطلب الآن',
      switchTo: 'Français',
    },
    hero: {
      slogan: 'انطلق بحساباتك نحو القمة',
      titleStart: 'ضاعف ',
      titleHighlight: 'مشتركيك',
      titleLine2: 'وانطلق كالصاروخ 🚀',
      text: (name) =>
        `مع ${name} تحصل على نمو سريع وآمن لحساباتك في فيسبوك، إنستغرام، تيك توك ويوتيوب، بأسعار مناسبة وبدفع داخل الجزائر.`,
      seeOffers: 'شاهد العروض ←',
      order: 'اطلب الخدمة',
      stats: { clients: 'عميل راضٍ', start: 'لبدء التنفيذ', platforms: 'منصات مدعومة', hours: 'س' },
      floating: { followers: 'متابع', likes: 'إعجاب', subscribers: 'مشترك' },
      scroll: 'انزل للأسفل',
    },
    offers: {
      eyebrow: 'الباقات',
      title: 'العروض والأسعار',
      sub: 'اختر الباقة المناسبة لك',
      popular: 'الأكثر طلباً',
      subscribers: 'مشترك',
      currency: 'دج',
      save: (n) => `وفّر ${n}%`,
      choose: 'اختر هذا العرض',
    },
    testimonials: {
      eyebrow: 'شهادات',
      title: 'آراء المتعاملين معنا',
      sub: 'ثقة عملائنا هي سر نجاحنا',
    },
    form: {
      eyebrow: 'الطلب',
      title: 'اطلب الخدمة الآن',
      sub: 'املأ الاستمارة وسنتواصل معك في أقرب وقت',
      name: 'الاسم الكامل *',
      phone: 'رقم الهاتف *',
      platform: 'المنصة *',
      choosePlatform: '-- اختر المنصة --',
      offer: 'العرض *',
      chooseOffer: '-- اختر العرض --',
      link: 'رابط الحساب أو الصفحة *',
      notes: 'ملاحظات (اختياري)',
      submit: 'إرسال الطلب 🚀',
      sending: 'جاري الإرسال...',
      error: '❌ حدث خطأ، حاول مرة أخرى أو اتصل بنا.',
      phoneErrors: {
        required: 'رقم الهاتف مطلوب',
        digits: 'رقم الهاتف يجب أن يحتوي على أرقام فقط',
        prefix: 'رقم الهاتف يجب أن يبدأ بـ 05 أو 06 أو 07',
        length: 'رقم الهاتف يجب أن يتكون من 10 أرقام (مثال: 0555123456)',
      },
    },
    faq: {
      eyebrow: 'أسئلة',
      title: 'الأسئلة الشائعة',
      sub: 'إجابات على أكثر الأسئلة التي تصلنا',
    },
    thanks: {
      title: 'شكراً لك!',
      text: 'تم استلام طلبك بنجاح، سنتصل بك في أقرب وقت.',
      redirect: (s) => `سيتم إرجاعك إلى الصفحة الرئيسية خلال ${s} ثوانٍ`,
      back: 'العودة الآن',
    },
    footer: {
      facebook: 'فيسبوك',
      instagram: 'إنستغرام',
      rights: 'جميع الحقوق محفوظة',
    },
  },

  fr: {
    meta: {
      title: 'Esolutions | Boostez vos abonnés',
      description: "Esolutions - service pour augmenter les abonnés et followers de vos comptes sur les réseaux sociaux",
    },
    nav: {
      offers: 'Offres',
      testimonials: 'Avis clients',
      faq: 'FAQ',
      order: 'Commander',
      switchTo: 'العربية',
    },
    hero: {
      slogan: 'Propulsez vos comptes vers le sommet',
      titleStart: 'Multipliez vos ',
      titleHighlight: 'abonnés',
      titleLine2: 'et décollez comme une fusée 🚀',
      text: (name) =>
        `Avec ${name}, profitez d'une croissance rapide et sûre de vos comptes Facebook, Instagram, TikTok et YouTube, à des prix abordables et avec paiement en Algérie.`,
      seeOffers: 'Voir les offres →',
      order: 'Commander',
      stats: { clients: 'clients satisfaits', start: 'pour démarrer', platforms: 'plateformes', hours: 'h' },
      floating: { followers: 'abonnés', likes: "j'aime", subscribers: 'abonnés' },
      scroll: 'Défiler vers le bas',
    },
    offers: {
      eyebrow: 'Formules',
      title: 'Offres et tarifs',
      sub: 'Choisissez la formule qui vous convient',
      popular: 'Le plus demandé',
      subscribers: 'abonnés',
      currency: 'DA',
      save: (n) => `Économisez ${n}%`,
      choose: 'Choisir cette offre',
    },
    testimonials: {
      eyebrow: 'Témoignages',
      title: 'Ce que disent nos clients',
      sub: 'La confiance de nos clients est le secret de notre succès',
    },
    form: {
      eyebrow: 'Commande',
      title: 'Commandez maintenant',
      sub: 'Remplissez le formulaire et nous vous contacterons rapidement',
      name: 'Nom complet *',
      phone: 'Numéro de téléphone *',
      platform: 'Plateforme *',
      choosePlatform: '-- Choisir la plateforme --',
      offer: 'Offre *',
      chooseOffer: "-- Choisir l'offre --",
      link: 'Lien du compte ou de la page *',
      notes: 'Remarques (facultatif)',
      submit: 'Envoyer la commande 🚀',
      sending: 'Envoi en cours...',
      error: '❌ Une erreur est survenue, réessayez ou contactez-nous.',
      phoneErrors: {
        required: 'Le numéro de téléphone est obligatoire',
        digits: 'Le numéro doit contenir uniquement des chiffres',
        prefix: 'Le numéro doit commencer par 05, 06 ou 07',
        length: 'Le numéro doit contenir 10 chiffres (ex. : 0555123456)',
      },
    },
    faq: {
      eyebrow: 'Questions',
      title: 'Questions fréquentes',
      sub: 'Les réponses aux questions que l’on nous pose le plus',
    },
    thanks: {
      title: 'Merci !',
      text: 'Votre commande a bien été reçue, nous vous contacterons très vite.',
      redirect: (s) => `Retour à la page d'accueil dans ${s} secondes`,
      back: 'Retour maintenant',
    },
    footer: {
      facebook: 'Facebook',
      instagram: 'Instagram',
      rights: 'Tous droits réservés',
    },
  },
}
