// Footer link groups, trust strip and social placeholders (docs/03 §17, §19).
// All links are presentation-only.

import {
  Bitcoin,
  CreditCard,
  Hash,
  Headset,
  HeartHandshake,
  MessageCircle,
  Scale,
  Send,
  ShieldCheck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { StringKey } from './strings'

export type FooterGroupId = 'casino' | 'promotions' | 'support' | 'company'
export type FooterTitleKey = 'footerCasino' | 'footerPromotions' | 'footerSupport' | 'footerCompany'

export type FooterLink = {
  id: string
  label: string
  labelKey: StringKey
}

export type FooterGroup = {
  id: FooterGroupId
  titleKey: FooterTitleKey
  links: FooterLink[]
}

export const footerGroups: FooterGroup[] = [
  {
    id: 'casino',
    titleKey: 'footerCasino',
    links: [
      { id: 'originals', label: 'Originals', labelKey: 'linkOriginals' },
      { id: 'popular', label: 'Popular', labelKey: 'linkPopular' },
      { id: 'new-games', label: 'New Games', labelKey: 'linkNewGames' },
      { id: 'slots', label: 'Slots', labelKey: 'linkSlots' },
      { id: 'live-casino', label: 'Live Casino', labelKey: 'linkLiveCasino' },
      { id: 'exclusives', label: 'Exclusives', labelKey: 'linkExclusives' },
      { id: 'providers', label: 'Providers', labelKey: 'linkProviders' },
    ],
  },
  {
    id: 'promotions',
    titleKey: 'footerPromotions',
    links: [
      { id: 'promotions', label: 'Promotions', labelKey: 'linkPromotions' },
      { id: 'rewards', label: 'Rewards', labelKey: 'linkRewards' },
      { id: 'vip', label: 'VIP', labelKey: 'linkVip' },
      { id: 'refer-a-friend', label: 'Refer a Friend', labelKey: 'linkReferAFriend' },
    ],
  },
  {
    id: 'support',
    titleKey: 'footerSupport',
    links: [
      { id: 'help-center', label: 'Help Center', labelKey: 'linkHelpCenter' },
      { id: 'contact', label: 'Contact', labelKey: 'linkContact' },
      { id: 'responsible-play', label: 'Responsible Play', labelKey: 'linkResponsiblePlay' },
      { id: 'fairness', label: 'Fairness', labelKey: 'linkFairness' },
    ],
  },
  {
    id: 'company',
    titleKey: 'footerCompany',
    links: [
      { id: 'about', label: 'About', labelKey: 'linkAbout' },
      { id: 'terms', label: 'Terms', labelKey: 'linkTerms' },
      { id: 'privacy', label: 'Privacy', labelKey: 'linkPrivacy' },
      { id: 'aml-kyc', label: 'AML / KYC', labelKey: 'linkAmlKyc' },
      { id: 'cookies', label: 'Cookies', labelKey: 'linkCookies' },
    ],
  },
]

export type TrustLabelKey =
  | 'trustCrypto'
  | 'trustCards'
  | 'trustResponsible'
  | 'trustSecurity'
  | 'trustFairness'
  | 'trustSupport'

export type TrustItem = {
  id: string
  labelKey: TrustLabelKey
  icon: LucideIcon
}

/** Compact trust / payments strip — generic representations only (docs/03 §17). */
export const trustItems: TrustItem[] = [
  { id: 'crypto', labelKey: 'trustCrypto', icon: Bitcoin },
  { id: 'cards', labelKey: 'trustCards', icon: CreditCard },
  { id: 'responsible', labelKey: 'trustResponsible', icon: HeartHandshake },
  { id: 'security', labelKey: 'trustSecurity', icon: ShieldCheck },
  { id: 'fairness', labelKey: 'trustFairness', icon: Scale },
  { id: 'support', labelKey: 'trustSupport', icon: Headset },
]

export type SocialLink = {
  id: string
  label: string
  icon: LucideIcon
}

/** Placeholder community links — generic icons, never imitated brand marks. */
export const socialLinks: SocialLink[] = [
  { id: 'community', label: 'Community', icon: Send },
  { id: 'x', label: 'X', icon: Hash },
  { id: 'instagram', label: 'Instagram', icon: Users },
  { id: 'discord', label: 'Discord', icon: MessageCircle },
]
