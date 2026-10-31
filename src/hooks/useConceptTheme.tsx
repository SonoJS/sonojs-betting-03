import { createContext, useCallback, useContext, useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'

import { conceptDefaults, conceptMeta } from '@/theme/concepts'
import type { ConceptId, ThemeColorKey, ThemeColors } from '@/theme/theme-types'
import { clearTheme, isCustomized, isValidHex, loadTheme, normalizeHex, saveTheme, serializeCopyPayload, themeToCssVars } from '@/theme/theme-utils'

type ConceptThemeValue = {
  concept: ConceptId
  colors: ThemeColors
  defaults: ThemeColors
  customized: boolean
  setColor: (key: ThemeColorKey, hex: string) => boolean
  reset: () => void
  copySettings: () => Promise<boolean>
  /** Inline style for the concept root element. */
  style: CSSProperties
}

const ConceptThemeContext = createContext<ConceptThemeValue | null>(null)

/** Concept-scoped theme state (06 §11.4). Each concept keeps independent color state. */
export function ConceptThemeProvider({ concept, children }: { concept: ConceptId; children: ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(() => loadTheme(concept).colors)

  // Persist on every change; defaults are stored too so reload keeps the last state deterministically.
  useEffect(() => {
    if (isCustomized(concept, colors)) saveTheme(concept, colors)
    else clearTheme(concept)
  }, [concept, colors])

  const setColor = useCallback(
    (key: ThemeColorKey, hex: string) => {
      if (!isValidHex(hex)) return false
      setColors((prev) => ({ ...prev, [key]: normalizeHex(hex) }))
      return true
    },
    [],
  )

  const reset = useCallback(() => {
    clearTheme(concept)
    setColors(conceptDefaults[concept])
  }, [concept])

  const copySettings = useCallback(async () => {
    const text = serializeCopyPayload(concept, conceptMeta[concept].name, colors)
    try {
      if (!navigator.clipboard?.writeText) return false
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }, [concept, colors])

  const value = useMemo<ConceptThemeValue>(
    () => ({
      concept,
      colors,
      defaults: conceptDefaults[concept],
      customized: isCustomized(concept, colors),
      setColor,
      reset,
      copySettings,
      style: themeToCssVars(colors) as CSSProperties,
    }),
    [concept, colors, setColor, reset, copySettings],
  )

  return <ConceptThemeContext.Provider value={value}>{children}</ConceptThemeContext.Provider>
}

export function useConceptTheme(): ConceptThemeValue {
  const ctx = useContext(ConceptThemeContext)
  if (!ctx) throw new Error('useConceptTheme must be used inside <ConceptThemeProvider>')
  return ctx
}
