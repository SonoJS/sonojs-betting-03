import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const toggleVariants = cva(
  [
    'group/toggle inline-flex items-center justify-center gap-1.5 rounded-sm font-medium whitespace-nowrap text-muted-foreground select-none',
    'transition-[color,background-color,border-color] duration-(--motion-fast) outline-none',
    'hover:bg-surface-hover hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'aria-pressed:bg-surface-elevated aria-pressed:text-foreground data-[pressed]:bg-surface-elevated data-[pressed]:text-foreground',
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-border bg-transparent aria-pressed:border-border-active',
      },
      size: {
        default: 'h-(--control-h) min-w-(--control-h) px-3 type-label',
        sm: 'h-(--control-h-sm) min-w-(--control-h-sm) px-2.5 type-caption',
        lg: 'h-(--control-h-lg) min-w-(--control-h-lg) px-4 type-body',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Toggle({ className, variant = 'default', size = 'default', ...props }: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return <TogglePrimitive data-slot="toggle" className={cn(toggleVariants({ variant, size, className }))} {...props} />
}

export { Toggle, toggleVariants }
