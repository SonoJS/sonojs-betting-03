import type * as React from 'react'
import { Dialog as SheetPrimitive } from '@base-ui/react/dialog'
import { cn } from 'cn'
import { XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-sheet bg-overlay transition-opacity duration-(--motion-standard) data-ending-style:opacity-0 data-starting-style:opacity-0',
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  closeLabel = 'Close',
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: 'top' | 'right' | 'bottom' | 'left'
  showCloseButton?: boolean
  closeLabel?: string
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          'fixed z-sheet flex flex-col bg-surface text-foreground shadow-[0_0_64px_-16px_rgb(0_0_0/0.8)] outline-none',
          'transition-[opacity,transform] duration-(--motion-slow) ease-(--ease-out-smooth) data-ending-style:opacity-0 data-starting-style:opacity-0',
          'data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-[min(100vw,400px)] data-[side=right]:border-l data-[side=right]:border-border data-[side=right]:data-ending-style:translate-x-8 data-[side=right]:data-starting-style:translate-x-8',
          'data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-[min(88vw,320px)] data-[side=left]:border-r data-[side=left]:border-border data-[side=left]:data-ending-style:-translate-x-8 data-[side=left]:data-starting-style:-translate-x-8',
          'data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[92dvh] data-[side=bottom]:rounded-t-xl data-[side=bottom]:border-t data-[side=bottom]:border-border data-[side=bottom]:data-ending-style:translate-y-8 data-[side=bottom]:data-starting-style:translate-y-8',
          'data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:border-b data-[side=top]:border-border data-[side=top]:data-ending-style:-translate-y-8 data-[side=top]:data-starting-style:-translate-y-8',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3" aria-label={closeLabel} />}
          >
            <XIcon />
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-header" className={cn('flex flex-col gap-1 border-b border-border p-5 pr-12', className)} {...props} />
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="sheet-footer" className={cn('mt-auto flex flex-col gap-2 border-t border-border p-5', className)} {...props} />
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn('type-section font-bold text-foreground', className)} {...props} />
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={cn('type-label text-muted-foreground', className)} {...props} />
}

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger }
