// قسم العروض والأسعار: يقرأ العروض من ملف data/offers.js
import { OFFERS, formatNumber, pricePer1000, savingPercent } from '../data/offers'
import { useLang } from '../i18n/LanguageContext'
import Reveal from './Reveal'

export default function Offers({ onChoose }) {
  const { t, tr } = useLang()

  return (
    <section className="section section-alt" id="offers">
      <div className="container">
        <Reveal>
          <span className="eyebrow">{t.offers.eyebrow}</span>
          <h2 className="section-title">{t.offers.title}</h2>
          <p className="section-sub">{t.offers.sub}</p>
        </Reveal>

        <div className="offers-grid">
          {OFFERS.map((offer, i) => (
            <Reveal key={offer.id} delay={(i % 4) * 100} className="offer-wrap">
            <div className={`card offer ${offer.popular ? 'popular' : ''}`}>
              {offer.popular && <span className="badge">{t.offers.popular}</span>}
              <h3>{tr(offer.title)}</h3>
              <div className="offer-count">
                {formatNumber(offer.subscribers)} <small>{t.offers.subscribers}</small>
              </div>
              <div className="offer-price">
                {formatNumber(offer.price)} <small>{t.offers.currency}</small>
              </div>
              <div className="offer-meta">
                <span>{pricePer1000(offer)} {t.offers.currency} / 1000</span>
                {savingPercent(offer) > 0 && <span className="saving">{t.offers.save(savingPercent(offer))}</span>}
              </div>
              <ul>
                {offer.features.map((f) => (
                  <li key={f.ar}>✓ {tr(f)}</li>
                ))}
              </ul>
              <button className="btn" onClick={() => onChoose(String(offer.id))}>
                {t.offers.choose}
              </button>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
