import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn } from 'cn'

/**
 * Minimal accessible tabs. Each concept styles its own tab shell via className
 * (05 §18: do not reuse the same tab shell in all three concepts).
 */
function Tabs({ className, orientation = 'horizontal', ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" data-orientation={orientation} className={cn('flex flex-col gap-4', className)} {...props} />
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return <TabsPrimitive.List data-slot="tabs-list" className={cn('inline-flex w-fit items-center', className)} {...props} />
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        'relative inline-flex items-center justify-center gap-1.5 font-medium whitespace-nowrap text-muted-foreground outline-none select-none',
        'transition-[color,background-color,border-color] duration-(--motion-fast)',
        'hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'data-active:text-foreground disabled:pointer-events-none disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn('outline-none', className)} {...props} />
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
