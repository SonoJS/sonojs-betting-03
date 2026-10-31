import type * as React from 'react'
import { Input as InputPrimitive } from '@base-ui/react/input'
import { cn } from 'cn'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-(--control-h) w-full min-w-0 rounded-md border border-border bg-surface px-3 type-body text-foreground',
        'transition-[border-color,box-shadow,background-color] duration-(--motion-fast) outline-none',
        'placeholder:text-foreground-muted hover:border-border-strong',
        'focus-visible:border-border-active focus-visible:ring-2 focus-visible:ring-ring/40',
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/30',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
