/**
 * Exclusives family — premium, high-contrast, restrained (05 §20).
 * Six composition variants selected by hash(game.id) % 6.
 *
 * Every variant layers: lifted background gradient → weave → radial highlight
 * → primary metallic shape (faceted) → echo geometry → light streak →
 * corner brackets + double frame. Restrained, but never an empty rectangle.
 */

import type { ReactElement } from 'react'
import {
  ART_H,
  ART_W,
  Backdrop,
  type ArtContext,
  diagonalPattern,
  linearGrad,
  overlayRect,
  radialGlow,
  radialGrad,
  round,
  series,
} from '../primitives'
import type { Palette } from '../palettes'

/** Diagonal light streak — sits above the primary shape for a glazed look. */
function streak(key: string, gradientId: string, offset: number, width: number): ReactElement {
  return (
    <path
      key={key}
      d={`M ${offset} ${ART_H} L ${offset + 170} 0 L ${offset + 170 + width} 0 L ${offset + width} ${ART_H} Z`}
      fill={`url(#${gradientId})`}
      opacity={0.75}
    />
  )
}

/** Thin double frame plus corner brackets — the "premium" tell. */
function frame(palette: Palette): ReactElement {
  const bracket = 26
  const corners: readonly (readonly [number, number, number, number])[] = [
    [22, 22, 1, 1],
    [ART_W - 22, 22, -1, 1],
    [22, ART_H - 22, 1, -1],
    [ART_W - 22, ART_H - 22, -1, -1],
  ]
  return (
    <g>
      <rect
        x={14}
        y={14}
        width={ART_W - 28}
        height={ART_H - 28}
        rx={6}
        fill="none"
        stroke={palette.a2}
        strokeWidth={1.1}
        opacity={0.5}
      />
      <rect
        x={21}
        y={21}
        width={ART_W - 42}
        height={ART_H - 42}
        rx={4}
        fill="none"
        stroke={palette.a1}
        strokeWidth={0.7}
        opacity={0.3}
      />
      {corners.map(([x, y, sx, sy], index) => (
        <path
          key={`corner-${index}`}
          d={`M ${x} ${y + sy * bracket} L ${x} ${y} L ${x + sx * bracket} ${y}`}
          fill="none"
          stroke={palette.a2}
          strokeWidth={2}
          opacity={0.8}
        />
      ))}
    </g>
  )
}

/** Tick marks along a baseline — quiet secondary detail. */
function ticks(key: string, y: number, color: string): ReactElement {
  return (
    <g key={key} opacity={0.5}>
      {series(9).map((index) => (
        <path
          key={`${key}-t-${index}`}
          d={`M ${48 + index * 26} ${y} L ${48 + index * 26} ${y + (index % 3 === 0 ? 11 : 6)}`}
          stroke={color}
          strokeWidth={1.4}
        />
      ))}
    </g>
  )
}

