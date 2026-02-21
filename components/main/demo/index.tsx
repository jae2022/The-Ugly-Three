"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"

type PersonaKey = "amo" | "edi" | "loco"
type Values = Record<PersonaKey, number>

const PERSONAS: { key: PersonaKey; name: string; label: string; color: string }[] = [
  { key: "amo", name: "Amo", label: "감성", color: "#FF9083" },
  { key: "edi", name: "Edi", label: "이성", color: "#50D7B5" },
  { key: "loco", name: "Loco", label: "즉흥", color: "#AF85FF" },
]

const PRESETS = [
  { label: "위로받고 싶어 🫂", values: { amo: 70, edi: 20, loco: 10 } },
  { label: "냉정하게 분석해줘 📊", values: { amo: 10, edi: 70, loco: 20 } },
  { label: "그냥 질러버려 🚀", values: { amo: 20, edi: 10, loco: 70 } },
]

const QUESTION = "이직 제안을 받았어. 어떻게 생각해?"

const RESPONSES: Record<"amo" | "edi" | "loco" | "balanced", { name: string; color: string; text: string }> = {
  amo: {
    name: "Amo",
    color: "#FF9083",
    text: "와, 이직 제안이라니 설레기도 하고 불안하기도 하지? 지금 느끼는 감정이 어떤지가 제일 중요해. 새 곳에 가고 싶다는 마음이 크다면, 그 마음을 존중해줘. 지금 팀이 좋아서 떠나기 아쉽다면, 그것도 소중한 신호야. 어떤 감정이 더 강하게 느껴져? 🤍",
  },
  edi: {
    name: "Edi",
    color: "#50D7B5",
    text: "비교 체크리스트 만들어보자. ① 연봉 차이 ② 성장 가능성 ③ 워라밸 ④ 회사 안정성 ⑤ 팀 문화. 현 직장 대비 3개 이상 우위면 긍정적으로 검토해봐. 특히 2년 후 커리어 방향과 일치하는지가 핵심이야.",
  },
  loco: {
    name: "Loco",
    color: "#AF85FF",
    text: "그냥 가! 제안이 왔다는 건 네가 잘하고 있다는 뜻이고, 새 환경에서 더 폭발할 수도 있잖아. 최악의 경우? 안 맞으면 또 옮기면 되지. 기회는 기다려주지 않아. 오늘 연락해봐! 🚀",
  },
  balanced: {
    name: "Ugly3",
    color: "#2F2F2F",
    text: "감정적으로 설레는 부분도 있고 (Amo 💛), 현실적인 조건도 따져봐야 하고 (Edi 📊), 일단 대화는 해봐야 알 수 있어 (Loco 🚀). 우선 미팅 잡아보고 실제 조건 들어보면서 결정해도 늦지 않아.",
  },
}

function getDominant(values: Values): "amo" | "edi" | "loco" | "balanced" {
  const max = Math.max(values.amo, values.edi, values.loco)
  if (max < 45) return "balanced"
  if (values.amo === max) return "amo"
  if (values.edi === max) return "edi"
  return "loco"
}

function adjustValues(key: PersonaKey, newVal: number, current: Values): Values {
  const clamped = Math.max(0, Math.min(100, newVal))
  const others = (["amo", "edi", "loco"] as PersonaKey[]).filter(k => k !== key)
  const remaining = 100 - clamped
  const currentSum = current[others[0]] + current[others[1]]

  if (currentSum === 0) {
    return {
      ...current,
      [key]: clamped,
      [others[0]]: Math.round(remaining / 2),
      [others[1]]: remaining - Math.round(remaining / 2),
    }
  }

  const a = Math.round((current[others[0]] / currentSum) * remaining)
  return {
    ...current,
    [key]: clamped,
    [others[0]]: a,
    [others[1]]: remaining - a,
  }
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
})

export default function Demo() {
  const [values, setValues] = useState<Values>({ amo: 33, edi: 34, loco: 33 })
  const dominant = getDominant(values)
  const response = RESPONSES[dominant]

  const handleChange = useCallback((key: PersonaKey, val: number) => {
    setValues(prev => adjustValues(key, val, prev))
  }, [])

  return (
    <section className="py-24 sm:py-32 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          솔루션
        </motion.p>

        <motion.h2
          {...fade(0.06)}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight"
        >
          Ugly3가 다른 이유
        </motion.h2>

        <motion.p
          {...fade(0.12)}
          className="mt-4 sm:mt-5 text-muted text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          명령하는 AI가 아니라, 나의 여러 면을 함께 가진 AI.
          <br />
          Amo · Edi · Loco의 비율을 슬라이더 하나로 조절하면, AI가 그 균형대로 생각해드려요.
        </motion.p>

        {/* Demo Card */}
        <motion.div
          {...fade(0.18)}
          className="mt-12 sm:mt-16 bg-white border border-black/[0.06] shadow-md rounded-3xl overflow-hidden"
        >
          {/* Presets */}
          <div className="p-6 sm:p-7 border-b border-black/[0.05]">
            <p className="font-mono text-xs uppercase tracking-widest text-muted mb-3">Quick Preset</p>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => setValues(preset.values)}
                  className="px-4 py-2 rounded-full text-sm border border-black/10 hover:bg-black/5 active:bg-black/10 transition-colors text-foreground cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="p-6 sm:p-7 border-b border-black/[0.05] flex flex-col gap-5">
            {PERSONAS.map(({ key, name, label, color }) => (
              <div key={key} className="flex items-center gap-3 sm:gap-4">
                <div className="w-24 sm:w-28 flex items-center gap-1.5 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm font-medium text-foreground">{name}</span>
                  <span className="text-xs text-muted hidden sm:inline">({label})</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={values[key]}
                  onChange={e => handleChange(key, Number(e.target.value))}
                  className="ratio-slider flex-1"
                  style={{
                    "--slider-color": color,
                    "--slider-pct": `${values[key]}%`,
                  } as React.CSSProperties}
                />
                <span className="w-10 text-right text-sm font-mono font-medium text-foreground flex-shrink-0">
                  {values[key]}%
                </span>
              </div>
            ))}
          </div>

          {/* Chat preview */}
          <div className="p-6 sm:p-7 flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">미리보기</p>

            {/* User message */}
            <div className="flex justify-end">
              <div className="bg-foreground text-background text-sm rounded-2xl rounded-br-sm px-4 py-2.5 max-w-xs leading-relaxed">
                {QUESTION}
              </div>
            </div>

            {/* AI response */}
            <AnimatePresence mode="wait">
              <motion.div
                key={dominant}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="flex items-start gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: response.color }}
                >
                  {response.name[0]}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted font-medium">{response.name}</span>
                  <div className="text-sm text-foreground leading-relaxed bg-[#F5F3EE] rounded-2xl rounded-tl-sm px-4 py-3 max-w-sm sm:max-w-md">
                    {response.text}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
