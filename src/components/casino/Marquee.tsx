import type { CSSProperties, ReactNode } from 'react'
import { cn } from 'cn'

import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

/**
 * Shared Live Wins motion (06 §12.5): pure CSS slow marquee, pauses on hover/focus,
 * disabled under prefers-reduced-motion (falls back to a native horizontal scroller).
 * Content is duplicated once for a seamless loop; the copy is aria-hidden.
 */
export function Marquee({
  children,
  className,
  itemClassName,
  gap = 'var(--rail-gap)',
  durationSeconds = 60,
  paused = false,
}: {
  children: ReactNode[]
  className?: string
  itemClassName?: string
  gap?: string
  durationSeconds?: number
  paused?: boolean
}) {
  const reduced = usePrefersReducedMotion()
  const animate = !reduced && !paused

  if (!animate) {
    return (
      <div className={cn('no-scrollbar flex overflow-x-auto', className)} style={{ gap }}>
        {children.map((child, i) => (
          <div key={i} className={cn('shrink-0', itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn('group/marquee overflow-hidden', className)}>
      <div
        className="flex w-max motion-safe:animate-[sb-marquee_var(--marquee-duration)_linear_infinite] group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused]"
        style={{ gap, '--marquee-duration': `${durationSeconds}s` } as CSSProperties}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" style={{ gap, paddingRight: gap }} aria-hidden={copy === 1 ? true : undefined}>
            {children.map((child, i) => (
              <div key={i} className={cn('shrink-0', itemClassName)}>
                {child}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
