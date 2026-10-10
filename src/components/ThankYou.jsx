// صفحة الشكر: تظهر بعد إرسال الطلب ثم تعود للصفحة الرئيسية بعد 5 ثوانٍ
import { useEffect, useState } from 'react'

const SECONDS = 5

export default function ThankYou({ onDone }) {
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

  return (
    <main className="thanks">
      <div className="card thanks-card">
        <div className="thanks-icon">✅</div>
        <h1 className="section-title">شكراً لك!</h1>
        <p className="section-sub">تم استلام طلبك بنجاح، سنتصل بك في أقرب وقت.</p>
        <div className="thanks-count">{left}</div>
        <p className="thanks-note">سيتم إرجاعك إلى الصفحة الرئيسية خلال {left} ثوانٍ</p>
        <button className="btn" onClick={onDone}>العودة الآن</button>
      </div>
    </main>
  )
}
