import type { ConceptId, ThemeColorKey, ThemeColors } from './theme-types'
import { conceptDefaults } from './concepts'

export const HEX_RE = /^#[0-9a-fA-F]{6}$/

export const THEME_STORAGE_VERSION = 1

export const THEME_COLOR_KEYS: readonly ThemeColorKey[] = [
  'primary',
  'secondary',
  'accent',
  'background',
  'surface',
  'surfaceElevated',
  'textPrimary',
  'textSecondary',
  'border',
] as const

/** Editable token → CSS custom property on the concept root (06 §11.1). */
export const THEME_CSS_VARS: Record<ThemeColorKey, string> = {
  primary: '--primary',
  secondary: '--secondary',
  accent: '--accent',
  background: '--background',
  surface: '--surface',
  surfaceElevated: '--surface-elevated',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  border: '--border',
}

export function isValidHex(value: string): boolean {
  return HEX_RE.test(value)
}

export function normalizeHex(value: string): string {
  return value.toUpperCase()
}

/* ---------------- luminance / primaryForeground (05 §6) ---------------- */

function channelToLinear(c: number): number {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

export function relativeLuminance(hex: string): number {
  if (!isValidHex(hex)) return 0
  const [r, g, b] = hexToRgb(hex)
  return 0.2126 * channelToLinear(r) + 0.7152 * channelToLinear(g) + 0.0722 * channelToLinear(b)
}

export const DARK_FOREGROUND = '#0B0D0F'
export const LIGHT_FOREGROUND = '#FFFFFF'

/** relativeLuminance(primary) > 0.35 → dark text, otherwise white. Never hardcode CTA text color. */
export function primaryForeground(primary: string): string {
  return relativeLuminance(primary) > 0.35 ? DARK_FOREGROUND : LIGHT_FOREGROUND
}

/* ---------------- CSS variable application ---------------- */

/** Inline style object for the concept root: 9 editable tokens + calculated primary-foreground. */
export function themeToCssVars(colors: ThemeColors): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const key of THEME_COLOR_KEYS) vars[THEME_CSS_VARS[key]] = colors[key]
  vars['--primary-foreground'] = primaryForeground(colors.primary)
  return vars
}

/* ---------------- persistence (06 §11.5) ---------------- */

export function storageKey(concept: ConceptId): string {
  return `noxa-theme-${concept}`
}

type StoredTheme = { v: number; colors: Partial<Record<ThemeColorKey, string>> }

function getStorage(): Storage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return window.localStorage
  } catch {
    return null
  }
}

/** read → check version → validate fields → merge with defaults → ignore unknown/invalid. */
export function loadTheme(concept: ConceptId): { colors: ThemeColors; customized: boolean } {
  const defaults = conceptDefaults[concept]
  const storage = getStorage()
  if (!storage) return { colors: defaults, customized: false }
  try {
    const raw = storage.getItem(storageKey(concept))
    if (!raw) return { colors: defaults, customized: false }
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return { colors: defaults, customized: false }
    const stored = parsed as Partial<StoredTheme>
    if (stored.v !== THEME_STORAGE_VERSION || !stored.colors || typeof stored.colors !== 'object') {
      return { colors: defaults, customized: false }
    }
    const merged: ThemeColors = { ...defaults }
    let customized = false
    for (const key of THEME_COLOR_KEYS) {
      const value = stored.colors[key]
      if (typeof value === 'string' && isValidHex(value)) {
        merged[key] = normalizeHex(value)
        if (merged[key] !== defaults[key].toUpperCase()) customized = true
      }
    }
    return { colors: merged, customized }
  } catch {
    return { colors: defaults, customized: false }
  }
}

export function saveTheme(concept: ConceptId, colors: ThemeColors): void {
  const storage = getStorage()
  if (!storage) return
  try {
    const payload: StoredTheme = { v: THEME_STORAGE_VERSION, colors }
    storage.setItem(storageKey(concept), JSON.stringify(payload))
  } catch {
    /* quota / privacy mode — persistence is best effort */
  }
}

/** Reset removes the stored override for that concept only. */
export function clearTheme(concept: ConceptId): void {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.removeItem(storageKey(concept))
  } catch {
    /* ignore */
  }
}

export function isCustomized(concept: ConceptId, colors: ThemeColors): boolean {
  const defaults = conceptDefaults[concept]
  return THEME_COLOR_KEYS.some((k) => colors[k].toUpperCase() !== defaults[k].toUpperCase())
}

/* ---------------- Copy Settings payload (05 §21.5) ---------------- */

export function buildCopyPayload(concept: ConceptId, conceptName: string, colors: ThemeColors) {
  return {
    concept,
    conceptName,
    colors: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      background: colors.background,
      surface: colors.surface,
      surfaceElevated: colors.surfaceElevated,
      textPrimary: colors.textPrimary,
      textSecondary: colors.textSecondary,
      border: colors.border,
    },
  }
}

export function serializeCopyPayload(concept: ConceptId, conceptName: string, colors: ThemeColors): string {
  return JSON.stringify(buildCopyPayload(concept, conceptName, colors), null, 2)
}
