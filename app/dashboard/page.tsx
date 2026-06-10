import Image from "next/image"
import Link from "next/link"
import { getTrackedChampions } from "../lib/data"

export const dynamic = "force-dynamic"

const statusConfig = {
  "to-try": {
    label: "À tester",
    className: "border-[#7A5C38] bg-[#7A5C38]/15 text-[#C49A6C]",
  },
  learning: {
    label: "En apprentissage",
    className: "border-[#C89B3C] bg-[#C89B3C]/15 text-[#C89B3C]",
  },
  mastered: {
    label: "Maîtrisé",
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
                    <Image
                      src={tracked.championIconUrl}
                      alt=""
                      width={56}
                      height={56}
                      className="rounded-sm ring-1 ring-[#C89B3C]/40"
                    />
                    <div>
                      <h2 className="font-heading text-xl font-semibold tracking-wide text-[#F0E6D3]">
                        {tracked.championName}
                      </h2>
                      <p className="text-xs font-medium uppercase tracking-wider text-[#7A8CA0]">
                        {tracked.championRole}
                      </p>
                    </div>
                  </div>
                  <span className={`rounded-sm border px-3 py-1 text-xs font-bold uppercase tracking-widest ${status.className}`}>
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
        <section className="hextech-card rounded-sm p-8">
          <h2 className="font-heading text-2xl font-semibold tracking-wide text-[#F0E6D3]">
            Aucun champion suivi
          </h2>
          <p className="mt-2 text-[#7A8CA0]">
            Ouvre une fiche champion pour ajouter une progression personnelle.
          </p>
          <Link
            href="/champions"
            className="mt-5 inline-flex rounded-sm bg-[#C89B3C] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#010A13] shadow-[0_0_15px_rgba(200,155,60,0.3)] transition hover:bg-[#F0E6D3]"
          >
            Choisir un champion
          </Link>
        </section>
      )}
    </main>
  )
}

export default DashboardPage
