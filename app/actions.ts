"use server"

import { revalidatePath, updateTag } from "next/cache"
import { z } from "zod"
import { getChampionById } from "./lib/cdragon"
import { TRACKED_CHAMPIONS_TAG } from "./lib/data"
import { writeTrackedChampion } from "./lib/tracked-store"

export type TrackChampionState = {
  ok: boolean
  message: string
  errors?: {
    championId?: string
    status?: string
    notes?: string
  }
}

const trackChampionSchema = z.object({
  championId: z.string().min(1, "Champion introuvable."),
  status: z.enum(["to-try", "learning", "mastered"], {
    message: "Choisis un statut valide.",
  }),
  notes: z.string().trim().max(280, "La note doit faire 280 caracteres max."),
})

export async function trackChampionAction(
  _previousState: TrackChampionState,
  formData: FormData
): Promise<TrackChampionState> {
  const parsed = trackChampionSchema.safeParse({
    championId: formData.get("championId"),
    status: formData.get("status"),
    notes: formData.get("notes") ?? "",
  })

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors

    return {
      ok: false,
      message: "Le suivi n'a pas ete enregistre.",
      errors: {
        championId: fieldErrors.championId?.[0],
        status: fieldErrors.status?.[0],
        notes: fieldErrors.notes?.[0],
      },
    }
  }

  const champion = await getChampionById(parsed.data.championId)

  if (!champion) {
    return {
      ok: false,
      message: "Impossible de suivre un champion qui n'existe pas.",
      errors: {
        championId: "Champion introuvable.",
      },
    }
  }

  try {
    await writeTrackedChampion({
      championId: parsed.data.championId,
      status: parsed.data.status,
      notes: parsed.data.notes,
    })

    updateTag(TRACKED_CHAMPIONS_TAG)
    revalidatePath("/dashboard")
    revalidatePath(`/champions/${parsed.data.championId}`)

    return {
      ok: true,
      message: `${champion.name} a ete ajoute a ton suivi.`,
    }
  } catch {
    return {
      ok: false,
      message: "Une erreur serveur a empeche l'enregistrement.",
    }
  }
}
