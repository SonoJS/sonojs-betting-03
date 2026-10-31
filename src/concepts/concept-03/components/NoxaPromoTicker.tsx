import { useEffect, useState, type ReactNode } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from 'cn'

import { GameArtwork } from '@/components/casino/artwork'
import { useAuthDialog } from '@/components/casino/auth/AuthDialog'
import { Button } from '@/components/ui/button'
import { gamesById } from '@/data/games'
import type { StringKey } from '@/data/strings'
import type { Game } from '@/data/types'
import { useStrings } from '@/hooks/useLocale'

type Slide = {
  id: string
  titleKey: StringKey
  textKey: StringKey
  ctaKey: StringKey
  gameId: string
  tint: 'primary' | 'accent' | 'secondary'
}

const SLIDES: Slide[] = [
  {
    id: 'welcome',
    titleKey: 'promoWelcomeTitle',
    textKey: 'promoWelcomeText',
    ctaKey: 'promoWelcomeCta',
    gameId: 'slot-neon-rush',
    tint: 'primary',
  },
  {
    id: 'weekly',
    titleKey: 'promoWeeklyTitle',
    textKey: 'promoWeeklyText',
    ctaKey: 'promoWeeklyCta',
    gameId: 'excl-obsidian-crown',
    tint: 'accent',
  },
  {
    id: 'vip',
    titleKey: 'promoVipTitle',
    textKey: 'promoVipText',
    ctaKey: 'promoVipCta',
    gameId: 'live-blackjack',
    tint: 'secondary',
  },
]

/**
 * Compact edge-to-edge promo ticker — capped height, not a cinematic stage and not a split hero.
 */
export function NoxaPromoTicker() {
  const t = useStrings()
  const { openAuth } = useAuthDialog()
  const [index, setIndex] = useState(0)
  const slide = SLIDES[index] ?? SLIDES[0]
  const game: Game | undefined = gamesById[slide.gameId]

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, 5600)
    return () => window.clearInterval(id)
  }, [])

  const tintVar =
    slide.tint === 'accent' ? 'var(--accent)' : slide.tint === 'secondary' ? 'var(--secondary)' : 'var(--primary)'

  return (
    <section
      id="promo-ticker"
      aria-roledescription="carousel"
      aria-label={t.sectionPromotions}
      data-testid="noxa-promo-ticker"
      className="relative overflow-hidden border-b border-border"
    >
      <div
        className={cn(
          'mx-auto grid w-full max-w-(--content-max) items-stretch',
          'min-h-[148px] max-h-[200px] md:min-h-[168px] md:max-h-[220px]',
          'grid-cols-[1fr_auto] gap-4 px-4 py-4 md:gap-8 md:px-(--shell-pad) md:py-5',
        )}
        style={{
          background: `linear-gradient(105deg, color-mix(in oklch, ${tintVar} 14%, var(--surface)), var(--background) 58%)`,
        }}
      >
        <div className="flex min-w-0 flex-col justify-center gap-2">
          <p className="type-caption font-semibold tracking-[0.16em] text-primary uppercase">{t.heroEyebrow}</p>
          <h1 className="type-h2 font-bold tracking-tight text-balance text-foreground">{t[slide.titleKey]}</h1>
          <p className="max-w-[52ch] truncate type-label text-muted-foreground md:whitespace-normal md:type-body">
            {t[slide.textKey]}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Button size="sm" data-testid="noxa-ticker-cta" onClick={() => openAuth('register')}>
              {t[slide.ctaKey]}
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <TickerArrow
                label={t.previous}
                onClick={() => setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length)}
              >
                <ChevronLeftIcon className="size-4" />
              </TickerArrow>
              <TickerArrow
                label={t.next}
                onClick={() => setIndex((current) => (current + 1) % SLIDES.length)}
              >
                <ChevronRightIcon className="size-4" />
              </TickerArrow>
            </div>
            <div className="ml-2 flex gap-1.5" aria-hidden>
              {SLIDES.map((item, i) => (
                <span
                  key={item.id}
                  className={cn(
                    'h-1 w-4 rounded-full transition-colors duration-(--motion-standard)',
                    i === index ? 'bg-primary' : 'bg-border-strong',
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {game && (
          <div
            aria-hidden
            className="relative hidden w-[200px] overflow-hidden rounded-md border border-border sm:block md:w-[240px]"
          >
            <div className="absolute inset-0">
              <GameArtwork game={game} showTitle={false} />
            </div>
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_left,transparent,color-mix(in_oklch,var(--background)_35%,transparent))]" />
          </div>
        )}
      </div>
    </section>
  )
}

function TickerArrow({
  label,
  onClick,
  children,
}: {
  label: string
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex size-8 items-center justify-center rounded-sm border border-border bg-surface text-muted-foreground outline-none',
        'transition-colors duration-(--motion-fast) hover:border-border-strong hover:text-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring',
      )}
    >
      {children}
    </button>
  )
}
