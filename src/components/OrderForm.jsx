// استمارة طلب الخدمة: ترسل البيانات إلى Google Sheets
import { useState } from 'react'
import { OFFERS } from '../data/offers'
import { PLATFORMS } from '../config'
import { useLang } from '../i18n/LanguageContext'
import { sendToGoogleSheets } from '../services/googleSheets'
import Reveal from './Reveal'

// القيم الابتدائية للحقول (فارغة)
const EMPTY_FORM = {
  name: '',
  phone: '',
  platform: PLATFORMS.length === 1 ? PLATFORMS[0].id : '', // منصة واحدة فقط ← تُختار تلقائياً
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

// يرجع نوع الخطأ (نصه موجود في translations.js ← form.phoneErrors)، أو '' إذا كان الرقم صحيحاً
function phoneError(value) {
  const phone = normalizePhone(value)
  if (!phone) return 'required'
  if (!/^\d+$/.test(phone)) return 'digits'
  if (!/^0[567]/.test(phone)) return 'prefix'
  if (phone.length !== 10) return 'length'
  return ''
}

export default function OrderForm({ selectedOffer, setSelectedOffer, onSuccess }) {
  const { t, tr } = useLang()
  const [form, setForm] = useState(EMPTY_FORM)
  // status: 'idle' عادي | 'sending' جاري الإرسال | 'error' خطأ
  const [status, setStatus] = useState('idle')
  // نوع خطأ رقم الهاتف (فارغ = الرقم صحيح)
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

    // نسجّل الأسماء العربية في Google Sheets مهما كانت لغة الزائر
    const offer = OFFERS.find((o) => String(o.id) === selectedOffer)
    const platform = PLATFORMS.find((p) => p.id === form.platform)

    setStatus('sending')
    try {
      sendToGoogleSheets({
        ...form,
        phone: normalizePhone(form.phone),
        platform: platform.ar,
        offer: offer.title.ar,
      })
      // أحداث Meta Pixel: Lead (لهدف العملاء المحتملين) و Purchase بسعر العرض (لهدف المبيعات)
      const pixelData = {
        content_name: offer.title.ar,
        content_ids: [String(offer.id)],
        content_type: 'product',
        value: offer.price,
        currency: 'DZD',
      }
      window.fbq?.('track', 'Lead', pixelData)
      window.fbq?.('track', 'Purchase', pixelData)
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
          <span className="eyebrow">{t.form.eyebrow}</span>
          <h2 className="section-title">{t.form.title}</h2>
          <p className="section-sub">{t.form.sub}</p>
        </Reveal>

        <Reveal delay={150}>
        <form className="card form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              {t.form.name}
              <input name="name" autoComplete="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              {t.form.phone}
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
              {phoneMsg && <span id="phone-error" className="field-error">{t.form.phoneErrors[phoneMsg]}</span>}
            </label>
          </div>

          <div className="form-row">
            <label>
              {t.form.platform}
              <select name="platform" value={form.platform} onChange={handleChange} required>
                <option value="">{t.form.choosePlatform}</option>
                {PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>{tr(p)}</option>
                ))}
              </select>
            </label>
            <label>
              {t.form.offer}
              <select value={selectedOffer} onChange={(e) => setSelectedOffer(e.target.value)} required>
                <option value="">{t.form.chooseOffer}</option>
                {OFFERS.map((o) => (
                  <option key={o.id} value={String(o.id)}>
                    {tr(o.title)} — {o.price.toLocaleString('en-US')} {t.offers.currency}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            {t.form.link}
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
            {t.form.notes}
            <textarea name="notes" rows="3" value={form.notes} onChange={handleChange} />
          </label>

          <button className="btn btn-block" disabled={status === 'sending'}>
            {status === 'sending' ? <><span className="spinner" /> {t.form.sending}</> : t.form.submit}
          </button>

          {status === 'error' && <p className="msg error">{t.form.error}</p>}
        </form>
        </Reveal>
      </div>
    </section>
  )
}
