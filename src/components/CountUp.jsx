// ============================================================
//  عدّاد متحرك: يعدّ من 0 إلى الرقم المطلوب عند ظهوره
//  مثال: <CountUp end={500} prefix="+" />
// ============================================================
import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

export default function CountUp({ end, duration = 1500, prefix = '', suffix = '' }) {
  const [ref, inView] = useInView()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (time) => {
      if (!start) start = time
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // يبطئ في النهاية
      setValue(Math.round(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
