import { useState } from 'react'
import { cn } from 'cn'
import { CopyIcon, PaletteIcon, RotateCcwIcon } from 'lucide-react'

import { useToast } from '@/components/shared/Toast'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useConceptTheme } from '@/hooks/useConceptTheme'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useStrings } from '@/hooks/useLocale'
import { conceptMeta } from '@/theme/concepts'
import type { ThemeColorKey } from '@/theme/theme-types'

import { ThemeTokenField } from './ThemeTokenField'

type Group = { titleKey: 'themeBrand' | 'themeSurfaces' | 'themeTypography' | 'themeStructure'; keys: ThemeColorKey[] }

const GROUPS: Group[] = [
  { titleKey: 'themeBrand', keys: ['primary', 'secondary', 'accent'] },
  { titleKey: 'themeSurfaces', keys: ['background', 'surface', 'surfaceElevated'] },
  { titleKey: 'themeTypography', keys: ['textPrimary', 'textSecondary'] },
  { titleKey: 'themeStructure', keys: ['border'] },
]

const TOKEN_LABEL_KEY: Record<ThemeColorKey, 'tokenPrimary' | 'tokenSecondary' | 'tokenAccent' | 'tokenBackground' | 'tokenSurface' | 'tokenSurfaceElevated' | 'tokenTextPrimary' | 'tokenTextSecondary' | 'tokenBorder'> = {
  primary: 'tokenPrimary',
  secondary: 'tokenSecondary',
  accent: 'tokenAccent',
  background: 'tokenBackground',
  surface: 'tokenSurface',
  surfaceElevated: 'tokenSurfaceElevated',
  textPrimary: 'tokenTextPrimary',
  textSecondary: 'tokenTextSecondary',
  border: 'tokenBorder',
}

/**
 * Theme Studio (05 §21, 06 §11): a client design-review tool, deliberately styled with its own
 * fixed neutral palette (`--ts-*`) so the tool stays legible while the concept is being recolored.
 * Edits the 9 semantic tokens live, per concept. Never edits fonts, radius, spacing or structure.
 */
export function ThemeStudio() {
  const t = useStrings()
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const { concept, colors, customized, setColor, reset, copySettings } = useConceptTheme()
  const [open, setOpen] = useState(false)

  const handleCopy = async () => {
    const ok = await copySettings()
    toast(ok ? t.settingsCopied : t.copyFailed, ok ? 'success' : 'error')
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          'theme-studio fixed right-4 z-sticky flex h-10 items-center gap-2 rounded-full border border-(--ts-border) bg-(--ts-surface)/95 pr-4 pl-3 text-[13px] font-semibold text-(--ts-text) shadow-[0_12px_32px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md outline-none transition-[background-color,transform] hover:bg-(--ts-elevated) focus-visible:ring-2 focus-visible:ring-white/40 active:scale-[0.98]',
          'bottom-[calc(var(--bottom-nav-h,0px)+env(safe-area-inset-bottom,0px)+16px)] md:bottom-5',
        )}
      >
        <PaletteIcon className="size-4" aria-hidden />
        {t.customize}
        {customized && <span className="size-1.5 rounded-full bg-(--ts-accent)" aria-hidden />}
      </button>

      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        closeLabel={t.close}
        aria-label={t.themeStudio}
        className={cn(
          'theme-studio border-(--ts-border) bg-(--ts-bg) text-(--ts-text) [&_[data-slot=sheet-close]]:text-(--ts-muted) [&_[data-slot=sheet-close]]:hover:bg-(--ts-elevated) [&_[data-slot=sheet-close]]:hover:text-(--ts-text)',
          isMobile ? 'h-[88dvh] rounded-t-2xl' : 'w-[min(100vw,380px)]',
        )}
      >
        <SheetHeader className="border-(--ts-border) p-5 pr-12">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-(--ts-elevated)">
              <PaletteIcon className="size-4" aria-hidden />
            </span>
            <SheetTitle className="text-[15px] font-semibold text-(--ts-text)">{t.themeStudio}</SheetTitle>
          </div>
          <SheetDescription className="text-[12px] leading-relaxed text-(--ts-muted)">{t.themeStudioHint}</SheetDescription>
          <div className="mt-2 flex items-center gap-2 text-[11px] tracking-wide text-(--ts-muted) uppercase">
            <span className="rounded-sm border border-(--ts-border) px-1.5 py-0.5 font-mono">{conceptMeta[concept].number}</span>
            <span className="font-medium">{conceptMeta[concept].name}</span>
            {customized && <span className="ml-auto rounded-sm bg-(--ts-elevated) px-1.5 py-0.5 text-(--ts-text) normal-case">Customized</span>}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <div className="flex flex-col gap-6">
            {GROUPS.map((group) => (
              <section key={group.titleKey} className="flex flex-col gap-3" aria-labelledby={`ts-${group.titleKey}`}>
                <h3 id={`ts-${group.titleKey}`} className="text-[11px] font-semibold tracking-[0.12em] text-(--ts-muted) uppercase">
                  {t[group.titleKey]}
                </h3>
                <div className="flex flex-col gap-3">
                  {group.keys.map((key) => (
                    <ThemeTokenField key={key} tokenKey={key} label={t[TOKEN_LABEL_KEY[key]]} value={colors[key]} invalidHint={t.themeInvalidHex} onChange={setColor} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-(--ts-border) p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <button
            type="button"
            onClick={reset}
            className="flex h-10 items-center justify-center gap-2 rounded-lg border border-(--ts-border) bg-transparent text-[13px] font-semibold text-(--ts-text) outline-none transition-colors hover:bg-(--ts-elevated) focus-visible:ring-2 focus-visible:ring-white/30"
          >
            <RotateCcwIcon className="size-4" aria-hidden />
            {t.reset}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-10 items-center justify-center gap-2 rounded-lg bg-(--ts-text) text-[13px] font-semibold text-(--ts-bg) outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <CopyIcon className="size-4" aria-hidden />
            {t.copySettings}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
