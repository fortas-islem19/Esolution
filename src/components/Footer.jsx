// تذييل الصفحة: معلومات التواصل
import { COMPANY } from '../config'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="brand">
          <img src="/logo.png" alt={COMPANY.name} />
          <span>{COMPANY.name}</span>
        </div>
        <div className="footer-links">
          <span>📞 {COMPANY.phone}</span>
          <span>✉️ {COMPANY.email}</span>
          <a href={COMPANY.facebook} target="_blank" rel="noreferrer">فيسبوك</a>
          <a href={COMPANY.instagram} target="_blank" rel="noreferrer">إنستغرام</a>
        </div>
        <p className="copy">© {new Date().getFullYear()} {COMPANY.name} — جميع الحقوق محفوظة</p>
      </div>
    </footer>
  )
}
