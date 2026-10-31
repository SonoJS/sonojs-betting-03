import { ProviderMark } from '@/components/casino/ProviderMark'
import { RailScroller } from '@/components/casino/RailScroller'
import { providers } from '@/data/providers'
import { useRailScroll } from '@/hooks/useRailScroll'
import { useStrings } from '@/hooks/useLocale'

import { NoxaSectionHeader } from './NoxaSectionHeader'

/** Provider shelf — sharp bordered tiles. */
export function NoxaProviders() {
  const t = useStrings()
  const { ref, canPrev, canNext, prev, next } = useRailScroll()

  return (
    <section
      id="providers"
      aria-labelledby="noxa-providers-title"
      data-testid="noxa-providers"
      className="scroll-mt-[calc(var(--header-h)+var(--tabs-h)+12px)] flex flex-col gap-3"
    >
      <NoxaSectionHeader
        id="noxa-providers-title"
        title={t.sectionProviders}
        contextLabel={`${providers.length}`}
        controls={{ canPrev, canNext, prev, next }}
      />

      <RailScroller ref={ref} data-testid="noxa-providers-scroller" gap="12px">
        {providers.map((provider) => (
          <button
            key={provider.id}
            type="button"
            data-testid="noxa-provider-tile"
            className="flex h-12 w-44 items-center gap-2.5 rounded-md border border-border bg-surface px-3 text-left outline-none transition-[border-color,background-color] duration-(--motion-standard) hover:border-border-strong hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ProviderMark provider={provider} className="size-7" />
            <span className="truncate type-label font-medium text-foreground">{provider.name}</span>
          </button>
        ))}
      </RailScroller>
    </section>
  )
}
