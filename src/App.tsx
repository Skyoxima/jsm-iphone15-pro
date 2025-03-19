import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import Highlights from "./Components/Highlights"

export default function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  )
}