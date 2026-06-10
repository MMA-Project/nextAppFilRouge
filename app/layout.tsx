import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { getCDragonAssetUrl } from "./lib/cdragon"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "League Tracker",
  description: "Application fil rouge Next.js autour de League of Legends",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="min-h-screen bg-stone-50 text-zinc-950">
          <header className="border-b border-zinc-200 bg-white">
            <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold text-zinc-950"
              >
                <Image
                  src={getCDragonAssetUrl(
                    "/lol-game-data/assets/v1/profile-icons/29.png"
                  )}
                  alt=""
                  width={32}
                  height={32}
                  className="rounded-md"
                />
                League Tracker
              </Link>
              <div className="flex gap-3 text-sm font-semibold">
                <Link
                  href="/champions"
                  className="text-zinc-700 hover:text-emerald-700"
                >
                  Champions
                </Link>
                <Link
                  href="/dashboard"
                  className="text-zinc-700 hover:text-emerald-700"
                >
                  Dashboard
                </Link>
              </div>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
