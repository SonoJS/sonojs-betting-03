/**
 * GameArtwork — the single deterministic artwork component (05 §20, 06 §10).
 *
 * - inline SVG, fixed 3:4 canvas (landscape cards crop via container);
 * - `game.category` selects the family, `hashString(game.id) % 6` the variant;
 * - Noxa facet/prism palettes are local constants (outside Theme Studio).
 */

import { useId, type ReactElement } from 'react'
import type { Game, GameCategory } from '@/data/types'
import {
  ArtSvg,
  type ArtContext,
  ProviderMark,
  TitleBlock,
  buildContext,
  sanitizeId,
} from './primitives'
import {
  EXCLUSIVE_PALETTES,
  LIVE_PALETTES,
  ORIGINALS_PALETTES,
  SLOTS_PALETTES,
  type Palette,
} from './palettes'
import { renderOriginals } from './families/originals'
import { renderSlots } from './families/slots'
import { renderLive } from './families/live'
import { renderExclusive } from './families/exclusive'
import { FallbackArtwork } from './fallback'

export type GameArtworkProps = {
  game: Game
  className?: string
  /** Overrides the accessible label and the rendered title text. */
  title?: string
  /** Set false for small thumbnails (< ~80px) where the baked-in title would be illegible. */
  showTitle?: boolean
}

type Family = {
  palettes: readonly Palette[]
  render: (ctx: ArtContext, gameId: string) => ReactElement
}

const FAMILIES: Record<GameCategory, Family> = {
  originals: { palettes: ORIGINALS_PALETTES, render: renderOriginals },
  slots: { palettes: SLOTS_PALETTES, render: (ctx) => renderSlots(ctx) },
  live: { palettes: LIVE_PALETTES, render: (ctx) => renderLive(ctx) },
  exclusive: { palettes: EXCLUSIVE_PALETTES, render: (ctx) => renderExclusive(ctx) },
}

export function GameArtwork({ game, className, title, showTitle = true }: GameArtworkProps): ReactElement {
  // Same game can appear in several rails on one page: suffix gradient/pattern ids per instance
  // so the DOM stays valid. Visual output is unaffected (ids are not part of the composition).
  const instanceKey = useId()
  const label = (title ?? game?.title ?? '').trim()
  const gameId = typeof game?.id === 'string' ? game.id : ''
  const family: Family | undefined = game ? FAMILIES[game.category] : undefined

  if (!gameId || !label || !family) {
    return (
      <FallbackArtwork
        title={label || 'Game'}
        className={className}
        idKey={sanitizeId(gameId) || 'unknown'}
      />
    )
  }

  const ctx = buildContext(gameId, label, game.providerId ?? '', family.palettes, 6, instanceKey)

  return (
    <ArtSvg label={label} className={className}>
      {family.render(ctx, gameId)}
      <ProviderMark providerId={ctx.providerId} ink={ctx.palette.ink} />
      {showTitle && <TitleBlock idKey={ctx.key} title={label} ink="#FFFFFF" />}
    </ArtSvg>
  )
}
