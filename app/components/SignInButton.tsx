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
      className="rounded-sm bg-[#C89B3C] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#010A13] shadow-[0_0_15px_rgba(200,155,60,0.25)] transition hover:bg-[#F0E6D3]"
    >
      {children}
    </button>
  )
}
