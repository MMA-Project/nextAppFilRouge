import { afterEach, describe, expect, it, vi } from 'vitest'
import { readTrackedChampions, readTrackedChampionViews, writeTrackedChampion } from './tracked-store'

const mockFindMany = vi.fn()
const mockUpsert = vi.fn()

vi.mock('./prisma', () => ({
  prisma: {
    trackedChampion: {
      findMany: mockFindMany,
      upsert: mockUpsert,
    },
  },
}))

const mockGetChampionById = vi.fn()

vi.mock('./cdragon', () => ({
  getChampionById: mockGetChampionById,
}))

afterEach(() => {
  vi.clearAllMocks()
})

describe('tracked-store', () => {
  it('lit les champions suivis et convertit la date en ISO', async () => {
    mockFindMany.mockResolvedValue([
      {
        championId: 'Aatrox',
        status: 'learning',
        notes: 'un test',
        updatedAt: new Date('2026-06-10T12:00:00Z'),
      },
    ])

    const champions = await readTrackedChampions()

    expect(champions).toEqual([
      {
        championId: 'Aatrox',
        status: 'learning',
        notes: 'un test',
        updatedAt: '2026-06-10T12:00:00.000Z',
      },
    ])
    expect(mockFindMany).toHaveBeenCalledWith({
      orderBy: {
        updatedAt: 'desc',
      },
    })
  })

  it('écrit un champion suivi avec la bonne payload prisma', async () => {
    await writeTrackedChampion({
      championId: 'Ahri',
      status: 'mastered',
      notes: 'ok',
    })

    expect(mockUpsert).toHaveBeenCalledWith({
      where: {
        championId: 'Ahri',
      },
      create: {
        championId: 'Ahri',
        status: 'mastered',
        notes: 'ok',
      },
      update: {
        status: 'mastered',
        notes: 'ok',
      },
    })
  })

  it('lit les vues de champions suivis et enrichit les données via getChampionById', async () => {
    mockFindMany.mockResolvedValue([
      {
        championId: 'Zed',
        status: 'to-try',
        notes: 'dark',
        updatedAt: new Date('2026-01-01T00:00:00Z'),
      },
    ])
    mockGetChampionById.mockResolvedValue({
      name: 'Zed',
      role: 'Assassin',
      iconUrl: 'https://example.com/zed.png',
    })

    const views = await readTrackedChampionViews()

    expect(views).toEqual([
      {
        championId: 'Zed',
        status: 'to-try',
        notes: 'dark',
        updatedAt: '2026-01-01T00:00:00.000Z',
        championName: 'Zed',
        championRole: 'Assassin',
        championIconUrl: 'https://example.com/zed.png',
      },
    ])
    expect(mockGetChampionById).toHaveBeenCalledWith('Zed')
  })
})