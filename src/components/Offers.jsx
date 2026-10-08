// قسم العروض والأسعار: يقرأ العروض من ملف data/offers.js
import { OFFERS, formatNumber, pricePer1000, savingPercent } from '../data/offers'
import Reveal from './Reveal'

export default function Offers({ onChoose }) {
  return (
    <section className="section section-alt" id="offers">
      <div className="container">
        <Reveal>
          <span className="eyebrow">الباقات</span>
          <h2 className="section-title">العروض والأسعار</h2>
          <p className="section-sub">اختر الباقة المناسبة لك</p>
        </Reveal>

        <div className="offers-grid">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.id} delay={(i % 4) * 100} className="offer-wrap">
            <div className={`card offer ${offer.popular ? 'popular' : ''}`}>
              {offer.popular && <span className="badge">الأكثر طلباً</span>}
              <h3>{offer.title}</h3>
              <div className="offer-count">
                {formatNumber(offer.subscribers)} <small>مشترك</small>
              </div>
              <div className="offer-price">
                {formatNumber(offer.price)} <small>دج</small>
              </div>
              <div className="offer-meta">
                <span>{pricePer1000(offer)} دج / 1000</span>
                {savingPercent(offer) > 0 && <span className="saving">وفّر {savingPercent(offer)}%</span>}
              </div>
              <ul>
                {offer.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <button className="btn" onClick={() => onChoose(offer.title)}>
                اختر هذا العرض
              </button>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
