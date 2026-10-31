/**
 * Noxa artwork palettes — ink / sapphire / copper facets.
 * Distinct from Klyra ember and Velora jade ribbons.
 */

export type Palette = {
  bg0: string
  bg1: string
  a1: string
  a2: string
  ink: string
}

/** Originals — sharp sapphire geometry. */
export const ORIGINALS_PALETTES: readonly Palette[] = [
  { bg0: '#070A14', bg1: '#142040', a1: '#5B8CFF', a2: '#D4895A', ink: '#F0F4FF' },
  { bg0: '#080C16', bg1: '#183050', a1: '#7AA4FF', a2: '#E0A070', ink: '#F2F6FF' },
  { bg0: '#0A0C12', bg1: '#1C2438', a1: '#4A78E8', a2: '#C87848', ink: '#EEF2FA' },
  { bg0: '#060910', bg1: '#102038', a1: '#6B9AFF', a2: '#B89870', ink: '#F4F7FF' },
  { bg0: '#0A0E18', bg1: '#203048', a1: '#89B0FF', a2: '#D4895A', ink: '#F0F5FF' },
  { bg0: '#080A12', bg1: '#182030', a1: '#5B8CFF', a2: '#8AA0B8', ink: '#EEF2F8' },
]

/** Slots — brighter facet cuts with copper sparks. */
export const SLOTS_PALETTES: readonly Palette[] = [
  { bg0: '#0C1020', bg1: '#243868', a1: '#5B8CFF', a2: '#E8A868', ink: '#F4F8FF' },
  { bg0: '#101018', bg1: '#384050', a1: '#D4895A', a2: '#7AA4FF', ink: '#FFF6EC' },
  { bg0: '#0A1424', bg1: '#1C4068', a1: '#6BB0FF', a2: '#E0B878', ink: '#F0F8FF' },
  { bg0: '#120E0C', bg1: '#403028', a1: '#E09860', a2: '#5B8CFF', ink: '#FFF4EC' },
  { bg0: '#0C1018', bg1: '#283850', a1: '#89B0FF', a2: '#C88858', ink: '#F2F6FF' },
  { bg0: '#0E121C', bg1: '#304060', a1: '#5B8CFF', a2: '#D4A878', ink: '#F0F4FA' },
]

/** Live — studio ink with sapphire table accents. */
export const LIVE_PALETTES: readonly Palette[] = [
  { bg0: '#05070C', bg1: '#101828', a1: '#2A4A88', a2: '#D4895A', ink: '#EEF2F8' },
  { bg0: '#06080E', bg1: '#142030', a1: '#3A5A98', a2: '#C89860', ink: '#F0F4FA' },
  { bg0: '#05070A', bg1: '#0E1A28', a1: '#1E4878', a2: '#B88850', ink: '#ECF2F8' },
  { bg0: '#07090E', bg1: '#182438', a1: '#5B8CFF', a2: '#D4895A', ink: '#F2F6FC' },
  { bg0: '#06080C', bg1: '#122030', a1: '#3868A8', a2: '#E0A878', ink: '#EEF4FA' },
  { bg0: '#05070E', bg1: '#101C30', a1: '#4A78C8', a2: '#C88858', ink: '#F0F4F8' },
]

/** Exclusives — high-contrast prism metal. */
export const EXCLUSIVE_PALETTES: readonly Palette[] = [
  { bg0: '#07090F', bg1: '#1A2030', a1: '#8AB0FF', a2: '#E8C8A8', ink: '#F6F8FC' },
  { bg0: '#080A10', bg1: '#1C2438', a1: '#5B8CFF', a2: '#F0D8C0', ink: '#F4F7FE' },
  { bg0: '#0A0C12', bg1: '#202838', a1: '#D4895A', a2: '#C8D8F0', ink: '#F8F4F0' },
  { bg0: '#060810', bg1: '#182030', a1: '#7AA4FF', a2: '#E0B898', ink: '#F2F6FC' },
  { bg0: '#080A14', bg1: '#1C2840', a1: '#A8C4FF', a2: '#D4895A', ink: '#F4F8FF' },
  { bg0: '#07090E', bg1: '#1A222E', a1: '#6B9AFF', a2: '#D8C0A8', ink: '#F2F5FA' },
]

export const FALLBACK_PALETTE: Palette = {
  bg0: '#07090F',
  bg1: '#171B24',
  a1: '#5B8CFF',
  a2: '#D4895A',
  ink: '#F0F2F7',
}
