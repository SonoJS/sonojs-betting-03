/**
 * Shared deterministic drawing primitives for the generated game artwork.
 *
 * Everything here is a pure function of its arguments: the same game id always
 * produces byte-identical markup (05 §20).
 */

import type { ReactElement, ReactNode } from 'react'
import { hashString, seededUnit } from '@/lib/hash'
import type { Palette } from './palettes'

/** Artwork canvas, fixed 3:4 (05 §20). */
export const ART_W = 300
export const ART_H = 400

export type ArtContext = {
  /** Sanitized game id — prefix for every gradient / pattern / filter id. */
  key: string
  title: string
  providerId: string
  /** Composition variant, 0..5. */
  variant: number
  palette: Palette
  /** Deterministic unit value in [0, 1) for a salt. */
  u: (salt: number) => number
  /** Deterministic pick from a list. */
  pick: <T>(list: readonly T[], salt: number) => T
}

/** Ids must be unique per game instance — 68 svgs share one document. */
export function sanitizeId(raw: string): string {
  return raw.replace(/[^a-zA-Z0-9_-]/g, '-')
}

export function buildContext(
  gameId: string,
  title: string,
  providerId: string,
  palettes: readonly Palette[],
  variants = 6,
  instanceKey = '',
): ArtContext {
  const u = (salt: number): number => seededUnit(gameId, salt)
  return {
    key: instanceKey ? `${sanitizeId(gameId)}-${sanitizeId(instanceKey)}` : sanitizeId(gameId),
    title,
    providerId,
    variant: hashString(gameId) % variants,
    palette: palettes[Math.floor(u(9001) * palettes.length) % palettes.length],
    u,
    pick: <T,>(list: readonly T[], salt: number): T =>
      list[Math.floor(u(salt) * list.length) % list.length],
  }
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function round(value: number): number {
  return Math.round(value * 100) / 100
}

/** Integer sequence helper — keeps family files free of index plumbing. */
export function series(count: number): number[] {
  return Array.from({ length: count }, (_, index) => index)
}

/* -------------------------------------------------------------------------- */
/* Defs                                                                        */
/* -------------------------------------------------------------------------- */

export function linearGrad(
  id: string,
  from: string,
  to: string,
  angleDeg: number,
  fromOpacity = 1,
  toOpacity = 1,
): ReactElement {
  const rad = (angleDeg * Math.PI) / 180
  const x1 = round(0.5 - Math.cos(rad) * 0.5)
  const y1 = round(0.5 - Math.sin(rad) * 0.5)
  const x2 = round(0.5 + Math.cos(rad) * 0.5)
  const y2 = round(0.5 + Math.sin(rad) * 0.5)
  return (
    <linearGradient key={id} id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      <stop offset="0%" stopColor={from} stopOpacity={fromOpacity} />
      <stop offset="100%" stopColor={to} stopOpacity={toOpacity} />
    </linearGradient>
  )
}

export function radialGrad(
  id: string,
  from: string,
  to: string,
  fromOpacity = 0.85,
  toOpacity = 0,
): ReactElement {
  return (
    <radialGradient key={id} id={id}>
      <stop offset="0%" stopColor={from} stopOpacity={fromOpacity} />
      <stop offset="100%" stopColor={to} stopOpacity={toOpacity} />
    </radialGradient>
  )
}

/** Soft coloured light blob. Expects `radialGrad(id, …)` to be declared in defs. */
export function radialGlow(
  gradientId: string,
  cx: number,
  cy: number,
  r: number,
  opacity = 1,
): ReactElement {
  return (
    <circle
      key={`${gradientId}-glow`}
      cx={cx}
      cy={cy}
      r={r}
      fill={`url(#${gradientId})`}
      opacity={opacity}
    />
  )
}

/** Cheap grain: a tiled dot pattern (no filter — 68 of these live on one page). */
export function grainPattern(id: string, color: string, opacity = 0.09): ReactElement {
  return (
    <pattern key={id} id={id} width={8} height={8} patternUnits="userSpaceOnUse">
      <circle cx={1.5} cy={1.5} r={0.9} fill={color} opacity={opacity} />
      <circle cx={5.5} cy={4.5} r={0.7} fill={color} opacity={opacity * 0.8} />
      <circle cx={3} cy={6.8} r={0.5} fill={color} opacity={opacity * 0.6} />
    </pattern>
  )
}

export function diagonalPattern(
  id: string,
  color: string,
  opacity = 0.14,
  size = 14,
): ReactElement {
  return (
    <pattern
      key={id}
      id={id}
      width={size}
      height={size}
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(45)"
    >
      <rect x={0} y={0} width={size / 2} height={size} fill={color} opacity={opacity} />
    </pattern>
  )
}

export function overlayRect(patternId: string, opacity = 1): ReactElement {
  return (
    <rect
      key={`${patternId}-fill`}
      x={0}
      y={0}
      width={ART_W}
      height={ART_H}
      fill={`url(#${patternId})`}
      opacity={opacity}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Decoration                                                                  */
/* -------------------------------------------------------------------------- */

export function sparkles(
  prefix: string,
  u: (salt: number) => number,
  count: number,
  color: string,
  saltBase = 500,
): ReactElement[] {
  return series(count).map((index) => {
    const salt = saltBase + index * 7
    const cx = round(lerp(14, ART_W - 14, u(salt)))
    const cy = round(lerp(20, ART_H - 120, u(salt + 1)))
    const r = round(lerp(1.1, 3.4, u(salt + 2)))
    const opacity = round(lerp(0.25, 0.85, u(salt + 3)))
    return (
      <circle
        key={`${prefix}-sp-${index}`}
        cx={cx}
        cy={cy}
        r={r}
        fill={color}
        opacity={opacity}
      />
    )
  })
}

/** Four-point twinkle. */
export function starburst(
  key: string,
  cx: number,
  cy: number,
  r: number,
  color: string,
  opacity = 0.9,
): ReactElement {
  const w = r * 0.28
  return (
    <path
      key={key}
      d={`M ${cx} ${cy - r} Q ${cx + w} ${cy - w} ${cx + r} ${cy} Q ${cx + w} ${cy + w} ${cx} ${cy + r} Q ${cx - w} ${cy + w} ${cx - r} ${cy} Q ${cx - w} ${cy - w} ${cx} ${cy - r} Z`}
      fill={color}
      opacity={opacity}
    />
  )
}

/** Casino chip stack, drawn upward from a baseline. */
export function chipStack(
  key: string,
  x: number,
  baseY: number,
  count: number,
  rx: number,
  face: string,
  edge: string,
): ReactElement {
  const ry = rx * 0.34
  const step = ry * 1.05
  return (
    <g key={key}>
      {series(count).map((index) => {
        const cy = baseY - index * step
        return (
          <g key={`${key}-c-${index}`}>
            <ellipse cx={x} cy={cy} rx={rx} ry={ry} fill={index % 2 === 0 ? face : edge} />
            <ellipse
              cx={x}
              cy={cy - ry * 0.28}
              rx={rx * 0.62}
              ry={ry * 0.58}
              fill={edge}
              opacity={0.45}
            />
          </g>
        )
      })}
    </g>
  )
}

/** Fan of playing cards rotating around a pivot. */
export function cardFan(
  key: string,
  cx: number,
  cy: number,
  count: number,
  spreadDeg: number,
  w: number,
  h: number,
  face: string,
  accent: string,
): ReactElement {
  const start = -spreadDeg / 2
  const step = count > 1 ? spreadDeg / (count - 1) : 0
  return (
    <g key={key}>
      {series(count).map((index) => (
        <g
          key={`${key}-card-${index}`}
          transform={`rotate(${round(start + step * index)} ${cx} ${cy + h * 0.55})`}
        >
          <rect
            x={cx - w / 2}
            y={cy - h / 2}
            width={w}
            height={h}
            rx={w * 0.12}
            fill={face}
            stroke={accent}
            strokeWidth={1.4}
            opacity={0.96}
          />
          <rect
            x={cx - w / 2 + w * 0.16}
            y={cy - h / 2 + h * 0.14}
            width={w * 0.68}
            height={h * 0.72}
            rx={w * 0.08}
            fill={accent}
            opacity={0.22}
          />
        </g>
      ))}
    </g>
  )
}

/** Spotlight cone, narrow at the top. */
export function spotlight(
  key: string,
  apexX: number,
  apexY: number,
  spread: number,
  bottomY: number,
  gradientId: string,
  tilt = 0,
): ReactElement {
  return (
    <path
      key={key}
      d={`M ${apexX} ${apexY} L ${round(apexX - spread + tilt)} ${bottomY} L ${round(apexX + spread + tilt)} ${bottomY} Z`}
      fill={`url(#${gradientId})`}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* Text layers                                                                 */
/* -------------------------------------------------------------------------- */

/** Split a long title into at most two visually balanced lines. */
export function splitTitle(title: string): string[] {
  const clean = title.trim()
  if (clean.length <= 12) return [clean]
  const words = clean.split(/\s+/)
  if (words.length < 2) return [clean]
  let cut = 1
  let bestDelta = Number.POSITIVE_INFINITY
  for (let index = 1; index < words.length; index++) {
    const head = words.slice(0, index).join(' ').length
    const tail = words.slice(index).join(' ').length
    const delta = Math.abs(head - tail)
    if (delta < bestDelta) {
      bestDelta = delta
      cut = index
    }
  }
  return [words.slice(0, cut).join(' '), words.slice(cut).join(' ')]
}

/** Bottom scrim + title. Font size scales with the longest line so nothing clips. */
export function TitleBlock({
  idKey,
  title,
  ink = '#FFFFFF',
}: {
  idKey: string
  title: string
  ink?: string
}): ReactElement {
  const lines = splitTitle(title)
  const longest = lines.reduce((max, line) => Math.max(max, line.length), 1)
  const fontSize = round(Math.min(30, Math.max(14, 252 / (longest * 0.58))))
  const lineHeight = round(fontSize * 1.1)
  const baseline = ART_H - 26 - (lines.length - 1) * lineHeight
  const scrimId = `art-${idKey}-scrim`
  return (
    <g>
      <defs>
        <linearGradient id={scrimId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity={0} />
          <stop offset="55%" stopColor="#000000" stopOpacity={0.34} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.55} />
        </linearGradient>
      </defs>
      <rect
        x={0}
        y={ART_H - 150}
        width={ART_W}
        height={150}
        fill={`url(#${scrimId})`}
      />
      <text
        x={20}
        y={baseline}
        fill={ink}
        fontFamily="inherit"
        fontWeight={800}
        fontSize={fontSize}
        letterSpacing={-0.2}
      >
        {lines.map((line, index) => (
          <tspan key={`${idKey}-ln-${index}`} x={20} dy={index === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  )
}

function monogram(providerId: string): string {
  const parts = providerId.split(/[-_\s]+/).filter(Boolean)
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  const first = parts[0] ?? providerId
  return first.slice(0, 2).toUpperCase() || '··'
}

/** Small provider monogram disc, top-left. */
export function ProviderMark({
  providerId,
  ink,
}: {
  providerId: string
  ink: string
}): ReactElement | null {
  if (!providerId) return null
  return (
    <g opacity={0.82}>
      <circle cx={32} cy={32} r={15} fill="#000000" opacity={0.34} />
      <circle cx={32} cy={32} r={15} fill="none" stroke={ink} strokeWidth={1.1} opacity={0.6} />
      <text
        x={32}
        y={36.5}
        fill={ink}
        fontFamily="inherit"
        fontWeight={700}
        fontSize={12}
        textAnchor="middle"
        letterSpacing={0.4}
      >
        {monogram(providerId)}
      </text>
    </g>
  )
}

/* -------------------------------------------------------------------------- */
/* Shell                                                                       */
/* -------------------------------------------------------------------------- */

/** The single svg shell every family (and the fallback) renders into. */
export function ArtSvg({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}): ReactElement {
  return (
    <svg
      viewBox={`0 0 ${ART_W} ${ART_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      focusable="false"
      className={className}
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

/** Background gradient plate shared by every family. */
export function Backdrop({
  idKey,
  palette,
  angle = 115,
}: {
  idKey: string
  palette: Palette
  angle?: number
}): ReactElement {
  const gradientId = `art-${idKey}-bg`
  return (
    <g>
      <defs>{linearGrad(gradientId, palette.bg0, palette.bg1, angle)}</defs>
      <rect x={0} y={0} width={ART_W} height={ART_H} fill={`url(#${gradientId})`} />
    </g>
  )
}
