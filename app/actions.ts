"use server"

import { revalidatePath, updateTag } from "next/cache"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "./lib/auth"
import { getChampionById } from "./lib/cdragon"
import { TRACKED_CHAMPIONS_TAG } from "./lib/data"
import { getSessionUserId } from "./lib/session"
import { writeTrackedChampion } from "./lib/tracked-store"
import { trackedChampionInputSchema } from "./lib/tracked-validation"

export type TrackChampionState = {
  ok: boolean
  message: string
  errors?: {
    championId?: string
    status?: string
    notes?: string
  }
}

export async function trackChampionAction(
  _previousState: TrackChampionState,
  formData: FormData
): Promise<TrackChampionState> {
  const session = await getServerSession(authOptions)
  const userId = getSessionUserId(session)

  if (!userId) {
    return {
      ok: false,
      message: "Connecte-toi pour suivre un champion.",
    }
  }

  const parsed = trackedChampionInputSchema.safeParse({
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
      userId,
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
