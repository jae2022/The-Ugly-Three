"use client"

import { motion } from "motion/react"

const features = [
  {
    number: "01",
    title: "Ratio 슬라이더",
    tags: ["#내방식대로", "#내리듬대로"],
    color: "#FF9083",
    desc: "Amo(감성) · Edi(이성) · Loco(즉흥)의 비율을 직접 조정하세요. 오늘 기분에 맞게, 상황에 맞게, 언제든 바꿀 수 있어요.",
  },
  {
    number: "02",
    title: "세 가지 목소리, 하나의 대답",
    tags: ["#뒤죽박죽X", "#일관된블렌딩"],
    color: "#50D7B5",
    desc: "세 페르소나가 각자 따로 말하는 게 아니에요. 설정한 비율만큼 자연스럽게 섞인 하나의 응답으로 돌아와요.",
  },
  {
    number: "03",
    title: "Quick Preset",
    tags: ["#바로시작", "#상황별세팅"],
    color: "#AF85FF",
    desc: '"오늘 많이 지쳤어", "중요한 결정 앞에 있어", "아이디어 내줘" — 상황을 고르면 최적의 비율이 자동으로 세팅돼요.',
  },
]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
})

export default function Features() {
  return (
    <section className="py-24 sm:py-32 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          기능
        </motion.p>

        <motion.h2
          {...fade(0.06)}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight"
        >
          딱 세 가지만 기억하면 돼요
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 sm:mt-16">
          {features.map((f, i) => (
            <motion.div
              key={f.number}
              {...fade(0.1 + i * 0.08)}
              className="rounded-2xl border border-black/[0.06] bg-white/70 p-7 sm:p-8 flex flex-col gap-5"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: f.color }} />
                <span className="font-mono text-xs text-muted tracking-widest">{f.number}</span>
              </div>

              <div>
                <h3 className="font-display text-xl sm:text-2xl text-foreground leading-snug">{f.title}</h3>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {f.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full font-mono"
                      style={{ backgroundColor: f.color + "22", color: f.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-muted text-sm leading-relaxed flex-1">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
