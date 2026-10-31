import { cn } from 'cn'

import { categoryTabItems } from '@/data/navigation'
import type { NavCategoryId } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'

const SECTION_IDS: Partial<Record<NavCategoryId, string>> = {
  home: 'promo-ticker',
  originals: 'originals',
  popular: 'popular',
  new: 'new',
  slots: 'popular',
  live: 'live',
  exclusives: 'exclusives',
  providers: 'providers',
  promotions: 'promotions',
}

/** Sticky horizontal category tabs — primary Noxa nav (no left rail). */
export function NoxaCategoryTabs({
  active,
  onSelect,
}: {
  active: NavCategoryId
  onSelect: (id: NavCategoryId) => void
}) {
  const t = useStrings()

  const scrollTo = (id: NavCategoryId) => {
    onSelect(id)
    const targetId = SECTION_IDS[id]
    if (!targetId) return
    const el = document.getElementById(targetId)
    if (!el) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <div
      data-testid="noxa-category-tabs"
      className="sticky top-(--header-h) z-sticky border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <nav
        aria-label={t.navDiscovery}
        className="mx-auto flex h-(--tabs-h) w-full max-w-(--content-max) items-stretch gap-0.5 overflow-x-auto px-4 no-scrollbar md:px-(--shell-pad)"
      >
        {categoryTabItems.map((item) => {
          const isActive = active === item.id || (active === 'home' && item.id === 'home')
          return (
            <button
              key={item.id}
              type="button"
              aria-current={isActive ? 'true' : undefined}
              data-active={isActive}
              data-testid={`noxa-tab-${item.id}`}
              onClick={() => scrollTo(item.id)}
              className={cn(
                'relative inline-flex h-full shrink-0 items-center px-3.5 type-label font-medium whitespace-nowrap outline-none',
                'transition-colors duration-(--motion-fast)',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
                isActive ? 'font-semibold text-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {t[item.labelKey]}
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary transition-[opacity,transform] duration-(--motion-standard)',
                  isActive ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-0',
                )}
              />
            </button>
          )
        })}
      </nav>
    </div>
  )
}
