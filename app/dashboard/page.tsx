import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { SignInButton } from "../components/SignInButton"
import { authOptions } from "../lib/auth"
import { getTrackedChampions } from "../lib/data"

export const dynamic = "force-dynamic"

const statusLabels = {
  "to-try": "A tester",
  learning: "En apprentissage",
  mastered: "Maitrise",
}

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10">
        <section className="rounded-md border border-zinc-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Dashboard prive
          </p>
          <h1 className="mt-3 text-4xl font-bold text-zinc-950">
            Connecte-toi pour voir tes champions suivis
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-600">
            Le dashboard contient ton suivi personnel.
          </p>
          <div className="mt-6">
            <SignInButton callbackUrl="/dashboard">
              Connexion avec GitHub
            </SignInButton>
          </div>
        </section>
      </main>
    )
  }

  const trackedChampions = await getTrackedChampions()

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10">
      <div className="grid gap-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Dashboard
        </p>
        <h1 className="text-4xl font-bold text-zinc-950">Champions suivis</h1>
      </div>

      {trackedChampions.length ? (
        <section className="grid gap-4">
          {trackedChampions.map((tracked) => (
            <article
              key={tracked.championId}
              className="grid gap-3 rounded-md border border-zinc-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <Image
                    src={tracked.championIconUrl}
                    alt=""
                    width={56}
                    height={56}
                    className="rounded-md"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold text-zinc-950">
                      {tracked.championName}
                    </h2>
                    <p className="text-sm font-medium text-zinc-500">
                      Role : {tracked.championRole}
                    </p>
                  </div>
                </div>
                <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  {statusLabels[tracked.status]}
                </span>
              </div>
              {tracked.notes ? (
                <p className="text-zinc-700">{tracked.notes}</p>
              ) : (
                <p className="text-zinc-500">Aucune note pour le moment.</p>
              )}
              <Link
                href={`/champions/${tracked.championId}`}
                className="text-sm font-semibold text-emerald-700"
              >
                Modifier le suivi
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <section className="rounded-md border border-dashed border-zinc-300 bg-white p-8">
          <h2 className="text-2xl font-semibold text-zinc-950">
            Aucun champion suivi
          </h2>
          <p className="mt-2 text-zinc-600">
            Ouvre une fiche champion pour ajouter une progression personnelle.
          </p>
          <Link
            href="/champions"
            className="mt-5 inline-flex rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
          >
            Choisir un champion
          </Link>
        </section>
      )}
    </main>
  )
}

export default DashboardPage
