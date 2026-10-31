import type { Game, Provider } from '@/data/types'

export const SEARCH_MAX_GAMES = 6
export const SEARCH_MAX_PROVIDERS = 3

export type SearchResult = {
  query: string
  games: Game[]
  providers: Provider[]
  isEmpty: boolean
  isIdle: boolean
}

/**
 * Shared local search (06 §12.3): case-insensitive substring match on game.title and
 * provider.name, capped at 6 games + 3 providers. No fuzzy matching, no ranking.
 */
export function searchCatalog(query: string, games: Game[], providers: Provider[]): SearchResult {
  const q = query.trim().toLowerCase()
  if (!q) return { query, games: [], providers: [], isEmpty: false, isIdle: true }

  const matchedProviders = providers.filter((p) => p.name.toLowerCase().includes(q))
  const providerIds = new Set(matchedProviders.map((p) => p.id))
  const matchedGames = games.filter((g) => g.title.toLowerCase().includes(q) || providerIds.has(g.providerId))

  const g = matchedGames.slice(0, SEARCH_MAX_GAMES)
  const p = matchedProviders.slice(0, SEARCH_MAX_PROVIDERS)
  return { query, games: g, providers: p, isEmpty: g.length === 0 && p.length === 0, isIdle: false }
}
