import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react'
import { cn } from 'cn'

/**
 * Headless horizontal rail viewport (06 §12.4): CSS scroll-snap container.
 * Pair with `useRailScroll()` for arrows; concepts own card width, gaps and arrow visuals.
 */
export const RailScroller = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { gap?: string; children: ReactNode }>(
  function RailScroller({ className, style, gap, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'no-scrollbar flex snap-x snap-mandatory scroll-px-(--rail-edge,0px) overflow-x-auto overscroll-x-contain px-(--rail-edge,0px)',
          '[&>*]:shrink-0 [&>*]:snap-start',
          className,
        )}
        style={{ gap: gap ?? 'var(--rail-gap)', ...style } as CSSProperties}
        {...props}
      >
        {children}
      </div>
    )
  },
)
