// Fictional providers — fixed set of 8.

import type { Provider } from './types'

export const providers: Provider[] = [
  { id: 'noxa-originals', name: 'Noxa Originals' },
  { id: 'novaplay', name: 'NovaPlay' },
  { id: 'prime-gaming', name: 'Prime Gaming' },
  { id: 'neon-labs', name: 'Neon Labs' },
  { id: 'atlas-live', name: 'Atlas Live' },
  { id: 'vertex', name: 'Vertex' },
  { id: 'orbit-games', name: 'Orbit Games' },
  { id: 'studio-one', name: 'Studio One' },
]

export const providersById: Record<string, Provider> = Object.fromEntries(
  providers.map((provider) => [provider.id, provider]),
)

export const getProviderById = (id: string): Provider | undefined => providersById[id]
