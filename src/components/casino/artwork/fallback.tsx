/**
 * Controlled fallback artwork (05 §20.2).
 * Renders whenever a game record is incomplete or a family cannot be resolved.
 */

import type { ReactElement } from 'react'
import {
  ART_H,
  ART_W,
  ArtSvg,
  TitleBlock,
  linearGrad,
  radialGlow,
  radialGrad,
  sanitizeId,
} from './primitives'
import { FALLBACK_PALETTE } from './palettes'

export function FallbackArtwork({
  title,
  className,
  idKey = 'fallback',
}: {
  title: string
  className?: string
  idKey?: string
}): ReactElement {
  const key = sanitizeId(idKey) || 'fallback'
  const bgId = `art-${key}-fb-bg`
  const glowId = `art-${key}-fb-glow`
  const palette = FALLBACK_PALETTE

  return (
    <ArtSvg label={title} className={className}>
      <defs>
        {linearGrad(bgId, palette.bg0, palette.bg1, 110)}
        {radialGrad(glowId, palette.a2, palette.bg1, 0.28, 0)}
      </defs>
      <rect x={0} y={0} width={ART_W} height={ART_H} fill={`url(#${bgId})`} />
      {radialGlow(glowId, 150, 160, 170, 0.9)}
      <g opacity={0.9}>
        <path
          d="M 150 92 C 188 130 214 148 214 176 C 214 196 198 208 182 208 C 170 208 160 202 154 194 L 158 226 L 142 226 L 146 194 C 140 202 130 208 118 208 C 102 208 86 196 86 176 C 86 148 112 130 150 92 Z"
          fill={palette.a2}
          opacity={0.75}
        />
        <path d="M 150 244 L 176 272 L 150 300 L 124 272 Z" fill={palette.a1} opacity={0.8} />
      </g>
      <TitleBlock idKey={`${key}-fb`} title={title} ink={palette.ink} />
    </ArtSvg>
  )
}
