// ============================================================
//  ملف الإعدادات العامة للموقع
//  غيّر المعلومات هنا وسيتم تحديثها في كل الصفحة تلقائياً
// ============================================================

export const COMPANY = {
  name: 'Esolutions',
  slogan: 'انطلق بحساباتك نحو القمة',
  phone: '0558013034', // ← ضع رقم هاتفك هنا
  email: 'contact@esolutions.dz', // ← ضع بريدك هنا
  facebook: 'https://www.facebook.com/profile.php?id=61581861072274', // ← رابط صفحتك
  instagram: 'https://www.instagram.com/e_solutions.agency/', // ← رابط حسابك
}

// رابط Google Apps Script (يُقرأ من ملف .env)
// راجع ملف README.md لمعرفة طريقة الحصول عليه
export const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || ''

// المنصات التي تظهر في الاستمارة
export const PLATFORMS = ['فيسبوك', 'إنستغرام', 'تيك توك', 'يوتيوب']
