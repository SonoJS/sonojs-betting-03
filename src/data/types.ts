// Shared data contracts — fixed in docs/03_homepage_ux_spec.md §21.

export type GameCategory = 'originals' | 'slots' | 'live' | 'exclusive'
export type GameBadge = 'new' | 'exclusive' | 'live' | 'hot'

export type Game = {
  id: string
  title: string
  providerId: string
  category: GameCategory
  badges?: GameBadge[]
  isPopular?: boolean
  isNew?: boolean
}

export type Provider = {
  id: string
  name: string
}

export type PromotionTheme = 'welcome' | 'weekly' | 'vip'

export type Promotion = {
  id: string
  title: string
  description: string
  ctaLabel: string
  theme: PromotionTheme
}

export type ActivityType = 'regular' | 'high-win' | 'lucky-win'

export type ActivityItem = {
  id: string
  gameId: string
  playerLabel: string // masked, e.g. "m***7"
  wager: number // USDT
  multiplier: number // e.g. 12.4
  payout: number // USDT
  type: ActivityType
}

export type Locale = 'en' | 'ru'

/** Shared discovery / navigation category ids (03 §7). */
export type NavCategoryId =
  | 'home'
  | 'originals'
  | 'popular'
  | 'new'
  | 'slots'
  | 'live'
  | 'exclusives'
  | 'providers'
  | 'promotions'
  | 'rewards'
  | 'search'
  | 'support'
  | 'language'
  | 'menu'
  | 'casino'
