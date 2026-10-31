import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import type { Locale } from '@/data/types'
import { strings, type StringKey, type Strings } from '@/data/strings'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: Strings
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/** Local React state provided at the concept root (06 §12.7). Header and footer share it. */
export function LocaleProvider({ children, initial = 'en' }: { children: ReactNode; initial?: Locale }) {
  const [locale, setLocale] = useState<Locale>(initial)
  const toggleLocale = useCallback(() => setLocale((l) => (l === 'en' ? 'ru' : 'en')), [])

  // Keep the document language in sync for assistive tech and hyphenation.
  useEffect(() => {
    const html = document.documentElement
    const previous = html.lang
    html.lang = locale
    return () => {
      html.lang = previous || 'en'
    }
  }, [locale])
  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggleLocale, t: strings[locale] }),
    [locale, toggleLocale],
  )
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    // Safe default outside a provider (e.g. Design Explorer): English, no-op setters.
    return { locale: 'en', setLocale: () => {}, toggleLocale: () => {}, t: strings.en }
  }
  return ctx
}

/** Convenience: returns the active chrome dictionary. */
export function useStrings(): Strings {
  return useLocale().t
}

export type { StringKey }
