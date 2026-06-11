import Link from "next/link"

const ChampionNotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-65px)] w-full max-w-4xl items-center justify-center px-6 py-10">
      <div className="hextech-card w-full rounded-sm p-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
          Champion 404
        </p>
        <h1 className="font-heading mt-3 text-5xl font-bold tracking-wide text-[#F0E6D3]">
          Champion introuvable
        </h1>
        <Link
          href="/champions"
          className="mt-6 inline-flex rounded-sm bg-[#C89B3C] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-[#010A13] transition hover:bg-[#F0E6D3]"
        >
          Voir les champions
        </Link>
      </div>
    </div>
  )
}

export default ChampionNotFoundPage
