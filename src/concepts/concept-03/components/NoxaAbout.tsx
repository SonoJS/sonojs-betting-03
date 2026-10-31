import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from 'cn'

import { Button } from '@/components/ui/button'
import { useStrings } from '@/hooks/useLocale'

/** Collapsible about block. */
export function NoxaAbout() {
  const t = useStrings()
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      aria-labelledby="noxa-about-title"
      data-testid="noxa-about"
      className="flex flex-col gap-3 border-t border-border pt-5"
    >
      <h2 id="noxa-about-title" className="type-section font-semibold tracking-tight text-foreground">
        {t.sectionAbout}
      </h2>

      <div
        id="noxa-about-copy"
        className={cn(
          'relative overflow-hidden transition-[max-height] duration-(--motion-slow) ease-(--ease-out-smooth)',
          expanded ? 'max-h-[560px]' : 'max-h-[92px]',
        )}
      >
        <div className="flex max-w-[92ch] flex-col gap-3 type-body text-muted-foreground">
          <p>{t.aboutText1}</p>
          <p>{t.aboutText2}</p>
          <p>{t.aboutText3}</p>
        </div>

        {!expanded && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-[linear-gradient(to_top,var(--background),transparent)]"
          />
        )}
      </div>

      <div>
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={expanded}
          aria-controls="noxa-about-copy"
          data-testid="noxa-about-toggle"
          onClick={() => setExpanded((value) => !value)}
          className="font-medium text-primary"
        >
          {expanded ? t.seeLess : t.seeMore}
          <ChevronDownIcon className={cn('transition-transform duration-(--motion-standard)', expanded && 'rotate-180')} />
        </Button>
      </div>
    </section>
  )
}
