import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { cn } from 'cn'
import { ChevronDownIcon } from 'lucide-react'

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return <AccordionPrimitive.Root data-slot="accordion" className={cn('flex w-full flex-col', className)} {...props} />
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b border-border', className)} {...props} />
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group/accordion-trigger flex min-h-11 flex-1 items-center justify-between gap-3 py-3 text-left type-label font-semibold text-foreground outline-none',
          'transition-colors duration-(--motion-fast) hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-(--motion-standard) group-aria-expanded/accordion-trigger:rotate-180"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-(--motion-standard) ease-out data-ending-style:h-0 data-starting-style:h-0"
      {...props}
    >
      <div className={cn('pb-4', className)}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
