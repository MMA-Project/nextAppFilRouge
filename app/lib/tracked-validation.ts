import { z } from "zod"

export const trackedChampionInputSchema = z.object({
  championId: z.string().min(1, "Champion introuvable."),
  status: z.enum(["to-try", "learning", "mastered"], {
    message: "Choisis un statut valide.",
  }),
  notes: z.string().trim().max(280, "La note doit faire 280 caracteres max."),
})
