// ============================================================
//  اللغة الحالية للموقع (العربية أو الفرنسية)
//  الاستعمال داخل أي مكوّن:
//    const { t, lang, tr } = useLang()
//    t.offers.title        ← نص من ملف translations.js
//    tr(offer.title)       ← نص من ملفات data ({ ar: '...', fr: '...' })
// ============================================================
import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_LANG, LANGUAGES, TRANSLATIONS } from './translations'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'lang'

// اللغة المحفوظة من الزيارة السابقة (إن وُجدت)
function savedLang() {
  try {
    const lang = localStorage.getItem(STORAGE_KEY)
    if (lang in LANGUAGES) return lang
  } catch {}
  return DEFAULT_LANG
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(savedLang)
  const t = TRANSLATIONS[lang]

  // تحديث اتجاه الصفحة وعنوانها عند تغيير اللغة
  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = LANGUAGES[lang].dir
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  const setLang = (next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {}
  }

  const tr = (field) => (typeof field === 'object' && field !== null ? field[lang] ?? field[DEFAULT_LANG] : field)

  return <LanguageContext.Provider value={{ lang, setLang, t, tr }}>{children}</LanguageContext.Provider>
}

export const useLang = () => useContext(LanguageContext)
