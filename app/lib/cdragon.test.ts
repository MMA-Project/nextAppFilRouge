import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getChampionById } from './cdragon'

const fetchMock = vi.fn()

vi.stubGlobal('fetch', fetchMock)

beforeEach(() => {
  fetchMock.mockReset()
})

describe('cdragon', () => {
  it('retourne les données du champion quand fetch répond OK', async () => {
    const championData = {
      id: 'Aatrox',
      name: 'Aatrox',
      role: 'Fighter',
      iconUrl: 'https://example.com/aatrox.png',
    }

    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(championData),
    })

    const result = await getChampionById('Aatrox')

    expect(fetchMock).toHaveBeenCalled()
    expect(result).toEqual(championData)
  })

  it('renvoie null quand la réponse fetch n’est pas OK', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 404,
      json: vi.fn(),
    })

    const result = await getChampionById('unknown')

    expect(result).toBeNull()
  })

  it('renvoie null quand fetch échoue', async () => {
    fetchMock.mockRejectedValue(new Error('network error'))

    const result = await getChampionById('Aatrox')

    expect(result).toBeNull()
  })
})