import { useState, type ReactNode } from 'react'
import { cn } from 'cn'

import { GameArtwork } from '@/components/casino/artwork'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { filterActivity } from '@/data/activity'
import { gamesById } from '@/data/games'
import type { ActivityItem, ActivityType } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'
import { formatMultiplier, formatPayout } from '@/lib/format'

type ActivityTab = 'all' | ActivityType

const TABS: { id: ActivityTab; labelKey: 'tabAll' | 'tabHighWins' | 'tabLuckyWins' }[] = [
  { id: 'all', labelKey: 'tabAll' },
  { id: 'high-win', labelKey: 'tabHighWins' },
  { id: 'lucky-win', labelKey: 'tabLuckyWins' },
]

/** Recent activity table / mobile cards. */
export function NoxaActivity() {
  const t = useStrings()
  const [tab, setTab] = useState<ActivityTab>('all')
  const rows = filterActivity(tab)

  return (
    <section
      aria-labelledby="noxa-activity-title"
      data-testid="noxa-activity"
      className="flex flex-col gap-3"
    >
      <h2 id="noxa-activity-title" className="type-section font-semibold tracking-tight text-foreground">
        {t.sectionActivity}
      </h2>

      <Tabs value={tab} onValueChange={(value) => setTab(value as ActivityTab)} className="gap-4">
        <TabsList className="w-full justify-start gap-6 border-b border-border">
          {TABS.map((item) => (
            <TabsTrigger
              key={item.id}
              value={item.id}
              data-testid={`noxa-activity-tab-${item.id}`}
              className="relative h-10 min-w-12 px-3 type-label font-semibold after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity after:duration-(--motion-standard) data-active:text-foreground data-active:after:opacity-100"
            >
              {t[item.labelKey]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab}>
          <table
            className="hidden w-full border-separate border-spacing-y-2 text-left md:table"
            data-testid="noxa-activity-table"
          >
            <thead>
              <tr>
                <Th>{t.colGame}</Th>
                <Th>{t.colPlayer}</Th>
                <Th className="text-right">{t.colMultiplier}</Th>
                <Th className="text-right">{t.colPayout}</Th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const game = gamesById[row.gameId]
                return (
                  <tr key={row.id} data-testid="noxa-activity-row">
                    <Td className="rounded-l-md border-l">
                      <span className="flex items-center gap-2.5">
                        <GameThumb item={row} />
                        <span className="truncate type-label font-medium text-foreground">{game?.title ?? ''}</span>
                      </span>
                    </Td>
                    <Td className="type-label text-muted-foreground">{row.playerLabel}</Td>
                    <Td className="tabular text-right type-label text-foreground">{formatMultiplier(row.multiplier)}</Td>
                    <Td className="tabular rounded-r-md border-r text-right type-label font-semibold text-success">
                      {formatPayout(row.payout)}
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <ul className="flex flex-col gap-2 md:hidden" data-testid="noxa-activity-list">
            {rows.map((row) => {
              const game = gamesById[row.gameId]
              return (
                <li
                  key={row.id}
                  className="flex items-center gap-3 rounded-md border border-border bg-surface px-3 py-2.5"
                >
                  <GameThumb item={row} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate type-label font-medium text-foreground">{game?.title ?? ''}</span>
                    <span className="tabular block truncate type-caption text-muted-foreground">
                      {row.playerLabel} · {formatMultiplier(row.multiplier)}
                    </span>
                  </span>
                  <span className="tabular shrink-0 type-label font-semibold text-success">
                    {formatPayout(row.payout)}
                  </span>
                </li>
              )
            })}
          </ul>
        </TabsContent>
      </Tabs>
    </section>
  )
}

function GameThumb({ item }: { item: ActivityItem }) {
  const game = gamesById[item.gameId]
  if (!game) return null
  return (
    <span className="size-8 shrink-0 overflow-hidden rounded-xs border border-border">
      <GameArtwork game={game} showTitle={false} />
    </span>
  )
}

function Th({ children, className }: { children: string; className?: string }) {
  return (
    <th
      scope="col"
      className={cn('px-3 pb-1 type-caption font-medium tracking-[0.14em] text-foreground-muted uppercase', className)}
    >
      {children}
    </th>
  )
}

function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn('border-y border-border bg-surface px-3 py-2.5 align-middle', className)}>{children}</td>
}
