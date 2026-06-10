import type { Metadata } from "next"
import { Cinzel, Geist, Geist_Mono } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { AuthNav } from "./components/AuthNav"
import { AuthProvider } from "./components/AuthProvider"
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

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
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
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable}`}>
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-[#010A13] text-[#F0E6D3]">
            <header className="sticky top-0 z-50 border-b border-[#C89B3C]/30 bg-[#010A13]/95 backdrop-blur-sm">
              <nav className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-heading text-base font-bold uppercase tracking-widest text-[#F0E6D3] transition-colors hover:text-[#C89B3C]"
                >
                  <Image
                    src={getCDragonAssetUrl(
                      "/lol-game-data/assets/v1/champion-icons/103.png"
                    )}
                    alt=""
                    width={32}
                    height={32}
                    className="rounded-sm ring-1 ring-[#C89B3C]/50"
                  />
                  League Tracker
                </Link>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                  <Link
                    href="/champions"
                    className="uppercase tracking-widest text-[#A8B8C8] transition-colors hover:text-[#C89B3C]"
                  >
                    Champions
                  </Link>
                  <Link
                    href="/dashboard"
                    className="uppercase tracking-widest text-[#A8B8C8] transition-colors hover:text-[#C89B3C]"
                  >
                    Dashboard
                  </Link>
                  <AuthNav />
                </div>
              </nav>
            </header>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
