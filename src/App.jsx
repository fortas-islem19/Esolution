// الصفحة الرئيسية: تجمع كل الأقسام بالترتيب
// لإضافة قسم جديد: أنشئ ملفاً في مجلد components ثم استدعه هنا
import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Offers from './components/Offers'
import Testimonials from './components/Testimonials'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

export default function App() {
  // العرض الذي اختاره الزائر (يُمرَّر من قسم العروض إلى الاستمارة)
  const [selectedOffer, setSelectedOffer] = useState('')

  const chooseOffer = (offerTitle) => {
    setSelectedOffer(offerTitle)
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Offers onChoose={chooseOffer} />
        <Testimonials />
        <OrderForm selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
      </main>
      <Footer />
    </>
  )
}
