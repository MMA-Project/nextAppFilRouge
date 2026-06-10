import { SignInButton } from "../components/SignInButton"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <main className="mx-auto grid min-h-[calc(100vh-65px)] w-full max-w-3xl content-center px-6 py-12">
      <section className="rounded-md border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
          Connexion
        </p>
        <h1 className="mt-3 text-4xl font-bold text-zinc-950">
          Connecte-toi avec GitHub
        </h1>
        <p className="mt-3 text-zinc-600">
          Le dashboard et le suivi personnel des champions sont reserves aux
          utilisateurs connectes.
        </p>
        <div className="mt-6">
          <SignInButton callbackUrl={callbackUrl ?? "/dashboard"}>
            Connexion avec GitHub
          </SignInButton>
        </div>
      </section>
    </main>
  )
}
