// واجهة الصفحة: العنوان الرئيسي + الشعار مع بطاقات متحركة حوله
import { COMPANY } from '../config'
import CountUp from './CountUp'

// أرقام تظهر تحت العنوان (عدّلها بأرقامك الحقيقية)
const STATS = [
  { end: 500, prefix: '+', label: 'عميل راضٍ' },
  { end: 24, suffix: 'س', label: 'لبدء التنفيذ' },
  { end: 4, label: 'منصات مدعومة' },
]

// البطاقات العائمة حول الشعار
const FLOATING = [
  { icon: '👍', text: '+1,250 متابع', pos: 'f1' },
  { icon: '❤️', text: '+3.4K إعجاب', pos: 'f2' },
  { icon: '▶️', text: '+10K مشترك', pos: 'f3' },
]

export default function Hero() {
  return (
    <section className="hero" id="top">
      {/* دوائر ملونة متحركة في الخلفية */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="grid-bg" />

      <div className="container hero-inner">
        <div className="hero-text">
          <span className="tag anim-in" style={{ '--d': '0ms' }}>
            <span className="pulse-dot" /> {COMPANY.slogan}
          </span>
          <h1 className="anim-in" style={{ '--d': '120ms' }}>
            ضاعف <span className="gradient-text shine">مشتركيك</span>
            <br />
            وانطلق كالصاروخ 🚀
          </h1>
          <p className="anim-in" style={{ '--d': '240ms' }}>
            مع {COMPANY.name} تحصل على نمو سريع وآمن لحساباتك في فيسبوك، إنستغرام، تيك توك ويوتيوب،
            بأسعار مناسبة وبدفع داخل الجزائر.
          </p>
          <div className="hero-actions anim-in" style={{ '--d': '360ms' }}>
            <a href="#offers" className="btn btn-glow">شاهد العروض ←</a>
            <a href="#order" className="btn btn-outline">اطلب الخدمة</a>
          </div>
          <div className="stats anim-in" style={{ '--d': '480ms' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>
                  <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual anim-in" style={{ '--d': '200ms' }}>
          <div className="orbit" />
          <img src="/logo.png" alt="" className="hero-logo" />
          {FLOATING.map((f) => (
            <div key={f.pos} className={`float-card ${f.pos}`}>
              <span>{f.icon}</span> {f.text}
            </div>
          ))}
        </div>
      </div>

      <a href="#offers" className="scroll-hint" aria-label="انزل للأسفل"><span /></a>
    </section>
  )
}
