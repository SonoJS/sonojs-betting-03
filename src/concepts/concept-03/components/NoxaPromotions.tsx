import { CrownIcon, GiftIcon, SparklesIcon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from 'cn'

import { useAuthDialog } from '@/components/casino/auth/AuthDialog'
import { Button } from '@/components/ui/button'
import type { StringKey } from '@/data/strings'
import { useStrings } from '@/hooks/useLocale'

type PromoCopy = {
  id: string
  icon: LucideIcon
  titleKey: StringKey
  textKey: StringKey
  ctaKey: StringKey
  tint: string
}

const PRIMARY_PROMOS: PromoCopy[] = [
  {
    id: 'welcome',
    icon: GiftIcon,
    titleKey: 'promoWelcomeTitle',
    textKey: 'promoWelcomeText',
    ctaKey: 'promoWelcomeCta',
    tint: 'var(--primary)',
  },
  {
    id: 'vip',
    icon: CrownIcon,
    titleKey: 'promoVipTitle',
    textKey: 'promoVipText',
    ctaKey: 'promoVipCta',
    tint: 'var(--accent)',
  },
]

/** Catalogue promotions — two cards + slim weekly row. */
export function NoxaPromotions() {
  const t = useStrings()
  const { openAuth } = useAuthDialog()

  return (
    <section
      id="promotions"
      aria-labelledby="noxa-promotions-title"
      data-testid="noxa-promotions"
      className="scroll-mt-[calc(var(--header-h)+var(--tabs-h)+12px)] flex flex-col gap-3"
    >
      <h2 id="noxa-promotions-title" className="type-section font-semibold tracking-tight text-foreground">
        {t.sectionPromotions}
      </h2>

      <div className="grid gap-3 md:grid-cols-2" data-testid="noxa-promo-grid">
        {PRIMARY_PROMOS.map((promo, index) => {
          const Icon = promo.icon
          return (
            <article
              key={promo.id}
              data-testid="noxa-promo-card"
              className="relative flex max-h-[200px] flex-col gap-2.5 overflow-hidden rounded-md border border-border bg-surface-elevated p-4"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-14 -right-14 size-40 rounded-full"
                style={{
                  background: `radial-gradient(circle, color-mix(in oklch, ${promo.tint} 18%, transparent), transparent 70%)`,
                }}
              />
              <span
                aria-hidden
                className="flex size-8 items-center justify-center rounded-sm border border-border text-primary"
                style={{ backgroundColor: `color-mix(in oklch, ${promo.tint} 12%, transparent)` }}
              >
                <Icon className="size-4" />
              </span>
              <h3 className="type-h2 font-bold tracking-tight text-foreground">{t[promo.titleKey]}</h3>
              <p className="max-w-[46ch] type-body text-muted-foreground">{t[promo.textKey]}</p>
              <div className="mt-auto pt-1">
                <Button
                  variant={index === 0 ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => openAuth('register')}
                  data-testid={`noxa-promo-cta-${promo.id}`}
                >
                  {t[promo.ctaKey]}
                </Button>
              </div>
            </article>
          )
        })}
      </div>

      <div
        data-testid="noxa-promo-banner"
        className={cn(
          'flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md border border-border bg-surface px-4 py-3',
          'bg-[linear-gradient(100deg,color-mix(in_oklch,var(--accent)_10%,var(--surface)),var(--surface)_50%)]',
        )}
      >
        <span aria-hidden className="flex size-7 items-center justify-center rounded-xs text-accent">
          <SparklesIcon className="size-4" />
        </span>
        <span className="type-label font-semibold text-foreground">{t.promoWeeklyTitle}</span>
        <span className="min-w-0 flex-1 truncate type-label text-muted-foreground">{t.promoWeeklyText}</span>
        <Button
          variant="ghost"
          size="sm"
          className="font-medium text-primary"
          onClick={() => openAuth('register')}
          data-testid="noxa-promo-cta-weekly"
        >
          {t.promoWeeklyCta}
        </Button>
      </div>
    </section>
  )
}
