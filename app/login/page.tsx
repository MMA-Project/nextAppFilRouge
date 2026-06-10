import { SignInButton } from "../components/SignInButton"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>
}) {
  const { callbackUrl } = await searchParams

  return (
    <main className="mx-auto grid min-h-[calc(100vh-65px)] w-full max-w-3xl content-center px-6 py-12">
      <section className="hextech-card rounded-sm p-8">
        <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#C89B3C]">
          ✦ Connexion ✦
        </p>
        <h1 className="font-heading mt-3 text-4xl font-bold tracking-wide text-[#F0E6D3]">
          Invocateur, identifie-toi
        </h1>
        <p className="mt-3 text-[#7A8CA0]">
          Le dashboard et le suivi personnel des champions sont réservés aux invocateurs connectés.
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
