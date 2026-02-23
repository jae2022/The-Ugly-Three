"use client"

import { motion } from "motion/react"

const navLinks = [
  { label: "문제", href: "#problem" },
  { label: "솔루션", href: "#solution" },
  { label: "데모", href: "#demo" },
  { label: "사용법", href: "#howto" },
]

export default function Navbar() {
  function scrollToCTA() {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 bg-[#FBF9F3]/80 backdrop-blur-md border-b border-black/[0.05]"
    >
      <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between gap-4">
        <span className="font-display text-xl text-foreground flex-shrink-0">Ugly3</span>

        {/* Nav links — 모바일에서 숨김 */}
        <div className="hidden sm:flex items-center gap-0.5">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-lg text-sm text-muted hover:text-foreground hover:bg-black/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={scrollToCTA}
          className="flex-shrink-0 px-4 py-1.5 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-80 active:opacity-70 transition-opacity cursor-pointer"
        >
          얼리버드 신청
        </button>
      </div>
    </motion.nav>
  )
}
