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
      className="grid gap-4 rounded-md border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="championId" value={championId} />

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        Statut
        <select
          name="status"
          defaultValue="learning"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm"
        >
          <option value="to-try">A tester</option>
          <option value="learning">En apprentissage</option>
          <option value="mastered">Maitrise</option>
        </select>
      </label>
      {state.errors?.status ? (
        <p className="text-sm text-red-600">{state.errors.status}</p>
      ) : null}

      <label className="grid gap-2 text-sm font-medium text-zinc-800">
        Note personnelle
        <textarea
          name="notes"
          rows={4}
          placeholder="Ex: travailler les trades niveau 2 et la gestion de mana."
          className="resize-none rounded-md border border-zinc-300 px-3 py-2 text-sm"
        />
      </label>
      {state.errors?.notes ? (
        <p className="text-sm text-red-600">{state.errors.notes}</p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {isPending ? "Enregistrement..." : "Suivre ce champion"}
      </button>

      {state.message ? (
        <p
          className={state.ok ? "text-sm text-emerald-700" : "text-sm text-red-600"}
        >
          {state.message}
        </p>
      ) : null}
    </form>
  )
}
