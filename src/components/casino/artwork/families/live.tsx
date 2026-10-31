/**
 * Live family — studio / dealer / table inspired, cinematic (05 §20).
 * Six composition variants selected by hash(game.id) % 6.
 *
 * Only two variants (4 and 5) use the spotlight cone as the dominant device;
 * the others lead with felt + chips, a card fan, a roulette close-up or a
 * dealer silhouette under framed studio lights.
 */

import type { ReactElement } from 'react'
import {
  ART_H,
  ART_W,
  Backdrop,
  type ArtContext,
  cardFan,
  chipStack,
  grainPattern,
  linearGrad,
  overlayRect,
  radialGlow,
  radialGrad,
  round,
  series,
  spotlight,
} from '../primitives'
import type { Palette } from '../palettes'

/** On-air accent — a small red disc, never the word "LIVE". */
const ON_AIR = '#E2413C'

function feltTable(palette: Palette, y: number): ReactElement {
  return (
    <g>
      <path
        d={`M -20 ${ART_H} L -20 ${y + 40} A 190 96 0 0 1 ${ART_W + 20} ${y + 40} L ${ART_W + 20} ${ART_H} Z`}
        fill={palette.a1}
        opacity={0.9}
      />
      <path
        d={`M -20 ${y + 40} A 190 96 0 0 1 ${ART_W + 20} ${y + 40}`}
        fill="none"
        stroke={palette.a2}
        strokeWidth={2.6}
        opacity={0.6}
      />
      <path
        d={`M 10 ${y + 78} A 150 74 0 0 1 ${ART_W - 10} ${y + 78}`}
        fill="none"
        stroke={palette.a2}
        strokeWidth={1.4}
        opacity={0.3}
      />
    </g>
  )
}

function dealer(palette: Palette, cx: number, headY: number): ReactElement {
  return (
    <g opacity={0.9}>
      <path
        d={`M ${cx - 74} 300 C ${cx - 66} ${headY + 58} ${cx - 34} ${headY + 34} ${cx} ${headY + 34} C ${cx + 34} ${headY + 34} ${cx + 66} ${headY + 58} ${cx + 74} 300 Z`}
        fill={palette.bg0}
        opacity={0.92}
      />
      <circle cx={cx} cy={headY} r={34} fill={palette.bg0} />
      <circle
        cx={cx}
        cy={headY}
        r={34}
        fill="none"
        stroke={palette.a2}
        strokeWidth={1.6}
        opacity={0.45}
      />
    </g>
  )
}

/** Overhead studio fixture: a short housing plus a stub of light, not a cone. */
function studioLight(key: string, x: number, palette: Palette, width: number): ReactElement {
  return (
    <g key={key}>
      <rect x={x - width / 2} y={16} width={width} height={11} rx={3} fill={palette.bg0} />
      <rect
        x={x - width / 2}
        y={16}
        width={width}
        height={11}
        rx={3}
        fill="none"
        stroke={palette.a2}
        strokeWidth={1.1}
        opacity={0.7}
      />
      <rect x={x - width / 2 + 4} y={27} width={width - 8} height={4} rx={2} fill={palette.ink} opacity={0.55} />
      <path
        d={`M ${x - width / 2} 31 L ${x - width / 2 - 10} 62 L ${x + width / 2 + 10} 62 L ${x + width / 2} 31 Z`}
        fill={palette.ink}
        opacity={0.1}
      />
    </g>
  )
}

/** Soft elliptical key light on the felt — the cone-free lighting device. */
function rimLight(key: string, gradientId: string, cy: number): ReactElement {
  return <ellipse key={key} cx={150} cy={cy} rx={168} ry={92} fill={`url(#${gradientId})`} opacity={0.85} />
}

function rouletteWheel(key: string, cx: number, cy: number, r: number, palette: Palette): ReactElement {
  return (
    <g key={key}>
      <circle cx={cx} cy={cy} r={r} fill={palette.bg0} opacity={0.95} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={palette.a2} strokeWidth={3.4} />
      {series(16).map((index) => {
        const a0 = (index * Math.PI) / 8
        const a1 = a0 + Math.PI / 8
        return index % 2 === 0 ? (
          <path
            key={`${key}-seg-${index}`}
            d={`M ${cx} ${cy} L ${(cx + Math.cos(a0) * r).toFixed(1)} ${(cy + Math.sin(a0) * r).toFixed(1)} A ${r} ${r} 0 0 1 ${(cx + Math.cos(a1) * r).toFixed(1)} ${(cy + Math.sin(a1) * r).toFixed(1)} Z`}
            fill={palette.a1}
            opacity={0.55}
          />
        ) : null
      })}
      <circle cx={cx} cy={cy} r={r * 0.58} fill={palette.a1} opacity={0.9} />
      <circle cx={cx} cy={cy} r={r * 0.58} fill="none" stroke={palette.a2} strokeWidth={1.6} opacity={0.7} />
      <circle cx={cx} cy={cy} r={r * 0.22} fill={palette.a2} opacity={0.9} />
      <circle cx={cx} cy={cy - r * 0.79} r={7} fill={palette.ink} />
    </g>
  )
}

