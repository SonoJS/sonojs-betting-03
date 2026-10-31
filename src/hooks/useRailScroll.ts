import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Shared rail mechanic (06 §12.4): CSS horizontal scroll container + scrollBy().
 * Previous/Next disabled states derive from the real scroll position.
 */
export function useRailScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 2)
    setCanNext(max - el.scrollLeft > 2)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [update])

  const scrollByPage = useCallback((direction: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const amount = Math.max(el.clientWidth * 0.8, 200)
    el.scrollBy({ left: direction * amount, behavior: reduced ? 'auto' : 'smooth' })
  }, [])

  const prev = useCallback(() => scrollByPage(-1), [scrollByPage])
  const next = useCallback(() => scrollByPage(1), [scrollByPage])

  return { ref, canPrev, canNext, prev, next }
}
