import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

/**
 * Noxa button levels (05 §14): primary · secondary · ghost · icon.
 * Heights and radius come from concept-scoped CSS variables, so one primitive
 * renders compact in Concept 01, taller in Concept 02 and balanced in Concept 03.
 */
const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap select-none',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-(--motion-fast) ease-out',
    'outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active',
        secondary:
          'border border-border bg-surface-elevated text-foreground hover:border-border-strong hover:bg-surface-hover active:bg-surface-active',
        ghost: 'text-muted-foreground hover:bg-surface-hover hover:text-foreground active:bg-surface-active',
        outline: 'border border-border bg-transparent text-foreground hover:border-border-strong hover:bg-surface-hover',
        accent: 'bg-accent text-primary-foreground hover:bg-accent-hover',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-(--control-h-sm) px-3 type-label',
        default: 'h-(--control-h) px-4 type-label',
        lg: 'h-(--control-h-lg) px-6 type-body',
        icon: 'size-(--control-h)',
        'icon-sm': 'size-(--control-h-sm)',
        'icon-lg': 'size-(--control-h-lg)',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