export function renderLive(ctx: ArtContext): ReactElement {
  const { key, palette, u, variant } = ctx
  const beamId = `art-${key}-beam`
  const glowId = `art-${key}-glow`
  const rimId = `art-${key}-rim`
  const grainId = `art-${key}-grain`
  const drift = round(u(21) * 40 - 20)

  const body = ((): ReactElement => {
    switch (variant) {
      // 0 — felt + chip bank, lit by a soft rim light (no cone).
      case 0:
        return (
          <g>
            {studioLight(`${key}-sl0a`, 88, palette, 54)}
            {studioLight(`${key}-sl0b`, 212, palette, 54)}
            {feltTable(palette, 176)}
            {rimLight(`${key}-rim0`, rimId, 280)}
            {chipStack(`${key}-cs0a`, 70, 322, 7, 27, palette.a2, palette.bg0)}
            {chipStack(`${key}-cs0b`, 132, 338, 4, 24, palette.ink, palette.a1)}
            {chipStack(`${key}-cs0c`, 224, 312, 5, 27, palette.a2, palette.a1)}
          </g>
        )
      // 1 — card fan on felt, vignette only (no cone).
      case 1:
        return (
          <g>
            {feltTable(palette, 150)}
            {rimLight(`${key}-rim1`, rimId, 230)}
            {cardFan(`${key}-fan`, 150 + round(drift / 3), 176, 5, 52, 82, 116, palette.ink, palette.a1)}
            {chipStack(`${key}-cs1`, 54, 344, 5, 24, palette.a2, palette.bg0)}
            {chipStack(`${key}-cs1b`, 246, 336, 3, 22, palette.ink, palette.a1)}
          </g>
        )
      // 2 — roulette close-up, cropped by the frame (no cone).
      case 2:
        return (
          <g>
            {feltTable(palette, 214)}
            {rouletteWheel(`${key}-wheel`, 176 + drift, 146, 126, palette)}
            {chipStack(`${key}-cs2`, 48, 330, 6, 24, palette.a2, palette.bg0)}
          </g>
        )
      // 3 — dealer silhouette under framed studio lights (no cone).
      case 3:
        return (
          <g>
            {studioLight(`${key}-sl3a`, 62, palette, 46)}
            {studioLight(`${key}-sl3b`, 150, palette, 62)}
            {studioLight(`${key}-sl3c`, 238, palette, 46)}
            {rimLight(`${key}-rim3`, rimId, 190)}
            {dealer(palette, 150 + round(drift / 2), 134)}
            {feltTable(palette, 250)}
            {cardFan(`${key}-fan3`, 150, 306, 3, 34, 58, 80, palette.ink, palette.a2)}
          </g>
        )
      // 4 — twin crossing cones (cone-led).
      case 4:
        return (
          <g>
            {spotlight(`${key}-b4a`, 86, -14, 74, 330, beamId, drift)}
            {spotlight(`${key}-b4b`, 214, -14, 66, 330, beamId, -drift)}
            {feltTable(palette, 236)}
            <path
              d={`M 24 292 A 126 56 0 0 1 ${ART_W - 24} 292`}
              fill="none"
              stroke={palette.a2}
              strokeWidth={1.6}
              opacity={0.45}
              strokeDasharray="6 9"
            />
            {chipStack(`${key}-cs4`, 150, 344, 4, 24, palette.a2, palette.bg0)}
          </g>
        )
      // 5 — single wide cone over the table (cone-led).
      default:
        return (
          <g>
            {spotlight(`${key}-b5`, 150, -24, 132, 260, beamId, drift)}
            {feltTable(palette, 206)}
            {chipStack(`${key}-cs5a`, 66, 336, 7, 25, palette.a2, palette.bg0)}
            {chipStack(`${key}-cs5b`, 150, 348, 4, 25, palette.ink, palette.a1)}
            {chipStack(`${key}-cs5c`, 232, 330, 6, 25, palette.a2, palette.a1)}
          </g>
        )
    }
  })()

  return (
    <g>
      <Backdrop idKey={key} palette={palette} angle={round(100 + u(2) * 40)} />
      <defs>
        {linearGrad(beamId, palette.ink, palette.bg0, 90, 0.34, 0)}
        {radialGrad(glowId, palette.a2, palette.bg0, 0.3, 0)}
        {radialGrad(rimId, palette.ink, palette.bg0, 0.22, 0)}
        {grainPattern(grainId, palette.ink, 0.05)}
      </defs>
      {radialGlow(glowId, 150, round(90 + u(11) * 60), 180, 0.9)}
      {body}
      <g>
        <circle cx={252} cy={40} r={16} fill={ON_AIR} opacity={0.18} />
        <circle cx={252} cy={40} r={7} fill={ON_AIR} />
      </g>
      {overlayRect(grainId, 0.9)}
    </g>
  )
}
