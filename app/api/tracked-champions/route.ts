import { readTrackedChampionViews } from "@/app/lib/tracked-store"

export async function GET() {
  const trackedChampions = await readTrackedChampionViews()

  return Response.json(trackedChampions)
}
