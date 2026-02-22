"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── Particle canvas ─────────────────────────────────────────────────────────
const PARTICLE_COLORS = ["#FF9083", "#50D7B5", "#AF85FF"];
const PARTICLE_COUNT = 40;

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2 + Math.random() * 1.5, // radius 2–3.5px → diameter 4–7px
      color: PARTICLE_COLORS[Math.floor(Math.random() * 3)],
      opacity: 0.15 + Math.random() * 0.2,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    let animId: number;
    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -p.r) p.x = width + p.r;
        if (p.x > width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = height + p.r;
        if (p.y > height + p.r) p.y = -p.r;
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 w-full h-full" />;
}

// ─── Gradient-cycling dot ────────────────────────────────────────────────────
const dotKeyframes = `
@keyframes dotColorCycle {
  0%, 100% { background-color: #FF9083; }
  33%       { background-color: #50D7B5; }
  66%       { background-color: #AF85FF; }
}
`;

function GradientDot({ className }: { className?: string }) {
  return (
    <>
      <style>{dotKeyframes}</style>
      <span
        className={className}
        style={{ animation: "dotColorCycle 3s ease-in-out infinite" }}
      />
    </>
  );
}

// ─── Fade helper ─────────────────────────────────────────────────────────────
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay },
});

// ─── CTA ─────────────────────────────────────────────────────────────────────
export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [signupCount, setSignupCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist")
      .then((r) => r.json())
      .then((d) => setSignupCount(d.count))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "오류가 발생했어요. 다시 시도해주세요.");
        setStatus("error");
        return;
      }

      setStatus("success");
      if (typeof data.count === "number") setSignupCount(data.count);
    } catch {
      setErrorMsg("네트워크 오류가 발생했어요.");
      setStatus("error");
    }
  }

  return (
    <section id="cta" className="relative py-32 sm:py-40 px-5 overflow-hidden">
      {/* Floating particles */}
      <ParticleCanvas />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Pulse badge with gradient-cycling dot */}
        <motion.div
          {...fade(0)}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/[0.08] bg-white/60"
        >
          <span className="relative flex h-2 w-2">
            {/* ping ring — also cycles color */}
            <GradientDot className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" />
            {/* solid dot */}
            <GradientDot className="relative inline-flex h-2 w-2 rounded-full" />
          </span>
          <span className="font-mono text-xs tracking-widest text-foreground/70">얼리버드 모집 중</span>
        </motion.div>

        <motion.h2
          {...fade(0.08)}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight"
        >
          내 안에 있는
          <br />
          세 가지 목소리
        </motion.h2>

        <motion.p {...fade(0.14)} className="text-muted text-base sm:text-lg leading-relaxed break-keep">
          세 목소리의 비율을 내가 정하는 AI, Ugly3
          <br />
          얼리버드로 신청하면 출시 즉시 초대장을 보내드려요
        </motion.p>

        <motion.div {...fade(0.2)} className="w-full max-w-md mt-2">
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 py-4"
            >
              <div className="text-3xl">🎉</div>
              <p className="font-display text-xl text-foreground">신청 완료!</p>
              <p className="text-muted text-sm">
                {signupCount !== null && signupCount > 0
                  ? `${signupCount}명과 함께 출시를 기다리고 있어요.`
                  : "출시 소식을 가장 먼저 전달드릴게요."}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <AnimatePresence>
            {signupCount !== null && signupCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2.5"
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
      </div>
    </section>
  );
}
