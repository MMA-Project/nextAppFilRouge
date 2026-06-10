import { revalidateTag } from "next/cache"
import { getServerSession } from "next-auth"
import { z } from "zod"
import { authOptions } from "@/app/lib/auth"
import { getChampionById } from "@/app/lib/cdragon"
import { TRACKED_CHAMPIONS_TAG } from "@/app/lib/data"
import { getSessionUserId } from "@/app/lib/session"
import { readTrackedChampionViews } from "@/app/lib/tracked-store"
import { writeTrackedChampion } from "@/app/lib/tracked-store"
import { trackedChampionInputSchema } from "@/app/lib/tracked-validation"

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = getSessionUserId(session)

  if (!userId) {
    return Response.json({ message: "Non authentifie" }, { status: 401 })
  }

  const trackedChampions = await readTrackedChampionViews(userId)

  return Response.json(trackedChampions)
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  const userId = getSessionUserId(session)

  if (!userId) {
    return Response.json({ message: "Non authentifie" }, { status: 401 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return Response.json({ message: "Body JSON invalide" }, { status: 400 })
  }

  const parsed = trackedChampionInputSchema.safeParse(body)

  if (!parsed.success) {
    return Response.json(
      {
        message: "Payload invalide",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 }
    )
  }

  const champion = await getChampionById(parsed.data.championId)

  if (!champion) {
    return Response.json({ message: "Champion introuvable" }, { status: 404 })
  }

  try {
    await writeTrackedChampion({
      userId,
      championId: parsed.data.championId,
      status: parsed.data.status,
      notes: parsed.data.notes,
    })

    revalidateTag(TRACKED_CHAMPIONS_TAG, "max")

    return Response.json(
      {
        message: "Champion suivi mis a jour",
        championId: parsed.data.championId,
      },
      { status: 200 }
    )
  } catch {
    return Response.json(
      { message: "Erreur serveur pendant l'enregistrement" },
      { status: 500 }
    )
  }
}
