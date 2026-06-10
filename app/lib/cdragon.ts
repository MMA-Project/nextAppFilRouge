export const CDRAGON_BASE_URL = "https://raw.communitydragon.org/latest"
const CDRAGON_GAME_DATA_URL = `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default`
const CDRAGON_GAME_DATA_V1_URL = `${CDRAGON_GAME_DATA_URL}/v1`

export type ChampionRole = string

export type Champion = {
  id: string
  cdragonId: number
  name: string
  title: string
  roles: ChampionRole[]
  role: string
  difficulty: "Facile" | "Moyen" | "Difficile"
  region: string
  lore: string
  tips: string[]
  iconUrl: string
  splashUrl: string
  uncenteredSplashUrl: string
}

type CDragonChampionSummary = {
  id: number
  name: string
  description: string
  alias: string
  squarePortraitPath: string
  roles: string[]
}

type CDragonChampionDetail = CDragonChampionSummary & {
  title: string
  shortBio: string
  tacticalInfo?: {
    difficulty?: number
  }
  skins?: {
    isBase: boolean
    splashPath: string
    uncenteredSplashPath?: string
    tilePath?: string
  }[]
}

export function getCDragonAssetUrl(path: string | null | undefined): string {
  if (!path) return ""
  const normalizedPath = path.toLowerCase()

  if (normalizedPath.startsWith("/lol-game-data/assets/v1/")) {
    return `${CDRAGON_GAME_DATA_V1_URL}/${normalizedPath.replace(
      "/lol-game-data/assets/v1/",
      ""
    )}`
  }

  if (normalizedPath.startsWith("/lol-game-data/assets/")) {
    const assetPath = normalizedPath
      .replace("/lol-game-data/assets/", "")
      .replace(/^assets\//, "")

    return `${CDRAGON_GAME_DATA_URL}/assets/${assetPath}`
  }

  return `${CDRAGON_GAME_DATA_V1_URL}${normalizedPath}`
}

function normalizeChampionId(alias: string) {
  return alias
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .toLowerCase()
}

function getDifficultyLabel(difficulty?: number): Champion["difficulty"] {
  if (!difficulty || difficulty <= 1) {
    return "Facile"
  }

  if (difficulty === 2) {
    return "Moyen"
  }

  return "Difficile"
}

function getPrimaryRole(roles: string[]) {
  return roles[0] ? roles[0].toUpperCase() : "Polyvalent"
}

function toChampion(summary: CDragonChampionSummary): Champion {
  const iconUrl = getCDragonAssetUrl(summary.squarePortraitPath)
  return {
    id: normalizeChampionId(summary.alias),
    cdragonId: summary.id,
    name: summary.name,
    title: summary.description,
    roles: summary.roles,
    role: getPrimaryRole(summary.roles),
    difficulty: "Moyen",
    region: "Runeterra",
    lore: summary.description,
    tips: [
      "Consulte la fiche detaillee pour voir la bio et les roles CDragon.",
      "Ajoute ce champion au dashboard pour suivre ta progression.",
    ],
    iconUrl,
    splashUrl: iconUrl,
    uncenteredSplashUrl: iconUrl,
  }
}

function toChampionDetail(detail: CDragonChampionDetail): Champion {
  const baseSkin = detail.skins?.find((skin) => skin.isBase)
  const splashPath =
    baseSkin?.splashPath ||
    baseSkin?.tilePath ||
    detail.squarePortraitPath
  const uncenteredSplashPath =
    baseSkin?.uncenteredSplashPath ||
    baseSkin?.splashPath ||
    baseSkin?.tilePath ||
    detail.squarePortraitPath

  return {
    ...toChampion(detail),
    title: detail.title,
    difficulty: getDifficultyLabel(detail.tacticalInfo?.difficulty),
    lore: detail.shortBio,
    splashUrl: getCDragonAssetUrl(splashPath),
    uncenteredSplashUrl: getCDragonAssetUrl(uncenteredSplashPath),
    tips: [
      `Roles CDragon : ${detail.roles.join(", ") || "non renseigne"}.`,
      `Difficulte indiquee par CDragon : ${getDifficultyLabel(
        detail.tacticalInfo?.difficulty
      )}.`,
    ],
  }
}

async function fetchCDragon<T>(path: string) {
  const response = await fetch(`${CDRAGON_BASE_URL}${path}`, {
    next: {
      revalidate: 86400,
      tags: ["cdragon"],
    },
  })

  if (!response.ok) {
    return null
  }

  return (await response.json()) as T
}

export async function getChampionSummaries() {
  const champions = await fetchCDragon<CDragonChampionSummary[]>(
    "/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json"
  )

  return (champions ?? [])
    .filter((champion) => champion.id > 0)
    .map(toChampion)
    .sort((a, b) => a.name.localeCompare(b.name))
}

const RANK_ICON_BASE =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images"

export type RankTier =
  | "iron"
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"
  | "emerald"
  | "diamond"
  | "master"
  | "grandmaster"
  | "challenger"
  | "unranked"

export function getRankIconUrl(tier: RankTier) {
  return `${RANK_ICON_BASE}/${tier}.png`
}

export async function getChampionById(id: string) {
  const champions = await getChampionSummaries()
  const summary = champions.find((champion) => champion.id === id)

  if (!summary) {
    return null
  }

  const detail = await fetchCDragon<CDragonChampionDetail>(
    `/plugins/rcp-be-lol-game-data/global/default/v1/champions/${summary.cdragonId}.json`
  )

  if (!detail) {
    return summary
  }

  return toChampionDetail(detail)
}
