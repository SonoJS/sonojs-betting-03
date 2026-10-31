import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

/** Compact semantic badges (05 §17): new · live · exclusive · hot + neutral. Legible over artwork. */
const badgeVariants = cva(
  'inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 rounded-xs px-1.5 text-[10.5px] leading-none font-semibold tracking-wide uppercase whitespace-nowrap [&>svg]:size-3',
  {
    variants: {
      variant: {
        neutral: 'border border-border bg-surface-elevated text-muted-foreground',
        new: 'bg-primary text-primary-foreground',
        live: 'bg-error text-white',
        exclusive: 'bg-accent text-primary-foreground',
        hot: 'bg-warning text-(--ink-dark)',
        outline: 'border border-white/20 bg-black/45 text-white backdrop-blur-sm',
      },
    },
    defaultVariants: {
      variant: 'neutral',
    },
  },
)

function Badge({
  className,
  variant = 'neutral',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>({ className: cn(badgeVariants({ variant }), className) }, props),
    render,
    state: { slot: 'badge', variant },
  })
}

export { Badge, badgeVariants }
