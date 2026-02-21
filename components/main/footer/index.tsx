export default function Footer() {
  return (
    <footer className="py-10 px-5 border-t border-black/[0.06]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-display text-lg text-foreground">The Ugly Three</span>
        <span className="text-xs text-muted font-mono">© 2025 The Ugly Three. All rights reserved.</span>
      </div>
    </footer>
  )
}
