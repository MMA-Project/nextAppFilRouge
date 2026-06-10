"use client"

import { signOut, useSession } from "next-auth/react"
import { SignInButton } from "./SignInButton"

export function AuthNav() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <span className="rounded-md border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-500">
        Session...
      </span>
    )
  }

  if (session?.user) {
    return (
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700"
      >
        Deconnexion
      </button>
    )
  }

  return <SignInButton>Connexion</SignInButton>
}
