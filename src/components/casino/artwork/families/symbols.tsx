/**
 * Noxa Originals glyphs — angular prism / constellation language
 * (distinct from Klyra hex marks and Velora soft orbs).
 *
 * Every glyph is drawn inside a 100 × 100 box centred on (50, 50).
 */

import type { ReactElement } from 'react'
import { series } from '../primitives'

export type Glyph = (stroke: string, fill: string) => ReactElement

const crash: Glyph = (stroke, fill) => (
  <g>
    <path d="M 10 86 L 42 62 L 58 34" fill="none" stroke={stroke} strokeWidth={5} strokeLinejoin="round" opacity={0.8} />
    <path d="M 54 40 L 78 8 L 90 42 L 70 52 Z" fill={fill} stroke={stroke} strokeWidth={2.5} strokeLinejoin="round" />
    <path d="M 70 20 L 82 28" stroke={stroke} strokeWidth={3} opacity={0.7} />
  </g>
)

const mines: Glyph = (stroke, fill) => (
  <g>
    {series(9).map((index) => {
      const col = index % 3
      const row = Math.floor(index / 3)
      const open = index === 4
      return (
        <rect
          key={`mine-${index}`}
          x={12 + col * 27}
          y={12 + row * 27}
          width={22}
          height={22}
          rx={5}
          fill={open ? fill : 'none'}
          stroke={stroke}
          strokeWidth={open ? 0 : 3.4}
          opacity={open ? 1 : 0.7}
        />
      )
    })}
    <circle cx={50} cy={50} r={6.5} fill={stroke} />
  </g>
)

const plinko: Glyph = (stroke, fill) => (
  <g>
    {series(4).map((row) =>
      series(row + 1).map((col) => (
        <circle
          key={`peg-${row}-${col}`}
          cx={50 - row * 11 + col * 22}
          cy={18 + row * 20}
          r={5}
          fill={row === 3 ? fill : stroke}
          opacity={row === 3 ? 1 : 0.8}
        />
      )),
    )}
  </g>
)

const dice: Glyph = (stroke, fill) => (
  <g>
    <rect x={14} y={14} width={72} height={72} rx={16} fill={fill} opacity={0.92} />
    {[
      [32, 32],
      [68, 32],
      [50, 50],
      [32, 68],
      [68, 68],
    ].map(([cx, cy], index) => (
      <circle key={`pip-${index}`} cx={cx} cy={cy} r={6.4} fill={stroke} />
    ))}
  </g>
)

const limbo: Glyph = (stroke, fill) => (
  <g>
    <path d="M 14 84 L 36 52 L 50 28 L 64 52 L 86 84" fill="none" stroke={stroke} strokeWidth={5} strokeLinejoin="round" opacity={0.75} />
    <path d="M 50 18 L 62 48 L 50 40 L 38 48 Z" fill={fill} />
    <rect x={44} y={78} width={12} height={8} rx={1} fill={stroke} />
  </g>
)

const keno: Glyph = (stroke, fill) => (
  <g>
    {series(9).map((index) => {
      const col = index % 3
      const row = Math.floor(index / 3)
      const hit = index === 1 || index === 5 || index === 6
      return (
        <g key={`keno-${index}`}>
          <circle
            cx={22 + col * 28}
            cy={22 + row * 28}
            r={11}
            fill={hit ? fill : 'none'}
            stroke={stroke}
            strokeWidth={hit ? 0 : 3.2}
            opacity={hit ? 1 : 0.68}
          />
          {hit ? (
            <circle cx={22 + col * 28} cy={22 + row * 28} r={4} fill={stroke} opacity={0.9} />
          ) : null}
        </g>
      )
    })}
  </g>
)

const hilo: Glyph = (stroke, fill) => (
  <g>
    <rect x={26} y={16} width={48} height={68} rx={8} fill={fill} opacity={0.94} />
    <path d="M 50 30 L 62 46 L 38 46 Z" fill={stroke} />
    <path d="M 50 70 L 38 54 L 62 54 Z" fill={stroke} opacity={0.5} />
  </g>
)

const tower: Glyph = (stroke, fill) => (
  <g>
    {series(4).map((index) => (
      <rect
        key={`block-${index}`}
        x={22 + index * 3}
        y={74 - index * 18}
        width={56 - index * 6}
        height={14}
        rx={4}
        fill={index === 3 ? fill : stroke}
        opacity={index === 3 ? 1 : 0.55 + index * 0.12}
      />
    ))}
  </g>
)

