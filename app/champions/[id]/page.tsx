import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { SignInButton } from "@/app/components/SignInButton"
import { TrackChampionForm } from "@/app/components/TrackChampionForm"
import { authOptions } from "@/app/lib/auth"
import { getChampion } from "@/app/lib/data"

export const dynamic = "force-dynamic"

export default async function ChampionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const champion = await getChampion(id)

  if (!champion) {
    notFound()
  }

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-10 lg:grid-cols-[1fr_360px]">
      <section className="grid gap-6">
        <Link
          href="/champions"
          className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] transition-colors hover:text-[#F0E6D3]"
        >
          ← Retour aux champions
        </Link>

        <div className="hextech-card overflow-hidden rounded-sm">
          <Image
            src={champion.uncenteredSplashUrl}
            alt=""
            width={1920}
            height={1080}
            priority
            className="aspect-[16/7] w-full object-cover object-top"
          />
          <div className="grid gap-3 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C89B3C]">
              {champion.roles.join(" / ") || champion.role}
            </p>
            <h1 className="font-heading text-5xl font-bold tracking-wide text-[#F0E6D3]">
              {champion.name}
            </h1>
            <p className="text-lg font-medium text-[#7A8CA0]">
              {champion.title}
            </p>
            <p className="max-w-3xl text-[#A8B8C8]">{champion.lore}</p>
          </div>
        </div>

        <div className="grid gap-3">
          <h2 className="font-heading text-2xl font-semibold tracking-wide text-[#F0E6D3]">
            Conseils d&apos;apprentissage
          </h2>
          <ul className="grid gap-3">
            {champion.tips.map((tip) => (
              <li
                key={tip}
                className="hextech-card rounded-sm p-4 text-[#A8B8C8]"
              >
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="grid content-start gap-4">
        <div className="hextech-card rounded-sm p-5">
          <h2 className="font-heading text-xl font-semibold tracking-wide text-[#F0E6D3]">
            Suivi personnel
          </h2>
          <p className="mt-2 text-sm text-[#7A8CA0]">
            Connecte-toi pour ajouter ce champion à ton dashboard.
          </p>
        </div>
        {session?.user ? (
          <TrackChampionForm championId={champion.id} />
        ) : (
          <SignInButton callbackUrl={`/champions/${champion.id}`}>
            Se connecter pour suivre
          </SignInButton>
        )}
      </aside>
    </main>
  )
}
