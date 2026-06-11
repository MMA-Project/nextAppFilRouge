export const CDRAGON_BASE_URL = "https://raw.communitydragon.org/latest"
const CDRAGON_GAME_DATA_URL = `${CDRAGON_BASE_URL}/plugins/rcp-be-lol-game-data/global/default`
const CDRAGON_GAME_DATA_V1_URL = `${CDRAGON_GAME_DATA_URL}/v1`
const CDRAGON_STATIC_IMAGE_URL = `${CDRAGON_BASE_URL}/plugins/rcp-fe-lol-static-assets/global/default/images`
const CDRAGON_CHAMPION_DETAILS_URL = `${CDRAGON_BASE_URL}/plugins/rcp-fe-lol-champion-details/global/default`

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
  tacticalInfo: {
    style: number | null
    difficulty: number | null
    damageType: string
    attackType: string
  }
  passive: ChampionAbility | null
  spells: ChampionAbility[]
  skins: ChampionSkin[]
}

export type ChampionAbility = {
  key: string
  name: string
  description: string
  iconUrl: string
  cooldown: string
  cost: string
  range: string
}

export type ChampionSkin = {
  id: number
  name: string
  splashUrl: string
  tileUrl: string
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
    style?: number
    difficulty?: number
    damageType?: string
    attackType?: string
  }
  skins?: {
    id: number
    isBase: boolean
    name: string
    splashPath: string
    uncenteredSplashPath?: string
    tilePath?: string
  }[]
  passive?: {
    name: string
    abilityIconPath: string
    description: string
  }
  spells?: {
    spellKey: string
    name: string
    abilityIconPath: string
    description: string
    cooldown?: unknown
    cost?: unknown
    range?: unknown
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

function normalizeLookupId(id: string) {
  return id.trim().toLowerCase()
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

function stringifyGameValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.join(" / ")
  }

  if (value === null || value === undefined) {
    return ""
  }

  return String(value)
}

function stripTags(value: unknown) {
  return stringifyGameValue(value)
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

function formatGameValue(value: unknown) {
  return stripTags(value) || "Non renseigne"
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
      "Consulte la fiche detaillee pour voir la bio et les roles.",
      "Ajoute ce champion au dashboard pour suivre ta progression.",
    ],
    iconUrl,
    splashUrl: iconUrl,
    uncenteredSplashUrl: iconUrl,
    tacticalInfo: {
      style: null,
      difficulty: null,
      damageType: "Non renseigne",
      attackType: "Non renseigne",
    },
    passive: null,
    spells: [],
    skins: [],
  }
}

function toChampionDetail(detail: CDragonChampionDetail): Champion {
  const baseSkin = detail.skins?.find((skin) => skin.isBase)
  const splashPath =
    baseSkin?.splashPath || baseSkin?.tilePath || detail.squarePortraitPath
  const uncenteredSplashPath =
    baseSkin?.uncenteredSplashPath ||
    baseSkin?.splashPath ||
    baseSkin?.tilePath ||
    detail.squarePortraitPath

  return {
    ...toChampion(detail),
    title: detail.title,
    difficulty: getDifficultyLabel(detail.tacticalInfo?.difficulty),
    lore: stripTags(detail.shortBio),
    splashUrl: getCDragonAssetUrl(splashPath),
    uncenteredSplashUrl: getCDragonAssetUrl(uncenteredSplashPath),
    tacticalInfo: {
      style: detail.tacticalInfo?.style ?? null,
      difficulty: detail.tacticalInfo?.difficulty ?? null,
      damageType: formatGameValue(detail.tacticalInfo?.damageType),
      attackType: formatGameValue(detail.tacticalInfo?.attackType),
    },
    passive: detail.passive
      ? {
          key: "P",
          name: detail.passive.name,
          description: stripTags(detail.passive.description),
          iconUrl: getCDragonAssetUrl(detail.passive.abilityIconPath),
          cooldown: "Passif",
          cost: "Aucun",
          range: "Auto",
        }
      : null,
    spells: (detail.spells ?? []).map((spell) => ({
      key: spell.spellKey,
      name: spell.name,
      description: stripTags(spell.description),
      iconUrl: getCDragonAssetUrl(spell.abilityIconPath),
      cooldown: formatGameValue(spell.cooldown),
      cost: formatGameValue(spell.cost),
      range: formatGameValue(spell.range),
    })),
    skins: (detail.skins ?? [])
      .filter((skin) => skin.tilePath || skin.splashPath)
      .slice(0, 6)
      .map((skin) => ({
        id: skin.id,
        name: skin.name,
        splashUrl: getCDragonAssetUrl(skin.splashPath),
        tileUrl: getCDragonAssetUrl(skin.tilePath ?? skin.splashPath),
      })),
    tips: [
      `Rôles : ${detail.roles.join(", ") || "non renseigne"}.`,
      `Difficulté : ${getDifficultyLabel(detail.tacticalInfo?.difficulty)}.`,
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

export function getStaticImageUrl(path: string) {
  return `${CDRAGON_STATIC_IMAGE_URL}/${path.replace(/^\//, "")}`
}

export function getChampionDetailsAssetUrl(path: string) {
  return `${CDRAGON_CHAMPION_DETAILS_URL}/${path.replace(/^\//, "")}`
}

export function getChampionRoleIconUrl(role: string) {
  const normalizedRole = role.trim().toLowerCase()
  const roleIconNames: Record<string, string> = {
    assassin: "assassin",
    fighter: "fighter",
    mage: "mage",
    marksman: "marksman",
    support: "support",
    tank: "tank",
  }

  const iconName = roleIconNames[normalizedRole]

  if (!iconName) {
    return getStaticImageUrl("npe-rewards-champion.png")
  }

  return getStaticImageUrl(`npe-ft-role-icon-${iconName}.png`)
}

export function getDamageTypeIconUrl(damageType: string) {
  const normalizedDamageType = damageType.trim().toLowerCase()

  if (normalizedDamageType.includes("magic")) {
    return getChampionDetailsAssetUrl("continuum_icon_abilitypower.png")
  }

  if (
    normalizedDamageType.includes("physical") ||
    normalizedDamageType.includes("attack")
  ) {
    return getChampionDetailsAssetUrl("continuum_icon_attackspeed.png")
  }

  return getChampionDetailsAssetUrl("cdp-graph-damage-hover.png")
}

export function getAttackTypeIconUrl(attackType: string) {
  const normalizedAttackType = attackType.trim().toLowerCase()

  if (normalizedAttackType.includes("ranged")) {
    return getChampionRoleIconUrl("marksman")
  }

  if (normalizedAttackType.includes("melee")) {
    return getChampionRoleIconUrl("fighter")
  }

  return getStaticImageUrl("npe-rewards-champion.png")
}

export async function getChampionById(id: string) {
  const champions = await getChampionSummaries()
  const lookupId = normalizeLookupId(id)
  const numericId = Number(lookupId)
  const summary = champions.find((champion) => {
    return (
      champion.id === lookupId ||
      champion.cdragonId === numericId ||
      normalizeLookupId(champion.name) === lookupId ||
      normalizeChampionId(champion.name) === lookupId
    )
  })

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
