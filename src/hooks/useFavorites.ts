import { useCallback, useState } from 'react'

/** Local visual favorite toggle (03 §23). Not persisted — guest state only. */
export function useFavorites() {
  const [ids, setIds] = useState<Set<string>>(() => new Set())
  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])
  const isFavorite = useCallback((id: string) => ids.has(id), [ids])
  return { isFavorite, toggle }
}
