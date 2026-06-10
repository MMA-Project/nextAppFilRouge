export type ChampionRole = "Top" | "Jungle" | "Mid" | "ADC" | "Support"

export type Champion = {
  id: string
  name: string
  title: string
  role: ChampionRole
  difficulty: "Facile" | "Moyen" | "Difficile"
  region: string
  lore: string
  tips: string[]
}

export const champions: Champion[] = [
  {
    id: "ahri",
    name: "Ahri",
    title: "Renarde a neuf queues",
    role: "Mid",
    difficulty: "Moyen",
    region: "Ionia",
    lore: "Mage mobile qui charme ses adversaires avant de les finir avec des orbes spirituelles.",
    tips: [
      "Chercher les trades courts avec le charme.",
      "Garder l'ultime pour engager ou sortir d'un combat.",
    ],
  },
  {
    id: "garen",
    name: "Garen",
    title: "Force de Demacia",
    role: "Top",
    difficulty: "Facile",
    region: "Demacia",
    lore: "Combattant resistant qui punit les erreurs adverses avec des degats simples et directs.",
    tips: [
      "Profiter de la regeneration passive entre deux trades.",
      "Utiliser le silence pour empecher un sort cle.",
    ],
  },
  {
    id: "jinx",
    name: "Jinx",
    title: "Gachette folle de Zaun",
    role: "ADC",
    difficulty: "Moyen",
    region: "Zaun",
    lore: "Tireuse fragile mais explosive qui transforme les resets en combats d'equipe destructeurs.",
    tips: [
      "Rester derriere la frontline en debut de combat.",
      "Changer d'arme selon la portee et la vitesse d'attaque necessaires.",
    ],
  },
  {
    id: "lee-sin",
    name: "Lee Sin",
    title: "Moine aveugle",
    role: "Jungle",
    difficulty: "Difficile",
    region: "Ionia",
    lore: "Jungler mecanique capable de creer des actions decisives avec sa mobilite.",
    tips: [
      "Preparer les wards pour conserver une option de dash.",
      "Ne pas forcer les plays complexes sans vision.",
    ],
  },
  {
    id: "leona",
    name: "Leona",
    title: "Aube radieuse",
    role: "Support",
    difficulty: "Facile",
    region: "Targon",
    lore: "Support tank qui engage les combats avec beaucoup de controle.",
    tips: [
      "Punir les carrys mal positionnes avec l'engage.",
      "Coordonner les all-ins avec son ADC.",
    ],
  },
]

export function getChampionById(id: string) {
  return champions.find((champion) => champion.id === id)
}
