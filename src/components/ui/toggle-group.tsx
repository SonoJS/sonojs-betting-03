import { createContext, useContext } from 'react'
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import { type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

import { toggleVariants } from '@/components/ui/toggle'

type ToggleGroupVariants = VariantProps<typeof toggleVariants>

const ToggleGroupContext = createContext<ToggleGroupVariants>({ size: 'default', variant: 'default' })

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupPrimitive.Props & ToggleGroupVariants) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn('group/toggle-group flex w-fit flex-row items-center gap-1', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({ className, children, variant, size, ...props }: TogglePrimitive.Props & ToggleGroupVariants) {
  const context = useContext(ToggleGroupContext)
  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      className={cn('shrink-0 focus-visible:z-10', toggleVariants({ variant: context.variant ?? variant, size: context.size ?? size }), className)}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
