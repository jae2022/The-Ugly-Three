"use client"

import { useState } from "react"
import { motion } from "motion/react"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
})

export default function CTA() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? "오류가 발생했어요. 다시 시도해주세요.")
        setStatus("error")
        return
      }

      setStatus("success")
    } catch {
      setErrorMsg("네트워크 오류가 발생했어요.")
      setStatus("error")
    }
  }

  return (
    <section id="cta" className="py-24 sm:py-32 px-5">
      {/* Gradient background card */}
      <motion.div
        {...fade(0)}
        className="max-w-5xl mx-auto rounded-3xl overflow-hidden relative"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,144,131,0.10) 0%, rgba(80,215,181,0.08) 50%, rgba(175,133,255,0.10) 100%)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div className="px-8 py-16 sm:px-16 sm:py-20 flex flex-col items-center text-center gap-6">
          <motion.p {...fade(0.06)} className="font-mono text-xs uppercase tracking-widest text-muted">
            얼리버드
          </motion.p>

          <motion.h2
            {...fade(0.1)}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight"
          >
            나만의 비율을
            <br />
            가장 먼저 만나보세요
          </motion.h2>

          <motion.p {...fade(0.14)} className="text-muted text-base sm:text-lg leading-relaxed max-w-md">
            얼리버드로 신청하면, 출시 즉시 초대장을 보내드려요.
          </motion.p>

          <motion.div {...fade(0.18)} className="w-full max-w-md">
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="text-3xl">🎉</div>
                <p className="font-display text-xl text-foreground">신청 완료!</p>
                <p className="text-muted text-sm">출시 소식을 가장 먼저 전달드릴게요.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  required
                  disabled={status === "loading"}
                  className="flex-1 px-4 py-3 rounded-xl border border-black/10 bg-white/80 text-foreground placeholder:text-muted text-sm outline-none focus:border-black/25 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || !email.trim()}
                  className="px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-85 active:opacity-75 transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {status === "loading" ? "신청 중..." : "얼리버드 신청하기"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="text-sm text-red-500 mt-2 text-left">{errorMsg}</p>
            )}
          </motion.div>

          {status !== "success" && (
            <motion.p {...fade(0.22)} className="text-xs text-muted">
              언제든 취소할 수 있어요. 스팸은 절대 없어요.
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  )
}
