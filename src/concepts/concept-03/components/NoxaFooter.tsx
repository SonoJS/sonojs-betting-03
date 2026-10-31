import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { footerGroups, socialLinks, trustItems, type FooterGroup } from '@/data/footer'
import { useStrings } from '@/hooks/useLocale'

import { NoxaLanguageControl } from './NoxaLanguageControl'
import { NoxaWordmark } from './NoxaWordmark'

/** Catalogue footer with trust strip. */
export function NoxaFooter() {
  const t = useStrings()

  return (
    <footer
      data-testid="noxa-footer"
      className="border-t border-border bg-[color-mix(in_oklch,var(--surface)_60%,var(--background))]"
    >
      <div className="mx-auto w-full max-w-(--content-max) px-4 py-10 md:px-(--shell-pad) md:py-12">
        <div className="grid gap-10 xl:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col items-start gap-4">
            <NoxaWordmark />
            <p className="max-w-[40ch] type-label text-muted-foreground">{t.heroSupport}</p>

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <button
                    key={link.id}
                    type="button"
                    aria-label={link.label}
                    className="flex size-9 items-center justify-center rounded-sm border border-border bg-surface text-muted-foreground outline-none transition-[border-color,color] duration-(--motion-fast) hover:border-border-strong hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Icon className="size-4" />
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="type-caption tracking-wide text-foreground-muted uppercase">{t.footerLanguage}</span>
              <NoxaLanguageControl />
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-4 md:gap-8 xl:contents">
            {footerGroups.map((group) => (
              <FooterColumn key={group.id} group={group} />
            ))}
          </div>

          <Accordion className="md:hidden" data-testid="noxa-footer-accordion">
            {footerGroups.map((group) => (
              <AccordionItem key={group.id} value={group.id}>
                <AccordionTrigger>{t[group.titleKey]}</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2">
                    {group.links.map((link) => (
                      <li key={link.id}>
                        <FooterLinkButton label={t[link.labelKey]} />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <ul
          data-testid="noxa-footer-trust"
          className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6"
        >
          {trustItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            return (
              <li key={item.id} className="flex items-center gap-2 type-caption text-foreground-muted">
                <Icon aria-hidden className="size-3.5 shrink-0 text-primary" />
                <span>{t[item.labelKey]}</span>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 md:flex-row md:items-start md:justify-between md:gap-10">
          <p className="max-w-[92ch] type-caption text-foreground-muted">{t.footerLegal}</p>
          <p className="shrink-0 type-caption text-foreground-muted">
            © 2026 {t.brand}. {t.footerRights}
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ group }: { group: FooterGroup }) {
  const t = useStrings()

  return (
    <nav aria-label={t[group.titleKey]} className="flex flex-col gap-3">
      <h3 className="type-label font-semibold tracking-[0.1em] text-foreground uppercase">{t[group.titleKey]}</h3>
      <ul className="flex flex-col gap-2">
        {group.links.map((link) => (
          <li key={link.id}>
            <FooterLinkButton label={t[link.labelKey]} />
          </li>
        ))}
      </ul>
    </nav>
  )
}

function FooterLinkButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="rounded-xs type-label text-muted-foreground outline-none transition-colors duration-(--motion-fast) hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {label}
    </button>
  )
}
