import { HeartIcon } from 'lucide-react'
import { cn } from 'cn'

import { GameArtwork } from '@/components/casino/artwork'
import { Badge } from '@/components/ui/badge'
import { getProviderById } from '@/data/providers'
import type { Game, GameBadge } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'

const BADGE_LABEL_KEY = {
  new: 'badgeNew',
  live: 'badgeLive',
  exclusive: 'badgeExclusive',
  hot: 'badgeHot',
} as const

/** Wide landscape catalogue tile (~16:10) — denser than Klyra square / Velora portrait. */
export function NoxaGameCard({
  game,
  isFavorite,
  onToggleFavorite,
}: {
  game: Game
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}) {
  const t = useStrings()
  const provider = getProviderById(game.providerId)
  const badge: GameBadge | undefined = game.badges?.[0]

  return (
    <article
      data-testid="noxa-game-card"
      className={cn(
        'group/card relative w-(--card-w) overflow-hidden rounded-md border border-border bg-surface',
        'transition-[border-color,background-color] duration-(--motion-standard)',
        'hover:border-border-strong focus-within:border-border-strong',
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
        <div className="absolute inset-0 scale-[1.15]">
          <GameArtwork game={game} showTitle={false} />
        </div>

        {badge && (
          <Badge variant={badge} className="absolute top-2 left-2">
            {t[BADGE_LABEL_KEY[badge]]}
          </Badge>
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,color-mix(in_oklch,var(--background)_90%,transparent),transparent)]"
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-2.5 pb-2">
          <span className="truncate type-label font-semibold text-foreground">{game.title}</span>
          <span className="truncate type-caption text-muted-foreground">{provider?.name ?? ''}</span>
        </div>
      </div>

      <button
        type="button"
        aria-label={game.title}
        className="absolute inset-0 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />

      <button
        type="button"
        aria-pressed={isFavorite}
        aria-label={isFavorite ? t.unfavorite : t.favorite}
        onClick={() => onToggleFavorite(game.id)}
        data-testid="noxa-favorite"
        className={cn(
          'absolute top-2 right-2 flex size-7 items-center justify-center rounded-sm border border-border bg-background/75 text-muted-foreground outline-none max-md:size-10',
          'transition-[opacity,color,border-color] duration-(--motion-fast)',
          'opacity-0 max-md:opacity-100 group-hover/card:opacity-100 group-focus-within/card:opacity-100 focus-visible:opacity-100 aria-pressed:opacity-100',
          'hover:border-border-strong hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
          isFavorite && 'text-primary',
        )}
      >
        <HeartIcon className={cn('size-3.5', isFavorite && 'fill-current')} />
      </button>
    </article>
  )
}
