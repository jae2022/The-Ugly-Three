import Navbar from "@/components/main/navbar"
import Hero from "@/components/main/hero"
import Problem from "@/components/main/problem"
import Solution from "@/components/main/solution"
import Demo from "@/components/main/demo"
import HowTo from "@/components/main/howto"
import CTA from "@/components/main/cta"
import Footer from "@/components/main/footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-black/[0.06]" />
        </div>
        <div id="problem" className="scroll-mt-14">
          <Problem />
        </div>
        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-black/[0.06]" />
        </div>
        <div id="solution" className="scroll-mt-14">
          <Solution />
        </div>
        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-black/[0.06]" />
        </div>
        <div id="demo" className="scroll-mt-14">
          <Demo />
        </div>
        <div className="max-w-5xl mx-auto px-5">
          <hr className="border-black/[0.06]" />
        </div>
        <div id="howto" className="scroll-mt-14">
          <HowTo />
        </div>
        <div id="cta">
          <CTA />
        </div>
        <Footer />
      </main>
    </>
  )
}
