import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"
import { TrackChampionForm } from "./TrackChampionForm"
import type { TrackChampionState } from "../actions"

const mockUseActionState = vi.fn()

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react")

  return {
    ...actual,
    useActionState: (...args: unknown[]) => mockUseActionState(...args),
  }
})

vi.mock("../actions", () => ({
  trackChampionAction: vi.fn(),
}))

describe("TrackChampionForm", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("affiche le formulaire avec les champs attendus", () => {
    const state: TrackChampionState = {
      ok: false,
      message: "",
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), false])

    render(<TrackChampionForm championId="aatrox" />)

    expect(screen.getByLabelText("Statut")).toBeInTheDocument()
    expect(screen.getByLabelText("Note personnelle")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Suivre ce champion" })
    ).toBeInTheDocument()
  })

  it("injecte le championId dans un input hidden", () => {
    const state: TrackChampionState = {
      ok: false,
      message: "",
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), false])

    const { container } = render(<TrackChampionForm championId="lux" />)

    const hiddenInput = container.querySelector(
      'input[name="championId"]'
    ) as HTMLInputElement

    expect(hiddenInput).toBeInTheDocument()
    expect(hiddenInput.type).toBe("hidden")
    expect(hiddenInput.value).toBe("lux")
  })

  it("met le statut par défaut à learning", () => {
    const state: TrackChampionState = {
      ok: false,
      message: "",
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), false])

    render(<TrackChampionForm championId="lux" />)

    const select = screen.getByLabelText("Statut") as HTMLSelectElement

    expect(select.value).toBe("learning")
  })

  it("désactive le bouton quand le formulaire est en cours d'enregistrement", () => {
    const state: TrackChampionState = {
      ok: false,
      message: "",
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), true])

    render(<TrackChampionForm championId="lux" />)

    const button = screen.getByRole("button", {
      name: "Enregistrement...",
    })

    expect(button).toBeDisabled()
  })

  it("affiche les erreurs de validation du statut et des notes", () => {
    const state: TrackChampionState = {
      ok: false,
      message: "",
      errors: {
        status: "Le statut est invalide.",
        notes: "La note est trop longue.",
      },
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), false])

    render(<TrackChampionForm championId="lux" />)

    expect(screen.getByText("Le statut est invalide.")).toBeInTheDocument()
    expect(screen.getByText("La note est trop longue.")).toBeInTheDocument()
  })

  it("affiche un message de succès quand state.ok est true", () => {
    const state: TrackChampionState = {
      ok: true,
      message: "Champion ajouté à ton suivi.",
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), false])

    render(<TrackChampionForm championId="lux" />)

    const message = screen.getByText("Champion ajouté à ton suivi.")

    expect(message).toBeInTheDocument()
    expect(message).toHaveClass("text-emerald-700")
  })

  it("affiche un message d'erreur quand state.ok est false", () => {
    const state: TrackChampionState = {
      ok: false,
      message: "Impossible de suivre ce champion.",
    }

    mockUseActionState.mockReturnValue([state, vi.fn(), false])

    render(<TrackChampionForm championId="lux" />)

    const message = screen.getByText("Impossible de suivre ce champion.")

    expect(message).toBeInTheDocument()
    expect(message).toHaveClass("text-red-600")
  })
})