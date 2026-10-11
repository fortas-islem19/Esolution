// تذييل الصفحة: معلومات التواصل
import { COMPANY } from '../config'
import { useLang } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand">
          <img src="/logo.png" alt={COMPANY.name} />
          <span>{COMPANY.name}</span>
        </div>
        <div className="footer-links">
          <span dir="ltr">✉️ {COMPANY.email}</span>
          <a href={COMPANY.facebook} target="_blank" rel="noreferrer">{t.footer.facebook}</a>
          <a href={COMPANY.instagram} target="_blank" rel="noreferrer">{t.footer.instagram}</a>
        </div>
        <p className="copy">© {new Date().getFullYear()} {COMPANY.name} — {t.footer.rights}</p>
      </div>
    </footer>
  )
}
