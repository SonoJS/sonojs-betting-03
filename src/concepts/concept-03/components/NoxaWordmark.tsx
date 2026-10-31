import { cn } from 'cn'

import { useStrings } from '@/hooks/useLocale'

/** Sapphire facet mark + Noxa wordmark — catalogue brand signal. */
export function NoxaWordmark({ className }: { className?: string }) {
  const t = useStrings()

  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <span
        aria-hidden
        className="grid size-8 shrink-0 place-items-center rounded-sm border border-border bg-surface-elevated"
      >
        <svg viewBox="0 0 24 24" className="size-4 text-primary" focusable="false" fill="none">
          <path
            d="M12 2.5 20.5 8.2v7.6L12 21.5 3.5 15.8V8.2L12 2.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M12 2.5v19M3.5 8.2 12 12.5 20.5 8.2" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        </svg>
      </span>
      <span className="type-section leading-none font-bold tracking-tight whitespace-nowrap text-foreground">{t.brand}</span>
    </span>
  )
}
