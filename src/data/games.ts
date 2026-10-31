// Shared demo catalog — 68 fictional games (docs/03 §20.2).
// Distribution: originals 12 · slots 32 · live 12 · exclusive 12.
// Flags: isPopular 16 (9 slots / 4 originals / 3 live) · isNew 14 (12 of them badged).

import type { Game } from './types'

export const games: Game[] = [
  // ── Noxa Originals (12) ────────────────────────────────────────────
  { id: 'orig-crash', title: 'Crash', providerId: 'noxa-originals', category: 'originals', isPopular: true },
  { id: 'orig-mines', title: 'Mines', providerId: 'noxa-originals', category: 'originals', isPopular: true },
  { id: 'orig-plinko', title: 'Plinko', providerId: 'noxa-originals', category: 'originals', isPopular: true },
  { id: 'orig-dice', title: 'Dice', providerId: 'noxa-originals', category: 'originals', isPopular: true },
  { id: 'orig-limbo', title: 'Limbo', providerId: 'noxa-originals', category: 'originals' },
  { id: 'orig-keno', title: 'Keno', providerId: 'noxa-originals', category: 'originals' },
  { id: 'orig-hilo', title: 'Hilo', providerId: 'noxa-originals', category: 'originals' },
  { id: 'orig-tower', title: 'Tower', providerId: 'noxa-originals', category: 'originals', isNew: true },
  { id: 'orig-wheel', title: 'Wheel', providerId: 'noxa-originals', category: 'originals', isNew: true },
  { id: 'orig-coin-flip', title: 'Coin Flip', providerId: 'noxa-originals', category: 'originals' },
  { id: 'orig-blackjack', title: 'Blackjack', providerId: 'noxa-originals', category: 'originals' },
  { id: 'orig-roulette', title: 'Roulette', providerId: 'noxa-originals', category: 'originals' },

  // ── Slots (32) ──────────────────────────────────────────────────────────
  // NovaPlay (6)
  { id: 'slot-neon-rush', title: 'Neon Rush', providerId: 'novaplay', category: 'slots', badges: ['hot'], isPopular: true },
  { id: 'slot-candy-cyclone', title: 'Candy Cyclone', providerId: 'novaplay', category: 'slots', isPopular: true },
  { id: 'slot-frostfang-ridge', title: 'Frostfang Ridge', providerId: 'novaplay', category: 'slots', isPopular: true },
  { id: 'slot-comet-cascade', title: 'Comet Cascade', providerId: 'novaplay', category: 'slots', badges: ['new'], isNew: true },
  { id: 'slot-midnight-bazaar', title: 'Midnight Bazaar', providerId: 'novaplay', category: 'slots' },
  { id: 'slot-lucky-koi-bay', title: 'Lucky Koi Bay', providerId: 'novaplay', category: 'slots', badges: ['new'], isNew: true },

  // Prime Gaming (5)
  { id: 'slot-scarab-vault', title: 'Scarab Vault', providerId: 'prime-gaming', category: 'slots', isPopular: true },
  { id: 'slot-paper-lantern-luck', title: 'Paper Lantern Luck', providerId: 'prime-gaming', category: 'slots', badges: ['new'], isNew: true },
  { id: 'slot-golden-mammoth', title: 'Golden Mammoth', providerId: 'prime-gaming', category: 'slots' },
  { id: 'slot-temple-of-tides', title: 'Temple of Tides', providerId: 'prime-gaming', category: 'slots' },
  { id: 'slot-royal-feast', title: 'Royal Feast', providerId: 'prime-gaming', category: 'slots' },

  // Neon Labs (6)
  { id: 'slot-starfall-reels', title: 'Starfall Reels', providerId: 'neon-labs', category: 'slots', isPopular: true },
  { id: 'slot-circuit-fortune', title: 'Circuit Fortune', providerId: 'neon-labs', category: 'slots' },
  { id: 'slot-pixel-buccaneers', title: 'Pixel Buccaneers', providerId: 'neon-labs', category: 'slots' },
  { id: 'slot-hyper-fruits', title: 'Hyper Fruits', providerId: 'neon-labs', category: 'slots', isPopular: true },
  { id: 'slot-voltage-vault', title: 'Voltage Vault', providerId: 'neon-labs', category: 'slots', badges: ['new'], isNew: true },
  { id: 'slot-chrome-jungle', title: 'Chrome Jungle', providerId: 'neon-labs', category: 'slots' },

  // Vertex (5)
  { id: 'slot-aurora-spires', title: 'Aurora Spires', providerId: 'vertex', category: 'slots' },
  { id: 'slot-frost-kingdom', title: 'Frost Kingdom', providerId: 'vertex', category: 'slots' },
  { id: 'slot-titan-reels', title: 'Titan Reels', providerId: 'vertex', category: 'slots', badges: ['hot'], isPopular: true },
  { id: 'slot-emerald-depths', title: 'Emerald Depths', providerId: 'vertex', category: 'slots' },
  { id: 'slot-sky-caravan', title: 'Sky Caravan', providerId: 'vertex', category: 'slots', badges: ['new'], isNew: true },

  // Orbit Games (5)
  { id: 'slot-reef-angler', title: 'Reef Angler', providerId: 'orbit-games', category: 'slots' },
  { id: 'slot-desert-mirage', title: 'Desert Mirage', providerId: 'orbit-games', category: 'slots' },
  { id: 'slot-jade-tiger', title: 'Jade Tiger', providerId: 'orbit-games', category: 'slots', badges: ['hot'], isPopular: true },
  { id: 'slot-carnival-coins', title: 'Carnival Coins', providerId: 'orbit-games', category: 'slots' },
  { id: 'slot-harvest-moonlight', title: 'Harvest Moonlight', providerId: 'orbit-games', category: 'slots', badges: ['new'], isNew: true },

  // Studio One (5)
  { id: 'slot-velvet-parlour', title: 'Velvet Parlour', providerId: 'studio-one', category: 'slots' },
  { id: 'slot-ruby-express', title: 'Ruby Express', providerId: 'studio-one', category: 'slots', isPopular: true },
  { id: 'slot-cactus-gold', title: 'Cactus Gold', providerId: 'studio-one', category: 'slots' },
  { id: 'slot-bloom-and-burst', title: 'Bloom & Burst', providerId: 'studio-one', category: 'slots', badges: ['new'], isNew: true },
  { id: 'slot-silver-stagecoach', title: 'Silver Stagecoach', providerId: 'studio-one', category: 'slots', badges: ['new'], isNew: true },

  // ── Live Casino (12) ────────────────────────────────────────────────────
  { id: 'live-blackjack', title: 'Live Blackjack', providerId: 'atlas-live', category: 'live', badges: ['live'], isPopular: true },
  { id: 'live-roulette', title: 'Live Roulette', providerId: 'atlas-live', category: 'live', badges: ['live'], isPopular: true },
  { id: 'live-baccarat', title: 'Live Baccarat', providerId: 'atlas-live', category: 'live', badges: ['live'] },
  { id: 'live-dragon-tiger', title: 'Dragon Tiger', providerId: 'atlas-live', category: 'live', badges: ['live'] },
  { id: 'live-speed-blackjack', title: 'Speed Blackjack Live', providerId: 'atlas-live', category: 'live', badges: ['live'] },
  { id: 'live-auto-roulette', title: 'Auto Roulette Live', providerId: 'atlas-live', category: 'live', badges: ['live'] },
  { id: 'live-crazy-wheel', title: 'Crazy Wheel Live', providerId: 'atlas-live', category: 'live', badges: ['live'], isPopular: true },
  { id: 'live-cash-drop', title: 'Cash Drop Live', providerId: 'atlas-live', category: 'live', badges: ['live', 'new'], isNew: true },
  { id: 'live-thunder-dice', title: 'Thunder Dice Live', providerId: 'atlas-live', category: 'live', badges: ['live'] },
  { id: 'live-sic-bo', title: 'Sic Bo Live', providerId: 'prime-gaming', category: 'live', badges: ['live'] },
  { id: 'live-fortune-vault', title: 'Fortune Vault Live', providerId: 'prime-gaming', category: 'live', badges: ['live'] },
  { id: 'live-prize-tower', title: 'Prize Tower Live', providerId: 'prime-gaming', category: 'live', badges: ['live', 'new'], isNew: true },

  // ── Exclusives (12) ─────────────────────────────────────────────────────
  { id: 'excl-obsidian-crown', title: 'Obsidian Crown', providerId: 'novaplay', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-platinum-mirage', title: 'Platinum Mirage', providerId: 'novaplay', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-nova-vault', title: 'Nova Vault', providerId: 'novaplay', category: 'exclusive', badges: ['exclusive', 'new'], isNew: true },
  { id: 'excl-quantum-heist', title: 'Quantum Heist', providerId: 'neon-labs', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-neon-noir', title: 'Neon Noir', providerId: 'neon-labs', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-prism-syndicate', title: 'Prism Syndicate', providerId: 'neon-labs', category: 'exclusive', badges: ['exclusive', 'new'], isNew: true },
  { id: 'excl-summit-royale', title: 'Summit Royale', providerId: 'vertex', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-titan-legacy', title: 'Titan Legacy', providerId: 'vertex', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-apex-fortune', title: 'Apex Fortune', providerId: 'vertex', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-velvet-suite', title: 'Velvet Suite', providerId: 'studio-one', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-black-orchid', title: 'Black Orchid', providerId: 'studio-one', category: 'exclusive', badges: ['exclusive'] },
  { id: 'excl-imperial-atlas', title: 'Imperial Atlas', providerId: 'studio-one', category: 'exclusive', badges: ['exclusive'] },
]

