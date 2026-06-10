"use client"

import { signOut, useSession } from "next-auth/react"
import { SignInButton } from "./SignInButton"

export function AuthNav() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <span className="rounded-sm border border-[#C89B3C]/30 px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#7A8CA0]">
        Chargement...
      </span>
    )
  }

  if (session?.user) {
    return (
      <button
        type="button"
        onClick={() => signOut()}
        className="rounded-sm border border-[#C89B3C]/40 px-3 py-2 text-xs font-bold uppercase tracking-widest text-[#C89B3C] transition hover:border-[#C89B3C] hover:bg-[#C89B3C]/10"
      >
        Déconnexion
      </button>
    )
  }

  return <SignInButton>Connexion</SignInButton>
}
