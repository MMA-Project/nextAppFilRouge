"use client"

import { signIn } from "next-auth/react"

export function SignInButton({
  callbackUrl,
  children = "Connexion",
}: {
  callbackUrl?: string
  children?: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={() => signIn("github", { callbackUrl })}
      className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
    >
      {children}
    </button>
  )
}
