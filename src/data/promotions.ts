// Promotions — exactly 3 (docs/03 §15). Presentation copy only: no bonus math.

import type { Promotion } from './types'

export const promotions: Promotion[] = [
  {
    id: 'welcome',
    theme: 'welcome',
    title: 'Welcome Package',
    description: 'Boost your first deposit with a welcome reward.',
    ctaLabel: 'Claim Welcome',
  },
  {
    id: 'weekly',
    theme: 'weekly',
    title: 'Weekly Drops',
    description: 'A fresh reward lands in your account every week.',
    ctaLabel: 'See Drops',
  },
  {
    id: 'vip',
    theme: 'vip',
    title: 'VIP Club',
    description: 'Climb the loyalty tiers and unlock ongoing perks.',
    ctaLabel: 'Explore VIP',
  },
]

export const getPromotionById = (id: string): Promotion | undefined =>
  promotions.find((promotion) => promotion.id === id)
