import { cn } from 'cn'

import { bottomNavItems } from '@/data/navigation'
import type { NavCategoryId } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'

/** Mobile bottom navigation with sapphire active indicator. */
export function NoxaBottomNav({
  active,
  onSelect,
  onOpenSearch,
  onOpenMenu,
}: {
  active: NavCategoryId
  onSelect: (id: NavCategoryId) => void
  onOpenSearch: () => void
  onOpenMenu: () => void
}) {
  const t = useStrings()

  return (
    <nav
      aria-label={t.navBottom}
      data-testid="noxa-bottom-nav"
      className="fixed inset-x-0 bottom-0 z-bottom-nav flex h-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] items-start border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {bottomNavItems.map((item) => {
        const Icon = item.icon
        const isActive =
          item.id === 'casino' ? active === 'popular' : item.id !== 'search' && item.id !== 'menu' && active === item.id

        return (
          <button
            key={item.id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            data-active={isActive}
            data-testid={`noxa-bottom-nav-${item.id}`}
            onClick={() => {
              if (item.id === 'search') onOpenSearch()
              else if (item.id === 'menu') onOpenMenu()
              else onSelect(item.id === 'casino' ? 'popular' : item.id)
            }}
            className={cn(
              'flex h-(--bottom-nav-h) flex-1 flex-col items-center justify-center gap-1 text-muted-foreground outline-none',
              'transition-colors duration-(--motion-fast) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
              'data-active:text-primary',
            )}
          >
            <Icon aria-hidden className="size-5" />
            <span className="text-[11px] leading-none font-medium">{t[item.labelKey]}</span>
            <span
              aria-hidden
              className={cn(
                'h-0.5 w-4 rounded-full bg-primary transition-opacity duration-(--motion-fast)',
                isActive ? 'opacity-100' : 'opacity-0',
              )}
            />
          </button>
        )
      })}
    </nav>
  )
}
