"use client"

import { motion } from "motion/react"

const steps = [
  {
    number: "01",
    title: "비율 설정",
    desc: "Amo / Edi / Loco 슬라이더를 조정하거나, 상황에 맞는 Preset을 선택하세요.",
    icon: "Amo",
  },
  {
    number: "02",
    title: "대화 시작",
    desc: "오늘의 고민, 결정, 감정을 자유롭게 입력해요. 형식은 없어요.",
    icon: "Edi",
  },
  {
    number: "03",
    title: "블렌딩 응답",
    desc: "설정한 비율만큼 세 목소리가 섞인 AI가 답해줘요. 내 언어로.",
    icon: "Loco",
  },
  {
    number: "04",
    title: "실시간 조정",
    desc: "대화 도중에도 비율을 바꿀 수 있어요. 다음 응답부터 즉시 반영돼요.",
    icon: "Amo",
  },
  {
    number: "05",
    title: "나만의 패턴 발견",
    desc: "내가 어떤 상황에서 어떤 비율을 쓰는지 쌓이면서 나 자신을 더 잘 알게 돼요.",
    icon: "Edi",
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
})

export default function HowTo() {
  return (
    <section className="py-24 sm:py-32 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          사용법
        </motion.p>

        <motion.h2
          {...fade(0.06)}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight"
        >
          딱 다섯 단계예요
        </motion.h2>

        <div className="mt-12 sm:mt-16 flex flex-col">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              {...fade(0.1 + i * 0.07)}
              className="flex gap-6 sm:gap-8 py-6 sm:py-7 border-b border-black/[0.06] last:border-0"
            >
              {/* Icon with number overlay */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="relative flex items-center justify-center w-10 h-10 flex-shrink-0">
                  <img src={`/${step.icon}-profile.svg`} alt={step.icon} className="w-full h-full object-contain" />
                  <span className="absolute text-white text-xs font-bold leading-none">{i + 1}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1.5 pt-1">
                <h3 className="font-display text-xl sm:text-2xl text-foreground">{step.title}</h3>
                <p className="text-muted text-sm sm:text-base leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
