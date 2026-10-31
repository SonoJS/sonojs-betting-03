import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false,
  )
  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    setMatches(mql.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/** Breakpoints are fixed in 06 §13.1: mobile <768, tablet 768–1279, desktop ≥1280. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
export const useIsDesktop = () => useMediaQuery('(min-width: 1280px)')
export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
