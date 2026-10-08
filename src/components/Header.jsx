// الشريط العلوي: الشعار + روابط التنقل
import { useEffect, useState } from 'react'
import { COMPANY } from '../config'

export default function Header() {
  // نغيّر شكل الشريط قليلاً عندما ينزل الزائر في الصفحة
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="brand">
          <img src="/logo.png" alt={COMPANY.name} />
          <span>{COMPANY.name}</span>
        </a>
        <nav className="nav">
          <a href="#offers">العروض</a>
          <a href="#testimonials">آراء العملاء</a>
          <a href="#order" className="btn btn-small">اطلب الآن</a>
        </nav>
      </div>
    </header>
  )
}
