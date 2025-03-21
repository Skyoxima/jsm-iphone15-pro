import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import Highlights2 from "./components/Highlights2"

export default function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights2 />
      {/* <Highlights /> */}
    </main>
  )
}