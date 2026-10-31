import { cn } from 'cn'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Locale } from '@/data/types'
import { useLocale } from '@/hooks/useLocale'

const LOCALES: Locale[] = ['en', 'ru']

/** Compact EN | RU control shared by header, footer and menu sheet. */
export function NoxaLanguageControl({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale()

  return (
    <ToggleGroup
      aria-label={t.navLanguage}
      value={[locale]}
      onValueChange={(value) => {
        const next = value[0]
        if (next === 'en' || next === 'ru') setLocale(next)
      }}
      className={cn('gap-0.5 rounded-sm border border-border bg-surface p-0.5', className)}
    >
      {LOCALES.map((code) => (
        <ToggleGroupItem
          key={code}
          value={code}
          size="sm"
          className={cn(
            'h-7 min-w-8 rounded-xs px-2 type-caption font-semibold tracking-wide uppercase',
            'data-[pressed]:bg-surface-elevated data-[pressed]:text-primary aria-pressed:bg-surface-elevated aria-pressed:text-primary',
          )}
        >
          {code}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
