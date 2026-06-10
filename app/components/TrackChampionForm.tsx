"use client"

import { useActionState } from "react"
import { trackChampionAction, type TrackChampionState } from "../actions"

const initialState: TrackChampionState = {
  ok: false,
  message: "",
}

export function TrackChampionForm({ championId }: { championId: string }) {
  const [state, formAction, isPending] = useActionState(
    trackChampionAction,
    initialState
  )

  return (
    <form
      action={formAction}
      className="hextech-card grid gap-4 rounded-sm p-5"
    >
      <input type="hidden" name="championId" value={championId} />

      <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-[#A8B8C8]">
        Statut
        <select
          name="status"
          defaultValue="learning"
          className="rounded-sm border border-[#C89B3C]/30 bg-[#010A13] px-3 py-2 text-sm text-[#F0E6D3] focus:border-[#C89B3C] focus:outline-none"
        >
          <option value="to-try">À tester</option>
          <option value="learning">En apprentissage</option>
          <option value="mastered">Maîtrisé</option>
        </select>
      </label>
      {state.errors?.status ? (
        <p className="text-sm text-red-400">{state.errors.status}</p>
      ) : null}

      <label className="grid gap-2 text-xs font-bold uppercase tracking-widest text-[#A8B8C8]">
        Note personnelle
        <textarea
          name="notes"
          rows={4}
          placeholder="Ex: travailler les trades niveau 2 et la gestion de mana."
          className="resize-none rounded-sm border border-[#C89B3C]/30 bg-[#010A13] px-3 py-2 text-sm text-[#F0E6D3] placeholder-[#4A5A6A] focus:border-[#C89B3C] focus:outline-none"
        />
      </label>
      {state.errors?.notes ? (
        <p className="text-sm text-red-400">{state.errors.notes}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-sm bg-[#C89B3C] px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#010A13] shadow-[0_0_15px_rgba(200,155,60,0.2)] transition hover:bg-[#F0E6D3] disabled:cursor-not-allowed disabled:bg-[#4A4030] disabled:text-[#7A6A50]"
      >
        {isPending ? "Enregistrement..." : "Suivre ce champion"}
      </button>

      {state.message ? (
        <p className={state.ok ? "text-sm text-[#0AC8B9]" : "text-sm text-red-400"}>
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
