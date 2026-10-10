// ============================================================
//  إرسال بيانات الاستمارة إلى Google Sheets
//  الفكرة: نرسل البيانات إلى سكربت Google Apps Script
//  والسكربت يضيفها كسطر جديد في جدول Google Sheets
// ============================================================

import { GOOGLE_SCRIPT_URL } from '../config'

export function sendToGoogleSheets(data) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('لم يتم ضبط رابط Google Script في ملف .env')
  }
  if (!navigator.onLine) {
    throw new Error('لا يوجد اتصال بالإنترنت')
  }

  // نضيف تاريخ ووقت الطلب
  const payload = {
    ...data,
    date: new Date().toLocaleString('fr-DZ'),
  }

  // mode: 'no-cors' ضروري لأن Google لا تسمح بقراءة الرد من موقع آخر
  // لذلك لا ننتظر الرد (Google تأخذ عدة ثوانٍ)، والطلب يكمل في الخلفية
  // keepalive: يضمن وصول الطلب حتى لو أغلق الزائر الصفحة
  fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    keepalive: true,
    body: new URLSearchParams(payload),
  }).catch((err) => console.error('Google Sheets:', err))
}
