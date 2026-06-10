import Link from "next/link"
import { getChampions } from "../lib/data"

export const dynamic = "force-dynamic"

export default async function ChampionsPage() {
  const champions = await getChampions()

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Encyclopedie
        </p>
        <h1 className="text-4xl font-bold text-zinc-950">Champions LoL</h1>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {champions.map((champion) => (
          <Link
            key={champion.id}
            href={`/champions/${champion.id}`}
            className="grid gap-3 rounded-md border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold text-zinc-950">
                {champion.name}
              </h2>
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                {champion.role}
              </span>
            </div>
            <p className="font-medium text-zinc-700">{champion.title}</p>
            <p className="text-sm text-zinc-600">{champion.lore}</p>
            <p className="text-sm font-medium text-zinc-500">
              Difficulte : {champion.difficulty}
            </p>
          </Link>
        ))}
      </section>
    </main>
  )
}
