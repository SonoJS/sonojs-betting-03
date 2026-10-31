import { useEffect, useId, useState, type ChangeEvent } from 'react'
import { cn } from 'cn'

import type { ThemeColorKey } from '@/theme/theme-types'
import { isValidHex, normalizeHex } from '@/theme/theme-utils'

type Props = {
  tokenKey: ThemeColorKey
  label: string
  value: string
  invalidHint: string
  onChange: (key: ThemeColorKey, hex: string) => boolean
}

/**
 * One editable token: swatch (native color input), label, editable HEX field.
 * Invalid HEX keeps the last valid value and marks the field invalid (06 §11.4).
 */
export function ThemeTokenField({ tokenKey, label, value, invalidHint, onChange }: Props) {
  const id = useId()
  const [draft, setDraft] = useState(value)
  const [invalid, setInvalid] = useState(false)

  // Sync the draft when the value changes from outside (reset, color picker).
  useEffect(() => {
    setDraft(value)
    setInvalid(false)
  }, [value])

  const handleHex = (e: ChangeEvent<HTMLInputElement>) => {
    let next = e.target.value.trim()
    if (next && !next.startsWith('#')) next = `#${next}`
    setDraft(next)
    if (isValidHex(next)) {
      setInvalid(false)
      onChange(tokenKey, normalizeHex(next))
    } else {
      setInvalid(true)
    }
  }

  const handleBlur = () => {
    if (invalid) {
      setDraft(value)
      setInvalid(false)
    }
  }

  const handlePicker = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(tokenKey, normalizeHex(e.target.value))
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12px] leading-none font-medium text-(--ts-muted)">
        {label}
      </label>
      <div className="flex items-center gap-2.5">
        <label className="relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-md border border-(--ts-border) md:size-8" style={{ backgroundColor: value }}>
          <input
            type="color"
            value={value.toLowerCase()}
            onChange={handlePicker}
            aria-label={`${label} color`}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
        <input
          id={id}
          type="text"
          inputMode="text"
          spellCheck={false}
          autoComplete="off"
          maxLength={7}
          value={draft}
          onChange={handleHex}
          onBlur={handleBlur}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-hint` : undefined}
          className={cn(
            'h-10 w-full min-w-0 rounded-md border bg-(--ts-bg) px-2.5 font-mono text-[13px] tracking-wide text-(--ts-text) uppercase outline-none transition-colors md:h-8',
            'focus-visible:border-(--ts-text) focus-visible:ring-2 focus-visible:ring-white/20',
            invalid ? 'border-(--ts-error)' : 'border-(--ts-border)',
          )}
        />
      </div>
      {invalid && (
        <span id={`${id}-hint`} className="text-[11px] text-(--ts-error)">
          {invalidHint}
        </span>
      )}
    </div>
  )
}
