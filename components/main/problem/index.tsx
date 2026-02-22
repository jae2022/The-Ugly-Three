"use client";

import { motion } from "motion/react";

const problems = [
  {
    number: "01",
    icon: "😵‍💫",
    title: "결정 피로는 매일 누적 중",
    desc: "점심 메뉴부터 이직까지, 매일 수십 번의 결정 앞에 서요. 문제는 그 결정마다 내 감정 상태가 다르다는 거예요. 오늘의 나와 어제의 나는 다른 답을 원해요.",
  },
  {
    number: "02",
    icon: "🤖",
    title: "근데 AI는 언제나 같은 목소리",
    desc: "감성적 위로가 필요할 때도, 냉정한 분석이 필요할 때도 AI는 항상 같은 톤으로 답해요. 내 상태를 반영하지 않아요.",
  },
  {
    number: "03",
    icon: "🎭",
    title: "원하는 방식으로 고정할 수도 없어요",
    desc: "'좀 더 감성적으로', '더 냉정하게' 요청해봐도 AI는 금새 다른 어투로 이야기해요. 내가 AI에게 맞춰가고 있는 건지, AI가 나를 돕고 있는 건지 모르겠어요.",
  },
  {
    number: "04",
    icon: "🔧",
    title: "그렇다고 바꿀 방법도 없어요",
    desc: "AI 성격을 조정하려면 프롬프트 엔지니어링을 알아야 해요. 결국 AI를 내 방식으로 쓰는 건 아직 기술자의 영역으로 남아있어요.",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
});

export default function Problem() {
  return (
    <section className="py-24 sm:py-32 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-widest text-muted mb-4">
          문제
        </motion.p>

        <motion.h2 {...fade(0.06)} className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
          AI한테 물어봤는데,
          <br />왜 내 답 같지 않을까요?
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 sm:mt-16">
          {problems.map((p, i) => (
            <motion.div
              key={p.number}
              {...fade(0.1 + i * 0.07)}
              whileHover={{ y: -5, boxShadow: "0 12px 28px rgba(0,0,0,0.09)", transition: { duration: 0.2, ease: "easeOut" } }}
              className="rounded-2xl border border-black/[0.06] bg-white/70 p-7 sm:p-8 flex flex-col gap-4 cursor-default"
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
  );
}
