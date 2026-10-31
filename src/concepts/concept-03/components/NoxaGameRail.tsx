import { RailScroller } from '@/components/casino/RailScroller'
import type { Game } from '@/data/types'
import { useRailScroll } from '@/hooks/useRailScroll'
import { useStrings } from '@/hooks/useLocale'

import { NoxaGameCard } from './NoxaGameCard'
import { NoxaSectionHeader } from './NoxaSectionHeader'

/** Horizontal catalogue rail of landscape tiles. */
export function NoxaGameRail({
  id,
  title,
  games,
  isFavorite,
  onToggleFavorite,
}: {
  id: string
  title: string
  games: Game[]
  isFavorite: (id: string) => boolean
  onToggleFavorite: (id: string) => void
}) {
  const t = useStrings()
  const { ref, canPrev, canNext, prev, next } = useRailScroll()

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-testid={`noxa-rail-${id}`}
      className="scroll-mt-[calc(var(--header-h)+var(--tabs-h)+12px)] flex flex-col gap-3"
    >
      <NoxaSectionHeader
        id={`${id}-title`}
        title={title}
        contextLabel={`${games.length} ${t.heroGamesStat}`}
        controls={{ canPrev, canNext, prev, next }}
      />

      <RailScroller ref={ref} data-testid={`noxa-rail-${id}-scroller`}>
        {games.map((game) => (
          <NoxaGameCard
            key={game.id}
            game={game}
            isFavorite={isFavorite(game.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </RailScroller>
    </section>
  )
}
