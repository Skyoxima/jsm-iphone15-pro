import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights2 from "./components/Highlights2"
import Model from "./components/Model"
import Features from "./components/Features"
import Chip from "./components/Chip"

export default function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      {/* <Highlights2 /> */}
      {/* <Model /> */}
      <Features />
      <Chip />
    </main>
  )
}