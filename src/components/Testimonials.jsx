// قسم آراء العملاء: يقرأ الآراء من ملف data/testimonials.js
import { TESTIMONIALS } from '../data/testimonials'
import Reveal from './Reveal'

export default function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <div className="container">
        <Reveal>
          <span className="eyebrow">شهادات</span>
          <h2 className="section-title">آراء المتعاملين معنا</h2>
          <p className="section-sub">ثقة عملائنا هي سر نجاحنا</p>
        </Reveal>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id} delay={i * 150} from="zoom" className="h-full">
            <div className="card testimonial">
              <span className="quote-mark">”</span>
              <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p>«{t.text}»</p>
              <div className="author">
                <div className="avatar">{t.name.charAt(0)}</div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
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
