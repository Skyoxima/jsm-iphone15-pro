import Navbar from "./components/Navbar.tsx"
import Hero from "./components/Hero.tsx"
import Highlights2 from "./components/Highlights2.tsx"
import MobileModel from "./components/MobileModel.tsx"
import Model from "./components/Model.tsx"
import Features from "./components/Features.tsx"
import Chip from "./components/Chip.tsx"
import Footer from "./components/Footer.tsx"
import SmoothScroll from "./components/SmoothScroll.tsx"
import { useState, useEffect } from "react"

export default function App() {
  const [device, setDevice] = useState<string>('');
  
  useEffect(() => {
    const ua = navigator.userAgent;
    if(/Mobi|Android/i.test(ua)) {
      console.log('mobile');
      setDevice('mobile');
    }
    
    else if(/iPad|Tablet/i.test(ua)) {
      console.log('tablet');
      setDevice('tablet');
    }
    else {
      console.log('desktop')
      setDevice('desktop');
    }
  }, [device])

  return (
    <main className="bg-black">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <Highlights2 />
      {device === 'mobile' || device === 'tablet' ? <MobileModel /> : <Model />}
      <Features />
      <Chip />
      <Footer />
    </main>
  )
}