import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights2 from "./components/Highlights2"
import Model from "./components/Model"
import Features from "./components/Features"
import Chip from "./components/Chip"
import Footer from "./components/Footer"
import SmoothScroll from "./components/SmoothScroll"


export default function App() {
  return (
    <main className="bg-black">
      <SmoothScroll />
      <Navbar />
      <Hero />
      <Highlights2 />
      <Model />
      <Features />
      <Chip />
      <Footer />
    </main>
  )
}