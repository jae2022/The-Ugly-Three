import type { Metadata } from "next";
import { Geist, Geist_Mono, Do_Hyeon } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const doHyeon = Do_Hyeon({
  variable: "--font-jua",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Ugly3 — 세 목소리의 AI",
  description: "감성(Amo) · 이성(Edi) · 즉흥(Loco) — 내 감정 상태에 맞게 비율을 조절하는 AI",
  openGraph: {
    title: "Ugly3 — 세 목소리의 AI",
    description: "감성(Amo) · 이성(Edi) · 즉흥(Loco) — 내 감정 상태에 맞게 비율을 조절하는 AI",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ugly3 — 세 목소리의 AI",
    description: "감성(Amo) · 이성(Edi) · 즉흥(Loco) — 내 감정 상태에 맞게 비율을 조절하는 AI",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${doHyeon.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
