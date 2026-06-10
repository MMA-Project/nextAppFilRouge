import { beforeEach, describe, expect, it, vi } from "vitest"
import { getChampionById } from "./cdragon"

const fetchMock = vi.fn()

vi.stubGlobal("fetch", fetchMock)

beforeEach(() => {
  fetchMock.mockReset()
})

describe("cdragon", () => {
  it("retourne les données du champion quand fetch répond OK", async () => {
    fetchMock
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue([
          {
            id: 266,
            name: "Aatrox",
            description: "The Darkin Blade",
            alias: "Aatrox",
            squarePortraitPath:
              "/lol-game-data/assets/v1/champion-icons/266.png",
            roles: ["fighter"],
          },
        ]),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: vi.fn().mockResolvedValue({
          id: 266,
          name: "Aatrox",
          description: "The Darkin Blade",
          alias: "Aatrox",
          squarePortraitPath:
            "/lol-game-data/assets/v1/champion-icons/266.png",
          roles: ["fighter"],
          title: "the Darkin Blade",
          shortBio: "Aatrox is a powerful darkin warrior.",
          tacticalInfo: {
            difficulty: 2,
          },
          skins: [
            {
              isBase: true,
              splashPath:
                "/lol-game-data/assets/v1/champion-splashes/266/266000.jpg",
            },
          ],
        }),
      })

    const result = await getChampionById("aatrox")

    expect(fetchMock).toHaveBeenCalledTimes(2)

    expect(result).toMatchObject({
      id: "aatrox",
      cdragonId: 266,
      name: "Aatrox",
      title: "the Darkin Blade",
      role: "FIGHTER",
      difficulty: "Moyen",
      lore: "Aatrox is a powerful darkin warrior.",
    })

    expect(result?.iconUrl).toContain("champion-icons/266.png")
    expect(result?.splashUrl).toContain("champion-splashes/266/266000.jpg")
  })

  it("renvoie null quand la réponse fetch n’est pas OK", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    })

    const result = await getChampionById("unknown")

    expect(result).toBeNull()
  })

  it("renvoie null quand le champion n’existe pas dans la liste", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue([
        {
          id: 266,
          name: "Aatrox",
          description: "The Darkin Blade",
          alias: "Aatrox",
          squarePortraitPath:
            "/lol-game-data/assets/v1/champion-icons/266.png",
          roles: ["fighter"],
        },
      ]),
    })

    const result = await getChampionById("unknown")

    expect(result).toBeNull()
  })
})