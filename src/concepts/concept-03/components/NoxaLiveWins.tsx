import { GameArtwork } from '@/components/casino/artwork'
import { Marquee } from '@/components/casino/Marquee'
import { getLiveWins } from '@/data/activity'
import { gamesById } from '@/data/games'
import type { ActivityItem } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'
import { formatPayout } from '@/lib/format'

/** Quiet live-wins strip for the catalogue lobby. */
export function NoxaLiveWins() {
  const t = useStrings()
  const items = getLiveWins()

  return (
    <section
      aria-label={t.liveWins}
      data-testid="noxa-live-wins"
      className="flex items-center gap-3 overflow-hidden rounded-md border border-border bg-surface px-3 py-2"
    >
      <span className="shrink-0 type-caption font-semibold tracking-[0.12em] text-primary uppercase">{t.liveWins}</span>
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-success" />

      <Marquee
        className="min-w-0 flex-1 [mask-image:linear-gradient(to_right,transparent,black_28px,black_calc(100%-28px),transparent)]"
        durationSeconds={70}
        gap="0px"
      >
        {items.map((item) => (
          <LiveWinItem key={item.id} item={item} />
        ))}
      </Marquee>
    </section>
  )
}

function LiveWinItem({ item }: { item: ActivityItem }) {
  const game = gamesById[item.gameId]
  if (!game) return null

  return (
    <div className="flex h-11 items-center gap-2.5 border-l border-border px-5">
      <span className="size-8 shrink-0 overflow-hidden rounded-sm border border-border">
        <GameArtwork game={game} showTitle={false} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="type-caption font-semibold whitespace-nowrap text-foreground">{game.title}</span>
        <span className="text-[11px] whitespace-nowrap text-foreground-muted">{item.playerLabel}</span>
      </span>
      <span className="tabular ml-3 type-caption font-semibold whitespace-nowrap text-success">
        {formatPayout(item.payout)}
      </span>
    </div>
  )
}
