// الشريط العلوي: الشعار + روابط التنقل + زر تغيير اللغة
import { useEffect, useState } from 'react'
import { COMPANY } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function Header() {
  const { t, lang, setLang } = useLang()

  // نغيّر شكل الشريط قليلاً عندما ينزل الزائر في الصفحة
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLang = lang === 'ar' ? 'fr' : 'ar'

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand">
          <img src="/logo.png" alt={COMPANY.name} />
          <span>{COMPANY.name}</span>
        </a>
        <nav className="nav">
          <a href="#offers">{t.nav.offers}</a>
          <a href="#testimonials">{t.nav.testimonials}</a>
          <a href="#faq">{t.nav.faq}</a>
          <button className="lang-switch" onClick={() => setLang(otherLang)} lang={otherLang}>
            {t.nav.switchTo}
          </button>
          <a href="#order" className="btn btn-small">{t.nav.order}</a>
        </nav>
      </div>
    </header>
  )
}
