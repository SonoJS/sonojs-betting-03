/**
 * Slots family — colorful, illustrative, playful (05 §20).
 * Six composition variants selected by hash(game.id) % 6.
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
  sparkles,
  starburst,
} from '../primitives'
import type { Glyph } from './symbols'
import { placeGlyph } from './symbols'

const cherry: Glyph = (stroke, fill) => (
  <g>
    <path
      d="M 52 18 C 40 34 30 46 26 58"
      fill="none"
      stroke={stroke}
      strokeWidth={5}
      strokeLinecap="round"
    />
    <path
      d="M 52 18 C 60 36 68 48 72 60"
      fill="none"
      stroke={stroke}
      strokeWidth={5}
      strokeLinecap="round"
    />
    <circle cx={28} cy={72} r={17} fill={fill} />
    <circle cx={72} cy={74} r={15} fill={fill} opacity={0.85} />
    <circle cx={23} cy={67} r={4.5} fill={stroke} opacity={0.6} />
  </g>
)

const gem: Glyph = (stroke, fill) => (
  <g>
    <path d="M 28 34 L 72 34 L 86 52 L 50 88 L 14 52 Z" fill={fill} />
    <path d="M 28 34 L 50 88 L 72 34 Z" fill={stroke} opacity={0.3} />
    <path d="M 14 52 L 86 52" stroke={stroke} strokeWidth={2.4} opacity={0.5} />
  </g>
)

const star: Glyph = (stroke, fill) => (
  <g>
    <path
      d="M 50 12 L 61 40 L 90 42 L 67 60 L 75 88 L 50 72 L 25 88 L 33 60 L 10 42 L 39 40 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth={2.4}
      strokeLinejoin="round"
    />
  </g>
)

const lantern: Glyph = (stroke, fill) => (
  <g>
    <rect x={32} y={14} width={36} height={8} rx={3} fill={stroke} opacity={0.8} />
    <ellipse cx={50} cy={52} rx={30} ry={30} fill={fill} />
    <rect x={32} y={82} width={36} height={8} rx={3} fill={stroke} opacity={0.8} />
    <path d="M 50 22 L 50 82" stroke={stroke} strokeWidth={2.6} opacity={0.45} />
    <path d="M 36 26 Q 50 52 36 78" fill="none" stroke={stroke} strokeWidth={2.2} opacity={0.4} />
    <path d="M 64 26 Q 50 52 64 78" fill="none" stroke={stroke} strokeWidth={2.2} opacity={0.4} />
  </g>
)

const bell: Glyph = (stroke, fill) => (
  <g>
    <path d="M 50 16 C 72 16 76 42 78 72 L 22 72 C 24 42 28 16 50 16 Z" fill={fill} />
    <rect x={18} y={72} width={64} height={9} rx={4.5} fill={stroke} opacity={0.75} />
    <circle cx={50} cy={88} r={7} fill={stroke} opacity={0.75} />
  </g>
)

const clover: Glyph = (stroke, fill) => (
  <g>
    <circle cx={34} cy={40} r={19} fill={fill} />
    <circle cx={66} cy={40} r={19} fill={fill} />
    <circle cx={50} cy={64} r={19} fill={fill} opacity={0.92} />
    <path
      d="M 50 64 C 52 78 54 84 58 92"
      fill="none"
      stroke={stroke}
      strokeWidth={5}
      strokeLinecap="round"
    />
  </g>
)

const crown: Glyph = (stroke, fill) => (
  <g>
    <path d="M 14 74 L 20 26 L 38 50 L 50 20 L 62 50 L 80 26 L 86 74 Z" fill={fill} />
    <rect x={14} y={74} width={72} height={12} rx={4} fill={stroke} opacity={0.8} />
  </g>
)

const melon: Glyph = (stroke, fill) => (
  <g>
    <circle cx={50} cy={54} r={32} fill={fill} />
    <path d="M 22 40 Q 50 64 78 40" fill="none" stroke={stroke} strokeWidth={3} opacity={0.55} />
    <path d="M 26 66 Q 50 48 74 66" fill="none" stroke={stroke} strokeWidth={3} opacity={0.4} />
    <path
      d="M 50 22 C 56 14 62 12 68 14"
      fill="none"
      stroke={stroke}
      strokeWidth={4.5}
      strokeLinecap="round"
    />
  </g>
)

const SLOT_GLYPHS: readonly Glyph[] = [cherry, gem, star, lantern, bell, clover, crown, melon]

function reelWindow(ctx: ArtContext, gradId: string): ReactElement {
  const { palette, u } = ctx
  return (
    <g>
      <rect
        x={26}
        y={64}
        width={248}
        height={150}
        rx={18}
        fill="#000000"
        opacity={0.34}
      />
      {series(3).map((index) => (
        <g key={`reel-${index}`}>
          <rect
            x={36 + index * 82}
            y={74}
            width={70}
            height={130}
            rx={12}
            fill={`url(#${gradId})`}
            opacity={0.22}
          />
          {placeGlyph(
            SLOT_GLYPHS[Math.floor(u(120 + index * 13) * SLOT_GLYPHS.length) % SLOT_GLYPHS.length],
            71 + index * 82,
            139,
            62,
            palette.ink,
            index === 1 ? palette.a1 : palette.a2,
            round(u(150 + index) * 10 - 5),
          )}
        </g>
      ))}
      <rect
        x={26}
        y={64}
        width={248}
        height={150}
        rx={18}
        fill="none"
        stroke={palette.a1}
        strokeWidth={2.4}
        opacity={0.75}
      />
    </g>
  )
}

export function renderSlots(ctx: ArtContext): ReactElement {
  const { key, palette, u, variant } = ctx
  const shapeId = `art-${key}-shape`
  const glowId = `art-${key}-glow`
  const grainId = `art-${key}-grain`
  const hero = SLOT_GLYPHS[Math.floor(u(61) * SLOT_GLYPHS.length) % SLOT_GLYPHS.length]
  const second = SLOT_GLYPHS[Math.floor(u(62) * SLOT_GLYPHS.length) % SLOT_GLYPHS.length]
  const tilt = round(u(63) * 18 - 9)

  const body = ((): ReactElement => {
    switch (variant) {
      case 0:
        return reelWindow(ctx, shapeId)
      case 1:
        return (
          <g>
            {series(8).map((index) => {
              const angle = (index * Math.PI) / 4 + u(64) * 0.2
              return (
                <path
                  key={`facet-${index}`}
                  d={`M 150 156 L ${(150 + Math.cos(angle) * 300).toFixed(1)} ${(156 + Math.sin(angle) * 300).toFixed(1)} L ${(150 + Math.cos(angle + 0.28) * 300).toFixed(1)} ${(156 + Math.sin(angle + 0.28) * 300).toFixed(1)} Z`}
                  fill={index % 2 === 0 ? palette.a1 : palette.a2}
                  opacity={0.18}
                />
              )
            })}
            <polygon
              points="150,74 222,118 222,194 150,238 78,194 78,118"
              fill={`url(#${shapeId})`}
              opacity={0.9}
            />
            {placeGlyph(hero, 150, 156, 110, palette.ink, palette.a2, tilt)}
          </g>
        )
      case 2:
        return (
          <g>
            {series(6).map((index) => (
              <path
                key={`stripe-${index}`}
                d={`M ${-80 + index * 78} ${ART_H} L ${40 + index * 78} 0 L ${80 + index * 78} 0 L ${-40 + index * 78} ${ART_H} Z`}
                fill={index % 2 === 0 ? palette.a1 : palette.a2}
                opacity={0.2}
              />
            ))}
            {placeGlyph(hero, 108, 130, 104, palette.ink, palette.a1, tilt)}
            {placeGlyph(second, 208, 196, 76, palette.ink, palette.a2, -tilt)}
          </g>
        )
      case 3:
        return (
          <g>
            <path
              d="M 42 250 L 42 118 A 108 108 0 0 1 258 118 L 258 250 Z"
              fill={`url(#${shapeId})`}
              opacity={0.86}
            />
            <path
              d="M 42 250 L 42 118 A 108 108 0 0 1 258 118 L 258 250"
              fill="none"
              stroke={palette.ink}
              strokeWidth={2.4}
              opacity={0.5}
            />
            {placeGlyph(hero, 150, 138, 104, palette.ink, palette.a1, tilt)}
            {placeGlyph(second, 74, 224, 52, palette.ink, palette.a2, 0)}
            {placeGlyph(second, 226, 224, 52, palette.ink, palette.a2, 0)}
          </g>
        )
      case 4:
        return (
          <g>
            <circle cx={150} cy={150} r={100} fill={`url(#${shapeId})`} opacity={0.9} />
            <circle
              cx={150}
              cy={150}
              r={100}
              fill="none"
              stroke={palette.ink}
              strokeWidth={3}
              opacity={0.55}
              strokeDasharray="10 8"
            />
            {placeGlyph(hero, 150, 150, 122, palette.ink, palette.a2, tilt)}
          </g>
        )
      default:
        return (
          <g>
            {series(4).map((index) => (
              <path
                key={`wave-${index}`}
                d={`M 0 ${196 + index * 34} Q 75 ${round(160 + index * 34 + u(80 + index) * 30)} 150 ${196 + index * 34} T ${ART_W} ${196 + index * 34} L ${ART_W} ${ART_H} L 0 ${ART_H} Z`}
                fill={index % 2 === 0 ? palette.a1 : palette.a2}
                opacity={0.22}
              />
            ))}
            {placeGlyph(hero, 88, 116, 88, palette.ink, palette.a1, tilt)}
            {placeGlyph(second, 196, 96, 68, palette.ink, palette.a2, -tilt)}
            {placeGlyph(hero, 232, 176, 54, palette.ink, palette.a2, tilt)}
          </g>
        )
    }
  })()

  return (
    <g>
      <Backdrop idKey={key} palette={palette} angle={round(70 + u(4) * 90)} />
      <defs>
        {linearGrad(shapeId, palette.a1, palette.a2, round(30 + u(6) * 140))}
        {radialGrad(glowId, palette.ink, palette.bg1, 0.4, 0)}
        {grainPattern(grainId, palette.ink, 0.06)}
      </defs>
      {radialGlow(glowId, 150, 140, 210, 0.7)}
      {body}
      {sparkles(key, u, 14, palette.ink, 400)}
      {starburst(`${key}-tw-0`, round(40 + u(90) * 40), round(60 + u(91) * 40), 14, palette.ink, 0.8)}
      {starburst(
        `${key}-tw-1`,
        round(210 + u(92) * 60),
        round(210 + u(93) * 40),
        10,
        palette.a1,
        0.75,
      )}
      {overlayRect(grainId, 0.7)}
    </g>
  )
}
