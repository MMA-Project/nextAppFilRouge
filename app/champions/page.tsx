import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import { getChampionRoleIconUrl, getChampionSummaries } from "../lib/cdragon"

export const revalidate = 86400

async function ChampionGrid() {
  const champions = await getChampionSummaries()

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {champions.map((champion, index) => {
        const isAboveFold = index < 6

        return (
          <Link
            key={champion.id}
            href={`/champions/${champion.id}`}
            prefetch={false}
            className="hextech-card grid gap-4 rounded-sm p-5 [contain-intrinsic-size:150px] [content-visibility:auto] transition hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-4">
              {champion.iconUrl && (
                <Image
                  src={champion.iconUrl}
                  alt=""
                  width={64}
                  height={64}
                  loading={isAboveFold ? "eager" : "lazy"}
                  fetchPriority={isAboveFold ? "high" : "auto"}
                  unoptimized
                  className="rounded-sm ring-1 ring-[#C89B3C]/40"
                />
              )}
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
                  className="inline-flex items-center gap-1.5 rounded-sm border border-[#C89B3C]/30 bg-[#C89B3C]/10 px-2 py-1 text-xs font-bold uppercase tracking-wider text-[#C89B3C]"
                >
                  <Image
                    src={getChampionRoleIconUrl(role)}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="opacity-85"
                  />
                  {role}
                </span>
              ))}
            </div>
          </Link>
        )
      })}
    </section>
  )
}

function ChampionGridSkeleton() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }, (_, index) => (
        <div
          key={index}
          className="hextech-card grid min-h-[150px] gap-4 rounded-sm p-5"
        >
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 animate-pulse rounded-sm bg-[#1E2328]" />
            <div className="grid flex-1 gap-2">
              <div className="h-5 w-2/3 animate-pulse rounded-sm bg-[#1E2328]" />
              <div className="h-4 w-full animate-pulse rounded-sm bg-[#1E2328]" />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-7 w-20 animate-pulse rounded-sm bg-[#1E2328]" />
            <div className="h-7 w-24 animate-pulse rounded-sm bg-[#1E2328]" />
          </div>
        </div>
      ))}
    </section>
  )
}

export default function ChampionsPage() {
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

      <Suspense fallback={<ChampionGridSkeleton />}>
        <ChampionGrid />
      </Suspense>
    </main>
  )
}
