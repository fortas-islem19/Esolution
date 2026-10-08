// ============================================================
//  إرسال بيانات الاستمارة إلى Google Sheets
//  الفكرة: نرسل البيانات إلى سكربت Google Apps Script
//  والسكربت يضيفها كسطر جديد في جدول Google Sheets
// ============================================================

import { GOOGLE_SCRIPT_URL } from '../config'

export async function sendToGoogleSheets(data) {
  if (!GOOGLE_SCRIPT_URL) {
    throw new Error('لم يتم ضبط رابط Google Script في ملف .env')
  }

  // نضيف تاريخ ووقت الطلب
  const payload = {
    ...data,
    date: new Date().toLocaleString('fr-DZ'),
  }

  // mode: 'no-cors' ضروري لأن Google لا تسمح بقراءة الرد من موقع آخر
  // لذلك لا نستطيع قراءة الرد، لكن البيانات تصل بشكل طبيعي
  await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    body: new URLSearchParams(payload),
  })
}