export const gamesById: Record<string, Game> = Object.fromEntries(
  games.map((game) => [game.id, game]),
)

export const getOriginals = (): Game[] => games.filter((g) => g.category === 'originals')
/**
 * Curated presentation order for the flag-driven rails so that a rail never opens with the
 * same games as the rail directly above it (Originals). Flags stay the source of truth:
 * unlisted flagged games are appended, listed unflagged ids are ignored.
 */
const popularOrder = [
  'slot-neon-rush',
  'live-blackjack',
  'slot-titan-reels',
  'orig-crash',
  'slot-jade-tiger',
  'slot-candy-cyclone',
  'live-roulette',
  'orig-plinko',
  'slot-scarab-vault',
  'slot-starfall-reels',
  'orig-mines',
  'slot-hyper-fruits',
  'live-crazy-wheel',
  'slot-frostfang-ridge',
  'orig-dice',
  'slot-ruby-express',
]

const newOrder = [
  'slot-comet-cascade',
  'excl-nova-vault',
  'slot-lucky-koi-bay',
  'live-cash-drop',
  'slot-voltage-vault',
  'orig-tower',
  'slot-paper-lantern-luck',
  'slot-sky-caravan',
  'excl-prism-syndicate',
  'slot-harvest-moonlight',
  'live-prize-tower',
  'slot-bloom-and-burst',
  'orig-wheel',
  'slot-silver-stagecoach',
]

function orderFlagged(order: string[], flagged: (g: Game) => boolean): Game[] {
  const listed = order.map((id) => gamesById[id]).filter((g): g is Game => Boolean(g) && flagged(g))
  const seen = new Set(listed.map((g) => g.id))
  const rest = games.filter((g) => flagged(g) && !seen.has(g.id))
  return [...listed, ...rest]
}

export const getPopular = (): Game[] => orderFlagged(popularOrder, (g) => g.isPopular === true)
export const getNew = (): Game[] => orderFlagged(newOrder, (g) => g.isNew === true)
export const getLive = (): Game[] => games.filter((g) => g.category === 'live')
export const getExclusives = (): Game[] => games.filter((g) => g.category === 'exclusive')
export const getSlots = (): Game[] => games.filter((g) => g.category === 'slots')
export const getGameById = (id: string): Game | undefined => games.find((g) => g.id === id)
export const getGamesByProvider = (providerId: string): Game[] =>
  games.filter((g) => g.providerId === providerId)
