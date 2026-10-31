import { useCallback, useRef, useState } from 'react'

import { ConceptRoot } from '@/components/casino/ConceptRoot'
import { getExclusives, getLive, getNew, getOriginals, getPopular } from '@/data/games'
import type { NavCategoryId } from '@/data/types'
import { useFavorites } from '@/hooks/useFavorites'
import { useStrings } from '@/hooks/useLocale'

import { NoxaAbout } from './components/NoxaAbout'
import { NoxaActivity } from './components/NoxaActivity'
import { NoxaBottomNav } from './components/NoxaBottomNav'
import { NoxaCategoryTabs } from './components/NoxaCategoryTabs'
import { NoxaFooter } from './components/NoxaFooter'
import { NoxaGameRail } from './components/NoxaGameRail'
import { NoxaHeader } from './components/NoxaHeader'
import { NoxaLiveWins } from './components/NoxaLiveWins'
import { NoxaMenuSheet } from './components/NoxaMenuSheet'
import { NoxaPromoTicker } from './components/NoxaPromoTicker'
import { NoxaPromotions } from './components/NoxaPromotions'
import { NoxaProviders } from './components/NoxaProviders'
import { NoxaSearchSheet } from './components/NoxaSearchSheet'
import { NoxaTrust } from './components/NoxaTrust'

/**
 * Concept 03 — Noxa.
 *
 * Catalogue lobby: sticky header with always-on search, sticky top category tabs (no left
 * icon rail), compact promo ticker, landscape game tiles.
 */
export function Concept03Page() {
  return (
    <ConceptRoot concept="concept-03">
      <NoxaShell />
    </ConceptRoot>
  )
}

function NoxaShell() {
  const t = useStrings()
  const [activeCategory, setActiveCategory] = useState<NavCategoryId>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchSheetOpen, setSearchSheetOpen] = useState(false)
  const { isFavorite, toggle } = useFavorites()
  const searchFieldRef = useRef<HTMLInputElement>(null)

  const openSearchSheet = useCallback(() => setSearchSheetOpen(true), [])
  const openMenu = useCallback(() => setMenuOpen(true), [])

  return (
    <div className="flex min-h-dvh flex-col">
      <NoxaHeader
        searchFieldRef={searchFieldRef}
        onOpenSearchSheet={openSearchSheet}
        onOpenMenu={openMenu}
      />
      <NoxaCategoryTabs active={activeCategory} onSelect={setActiveCategory} />

      <main
        data-testid="noxa-main"
        className="mx-auto flex w-full max-w-(--content-max) flex-1 flex-col [--card-w:calc((100vw-32px-var(--rail-gap))/1.55)] md:[--card-w:200px] xl:[--card-w:220px]"
      >
        <NoxaPromoTicker />

        <div className="flex flex-col gap-(--section-gap) px-4 py-5 md:px-(--shell-pad) md:py-7">
          <NoxaLiveWins />

          <NoxaGameRail
            id="originals"
            title={t.sectionOriginals}
            games={getOriginals()}
            isFavorite={isFavorite}
            onToggleFavorite={toggle}
          />
          <NoxaGameRail
            id="popular"
            title={t.sectionPopular}
            games={getPopular()}
            isFavorite={isFavorite}
            onToggleFavorite={toggle}
          />
          <NoxaGameRail
            id="new"
            title={t.sectionNew}
            games={getNew()}
            isFavorite={isFavorite}
            onToggleFavorite={toggle}
          />
          <NoxaGameRail
            id="live"
            title={t.sectionLive}
            games={getLive()}
            isFavorite={isFavorite}
            onToggleFavorite={toggle}
          />
          <NoxaGameRail
            id="exclusives"
            title={t.sectionExclusives}
            games={getExclusives()}
            isFavorite={isFavorite}
            onToggleFavorite={toggle}
          />

          <NoxaProviders />
          <NoxaPromotions />
          <NoxaActivity />
          <NoxaTrust />
          <NoxaAbout />
        </div>
      </main>

      <NoxaFooter />

      <div aria-hidden className="h-[calc(var(--bottom-nav-h)+env(safe-area-inset-bottom))] shrink-0 md:hidden" />

      <NoxaBottomNav
        active={activeCategory}
        onSelect={setActiveCategory}
        onOpenSearch={openSearchSheet}
        onOpenMenu={openMenu}
      />
      <NoxaMenuSheet open={menuOpen} onOpenChange={setMenuOpen} active={activeCategory} onSelect={setActiveCategory} />
      <NoxaSearchSheet open={searchSheetOpen} onOpenChange={setSearchSheetOpen} />
    </div>
  )
}
