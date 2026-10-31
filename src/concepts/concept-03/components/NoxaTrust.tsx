import { trustItems } from '@/data/footer'
import { useStrings } from '@/hooks/useLocale'

/** Trust / payments grid — sapphire accent tiles. */
export function NoxaTrust() {
  const t = useStrings()

  return (
    <section
      aria-labelledby="noxa-trust-title"
      data-testid="noxa-trust"
      className="flex flex-col gap-3"
    >
      <h2 id="noxa-trust-title" className="type-section font-semibold tracking-tight text-foreground">
        {t.sectionTrust}
      </h2>

      <ul className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
        {trustItems.map((item) => {
          const Icon = item.icon
          return (
            <li
              key={item.id}
              data-testid="noxa-trust-tile"
              className="flex items-center gap-2.5 rounded-md border border-border bg-surface px-3 py-2.5"
            >
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-[color-mix(in_oklch,var(--primary)_14%,transparent)] text-primary"
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 type-label font-medium text-balance text-foreground">{t[item.labelKey]}</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
