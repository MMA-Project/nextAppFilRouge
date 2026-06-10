import Link from "next/link"
import { getCDragonAssetUrl } from "./lib/cdragon"

export default function Home() {
  const heroSplash = getCDragonAssetUrl(
    "/lol-game-data/assets/ASSETS/Characters/Ahri/Skins/Base/Images/ahri_splash_uncentered_0.jpg"
  )

  return (
    <main className="relative min-h-[calc(100vh-65px)] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroSplash})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#010A13] via-[#010A13]/85 to-[#010A13]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010A13] via-transparent to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100vh-65px)] w-full max-w-6xl content-center gap-10 px-6 py-12">
        <section className="grid max-w-2xl gap-6">
          <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
            ✦ Runeterra Academy ✦
          </p>
          <h1 className="font-heading text-6xl font-bold leading-tight tracking-wide text-[#F0E6D3] sm:text-7xl">
            League<br />Tracker
          </h1>
          <p className="max-w-lg text-base leading-8 text-[#A8B8C8]">
            Explore les champions de Runeterra, suis ta progression et construis ton panthéon personnel.
          </p>
        </section>

        <nav className="flex flex-wrap gap-3">
          <Link
            href="/champions"
            className="rounded-sm bg-[#C89B3C] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#010A13] shadow-[0_0_20px_rgba(200,155,60,0.4)] transition hover:bg-[#F0E6D3]"
          >
            Explorer les champions
          </Link>
          <Link
            href="/dashboard"
            className="rounded-sm border border-[#C89B3C]/50 px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#C89B3C] transition hover:border-[#C89B3C] hover:bg-[#C89B3C]/10"
          >
            Mon dashboard
          </Link>
        </nav>
      </div>
    </main>
  )
}
