import { cn } from 'cn'

import type { Provider } from '@/data/types'
import { hashString } from '@/lib/hash'

/**
 * Generated geometric provider mark derived from `provider.id` (03 §14, §21).
 * Uses semantic tokens (it is UI chrome, not game artwork) so it follows the concept palette.
 */
export function ProviderMark({ provider, className }: { provider: Provider; className?: string }) {
  const h = hashString(provider.id)
  const variant = h % 6
  const initials = provider.name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')

  return (
    <svg viewBox="0 0 40 40" className={cn('size-8 shrink-0', className)} aria-hidden focusable="false">
      {variant === 0 && (
        <>
          <rect x="4" y="4" width="32" height="32" rx="8" fill="var(--primary)" opacity="0.18" />
          <circle cx="20" cy="20" r="9" fill="none" stroke="var(--primary)" strokeWidth="3" />
        </>
      )}
      {variant === 1 && (
        <>
          <polygon points="20,4 36,20 20,36 4,20" fill="var(--secondary)" opacity="0.2" />
          <polygon points="20,11 29,20 20,29 11,20" fill="var(--secondary)" />
        </>
      )}
      {variant === 2 && (
        <>
          <rect x="5" y="5" width="30" height="30" rx="15" fill="var(--accent)" opacity="0.2" />
          <rect x="12" y="12" width="7" height="7" rx="1.5" fill="var(--accent)" />
          <rect x="21" y="12" width="7" height="7" rx="1.5" fill="var(--accent)" opacity="0.6" />
          <rect x="12" y="21" width="7" height="7" rx="1.5" fill="var(--accent)" opacity="0.6" />
          <rect x="21" y="21" width="7" height="7" rx="1.5" fill="var(--accent)" />
        </>
      )}
      {variant === 3 && (
        <>
          <rect x="4" y="4" width="32" height="32" rx="6" fill="var(--primary)" opacity="0.16" />
          <path d="M11 27 L20 11 L29 27 Z" fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinejoin="round" />
        </>
      )}
      {variant === 4 && (
        <>
          <circle cx="20" cy="20" r="16" fill="var(--secondary)" opacity="0.16" />
          <path d="M10 20 a10 10 0 0 1 20 0" fill="none" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="20" cy="26" r="3" fill="var(--secondary)" />
        </>
      )}
      {variant === 5 && (
        <>
          <rect x="4" y="4" width="32" height="32" rx="10" fill="var(--accent)" opacity="0.16" />
          <rect x="9" y="17" width="22" height="6" rx="3" fill="var(--accent)" />
          <rect x="17" y="9" width="6" height="22" rx="3" fill="var(--accent)" opacity="0.7" />
        </>
      )}
      <text
        x="20"
        y="21.5"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="inherit"
        fill="var(--text-primary)"
        opacity="0.92"
      >
        {initials}
      </text>
    </svg>
  )
}
