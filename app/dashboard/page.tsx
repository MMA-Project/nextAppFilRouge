import Image from "next/image"
import Link from "next/link"
import {
  getCDragonAssetUrl,
  getChampionRoleIconUrl,
  getRankIconUrl,
} from "../lib/cdragon"
import { getTrackedChampions } from "../lib/data"

export const dynamic = "force-dynamic"

const EMPTY_STATE_CHAMPION_IDS = [103, 99, 157, 222]

const statusConfig = {
  "to-try": {
    label: "À tester",
    tier: "iron" as const,
    className: "border-[#7A5C38] bg-[#7A5C38]/15 text-[#C49A6C]",
  },
  learning: {
    label: "En apprentissage",
    tier: "gold" as const,
    className: "border-[#C89B3C] bg-[#C89B3C]/15 text-[#C89B3C]",
  },
  mastered: {
    label: "Maîtrisé",
    tier: "challenger" as const,
    className: "border-[#0AC8B9] bg-[#0AC8B9]/15 text-[#0AC8B9]",
  },
}

const DashboardPage = async () => {
  const trackedChampions = await getTrackedChampions()

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10">
      <div className="grid gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
          ✦ Progression ✦
        </p>
        <h1 className="font-heading text-4xl font-bold tracking-wide text-[#F0E6D3]">
          Champions suivis
        </h1>
      </div>

      {trackedChampions.length ? (
        <section className="grid gap-4">
          {trackedChampions.map((tracked) => {
            const status = statusConfig[tracked.status] ?? statusConfig.learning
            return (
              <article
                key={tracked.championId}
                className="hextech-card grid gap-3 rounded-sm p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    {tracked.championIconUrl && (
                      <Image
                        src={tracked.championIconUrl}
                        alt=""
                        width={56}
                        height={56}
                        className="rounded-sm ring-1 ring-[#C89B3C]/40"
                      />
                    )}
                    <div>
                      <h2 className="font-heading text-xl font-semibold tracking-wide text-[#F0E6D3]">
                        {tracked.championName}
                      </h2>
                      <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-[#7A8CA0]">
                        <Image
                          src={getChampionRoleIconUrl(tracked.championRole)}
                          alt=""
                          width={16}
                          height={16}
                          className="opacity-70"
                        />
                        {tracked.championRole}
                      </p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-2 rounded-sm border px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${status.className}`}>
                    <Image
                      src={getRankIconUrl(status.tier)}
                      alt={status.tier}
                      width={18}
                      height={18}
                      className="drop-shadow-sm"
                    />
                    {status.label}
                  </span>
                </div>
                {tracked.notes ? (
                  <p className="text-[#A8B8C8]">{tracked.notes}</p>
                ) : (
                  <p className="italic text-[#4A5A6A]">Aucune note pour le moment.</p>
                )}
                <Link
                  href={`/champions/${tracked.championId}`}
                  className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] transition-colors hover:text-[#F0E6D3]"
                >
                  Modifier le suivi →
                </Link>
              </article>
            )
          })}
        </section>
      ) : (
        <section className="hextech-card relative overflow-hidden rounded-sm p-10">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-end gap-0 opacity-[0.07]">
            {EMPTY_STATE_CHAMPION_IDS.map((id) => (
              <Image
                key={id}
                src={getCDragonAssetUrl(`/lol-game-data/assets/v1/champion-icons/${id}.png`)}
                alt=""
                width={160}
                height={160}
                className="rounded-sm"
              />
            ))}
          </div>
          <div className="relative grid gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={getRankIconUrl("unranked")}
                alt="unranked"
                width={48}
                height={48}
                className="opacity-60"
              />
              <div>
                <h2 className="font-heading text-2xl font-semibold tracking-wide text-[#F0E6D3]">
                  Ton roster est vide
                </h2>
                <p className="mt-1 text-sm text-[#7A8CA0]">
                  Explore les champions et commence à tracer ta progression vers le Challenger.
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-6 border-t border-[#C89B3C]/15 pt-4">
              {(["iron", "gold", "challenger"] as const).map((tier) => (
                <div key={tier} className="flex items-center gap-2 opacity-50">
                  <Image src={getRankIconUrl(tier)} alt={tier} width={24} height={24} />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7A8CA0]">
                    {tier}
                  </span>
                </div>
              ))}
              <span className="ml-auto text-[#4A5A6A] text-xs">→</span>
            </div>
            <Link
              href="/champions"
              className="mt-2 inline-flex w-fit rounded-sm bg-[#C89B3C] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#010A13] shadow-[0_0_15px_rgba(200,155,60,0.3)] transition hover:bg-[#F0E6D3]"
            >
              Choisir un champion
            </Link>
          </div>
        </section>
      )}
    </main>
  )
}

export default DashboardPage
