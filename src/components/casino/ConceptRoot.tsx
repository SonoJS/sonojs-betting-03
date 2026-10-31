import { useLayoutEffect, type ReactNode } from 'react'
import { cn } from 'cn'

import { AuthDialogProvider } from '@/components/casino/auth/AuthDialog'
import { ToastProvider } from '@/components/shared/Toast'
import { ThemeStudio } from '@/components/theme-studio/ThemeStudio'
import { ConceptThemeProvider, useConceptTheme } from '@/hooks/useConceptTheme'
import { LocaleProvider } from '@/hooks/useLocale'
import type { ConceptId } from '@/theme/theme-types'
import { THEME_CSS_VARS, THEME_COLOR_KEYS } from '@/theme/theme-utils'

/**
 * Shared concept root. The `data-concept` attribute and the active theme's inline CSS
 * variables are applied to <html>, so portaled surfaces (dialogs, sheets, tooltips, toasts)
 * inherit the concept tokens exactly like in-flow content. Everything inside is concept-specific.
 */
export function ConceptRoot({ concept, className, children }: { concept: ConceptId; className?: string; children: ReactNode }) {
  return (
    <ConceptThemeProvider concept={concept}>
      <LocaleProvider>
        <ThemedShell concept={concept} className={className}>
          <ToastProvider>
            <AuthDialogProvider>
              {children}
              <ThemeStudio />
            </AuthDialogProvider>
          </ToastProvider>
        </ThemedShell>
      </LocaleProvider>
    </ConceptThemeProvider>
  )
}

const MANAGED_VARS = [...THEME_COLOR_KEYS.map((k) => THEME_CSS_VARS[k]), '--primary-foreground']

function ThemedShell({ concept, className, children }: { concept: ConceptId; className?: string; children: ReactNode }) {
  const { style } = useConceptTheme()

  useLayoutEffect(() => {
    const html = document.documentElement
    html.setAttribute('data-concept', concept)
    return () => {
      html.removeAttribute('data-concept')
      for (const v of MANAGED_VARS) html.style.removeProperty(v)
    }
  }, [concept])

  useLayoutEffect(() => {
    const html = document.documentElement
    const vars = style as Record<string, string>
    for (const v of MANAGED_VARS) {
      const value = vars[v]
      if (value) html.style.setProperty(v, value)
      else html.style.removeProperty(v)
    }
  }, [style])

  return <div className={cn('min-h-dvh bg-background text-foreground antialiased', className)}>{children}</div>
}
