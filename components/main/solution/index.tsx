"use client";

import { motion } from "motion/react";

const characters = [
  {
    name: "Amo",
    role: "공감러",
    description: "따뜻하게 공감하며 챙겨주는 공감러\n감성적으로 공명하고, 당신의 감정을 먼저 이해해요",
    tags: ["#감성", "#공감"],
    image: "/Character-Amo-introduce.svg",
    color: "#FF9083",
    imageLeft: true,
  },
  {
    name: "Edi",
    role: "플래너",
    description: "효율과 합리를 최우선하는 플래너\n냉철한 분석으로 언제나 최선의 답을 찾아드려요",
    tags: ["#이성", "#효율"],
    image: "/Character-Edi-introduce.svg",
    color: "#50D7B5",
    imageLeft: false,
  },
  {
    name: "Loco",
    role: "크리에이터",
    description: "톡톡 튀는 아이디어로 해답을 주는 크리에이터\n고정관념을 부수는 신선한 시각을 드릴게요",
    tags: ["#즉흥", "#창의"],
    image: "/Character-Loco-introduce.svg",
    color: "#AF85FF",
    imageLeft: true,
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, delay },
});

export default function Solution() {
  return (
    <section className="py-24 sm:py-32 px-5 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col gap-0">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-16">
          <motion.p {...fade(0)} className="font-mono text-xs uppercase tracking-widest text-muted">
            솔루션
          </motion.p>
          <motion.h2 {...fade(0.06)} className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
            사실 우리 모두 이 셋을 갖고 있어요
          </motion.h2>
          <motion.p {...fade(0.12)} className="text-muted text-sm sm:text-base leading-relaxed break-keep">
            감성(Amo) · 이성(Edi) · 즉흥(Loco) 이 셋은 내 안에 늘 존재했던 목소리예요.
            <br />
            이 세 감정의 비율을 직접 조절해, 오늘의 나에게 꼭 맞는 AI를 만들어보세요.
          </motion.p>
        </div>

        {/* Zigzag rows */}
        {characters.map((char, i) => (
          <motion.div
            key={char.name}
            {...fade(0.06 * i)}
            className={`flex flex-col ${char.imageLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16 py-10 md:py-14`}
          >
            {/* Character side — blob + image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative flex items-center justify-center" style={{ width: 300, height: 260 }}>
                {/* Organic blob */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: `${char.color}22`,
                    borderRadius:
                      i === 0
                        ? "44% 56% 60% 40% / 55% 42% 58% 45%"
                        : i === 1
                          ? "60% 40% 38% 62% / 48% 60% 40% 52%"
                          : "50% 50% 42% 58% / 58% 44% 56% 42%",
                  }}
                />
                {/* Floating image */}
                <motion.img
                  src={char.image}
                  alt={char.name}
                  className="relative z-10 w-48 h-48 sm:w-56 sm:h-56"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.9,
                  }}
                />
              </div>
            </div>

            {/* Text side */}
            <div className="flex-1 flex flex-col gap-5 items-center text-center md:items-start md:text-left">
              <div className="flex flex-col gap-1">
                <p className="font-display text-4xl sm:text-5xl" style={{ color: char.color }}>
                  {char.name}
                </p>
                <p className="text-base font-medium text-foreground">{char.role}</p>
              </div>

              <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xs whitespace-pre-line">{char.description}</p>

              <div className="flex flex-wrap gap-2">
                {char.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm font-mono font-medium"
                    style={{
                      backgroundColor: `${char.color}18`,
                      color: char.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
