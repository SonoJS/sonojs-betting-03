/**
 * Originals — Noxa facet / prism shard language.
 */

import type { ReactElement } from 'react'
import {
  ART_H,
  ART_W,
  Backdrop,
  type ArtContext,
  grainPattern,
  linearGrad,
  overlayRect,
  radialGlow,
  radialGrad,
  round,
  series,
} from '../primitives'
import { glyphFor, placeGlyph } from './symbols'

function geometry(ctx: ArtContext, gradId: string): ReactElement {
  const { palette, u, variant } = ctx
  const fill = `url(#${gradId})`
  const drift = round(u(31) * 28 - 14)

  switch (variant) {
    case 0:
      // Crystal cluster
      return (
        <g>
          <path
            d={`M ${120 + drift} 40 L ${210 + drift} 110 L ${180 + drift} 260 L ${90 + drift} 240 L ${70 + drift} 120 Z`}
            fill={fill}
            opacity={0.92}
          />
          <path
            d={`M ${150 + drift} 70 L ${230 + drift} 150 L ${200 + drift} 280 L ${140 + drift} 220 Z`}
            fill={palette.a2}
            opacity={0.28}
          />
          <path
            d={`M ${100 + drift} 90 L ${160 + drift} 60 L ${190 + drift} 160`}
            fill="none"
            stroke={palette.ink}
            strokeWidth={1.4}
            opacity={0.35}
          />
        </g>
      )
    case 1:
      // Angular shard strips
      return (
        <g>
          {series(5).map((i) => (
            <path
              key={`shard-${i}`}
              d={`M ${-40 + i * 72 + drift} ${ART_H} L ${40 + i * 72 + drift} 20 L ${88 + i * 72 + drift} 20 L ${8 + i * 72 + drift} ${ART_H} Z`}
              fill={i % 2 === 0 ? fill : palette.a2}
              opacity={i % 2 === 0 ? 0.88 : 0.2}
            />
          ))}
        </g>
      )
    case 2:
      // Faceted hex plane
      return (
        <g>
          <polygon
            points={`${150 + drift},36 ${230 + drift},90 ${230 + drift},198 ${150 + drift},252 ${70 + drift},198 ${70 + drift},90`}
            fill={fill}
            opacity={0.9}
          />
          <polygon
            points={`${150 + drift},36 ${230 + drift},90 ${150 + drift},144 ${70 + drift},90`}
            fill={palette.ink}
            opacity={0.12}
          />
          <polygon
            points={`${150 + drift},144 ${230 + drift},198 ${150 + drift},252 ${70 + drift},198`}
            fill={palette.a2}
            opacity={0.22}
          />
        </g>
      )
    case 3:
      // Cut planes / constellation ticks
      return (
        <g>
          <path
            d={`M ${ART_W} 40 L ${160 + drift} 120 L ${40 + drift} ${ART_H} L ${ART_W} ${ART_H} Z`}
            fill={fill}
            opacity={0.9}
          />
          <path
            d={`M ${ART_W} 10 L ${120 + drift} 100 L ${20 + drift} ${ART_H}`}
            fill="none"
            stroke={palette.a2}
            strokeWidth={2}
            opacity={0.45}
          />
          {series(6).map((i) => (
            <circle
              key={`tick-${i}`}
              cx={round(80 + i * 32 + drift * 0.3)}
              cy={round(70 + (i % 3) * 48)}
              r={2.2}
              fill={palette.ink}
              opacity={0.55}
            />
          ))}
        </g>
      )
    case 4:
      // Prism stack
      return (
        <g>
          {series(4).map((i) => {
            const y = 48 + i * 58
            return (
              <path
                key={`prism-${i}`}
                d={`M ${60 + drift} ${y} L ${150 + drift} ${y - 28} L ${240 + drift} ${y} L ${150 + drift} ${y + 36} Z`}
                fill={i % 2 === 0 ? fill : palette.a2}
                opacity={i % 2 === 0 ? 0.82 : 0.24}
              />
            )
          })}
        </g>
      )
    default:
      // Shatter fan
      return (
        <g opacity={0.9}>
          {series(8).map((i) => {
            const angle = -Math.PI / 2 + (i - 3.5) * 0.22
            const x = 150 + Math.cos(angle) * 420
            const y = ART_H + 20 + Math.sin(angle) * 420
            return (
              <path
                key={`fan-${i}`}
                d={`M 150 ${ART_H + 20} L ${x.toFixed(1)} ${y.toFixed(1)} L ${(x + 28).toFixed(1)} ${(y + 18).toFixed(1)} Z`}
                fill={i % 2 === 0 ? fill : palette.a2}
                opacity={i % 2 === 0 ? 0.58 : 0.18}
              />
            )
          })}
        </g>
      )
  }
}

const GLYPH_SPOTS: readonly (readonly [number, number, number])[] = [
  [150, 168, 128],
  [178, 148, 118],
  [150, 170, 122],
  [118, 140, 124],
  [150, 158, 130],
  [150, 162, 126],
]

export function renderOriginals(ctx: ArtContext, gameId: string): ReactElement {
  const { key, palette, u, variant } = ctx
  const shapeId = `art-${key}-shape`
  const glowId = `art-${key}-glow`
  const grainId = `art-${key}-grain`
  const glyph = glyphFor(gameId, Math.floor(u(42) * 997))
  const spot = GLYPH_SPOTS[variant]
  const rotation = round(u(55) * 14 - 7)

  return (
    <g>
      <Backdrop idKey={key} palette={palette} angle={round(95 + u(3) * 55)} />
      <defs>
        {linearGrad(shapeId, palette.a1, palette.a2, round(35 + u(5) * 110))}
        {radialGrad(glowId, palette.a1, palette.bg1, 0.42, 0)}
        {grainPattern(grainId, palette.ink, 0.06)}
      </defs>
      {radialGlow(glowId, round(65 + u(7) * 160), round(50 + u(8) * 110), 180, 0.55)}
      {geometry(ctx, shapeId)}
      {placeGlyph(glyph, spot[0], spot[1], spot[2], palette.ink, palette.bg0, rotation, 0.95)}
      {overlayRect(grainId, 0.75)}
      <rect x={0} y={0} width={ART_W} height={ART_H} fill="none" stroke={palette.ink} strokeWidth={1} opacity={0.08} />
    </g>
  )
}
