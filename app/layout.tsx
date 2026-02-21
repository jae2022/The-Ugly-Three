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
  title: "the ugly three",
  description: "LLM with our agent amo, edi, loco",
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
