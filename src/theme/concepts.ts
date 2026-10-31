import { concept03Colors } from './concept-03'
import type { ConceptId, ConceptMeta, ThemeColors } from './theme-types'

export const conceptDefaults: Record<ConceptId, ThemeColors> = {
  'concept-03': concept03Colors,
}

/** Concept metadata for Theme Studio chrome. */
export const conceptMeta: Record<ConceptId, ConceptMeta> = {
  'concept-03': {
    id: 'concept-03',
    number: '03',
    name: 'Noxa',
    description: 'Catalogue casino lobby with sticky top category tabs',
    navigationModel: 'Top category tabs',
    route: '/',
  },
}

export const conceptList: ConceptMeta[] = [conceptMeta['concept-03']]
