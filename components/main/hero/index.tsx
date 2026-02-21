"use client"

import { useState } from "react"
import { LayoutGroup, motion } from "motion/react"

import { TextRotate } from "@/components/ui/text-rotate"
import { AmoCharacter } from "./AmoCharacter"
import { EdiCharacter } from "./EdiCharacter"
import { LocoCharacter } from "./LocoCharacter"

const texts = ["Amo", "Edi", "Loco", "아모", "에디", "로꼬"]

const colors = [
  "#FF9083", // Amo
  "#50D7B5", // Edi
  "#AF85FF", // Loco
  "#FF9083", // 아모
  "#50D7B5", // 에디
  "#AF85FF", // 로꼬
]

const characterComponents = [AmoCharacter, EdiCharacter, LocoCharacter]
const characterAlts = ["Amo", "Edi", "Loco"]

// currentIndex % 3 → 0=Amo, 1=Edi, 2=Loco
const ACTIVE_SCALE = 1.45
const INACTIVE_SCALE = 0.65
const INACTIVE_OPACITY = 0.45

const sharedClassName =
  "text-white px-3 sm:px-4 md:px-5 overflow-hidden py-1 sm:py-1.5 md:py-2 items-center justify-center rounded-2xl"

const textTransition = { type: "spring", damping: 30, stiffness: 400 } as const

// 활성화 → delay 0.35s 후 spring, 비활성화 → 즉시 spring
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

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const activeCharIndex = currentIndex % 3

  return (
    <div className="w-full h-screen text-4xl sm:text-5xl md:text-7xl flex items-center justify-center font-display text-foreground font-normal overflow-x-hidden p-12 sm:p-20 md:p-24">
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10">

        {/* 캐릭터 3개 가로 배치 — 발(bottom) 기준 정렬 */}
        <div className="flex items-end justify-center gap-6 sm:gap-8 md:gap-12 h-48">
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

        {/* 텍스트 영역 */}
        <LayoutGroup>
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            {/* Line 1: 오늘은 [name]가 */}
            <motion.div className="flex items-center whitespace-pre" layout>
              <motion.span layout transition={textTransition}>
                오늘은{" "}
              </motion.span>
              <div className="relative">
                {/* Ghost spacer — always "Loco" width */}
                <span
                  className="px-3 sm:px-4 md:px-5 py-1 sm:py-1.5 md:py-2 invisible whitespace-nowrap pointer-events-none select-none"
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
                    splitLevelClassName="overflow-hidden py-0.5 sm:py-1 md:py-1"
                    transition={textTransition}
                    rotationInterval={3000}
                    onNext={setCurrentIndex}
                  />
                </span>
              </div>
              <motion.span layout transition={textTransition} className="ml-1 sm:ml-2 md:ml-3">
                가
              </motion.span>
            </motion.div>

            {/* Line 2: 같이 작업해줘 */}
            <motion.div layout transition={textTransition}>
              같이 작업해줘
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </div>
  )
}
