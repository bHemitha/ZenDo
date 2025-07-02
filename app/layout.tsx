import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "PlanMate - Premium Personal Productivity Assistant",
  description:
    "A beautiful, minimalist productivity app with old money aesthetic. Combine daily planning, habit tracking, time-blocking, and journaling in one seamless interface.",
  keywords: "productivity, planning, journal, diary, tasks, time blocking, habits, calendar",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
