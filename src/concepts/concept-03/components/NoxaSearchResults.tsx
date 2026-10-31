import { cn } from 'cn'

import { GameArtwork } from '@/components/casino/artwork'
import { ProviderMark } from '@/components/casino/ProviderMark'
import { getProviderById } from '@/data/providers'
import { useStrings } from '@/hooks/useLocale'
import type { SearchResult } from '@/lib/search'

/** Shared search result body for header panel and mobile sheet. */
export function NoxaSearchResults({ result, className }: { result: SearchResult; className?: string }) {
  const t = useStrings()

  if (result.isIdle) {
    return <p className={cn('px-3 py-4 type-label text-foreground-muted', className)}>{t.searchHint}</p>
  }

  if (result.isEmpty) {
    return (
      <p className={cn('px-3 py-4 type-label text-muted-foreground', className)} data-testid="noxa-search-empty">
        {t.searchEmpty}
      </p>
    )
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {result.games.length > 0 && (
        <section className="flex flex-col gap-1">
          <GroupLabel>{t.searchGames}</GroupLabel>
          {result.games.map((game) => (
            <button
              key={game.id}
              type="button"
              data-testid="noxa-search-game"
              className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-left outline-none transition-colors duration-(--motion-fast) hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="size-8 shrink-0 overflow-hidden rounded-xs border border-border">
                <GameArtwork game={game} showTitle={false} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate type-label font-semibold text-foreground">{game.title}</span>
                <span className="block truncate type-caption text-muted-foreground">
                  {getProviderById(game.providerId)?.name ?? ''}
                </span>
              </span>
            </button>
          ))}
        </section>
      )}

      {result.providers.length > 0 && (
        <section className="flex flex-col gap-1">
          <GroupLabel>{t.searchProviders}</GroupLabel>
          {result.providers.map((provider) => (
            <button
              key={provider.id}
              type="button"
              data-testid="noxa-search-provider"
              className="flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-left outline-none transition-colors duration-(--motion-fast) hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ProviderMark provider={provider} className="size-7" />
              <span className="truncate type-label font-medium text-foreground">{provider.name}</span>
            </button>
          ))}
        </section>
      )}
    </div>
  )
}

function GroupLabel({ children }: { children: string }) {
  return (
    <span className="px-2 type-caption font-medium tracking-[0.1em] text-foreground-muted uppercase">{children}</span>
  )
}
