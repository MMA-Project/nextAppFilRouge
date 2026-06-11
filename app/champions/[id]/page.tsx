import Image from "next/image"
import Link from "next/link"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { SignInButton } from "@/app/components/SignInButton"
import { TrackChampionForm } from "@/app/components/TrackChampionForm"
import { authOptions } from "@/app/lib/auth"
import {
  getAttackTypeIconUrl,
  getChampionRoleIconUrl,
  getDamageTypeIconUrl,
} from "@/app/lib/cdragon"
import { getChampion } from "@/app/lib/data"
import { getSessionUserId } from "@/app/lib/session"
import { readTrackedChampion } from "@/app/lib/tracked-store"

export const dynamic = "force-dynamic"

const statusLabels = {
  "to-try": "A tester",
  learning: "En apprentissage",
  mastered: "Maitrise",
}

export default async function ChampionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  const userId = getSessionUserId(session)
  const champion = await getChampion(id)

  if (!champion) {
    notFound()
  }

  const trackedChampion = userId
    ? await readTrackedChampion(userId, champion.id)
    : null

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-10">
      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Link
          href="/champions"
          className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] transition-colors hover:text-[#F0E6D3] lg:col-span-2"
        >
          ← Retour aux champions
        </Link>

        <div className="hextech-card overflow-hidden rounded-sm lg:col-span-2">
          {(champion.uncenteredSplashUrl || champion.splashUrl) && (
            <Image
              src={champion.uncenteredSplashUrl || champion.splashUrl}
              alt=""
              width={1920}
              height={1080}
              priority
              className="aspect-[16/7] w-full object-cover object-top"
            />
          )}
          <div className="grid gap-6 p-5 lg:grid-cols-[1fr_280px]">
            <div className="grid gap-3">
              <div className="flex flex-wrap gap-2">
                {champion.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-2 rounded-sm border border-[#C89B3C]/30 bg-[#C89B3C]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#C89B3C]"
                  >
                    <Image
                      src={getChampionRoleIconUrl(role)}
                      alt=""
                      width={18}
                      height={18}
                      className="opacity-90"
                    />
                    {role}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-5xl font-bold tracking-wide text-[#F0E6D3]">
                {champion.name}
              </h1>
              <p className="text-lg font-medium text-[#7A8CA0]">
                {champion.title}
              </p>
              <p className="max-w-3xl text-[#A8B8C8]">{champion.lore}</p>
            </div>
            <dl className="grid gap-3 rounded-sm border border-[#C89B3C]/20 bg-[#010A13]/60 p-4 text-sm">
              <div className="grid gap-1">
                <dt className="text-[#7A8CA0]">Difficulté</dt>
                <dd className="font-semibold text-[#F0E6D3]">
                  {champion.difficulty}
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-[#7A8CA0]">Type de dégâts</dt>
                <dd className="flex items-center gap-2 font-semibold text-[#F0E6D3]">
                  <Image
                    src={getDamageTypeIconUrl(champion.tacticalInfo.damageType)}
                    alt=""
                    width={22}
                    height={22}
                    className="opacity-90"
                  />
                  {champion.tacticalInfo.damageType}
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-[#7A8CA0]">Portée d&apos;attaque</dt>
                <dd className="flex items-center gap-2 font-semibold text-[#F0E6D3]">
                  <Image
                    src={getAttackTypeIconUrl(champion.tacticalInfo.attackType)}
                    alt=""
                    width={22}
                    height={22}
                    className="opacity-90"
                  />
                  {champion.tacticalInfo.attackType}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="grid gap-6">
          <section className="grid gap-3">
            <h2 className="font-heading text-2xl font-semibold tracking-wide text-[#F0E6D3]">
              Competences
            </h2>
            <div className="grid gap-3">
              {champion.passive ? (
                <article className="hextech-card grid gap-4 rounded-sm p-4 sm:grid-cols-[56px_1fr]">
                  <Image
                    src={champion.passive.iconUrl}
                    alt=""
                    width={56}
                    height={56}
                    className="rounded-sm"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C89B3C]">
                      Passif
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-[#F0E6D3]">
                      {champion.passive.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#A8B8C8]">
                      {champion.passive.description}
                    </p>
                  </div>
                </article>
              ) : null}

              {champion.spells.map((spell) => (
                <article
                  key={spell.key}
                  className="hextech-card grid gap-4 rounded-sm p-4 sm:grid-cols-[56px_1fr]"
                >
                  <Image
                    src={spell.iconUrl}
                    alt=""
                    width={56}
                    height={56}
                    className="rounded-sm"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C89B3C]">
                      {spell.key}
                    </p>
                    <h3 className="font-heading text-lg font-semibold text-[#F0E6D3]">
                      {spell.name}
                    </h3>
                    <p className="mt-2 text-sm text-[#A8B8C8]">
                      {spell.description}
                    </p>
                    <p className="mt-3 text-xs text-[#7A8CA0]">
                      Cooldown : {spell.cooldown} · Cout : {spell.cost} · Portee
                      : {spell.range}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
            <h2 className="font-heading text-2xl font-semibold tracking-wide text-[#F0E6D3]">
              Skins
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {champion.skins.map((skin) => (
                <article
                  key={skin.id}
                  className="hextech-card overflow-hidden rounded-sm"
                >
                  <Image
                    src={skin.tileUrl}
                    alt=""
                    width={308}
                    height={560}
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <p className="p-3 text-sm font-semibold text-[#F0E6D3]">
                    {skin.name}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-3">
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
          </section>
        </div>

        <aside className="grid content-start gap-4">
          <div className="hextech-card rounded-sm p-5">
            <h2 className="font-heading text-xl font-semibold tracking-wide text-[#F0E6D3]">
              Suivi personnel
            </h2>
            <p className="mt-2 text-sm text-[#7A8CA0]">
              Connecte-toi pour ajouter ce champion à ton dashboard.
            </p>
          </div>
          {trackedChampion ? (
            <div className="hextech-card rounded-sm p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C89B3C]">
                Ton suivi actuel
              </p>
              <p className="mt-3 text-lg font-semibold text-[#F0E6D3]">
                {statusLabels[trackedChampion.status]}
              </p>
              <p className="mt-2 text-sm text-[#A8B8C8]">
                {trackedChampion.notes || "Aucune note pour ce champion."}
              </p>
              <p className="mt-3 text-xs text-[#7A8CA0]">
                Mis a jour le{" "}
                {new Intl.DateTimeFormat("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(trackedChampion.updatedAt))}
              </p>
            </div>
          ) : null}
          {session?.user ? (
            <TrackChampionForm championId={champion.id} />
          ) : (
            <SignInButton callbackUrl={`/champions/${champion.id}`}>
              Se connecter pour suivre
            </SignInButton>
          )}
        </aside>
      </section>
    </main>
  )
}