const wheel: Glyph = (stroke, fill) => (
  <g>
    <circle cx={50} cy={50} r={36} fill="none" stroke={stroke} strokeWidth={4} opacity={0.8} />
    {series(8).map((index) => {
      const a0 = (index * Math.PI) / 4
      const a1 = a0 + Math.PI / 4
      const x0 = 50 + Math.cos(a0) * 32
      const y0 = 50 + Math.sin(a0) * 32
      const x1 = 50 + Math.cos(a1) * 32
      const y1 = 50 + Math.sin(a1) * 32
      return index % 2 === 0 ? (
        <path
          key={`seg-${index}`}
          d={`M 50 50 L ${x0.toFixed(2)} ${y0.toFixed(2)} A 32 32 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`}
          fill={fill}
          opacity={0.85}
        />
      ) : null
    })}
    <circle cx={50} cy={50} r={7} fill={stroke} />
  </g>
)

const coin: Glyph = (stroke, fill) => (
  <g>
    <circle cx={50} cy={50} r={34} fill={fill} opacity={0.92} />
    <circle cx={50} cy={50} r={25} fill="none" stroke={stroke} strokeWidth={4} opacity={0.8} />
    <path d="M 50 32 L 50 68" stroke={stroke} strokeWidth={5} strokeLinecap="round" />
  </g>
)

const cards: Glyph = (stroke, fill) => (
  <g>
    <rect
      x={18}
      y={26}
      width={40}
      height={56}
      rx={7}
      fill={stroke}
      opacity={0.55}
      transform="rotate(-12 38 54)"
    />
    <rect x={42} y={20} width={42} height={58} rx={7} fill={fill} transform="rotate(9 63 49)" />
    <path d="M 63 36 L 72 48 L 63 60 L 54 48 Z" fill={stroke} opacity={0.85} />
  </g>
)

const roulette: Glyph = (stroke, fill) => (
  <g>
    <circle cx={50} cy={50} r={36} fill="none" stroke={stroke} strokeWidth={5} opacity={0.8} />
    <circle cx={50} cy={50} r={20} fill={fill} opacity={0.8} />
    {series(6).map((index) => {
      const angle = (index * Math.PI) / 3
      return (
        <path
          key={`spoke-${index}`}
          d={`M 50 50 L ${(50 + Math.cos(angle) * 34).toFixed(2)} ${(50 + Math.sin(angle) * 34).toFixed(2)}`}
          stroke={stroke}
          strokeWidth={3}
          opacity={0.6}
        />
      )
    })}
    <circle cx={50} cy={18} r={5.5} fill={stroke} />
  </g>
)

const GLYPHS: Record<string, Glyph> = {
  crash,
  mines,
  plinko,
  dice,
  limbo,
  keno,
  hilo,
  tower,
  wheel,
  coin,
  cards,
  roulette,
}

/** Keyword → glyph, matched against the game id (05 §20: symbol follows the game). */
const KEYWORDS: readonly (readonly [string, string])[] = [
  ['crash', 'crash'],
  ['rocket', 'crash'],
  ['mine', 'mines'],
  ['plinko', 'plinko'],
  ['dice', 'dice'],
  ['limbo', 'limbo'],
  ['keno', 'keno'],
  ['hilo', 'hilo'],
  ['hi-lo', 'hilo'],
  ['tower', 'tower'],
  ['stair', 'tower'],
  ['wheel', 'wheel'],
  ['coin', 'coin'],
  ['flip', 'coin'],
  ['blackjack', 'cards'],
  ['baccarat', 'cards'],
  ['poker', 'cards'],
  ['card', 'cards'],
  ['roulette', 'roulette'],
]

const ORDER: readonly string[] = [
  'crash',
  'mines',
  'plinko',
  'dice',
  'limbo',
  'keno',
  'hilo',
  'tower',
  'wheel',
  'coin',
  'cards',
  'roulette',
]

/** Pick a glyph by id keyword, falling back to a deterministic hash choice. */
export function glyphFor(gameId: string, hashPick: number): Glyph {
  const needle = gameId.toLowerCase()
  for (const [keyword, name] of KEYWORDS) {
    if (needle.includes(keyword)) return GLYPHS[name]
  }
  return GLYPHS[ORDER[hashPick % ORDER.length]]
}

/** Place a glyph inside the 300 × 400 artwork canvas. */
export function placeGlyph(
  glyph: Glyph,
  x: number,
  y: number,
  size: number,
  stroke: string,
  fill: string,
  rotateDeg = 0,
  opacity = 1,
): ReactElement {
  const scale = size / 100
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotateDeg}) scale(${scale.toFixed(3)}) translate(-50 -50)`}
      opacity={opacity}
    >
      {glyph(stroke, fill)}
    </g>
  )
}
