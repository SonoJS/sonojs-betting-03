import { useEffect, useRef } from 'react'
import { SearchIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useStrings } from '@/hooks/useLocale'
import { useSearch } from '@/hooks/useSearch'

import { NoxaSearchResults } from './NoxaSearchResults'

/** Mobile search bottom sheet. */
export function NoxaSearchSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const t = useStrings()
  const { query, setQuery, result } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) {
      setQuery('')
      const trigger = triggerRef.current
      triggerRef.current = null
      if (trigger?.isConnected) requestAnimationFrame(() => trigger.focus())
      return
    }
    const active = document.activeElement
    if (active instanceof HTMLElement) triggerRef.current = active
    const id = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => window.clearTimeout(id)
  }, [open, setQuery])

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" closeLabel={t.close} data-testid="noxa-search-sheet" className="gap-0 pb-6">
        <SheetHeader className="border-b-0 pb-3">
          <SheetTitle className="type-label font-semibold tracking-[0.1em] text-muted-foreground uppercase">
            {t.navSearch}
          </SheetTitle>
        </SheetHeader>

        <div className="relative px-5">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-8 size-4 -translate-y-1/2 text-foreground-muted"
          />
          <Input
            ref={inputRef}
            type="search"
            value={query}
            aria-label={t.navSearch}
            placeholder={t.searchPlaceholder}
            data-testid="noxa-sheet-search"
            onChange={(event) => setQuery(event.target.value)}
            className="bg-surface-elevated pl-9"
          />
        </div>

        <div className="max-h-[52dvh] overflow-y-auto px-3 pt-3">
          <NoxaSearchResults result={result} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
