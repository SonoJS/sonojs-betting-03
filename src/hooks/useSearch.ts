import { useMemo, useState } from 'react'

import { games } from '@/data/games'
import { providers } from '@/data/providers'
import { searchCatalog, type SearchResult } from '@/lib/search'

/** Local search state over the shared dataset. One helper, three concept-specific shells. */
export function useSearch() {
  const [query, setQuery] = useState('')
  const result = useMemo<SearchResult>(() => searchCatalog(query, games, providers), [query])
  return { query, setQuery, result, clear: () => setQuery('') }
}
