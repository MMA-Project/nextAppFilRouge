import { champions } from "@/app/lib/champion-data"

export async function GET() {
  return Response.json(champions)
}
