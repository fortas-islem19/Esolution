// قسم آراء العملاء: يقرأ الآراء من ملف data/testimonials.js
import { TESTIMONIALS } from '../data/testimonials'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

export default function Testimonials() {
  const { t, tr } = useLang()

  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <h2 className="section-title">{t.testimonials.title}</h2>
          <p className="section-sub">{t.testimonials.sub}</p>
        </Reveal>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((item, i) => (
            <Reveal key={item.id} delay={i * 150} from="zoom" className="h-full">
            <div className="card testimonial">
              <span className="quote-mark">”</span>
              <div className="stars">{'★'.repeat(item.rating)}{'☆'.repeat(5 - item.rating)}</div>
              <p>«{tr(item.text)}»</p>
              <div className="author">
                <div className="avatar">{tr(item.name).charAt(0)}</div>
                <div>
                  <strong>{tr(item.name)}</strong>
                  <span>{tr(item.role)}</span>
                </div>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
