// صفحة الشكر: تظهر بعد إرسال الطلب ثم تعود للصفحة الرئيسية بعد 5 ثوانٍ
import { useEffect, useState } from 'react'
import { useLang } from '../i18n/LanguageContext'

const SECONDS = 5

export default function ThankYou({ onDone }) {
  const { t } = useLang()
  const [left, setLeft] = useState(SECONDS)

  // العد التنازلي: ينقص ثانية كل ثانية، وعند الصفر نعود للصفحة الرئيسية
  useEffect(() => {
    if (left <= 0) {
      onDone()
      return
    }
    const timer = setTimeout(() => setLeft(left - 1), 1000)
    return () => clearTimeout(timer)
  }, [left, onDone])

  // --d: تأخير ظهور كل عنصر (يظهرون واحداً تلو الآخر)
  return (
    <main className="thanks">
      <div className="card thanks-card">
        <div className="thanks-icon">✅</div>
        <h1 className="section-title anim-in" style={{ '--d': '450ms' }}>{t.thanks.title}</h1>
        <p className="section-sub anim-in" style={{ '--d': '550ms' }}>{t.thanks.text}</p>
        <div className="thanks-count anim-in" style={{ '--d': '650ms' }}>{left}</div>
        <p className="thanks-note anim-in" style={{ '--d': '750ms' }}>{t.thanks.redirect(left)}</p>
        <button className="btn anim-in" style={{ '--d': '850ms' }} onClick={onDone}>{t.thanks.back}</button>
      </div>
    </main>
  )
}
