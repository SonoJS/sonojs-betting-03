import { LifeBuoyIcon } from 'lucide-react'
import { cn } from 'cn'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { discoveryCategories } from '@/data/navigation'
import type { NavCategoryId } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'

import { NoxaLanguageControl } from './NoxaLanguageControl'

/** Full taxonomy menu for mobile / overflow. */
export function NoxaMenuSheet({
  open,
  onOpenChange,
  active,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  active: NavCategoryId
  onSelect: (id: NavCategoryId) => void
}) {
  const t = useStrings()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" closeLabel={t.close} data-testid="noxa-menu-sheet">
        <SheetHeader>
          <SheetTitle className="type-label font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {t.navMenu}
          </SheetTitle>
        </SheetHeader>

        <nav aria-label={t.navDiscovery} className="flex flex-col gap-1 overflow-y-auto p-3">
          {discoveryCategories.map((item) => {
            const Icon = item.icon
            const isActive = item.id === active
            return (
              <button
                key={item.id}
                type="button"
                data-active={isActive}
                aria-current={isActive ? 'true' : undefined}
                data-testid={`noxa-menu-item-${item.id}`}
                onClick={() => {
                  onSelect(item.id)
                  onOpenChange(false)
                }}
                className={cn(
                  'flex min-h-11 items-center gap-3 rounded-sm px-3 type-label font-medium text-muted-foreground outline-none',
                  'transition-colors duration-(--motion-fast) hover:bg-surface-hover hover:text-foreground',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  'data-active:bg-surface-active data-active:text-primary',
                )}
              >
                <Icon aria-hidden className="size-4.5 shrink-0" />
                {t[item.labelKey]}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-border p-5">
          <button
            type="button"
            className="flex min-h-11 items-center gap-3 rounded-sm type-label font-medium text-muted-foreground outline-none transition-colors duration-(--motion-fast) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LifeBuoyIcon aria-hidden className="size-4.5" />
            {t.navSupport}
          </button>

          <div className="flex items-center justify-between gap-3">
            <span className="type-caption tracking-wide text-foreground-muted uppercase">{t.navLanguage}</span>
            <NoxaLanguageControl />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
