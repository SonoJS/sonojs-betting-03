import { useEffect, useRef, useState, type RefObject } from 'react'
import { MenuIcon, SearchIcon } from 'lucide-react'
import { cn } from 'cn'

import { useAuthDialog } from '@/components/casino/auth/AuthDialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useStrings } from '@/hooks/useLocale'
import { useSearch } from '@/hooks/useSearch'

import { NoxaLanguageControl } from './NoxaLanguageControl'
import { NoxaSearchResults } from './NoxaSearchResults'
import { NoxaWordmark } from './NoxaWordmark'

/** Sticky header with always-on desktop search — Noxa catalogue chrome. */
export function NoxaHeader({
  searchFieldRef,
  onOpenSearchSheet,
  onOpenMenu,
}: {
  searchFieldRef: RefObject<HTMLInputElement | null>
  onOpenSearchSheet: () => void
  onOpenMenu: () => void
}) {
  const t = useStrings()
  const { openAuth } = useAuthDialog()
  const { query, setQuery, result } = useSearch()
  const [panelOpen, setPanelOpen] = useState(false)
  const fieldWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panelOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!fieldWrapRef.current?.contains(event.target as Node)) setPanelOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPanelOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [panelOpen])

  return (
    <header
      data-testid="noxa-header"
      className="sticky top-0 z-header h-(--header-h) w-full border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-full w-full max-w-(--content-max) items-center gap-3 px-4 md:gap-4 md:px-(--shell-pad)">
        <NoxaWordmark className="shrink-0" />

        <div ref={fieldWrapRef} className="relative mx-auto hidden min-w-0 max-w-xl flex-1 md:block">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground-muted"
          />
          <Input
            ref={searchFieldRef}
            type="search"
            value={query}
            aria-label={t.navSearch}
            placeholder={t.searchPlaceholder}
            data-testid="noxa-header-search"
            onChange={(event) => {
              setQuery(event.target.value)
              setPanelOpen(true)
            }}
            onFocus={() => setPanelOpen(true)}
            className="h-(--control-h) bg-surface pl-9"
          />

          {panelOpen && (
            <div
              data-testid="noxa-search-panel"
              className={cn(
                'absolute top-[calc(100%+10px)] left-0 z-popover w-full min-w-[320px]',
                'rounded-md border border-border bg-surface-elevated p-2',
                'shadow-[0_24px_48px_-28px_rgb(0_0_0/0.9)]',
              )}
            >
              <NoxaSearchResults result={result} />
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t.navSearch}
            data-testid="noxa-header-search-mobile"
            onClick={onOpenSearchSheet}
            className="md:hidden"
          >
            <SearchIcon />
          </Button>

          <NoxaLanguageControl className="max-md:hidden" />

          <Separator orientation="vertical" className="h-6 max-md:hidden" />

          <Button variant="outline" onClick={() => openAuth('login')} data-testid="noxa-header-login" className="max-md:h-10 max-md:px-3">
            {t.login}
          </Button>
          <Button onClick={() => openAuth('register')} data-testid="noxa-header-register" className="max-md:h-10 max-md:px-3">
            {t.register}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label={t.openMenu}
            onClick={onOpenMenu}
            className="max-md:size-10 md:hidden"
          >
            <MenuIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
