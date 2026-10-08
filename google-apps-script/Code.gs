/**
 * ============================================================
 *  سكربت Google Apps Script لاستقبال طلبات الموقع
 *  انسخ هذا الكود كاملاً داخل: Extensions → Apps Script
 *  (راجع README.md للخطوات بالتفصيل)
 * ============================================================
 */

// اسم الورقة (التبويب) داخل جدول Google Sheets
const SHEET_NAME = 'الطلبات';

// ترتيب الأعمدة في الجدول (يجب أن تطابق أسماء الحقول في الموقع)
const COLUMNS = ['date', 'name', 'phone', 'platform', 'offer', 'accountLink', 'notes'];
const HEADERS = ['التاريخ', 'الاسم', 'الهاتف', 'المنصة', 'العرض', 'رابط الحساب', 'ملاحظات'];

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  // إنشاء الورقة وعناوين الأعمدة تلقائياً في أول مرة
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  // أخذ القيم بنفس ترتيب الأعمدة وإضافتها كسطر جديد
  const row = COLUMNS.map((key) => e.parameter[key] || '');
  sheet.appendRow(row);

  return ContentService.createTextOutput('OK');
}
