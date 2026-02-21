import Hero from "@/components/main/hero"
import Problem from "@/components/main/problem"
import Demo from "@/components/main/demo"
import Features from "@/components/main/features"
import HowTo from "@/components/main/howto"
import CTA from "@/components/main/cta"
import Footer from "@/components/main/footer"

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="max-w-5xl mx-auto px-5">
        <hr className="border-black/[0.06]" />
      </div>
      <Problem />
      <div className="max-w-5xl mx-auto px-5">
        <hr className="border-black/[0.06]" />
      </div>
      <Demo />
      <div className="max-w-5xl mx-auto px-5">
        <hr className="border-black/[0.06]" />
      </div>
      <Features />
      <div className="max-w-5xl mx-auto px-5">
        <hr className="border-black/[0.06]" />
      </div>
      <HowTo />
      <CTA />
      <Footer />
    </main>
  )
}
