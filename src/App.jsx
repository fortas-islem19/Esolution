// الصفحة الرئيسية: تجمع كل الأقسام بالترتيب
// لإضافة قسم جديد: أنشئ ملفاً في مجلد components ثم استدعه هنا
import { useCallback, useEffect, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Offers from './components/Offers'
import Testimonials from './components/Testimonials'
import OrderForm from './components/OrderForm'
import Faq from './components/Faq'
import Footer from './components/Footer'
import ThankYou from './components/ThankYou'

const THANKS_PATH = '/thank-you'

export default function App() {
  // العرض الذي اختاره الزائر (يُمرَّر من قسم العروض إلى الاستمارة)
  const [selectedOffer, setSelectedOffer] = useState('')
  // الصفحة الحالية: الرئيسية أو صفحة الشكر (/thank-you)
  const [showThanks, setShowThanks] = useState(window.location.pathname === THANKS_PATH)

  // زر الرجوع في المتصفح
  useEffect(() => {
    const onPop = () => setShowThanks(window.location.pathname === THANKS_PATH)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const goToThanks = () => {
    window.history.pushState(null, '', THANKS_PATH)
    setShowThanks(true)
    window.scrollTo(0, 0)
  }

  const goHome = useCallback(() => {
    window.history.replaceState(null, '', '/')
    setShowThanks(false)
    window.scrollTo(0, 0)
  }, [])

  const chooseOffer = (offerTitle) => {
    setSelectedOffer(offerTitle)
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' })
  }

  if (showThanks) return <ThankYou onDone={goHome} />

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Offers onChoose={chooseOffer} />
        <Testimonials />
        <OrderForm selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} onSuccess={goToThanks} />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
