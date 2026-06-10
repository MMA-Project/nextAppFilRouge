import Image from "next/image"
import Link from "next/link"
import { getChampions } from "../lib/data"

export const dynamic = "force-dynamic"

export default async function ChampionsPage() {
  const champions = await getChampions()

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10">
      <div className="grid gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
          ✦ Encyclopédie ✦
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-wide text-[#F0E6D3]">
          Champions de Runeterra
        </h1>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {champions.map((champion) => (
          <Link
            key={champion.id}
            href={`/champions/${champion.id}`}
            className="hextech-card grid gap-4 rounded-sm p-5 transition hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              <Image
                src={champion.iconUrl}
                alt=""
                width={64}
                height={64}
                className="rounded-sm ring-1 ring-[#C89B3C]/40"
              />
              <div className="min-w-0">
                <h2 className="truncate font-heading text-xl font-bold tracking-wide text-[#F0E6D3]">
                  {champion.name}
                </h2>
                <p className="truncate text-sm text-[#7A8CA0]">
                  {champion.title}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {champion.roles.map((role) => (
                <span
                  key={role}
                  className="rounded-sm border border-[#C89B3C]/30 bg-[#C89B3C]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#C89B3C]"
                >
                  {role}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
