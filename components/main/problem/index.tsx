"use client"

import { motion } from "motion/react"

const problems = [
  {
    number: "01",
    icon: "🤖",
    title: "AI는 언제나 같은 목소리",
    desc: "지금의 AI는 항상 균형 잡힌 하나의 톤으로만 답해요. 오늘 내가 감성적 위로가 필요한지, 냉정한 분석이 필요한지 — AI는 모릅니다.",
  },
  {
    number: "02",
    icon: "😵‍💫",
    title: "결정 피로는 매일 쌓인다",
    desc: "점심 메뉴부터 이직 여부까지, 매일 수십 번의 결정 앞에 서요. AI에게 물어봐도 뭔가 내 마음과 다른 느낌.",
  },
  {
    number: "03",
    icon: "🎭",
    title: "나는 하나가 아니야",
    desc: "때론 감정적으로 결정하고 싶고, 때론 이성적으로 분석하고 싶고, 때론 그냥 질러버리고 싶어요. 근데 AI는 항상 같은 방식으로만 답하죠.",
  },
  {
    number: "04",
    icon: "🔧",
    title: "커스터마이징의 부재",
    desc: "AI 성격을 바꾸려면 프롬프트 엔지니어링을 알아야 해요. 일반 사용자에게는 너무 높은 장벽입니다.",
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
})

export default function Problem() {
  return (
    <section className="py-24 sm:py-32 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          문제
        </motion.p>

        <motion.h2
          {...fade(0.06)}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight"
        >
          AI한테 물어봤는데,
          <br />
          왜 내 답 같지 않을까요?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 sm:mt-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              {...fade(0.1 + i * 0.07)}
              className="rounded-2xl border border-black/[0.06] bg-white/70 p-7 sm:p-8 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted tracking-widest">{p.number}</span>
                <span className="text-xl">{p.icon}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl text-foreground">{p.title}</h3>
              <p className="text-muted text-sm sm:text-base leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
