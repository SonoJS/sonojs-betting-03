export type ConceptId = 'concept-03'

export type ThemeColors = {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  surfaceElevated: string
  textPrimary: string
  textSecondary: string
  border: string
}

export type ThemeColorKey = keyof ThemeColors

export type ConceptMeta = {
  id: ConceptId
  number: '03'
  name: string
  description: string
  navigationModel: string
  route: string
}

export const CONCEPT_IDS: readonly ConceptId[] = ['concept-03'] as const
