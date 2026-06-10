import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TrackChampionForm } from "@/app/components/TrackChampionForm"
import { getChampion } from "@/app/lib/data"

export const dynamic = "force-dynamic"

export default async function ChampionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const champion = await getChampion(id)

  if (!champion) {
    notFound()
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[1fr_360px]">
      <section className="grid gap-6">
        <Link
          href="/champions"
          className="text-sm font-semibold text-emerald-700"
        >
          Retour aux champions
        </Link>

        <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-sm">
          <Image
            src={champion.splashUrl}
            alt=""
            width={1215}
            height={717}
            priority
            className="aspect-[16/7] w-full object-cover"
          />
          <div className="grid gap-3 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              {champion.roles.join(" / ") || champion.role}
            </p>
            <h1 className="text-5xl font-bold text-zinc-950">
              {champion.name}
            </h1>
            <p className="text-xl font-medium text-zinc-700">
              {champion.title}
            </p>
            <p className="max-w-3xl text-zinc-600">{champion.lore}</p>
          </div>
        </div>

        <div className="grid gap-3">
          <h2 className="text-2xl font-semibold text-zinc-950">
            Conseils d&apos;apprentissage
          </h2>
          <ul className="grid gap-3">
            {champion.tips.map((tip) => (
              <li
                key={tip}
                className="rounded-md border border-zinc-200 bg-white p-4 text-zinc-700 shadow-sm"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="grid content-start gap-4">
        <div className="rounded-md border border-zinc-200 bg-zinc-50 p-5">
          <h2 className="text-xl font-semibold text-zinc-950">
            Suivi personnel
          </h2>
        </div>
        <TrackChampionForm championId={champion.id} />
      </aside>
    </main>
  )
}
