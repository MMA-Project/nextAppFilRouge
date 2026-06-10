import { headers } from "next/headers"
import type { Champion } from "./cdragon"
import type { TrackedChampionView } from "./tracked-store"

export const CHAMPIONS_TAG = "champions"
export const TRACKED_CHAMPIONS_TAG = "tracked-champions"

async function getBaseUrl() {
  const requestHeaders = await headers()
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host")
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http"

  if (!host) {
    return "http://localhost:3000"
  }

  return `${protocol}://${host}`
}

async function fetchJson<T>(
  path: string,
  options: { tag: string; revalidate: number }
) {
  const requestHeaders = await headers()
  const cookie = requestHeaders.get("cookie")

  const response = await fetch(`${await getBaseUrl()}${path}`, {
    headers: cookie
      ? {
          cookie,
        }
      : undefined,
    next: {
      revalidate: options.revalidate,
      tags: [options.tag],
    },
  })

  if (!response.ok) {
    return null
  }

  return (await response.json()) as T
}

export async function getChampions() {
  return (
    (await fetchJson<Champion[]>("/api/champions", {
      tag: CHAMPIONS_TAG,
      revalidate: 3600,
    })) ?? []
  )
}

export async function getChampion(id: string) {
  return fetchJson<Champion>(`/api/champions/${id}`, {
    tag: CHAMPIONS_TAG,
    revalidate: 3600,
  })
}

export async function getTrackedChampions() {
  return (
    (await fetchJson<TrackedChampionView[]>("/api/tracked-champions", {
      tag: TRACKED_CHAMPIONS_TAG,
      revalidate: 300,
    })) ?? []
  )
}
