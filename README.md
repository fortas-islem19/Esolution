# موقع Esolutions — خدمة زيادة المشتركين

صفحة هبوط مبنية بـ **React + Vite**، تحتوي على:
واجهة رئيسية ← العروض والأسعار ← آراء العملاء ← استمارة طلب مربوطة بـ Google Sheets.

---

## 1) تشغيل المشروع على جهازك

تحتاج أولاً إلى تثبيت [Node.js](https://nodejs.org) (نسخة 18 أو أحدث).

```bash
npm install      # تثبيت المكتبات (مرة واحدة فقط)
npm run dev      # تشغيل الموقع ← افتح الرابط الذي يظهر (عادة http://localhost:5173)
npm run build    # تجهيز نسخة النشر داخل مجلد dist
```

---

## 2) هيكل المشروع (أين أعدّل؟)

```
esolutions/
├── public/logo.png            ← شعار الشركة
├── google-apps-script/Code.gs ← كود الربط مع Google Sheets
├── .env.example               ← مثال لملف الإعدادات السرية
└── src/
    ├── config.js              ← اسم الشركة، الهاتف، البريد، المنصات
    ├── index.css              ← الألوان والتصميم (المتغيرات في الأعلى)
    ├── App.jsx                ← ترتيب الأقسام في الصفحة
    ├── data/
    │   ├── offers.js          ← العروض والأسعار ✏️
    │   └── testimonials.js    ← آراء العملاء ✏️
    ├── services/
    │   └── googleSheets.js    ← دالة إرسال البيانات
    └── components/            ← كل قسم في ملف مستقل
        ├── Header.jsx
        ├── Hero.jsx
        ├── Offers.jsx
        ├── Testimonials.jsx
        ├── OrderForm.jsx
        └── Footer.jsx
```

**القاعدة البسيطة:** المحتوى (أسعار، آراء، معلومات تواصل) في `data/` و`config.js`،
والشكل في `components/` و`index.css`. لا تحتاج لفتح المكونات لتغيير سعر.

### تعديل سعر أو إضافة عرض
افتح `src/data/offers.js` وانسخ أي عرض وغيّر قيمه. سيظهر تلقائياً في الصفحة وفي قائمة الاستمارة.

### آراء العملاء
النصوص الحالية في `src/data/testimonials.js` **تجريبية**. ضع مكانها آراء حقيقية من عملائك (بموافقتهم).

---

## 3) ربط الاستمارة بـ Google Sheets

1. أنشئ جدولاً جديداً في [Google Sheets](https://sheets.google.com).
2. من القائمة: **Extensions ← Apps Script**.
3. احذف الكود الموجود والصق محتوى الملف `google-apps-script/Code.gs`، ثم احفظ.
4. اضغط **Deploy ← New deployment**:
   - النوع (Select type): **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. اضغط Deploy ووافق على الصلاحيات، ثم انسخ رابط **Web app URL** (ينتهي بـ `/exec`).
6. في مجلد المشروع، انسخ الملف `.env.example` إلى ملف جديد اسمه `.env` وضع الرابط:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/....../exec
   ```
7. أعد تشغيل `npm run dev`، املأ الاستمارة، وستجد الطلب في ورقة باسم **الطلبات**.

> ⚠️ إذا عدّلت كود Apps Script لاحقاً، يجب عمل **Deploy ← Manage deployments ← Edit ← New version** حتى يُطبَّق التعديل.

### إضافة حقل جديد للاستمارة (مثال: الولاية)
1. في `OrderForm.jsx`: أضف `wilaya: ''` إلى `EMPTY_FORM`، وأضف حقل `<input name="wilaya" ...>`.
2. في `Code.gs`: أضف `'wilaya'` إلى `COLUMNS` و`'الولاية'` إلى `HEADERS`، ثم أعد النشر بنسخة جديدة.

---

## 4) النشر على الإنترنت
أسهل طريقة: [Netlify](https://netlify.com) أو [Vercel](https://vercel.com).
اربط المشروع، واجعل أمر البناء `npm run build` ومجلد النشر `dist`،
ولا تنسَ إضافة المتغير `VITE_GOOGLE_SCRIPT_URL` في إعدادات الموقع (Environment variables).

## أفكار للتطوير لاحقاً
- إضافة صفحات أخرى (من نحن، خدمات أخرى) باستعمال مكتبة `react-router-dom`.
- زر واتساب عائم للتواصل السريع.
- تبويبات في قسم العروض لكل منصة بأسعار مختلفة.
