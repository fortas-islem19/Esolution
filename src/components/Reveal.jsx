// ============================================================
//  مكوّن Reveal: أي شيء تضعه داخله يظهر بحركة عند التمرير
//  مثال:  <Reveal delay={200}> ... </Reveal>
//  - delay: تأخير الحركة بالميلي ثانية (لجعل العناصر تظهر واحداً تلو الآخر)
//  - from: اتجاه الظهور 'up' | 'right' | 'left' | 'zoom'
// ============================================================
import { useInView } from '../hooks/useInView'

export default function Reveal({ children, delay = 0, from = 'up', className = '' }) {
  const [ref, inView] = useInView()
  return (
    <div
      ref={ref}
      className={`reveal reveal-${from} ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
