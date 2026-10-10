// قسم الأسئلة الشائعة: الضغط على السؤال يفتح الجواب
import { useState } from 'react'
import { FAQ } from '../data/faq'
import Reveal from './Reveal'

export default function Faq() {
  // رقم السؤال المفتوح حالياً (null = كلها مغلقة)
  const [openId, setOpenId] = useState(null)

  return (
    <section className="section" id="faq">
      <div className="container">
        <Reveal>
          <span className="eyebrow">أسئلة</span>
          <h2 className="section-title">الأسئلة الشائعة</h2>
          <p className="section-sub">إجابات على أكثر الأسئلة التي تصلنا</p>
        </Reveal>

        <div className="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = openId === item.id
            return (
              <Reveal key={item.id} delay={i * 120}>
                <div className={`card faq-item ${isOpen ? 'is-open' : ''}`}>
                  <button
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </button>
                  <div className="faq-a">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
