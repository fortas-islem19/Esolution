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

// ------------------------------------------------------------
//  التحقق من رقم الهاتف (أرقام الجوال الجزائرية)
//  يقبل: 0555123456 أو 055 512 34 56 أو +213555123456 أو 00213555123456
//  ويحوّلها كلها إلى الشكل: 0555123456
// ------------------------------------------------------------
function normalizePhone(value) {
  let digits = value.replace(/[\s.\-()]/g, '')
  if (digits.startsWith('+213')) digits = '0' + digits.slice(4)
  else if (digits.startsWith('00213')) digits = '0' + digits.slice(5)
  return digits
}

function phoneError(value) {
  const phone = normalizePhone(value)
  if (!phone) return 'رقم الهاتف مطلوب'
  if (!/^\d+$/.test(phone)) return 'رقم الهاتف يجب أن يحتوي على أرقام فقط'
  if (!/^0[567]/.test(phone)) return 'رقم الهاتف يجب أن يبدأ بـ 05 أو 06 أو 07'
  if (phone.length !== 10) return 'رقم الهاتف يجب أن يتكون من 10 أرقام (مثال: 0555123456)'
  return ''
}

export default function OrderForm({ selectedOffer, setSelectedOffer, onSuccess }) {
  const [form, setForm] = useState(EMPTY_FORM)
  // status: 'idle' عادي | 'sending' جاري الإرسال | 'error' خطأ
  const [status, setStatus] = useState('idle')
  // رسالة خطأ رقم الهاتف (فارغة = الرقم صحيح)
  const [phoneMsg, setPhoneMsg] = useState('')

  // تحديث أي حقل عند الكتابة فيه (حسب الخاصية name)
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // إذا كان هناك خطأ ظاهر، نتحقق مباشرة أثناء التصحيح
    if (name === 'phone' && phoneMsg) setPhoneMsg(phoneError(value))
  }

  const handleSubmit = (e) => {
    e.preventDefault() // منع إعادة تحميل الصفحة

    const error = phoneError(form.phone)
    if (error) {
      setPhoneMsg(error)
      document.getElementById('phone').focus()
      return
    }

    setStatus('sending')
    try {
      sendToGoogleSheets({ ...form, phone: normalizePhone(form.phone), offer: selectedOffer })
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
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                maxLength={20}
                value={form.phone}
                onChange={handleChange}
                onBlur={() => form.phone && setPhoneMsg(phoneError(form.phone))}
                placeholder="05XXXXXXXX"
                className={phoneMsg ? 'invalid' : ''}
                aria-invalid={!!phoneMsg}
                aria-describedby="phone-error"
                required
              />
              {phoneMsg && <span id="phone-error" className="field-error">{phoneMsg}</span>}
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
