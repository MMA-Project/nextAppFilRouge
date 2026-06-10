import { getChampionById } from "./cdragon"
import { prisma } from "./prisma"

export type ChampionStatus = "to-try" | "learning" | "mastered"

export type TrackedChampion = {
  championId: string
  status: ChampionStatus
  notes: string
  updatedAt: string
}

export type TrackedChampionView = TrackedChampion & {
  championName: string
  championRole: string
  championIconUrl: string
}

export async function readTrackedChampions(): Promise<TrackedChampion[]> {
  const trackedChampions = await prisma.trackedChampion.findMany({
    orderBy: {
      updatedAt: "desc",
    },
  })

  return trackedChampions.map((tracked) => ({
    championId: tracked.championId,
    status: tracked.status as ChampionStatus,
    notes: tracked.notes,
    updatedAt: tracked.updatedAt.toISOString(),
  }))
}

export async function writeTrackedChampion(
  entry: Omit<TrackedChampion, "updatedAt">
) {
  await prisma.trackedChampion.upsert({
    where: {
      championId: entry.championId,
    },
    create: {
      championId: entry.championId,
      status: entry.status,
      notes: entry.notes,
    },
    update: {
      status: entry.status,
      notes: entry.notes,
    },
  })
}

export async function readTrackedChampionViews(): Promise<TrackedChampionView[]> {
  const trackedChampions = await readTrackedChampions()
  const trackedChampionViews: TrackedChampionView[] = []

  for (const tracked of trackedChampions) {
    const champion = await getChampionById(tracked.championId)

    if (champion) {
      trackedChampionViews.push({
        ...tracked,
        championName: champion.name,
        championRole: champion.role,
        championIconUrl: champion.iconUrl,
      })
    }
  }

  return trackedChampionViews
}
