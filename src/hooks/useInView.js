// ============================================================
//  Hook صغير: يخبرنا هل العنصر ظاهر على الشاشة أم لا
//  نستعمله لتشغيل الأنيميشن عندما يصل الزائر إلى القسم
// ============================================================
import { useEffect, useRef, useState } from 'react'

export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        observer.disconnect() // نشغّل الحركة مرة واحدة فقط
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