export function renderExclusive(ctx: ArtContext): ReactElement {
  const { key, palette, u, variant } = ctx
  const metalId = `art-${key}-metal`
  const sheenId = `art-${key}-sheen`
  const streakId = `art-${key}-streak`
  const glowId = `art-${key}-glow`
  const weaveId = `art-${key}-weave`
  const metal = `url(#${metalId})`
  const sheen = `url(#${sheenId})`
  const drift = round(u(13) * 26 - 13)
  const tilt = round(u(17) * 10 - 5)
  /** Sub-variation: keeps two games that land on the same variant + palette apart. */
  const sub = Math.floor(u(37) * 3) % 3

  const body = ((): ReactElement => {
    switch (variant) {
      case 0: {
        const cx = 150 + drift
        const ry = [116, 98, 132][sub]
        return (
          <g transform={`rotate(${tilt} 150 164)`}>
            <path
              d={`M ${cx} ${164 - ry} L ${cx + 98} 164 L ${cx} ${164 + ry} L ${cx - 98} 164 Z`}
              fill={metal}
            />
            {/* facet */}
            <path
              d={`M ${cx} ${164 - ry} L ${cx + 98} 164 L ${cx} 164 Z`}
              fill={sheen}
              opacity={0.9}
            />
            <path
              d={`M ${cx} ${164 - ry} L ${cx - 98} 164 L ${cx} 164 Z`}
              fill={palette.bg0}
              opacity={0.3}
            />
            <path
              d={`M ${cx} ${164 - ry} L ${cx + 98} 164 L ${cx} ${164 + ry} L ${cx - 98} 164 Z`}
              fill="none"
              stroke={palette.a2}
              strokeWidth={1.6}
              opacity={0.9}
            />
            {/* echo outline */}
            <path
              d={`M ${cx} ${138 - ry} L ${cx + 120} 164 L ${cx} ${190 + ry} L ${cx - 120} 164 Z`}
              fill="none"
              stroke={palette.a1}
              strokeWidth={1}
              opacity={0.4}
            />
            <path
              d={`M ${cx} 150 L ${cx + 22} 190 L ${cx} 230 L ${cx - 22} 190 Z`}
              fill={palette.bg0}
              opacity={0.45}
            />
          </g>
        )
      }
      case 1: {
        const x = 112 + drift
        return (
          <g>
            {sub !== 1 ? (
              <rect x={x - 42} y={66} width={44} height={214} rx={6} fill={palette.a1} opacity={0.3} />
            ) : null}
            {sub !== 0 ? (
              <rect x={x + 88} y={80} width={38} height={188} rx={6} fill={palette.a1} opacity={0.26} />
            ) : null}
            <rect x={x} y={44} width={82} height={236} rx={7} fill={metal} />
            <rect x={x} y={44} width={30} height={236} rx={7} fill={sheen} opacity={0.85} />
            <rect
              x={x}
              y={44}
              width={82}
              height={236}
              rx={7}
              fill="none"
              stroke={palette.a2}
              strokeWidth={1.6}
              opacity={0.9}
            />
            <rect x={x + 10} y={56} width={62} height={7} rx={3.5} fill={palette.bg0} opacity={0.4} />
            {ticks(`${key}-tk`, 300, palette.a2)}
          </g>
        )
      }
      case 2: {
        const cx = 150 + drift
        return (
          <g>
            <circle cx={cx} cy={152} r={112} fill={metal} />
            <path
              d={`M ${cx - 112} 152 A 112 112 0 0 1 ${cx + 112} 152 Z`}
              fill={sheen}
              opacity={0.85}
              transform={`rotate(${sub * 120} ${cx} 152)`}
            />
            <circle cx={cx} cy={152} r={112} fill="none" stroke={palette.a2} strokeWidth={2} />
            <circle
              cx={cx}
              cy={152}
              r={78}
              fill="none"
              stroke={palette.bg0}
              strokeWidth={1.4}
              opacity={0.45}
            />
            <path
              d={`M ${cx - 112} 152 L ${cx + 112} 152`}
              stroke={palette.bg0}
              strokeWidth={2}
              opacity={0.5}
            />
            <circle cx={cx} cy={152} r={20} fill={palette.a2} opacity={0.9} />
            <circle
              cx={cx}
              cy={152}
              r={132}
              fill="none"
              stroke={palette.a1}
              strokeWidth={1}
              opacity={0.45}
            />
          </g>
        )
      }
      case 3: {
        const x = 60 + drift
        return (
          <g
            transform={`rotate(${tilt} 150 168)${sub === 1 ? ' translate(300 0) scale(-1 1)' : ''}`}
          >
            {series(3).map((index) => (
              <path
                key={`echo-${index}`}
                d={`M ${x - 34 + index * 16} 74 L ${x + 64 + index * 16} 168 L ${x - 34 + index * 16} 262`}
                fill="none"
                stroke={palette.a1}
                strokeWidth={1.2}
                opacity={0.3 - index * 0.07}
              />
            ))}
            <path
              d={`M ${x} 66 L ${x + 62} 66 L ${x + 160} 168 L ${x + 62} 270 L ${x} 270 L ${x + 98} 168 Z`}
              fill={metal}
            />
            <path d={`M ${x} 66 L ${x + 62} 66 L ${x + 98} 104 L ${x + 36} 104 Z`} fill={sheen} />
            <path
              d={`M ${x} 66 L ${x + 62} 66 L ${x + 160} 168 L ${x + 62} 270 L ${x} 270 L ${x + 98} 168 Z`}
              fill="none"
              stroke={palette.a2}
              strokeWidth={1.4}
              opacity={0.85}
            />
          </g>
        )
      }
      case 4: {
        const cy = 164 + drift
        return (
          <g>
            {series(3 + sub).map((index) => (
              <circle
                key={`arc-${index}`}
                cx={150}
                cy={cy}
                r={62 + index * 28}
                fill="none"
                stroke={index === 0 ? palette.a2 : palette.a1}
                strokeWidth={index === 0 ? 9 : 1.3}
                opacity={index === 0 ? 0.95 : 0.5 - index * 0.1}
              />
            ))}
            {series(sub === 2 ? 16 : 12).map((index) => {
              const angle = (index * Math.PI * 2) / (sub === 2 ? 16 : 12)
              return (
                <path
                  key={`tick-${index}`}
                  d={`M ${(150 + Math.cos(angle) * 122).toFixed(1)} ${(cy + Math.sin(angle) * 122).toFixed(1)} L ${(150 + Math.cos(angle) * 134).toFixed(1)} ${(cy + Math.sin(angle) * 134).toFixed(1)}`}
                  stroke={palette.a2}
                  strokeWidth={index % 3 === 0 ? 2.4 : 1.2}
                  opacity={0.65}
                />
              )
            })}
            <circle cx={150} cy={cy} r={48} fill={metal} />
            <path d={`M 102 ${cy} A 48 48 0 0 1 198 ${cy} Z`} fill={sheen} opacity={0.85} />
            <circle cx={150} cy={cy} r={48} fill="none" stroke={palette.a2} strokeWidth={1.6} />
          </g>
        )
      }
      default:
        return (
          <g>
            {series(3 + sub).map((index) => {
              const step = sub === 2 ? 46 : 54
              const y = 74 + index * step
              const w = 214 - index * 26
              const x = 43 + index * 13 * (sub === 1 ? -1 : 1) + drift + (sub === 1 ? 30 : 0)
              return (
                <g key={`slab-${index}`}>
                  <rect x={x} y={y} width={w} height={38} rx={5} fill={metal} opacity={1 - index * 0.14} />
                  <rect x={x} y={y} width={w} height={11} rx={5} fill={sheen} opacity={0.8} />
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={38}
                    rx={5}
                    fill="none"
                    stroke={palette.a2}
                    strokeWidth={1.1}
                    opacity={0.75 - index * 0.12}
                  />
                </g>
              )
            })}
          </g>
        )
    }
  })()

  return (
    <g>
      <Backdrop idKey={key} palette={palette} angle={round(110 + u(1) * 40)} />
      <defs>
        {linearGrad(metalId, palette.a2, palette.a1, round(60 + u(19) * 60))}
        {linearGrad(sheenId, '#FFFFFF', palette.a2, round(70 + u(21) * 40), 0.55, 0.05)}
        {linearGrad(streakId, '#FFFFFF', palette.bg0, round(20 + u(23) * 40), 0.34, 0)}
        {radialGrad(glowId, palette.a1, palette.bg0, 0.42, 0)}
        {diagonalPattern(weaveId, palette.a2, 0.05, 12)}
      </defs>
      {overlayRect(weaveId, 1)}
      {radialGlow(glowId, round(150 + drift), 150, 210, 0.95)}
      {body}
      {streak(`${key}-streak`, streakId, round(-150 + u(29) * 130), 52)}
      {frame(palette)}
    </g>
  )
}
