// Shared navigation metadata (docs/03 §7). All three concepts read these lists,
// but each concept composes and renders them differently.

import {
  BadgePlus,
  Boxes,
  Cherry,
  Dices,
  Flame,
  Gem,
  Gift,
  House,
  Languages,
  LifeBuoy,
  Menu,
  Radio,
  Search,
  Sparkles,
  Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { NavCategoryId } from './types'

/**
 * Keys into the shared chrome-string dictionary (`./strings`).
 * Declared locally as a literal union so navigation stays decoupled from the
 * dictionary module.
 */
export type NavLabelKey =
  | 'navHome'
  | 'navOriginals'
  | 'navPopular'
  | 'navNew'
  | 'navSlots'
  | 'navLiveCasino'
  | 'navExclusives'
  | 'navProviders'
  | 'navPromotions'
  | 'navRewards'
  | 'navSearch'
  | 'navSupport'
  | 'navLanguage'
  | 'navMenu'
  | 'navCasino'

export type NavItem = {
  id: NavCategoryId
  labelKey: NavLabelKey
  icon: LucideIcon
}

const navItem = (id: NavCategoryId, labelKey: NavLabelKey, icon: LucideIcon): NavItem => ({
  id,
  labelKey,
  icon,
})

const home = navItem('home', 'navHome', House)
const originals = navItem('originals', 'navOriginals', Sparkles)
const popular = navItem('popular', 'navPopular', Flame)
const newGames = navItem('new', 'navNew', BadgePlus)
const slots = navItem('slots', 'navSlots', Cherry)
const live = navItem('live', 'navLiveCasino', Radio)
const exclusives = navItem('exclusives', 'navExclusives', Gem)
const providersNav = navItem('providers', 'navProviders', Boxes)
const promotionsNav = navItem('promotions', 'navPromotions', Gift)
const rewards = navItem('rewards', 'navRewards', Trophy)
const search = navItem('search', 'navSearch', Search)
const support = navItem('support', 'navSupport', LifeBuoy)
const language = navItem('language', 'navLanguage', Languages)
const menu = navItem('menu', 'navMenu', Menu)
const casino = navItem('casino', 'navCasino', Dices)

/** Full discovery taxonomy shared by all concepts. */
export const discoveryCategories: NavItem[] = [
  home,
  originals,
  popular,
  newGames,
  slots,
  live,
  exclusives,
  providersNav,
  promotionsNav,
]

/** Concept 01 — persistent sidebar, grouped. */
export const sidebarPrimary: NavItem[] = [home, originals, popular, newGames, slots, live, exclusives]
export const sidebarSecondary: NavItem[] = [providersNav, promotionsNav, rewards]
export const sidebarUtility: NavItem[] = [search, support, language]

/** Concept 03 — Noxa sticky top category tabs. */
export const categoryTabItems: NavItem[] = [
  home,
  originals,
  popular,
  newGames,
  slots,
  live,
  exclusives,
  providersNav,
  promotionsNav,
]

/** @deprecated Kept for any residual imports; prefer categoryTabItems. */
export const iconRailPrimary: NavItem[] = [home, originals, popular, newGames, live, promotionsNav]
export const iconRailSecondary: NavItem[] = [search, providersNav, menu]
export const discoveryBarItems: NavItem[] = [
  originals,
  popular,
  newGames,
  slots,
  live,
  exclusives,
  providersNav,
]

/** Mobile bottom navigation, shared shape across concepts. */
export const bottomNavItems: NavItem[] = [home, search, casino, promotionsNav, menu]
