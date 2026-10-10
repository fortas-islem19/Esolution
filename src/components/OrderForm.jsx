// استمارة طلب الخدمة: ترسل البيانات إلى Google Sheets
import { useState } from 'react'
import { OFFERS } from '../data/offers'
import { PLATFORMS } from '../config'
import { sendToGoogleSheets } from '../services/googleSheets'
import Reveal from './Reveal'

// القيم الابتدائية للحقول (فارغة)
const EMPTY_FORM = {
  name: '',
  phone: '',
  platform: '',
  accountLink: '',
  notes: '',
}

export default function OrderForm({ selectedOffer, setSelectedOffer, onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM)
  // status: 'idle' عادي | 'sending' جاري الإرسال | 'error' خطأ
  const [status, setStatus] = useState('idle')

  // تحديث أي حقل عند الكتابة فيه (حسب الخاصية name)
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault() // منع إعادة تحميل الصفحة
    setStatus('sending')
    try {
      sendToGoogleSheets({ ...form, offer: selectedOffer })
      window.fbq?.('track', 'Lead', { content_name: selectedOffer })
      setForm(EMPTY_FORM)
      setSelectedOffer('')
      setStatus('idle')
      onSuccess() // الانتقال إلى صفحة الشكر
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section className="section section-alt" id="order">
      <div className="container">
        <Reveal>
          <span className="eyebrow">الطلب</span>
          <h2 className="section-title">اطلب الخدمة الآن</h2>
          <p className="section-sub">املأ الاستمارة وسنتواصل معك في أقرب وقت</p>
        </Reveal>

        <Reveal delay={150}>
        <form className="card form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              الاسم الكامل *
              <input name="name" autoComplete="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              رقم الهاتف *
              <input
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                value={form.phone}
                onChange={handleChange}
                pattern="0[5-7][0-9 ]{8,11}"
                title="مثال: 0555123456"
                placeholder="05XXXXXXXX"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              المنصة *
              <select name="platform" value={form.platform} onChange={handleChange} required>
                <option value="">-- اختر المنصة --</option>
                {PLATFORMS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </label>
            <label>
              العرض *
              <select value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)} required>
                <option value="">-- اختر العرض --</option>
                {OFFERS.map((o) => (
                  <option key={o.id} value={o.title}>
                    {o.title} — {o.subscribers.toLocaleString('en-US')} مشترك ({o.price.toLocaleString('en-US')} دج)
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            رابط الحساب أو الصفحة *
            <input
              name="accountLink"
              type="url"
              inputMode="url"
              autoCapitalize="off"
              dir="ltr"
              value={form.accountLink}
              onChange={handleChange}
              placeholder="https://..."
              required
            />
          </label>

          <label>
            ملاحظات (اختياري)
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} />
          </label>

          <button className="btn btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? <><span className="spinner" /> جاري الإرسال...</> : 'إرسال الطلب 🚀'}
          </button>

          {status === 'error' && <p className="msg error">❌ حدث خطأ، حاول مرة أخرى أو اتصل بنا.</p>}
        </form>
        </Reveal>
      </div>
    </section>
  )
}
