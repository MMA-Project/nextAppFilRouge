import { getChampionSummaries } from "@/app/lib/cdragon"

export async function GET() {
  const champions = await getChampionSummaries()

  return Response.json(champions)
}
