import { getChampionById } from "@/app/lib/cdragon"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const champion = await getChampionById(id)

  if (!champion) {
    return Response.json({ message: "Champion introuvable" }, { status: 404 })
  }

  return Response.json(champion)
}
