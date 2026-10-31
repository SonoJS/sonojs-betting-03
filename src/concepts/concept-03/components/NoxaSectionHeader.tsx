import type { ReactNode } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from 'cn'

import { Button } from '@/components/ui/button'
import { useStrings } from '@/hooks/useLocale'

export type RailControls = {
  canPrev: boolean
  canNext: boolean
  prev: () => void
  next: () => void
}

/** Compact catalogue section heading with count + rail arrows. */
export function NoxaSectionHeader({
  id,
  title,
  contextLabel,
  controls,
  className,
}: {
  id: string
  title: string
  contextLabel?: string
  controls?: RailControls
  className?: string
}) {
  const t = useStrings()

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <h2 id={id} className="type-section font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      {contextLabel && (
        <span className="hidden type-caption tracking-[0.12em] text-muted-foreground uppercase md:inline">
          {contextLabel}
        </span>
      )}

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm" className="font-medium">
          {t.viewAll}
        </Button>

        {controls && (
          <div className="hidden items-center gap-1.5 md:flex">
            <RailArrow label={t.previous} disabled={!controls.canPrev} onClick={controls.prev}>
              <ChevronLeftIcon className="size-4" />
            </RailArrow>
            <RailArrow label={t.next} disabled={!controls.canNext} onClick={controls.next}>
              <ChevronRightIcon className="size-4" />
            </RailArrow>
          </div>
        )}
      </div>
    </div>
  )
}

function RailArrow({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex size-8 items-center justify-center rounded-sm border border-border bg-surface text-muted-foreground outline-none',
        'transition-[border-color,color,background-color] duration-(--motion-fast)',
        'hover:border-border-strong hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
        'disabled:pointer-events-none disabled:opacity-35',
      )}
    >
      {children}
    </button>
  )
}
