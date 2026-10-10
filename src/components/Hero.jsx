// واجهة الصفحة: العنوان الرئيسي + الشعار مع بطاقات متحركة حوله
import { COMPANY } from '../config'
import { useLang } from '../i18n/LanguageContext'
import CountUp from './CountUp'

export default function Hero() {
  const { t } = useLang()
  const h = t.hero

  // أرقام تظهر تحت العنوان (عدّلها بأرقامك الحقيقية)
  const STATS = [
    { end: 500, prefix: '+', label: h.stats.clients },
    { end: 24, suffix: h.stats.hours, label: h.stats.start },
    { end: 4, label: h.stats.platforms },
  ]

  // البطاقات العائمة حول الشعار
  const FLOATING = [
    { icon: '👍', text: `+1,250 ${h.floating.followers}`, pos: 'f1' },
    { icon: '❤️', text: `+3.4K ${h.floating.likes}`, pos: 'f2' },
    { icon: '▶️', text: `+10K ${h.floating.subscribers}`, pos: 'f3' },
  ]

  return (
    <section className="hero" id="top">
      {/* دوائر ملونة متحركة في الخلفية */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="grid-bg" />

      <div className="container hero-inner">
        <div className="hero-text">
          <span className="tag anim-in" style={{ '--d': '0ms' }}>
            <span className="pulse-dot" /> {h.slogan}
          </span>
          <h1 className="anim-in" style={{ '--d': '120ms' }}>
            {h.titleStart}<span className="gradient-text shine">{h.titleHighlight}</span>
            <br />
            {h.titleLine2}
          </h1>
          <p className="anim-in" style={{ '--d': '240ms' }}>
            {h.text(COMPANY.name)}
          </p>
          <div className="hero-actions anim-in" style={{ '--d': '360ms' }}>
            <a href="#offers" className="btn btn-glow">{h.seeOffers}</a>
            <a href="#order" className="btn btn-outline">{h.order}</a>
          </div>
          <div className="stats anim-in" style={{ '--d': '480ms' }}>
            {STATS.map((s) => (
              <div key={s.end}>
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

      <a href="#offers" className="scroll-hint" aria-label={h.scroll}><span /></a>
    </section>
  )
}
