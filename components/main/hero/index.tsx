"use client"

import { useState, useEffect } from "react"
import { LayoutGroup, motion, AnimatePresence } from "motion/react"

import { TextRotate } from "@/components/ui/text-rotate"
import { AmoCharacter } from "./AmoCharacter"
import { EdiCharacter } from "./EdiCharacter"
import { LocoCharacter } from "./LocoCharacter"

const texts = ["Amo", "Edi", "Loco", "아모", "에디", "로꼬"]

const colors = ["#FF9083", "#50D7B5", "#AF85FF", "#FF9083", "#50D7B5", "#AF85FF"]

const characterComponents = [AmoCharacter, EdiCharacter, LocoCharacter]
const characterAlts = ["Amo", "Edi", "Loco"]

const ACTIVE_SCALE = 1.45
const INACTIVE_SCALE = 0.65
const INACTIVE_OPACITY = 0.45

const sharedClassName =
  "text-white px-2.5 sm:px-3 md:px-4 overflow-hidden py-0.5 sm:py-1 md:py-1.5 items-center justify-center rounded-xl"

const textTransition = { type: "spring", damping: 30, stiffness: 400 } as const

const charVariants = {
  active: {
    scale: ACTIVE_SCALE,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 200, mass: 1, delay: 0.35 },
  },
  inactive: {
    scale: INACTIVE_SCALE,
    opacity: INACTIVE_OPACITY,
    transition: { type: "spring", damping: 20, stiffness: 200, mass: 1 },
  },
} as const

const colorTransition = { duration: 0.5, ease: "easeInOut" } as const

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activeCharIndex = currentIndex % 3
  const currentColor = colors[currentIndex]

  const [email, setEmail] = useState("")
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [signupCount, setSignupCount] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/waitlist")
      .then(r => r.json())
      .then(d => setSignupCount(d.count))
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setFormStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "오류가 발생했어요.")
        setFormStatus("error")
        return
      }
      setFormStatus("success")
      if (typeof data.count === "number") setSignupCount(data.count)
    } catch {
      setErrorMsg("네트워크 오류가 발생했어요.")
      setFormStatus("error")
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] flex items-center overflow-x-hidden px-5 py-12">
      <div className="max-w-5xl mx-auto w-full flex flex-col lg:flex-row items-center gap-14 lg:gap-16">

        {/* 왼쪽: 얼리버드 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col gap-5 order-2 lg:order-1 w-full"
        >
          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-black/10 text-muted bg-white/60">
              <span className="relative flex w-2.5 h-2.5 flex-shrink-0">
                <motion.span
                  animate={{ backgroundColor: currentColor }}
                  transition={colorTransition}
                  className="absolute inset-0 rounded-full animate-ping opacity-60"
                />
                <motion.span
                  animate={{ backgroundColor: currentColor }}
                  transition={colorTransition}
                  className="absolute inset-0 rounded-full"
                />
              </span>
              얼리버드 모집 중
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
            내 안에 있는 세 가지 목소리
            <br />
            <motion.span animate={{ color: currentColor }} transition={colorTransition}>
              Ugly3
            </motion.span>
          </h1>

          {/* Body */}
          <p className="text-muted text-sm sm:text-base leading-relaxed max-w-sm">
            감성(Amo) · 이성(Edi) · 즉흥(Loco) — 세 목소리의 비율을 조절해서, 내가 원하는 방식으로 생각해주는 AI예요.
          </p>

          {/* Form / Success */}
          {formStatus === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-1.5 py-2"
            >
              <p className="font-display text-2xl">🎉 신청 완료!</p>
              <p className="text-sm text-muted">
                {signupCount !== null && signupCount > 0
                  ? `${signupCount}명과 함께 출시를 기다리고 있어요.`
                  : "출시 소식을 가장 먼저 전달드릴게요."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                required
                disabled={formStatus === "loading"}
                className="flex-1 px-4 py-3 rounded-xl border border-black/10 bg-white/80 text-foreground placeholder:text-muted text-sm outline-none focus:border-black/25 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={formStatus === "loading" || !email.trim()}
                className="px-5 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-80 active:opacity-70 transition-opacity disabled:opacity-40 cursor-pointer whitespace-nowrap"
              >
                {formStatus === "loading" ? "신청 중..." : "얼리버드 신청하기"}
              </button>
            </form>
          )}

          {formStatus === "error" && (
            <p className="text-sm text-red-500 -mt-1">{errorMsg}</p>
          )}

          {/* 얼리버드 카운트 */}
          {formStatus !== "success" && (
            <AnimatePresence>
              {signupCount !== null && signupCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 -mt-1"
                >
                  <div className="flex items-center">
                    <img src="/Amo-profile.svg" alt="Amo" className="w-6 h-6" />
                    <img src="/Edi-profile.svg" alt="Edi" className="w-6 h-6 -ml-1.5" />
                    <img src="/Loco-profile.svg" alt="Loco" className="w-6 h-6 -ml-1.5" />
                  </div>
                  <p className="text-xs text-foreground/70">
                    이미 <span className="text-sm font-semibold text-foreground">{signupCount}명</span>{" "}이 얼리버드를 신청했어요.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </motion.div>

        {/* 오른쪽: 캐릭터 + 텍스트 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1 flex flex-col items-center gap-6 sm:gap-8 order-1 lg:order-2 text-3xl sm:text-4xl md:text-5xl font-display text-foreground font-normal"
        >
          <div className="flex items-end justify-center gap-5 sm:gap-7 md:gap-10 h-40 sm:h-48">
            {characterComponents.map((CharComponent, i) => (
              <motion.div
                key={characterAlts[i]}
                variants={charVariants}
                initial={{
                  scale: i === 0 ? ACTIVE_SCALE : INACTIVE_SCALE,
                  opacity: i === 0 ? 1 : INACTIVE_OPACITY,
                }}
                animate={i === activeCharIndex ? "active" : "inactive"}
                style={{ transformOrigin: "bottom center" }}
              >
                <CharComponent isActive={i === activeCharIndex} />
              </motion.div>
            ))}
          </div>

          <LayoutGroup>
            <div className="flex flex-col gap-2 sm:gap-3 md:gap-4">
              <motion.div className="flex items-center whitespace-pre" layout>
                <motion.span layout transition={textTransition}>
                  오늘은{" "}
                </motion.span>
                <div className="relative">
                  <span
                    className="px-2.5 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 invisible whitespace-nowrap pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    Loco
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <TextRotate
                      texts={texts}
                      classNames={Array(texts.length).fill(sharedClassName + " w-full justify-center")}
                      colors={colors}
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.04}
                      splitLevelClassName="overflow-hidden py-0.5 sm:py-1"
                      transition={textTransition}
                      rotationInterval={3000}
                      onNext={setCurrentIndex}
                    />
                  </span>
                </div>
                <motion.span layout transition={textTransition} className="ml-1 sm:ml-1.5 md:ml-2">
                  가
                </motion.span>
              </motion.div>

              <motion.div layout transition={textTransition}>
                같이 작업해줘
              </motion.div>
            </div>
          </LayoutGroup>
        </motion.div>

      </div>
    </div>
  )
}
