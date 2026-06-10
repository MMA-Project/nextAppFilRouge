import Link from "next/link"

export default function Home() {
  return (
    <main className="mx-auto grid min-h-[calc(100vh-65px)] w-full max-w-6xl content-center gap-10 px-6 py-12">
      <section className="grid max-w-3xl gap-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Fil rouge Next.js
        </p>
        <h1 className="text-5xl font-bold text-zinc-950 sm:text-6xl">
          League Tracker
        </h1>
        <p className="text-lg leading-8 text-zinc-700">
          Une application scolaire autour de League of Legends pour pratiquer
          les routes dynamiques, les Server Components, le cache Next.js et les
          Server Actions.
        </p>
      </section>

      <nav className="flex flex-wrap gap-3">
        <Link
          href="/champions"
          className="rounded-md bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Voir les champions
        </Link>
        <Link
          href="/dashboard"
          className="rounded-md border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-900 transition hover:border-emerald-500"
        >
          Ouvrir le dashboard
        </Link>
      </nav>
    </main>
  )
}
