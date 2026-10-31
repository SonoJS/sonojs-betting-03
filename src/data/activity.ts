// Activity feed — 24 static rows (docs/03 §20.4): regular 12 · high-win 6 · lucky-win 6.
// Live Wins uses the first 12; Recent Activity filters all 24 by type.
// payout = wager × multiplier (rounded to 2 decimals).

import type { ActivityItem, ActivityType } from './types'

export const activity: ActivityItem[] = [
  { id: 'act-01', gameId: 'orig-crash', playerLabel: 'm***7', wager: 25, multiplier: 2.4, payout: 60, type: 'regular' },
  { id: 'act-02', gameId: 'slot-neon-rush', playerLabel: 'ak***2', wager: 480, multiplier: 12.5, payout: 6000, type: 'high-win' },
  { id: 'act-03', gameId: 'live-blackjack', playerLabel: 'j***9', wager: 50, multiplier: 2, payout: 100, type: 'regular' },
  { id: 'act-04', gameId: 'orig-plinko', playerLabel: 'zo***4', wager: 5, multiplier: 88, payout: 440, type: 'lucky-win' },
  { id: 'act-05', gameId: 'slot-scarab-vault', playerLabel: 'ra***1', wager: 12, multiplier: 3.5, payout: 42, type: 'regular' },
  { id: 'act-06', gameId: 'orig-mines', playerLabel: 't***3', wager: 8, multiplier: 1.8, payout: 14.4, type: 'regular' },
  { id: 'act-07', gameId: 'slot-titan-reels', playerLabel: 'ne***8', wager: 250, multiplier: 18.4, payout: 4600, type: 'high-win' },
  { id: 'act-08', gameId: 'live-roulette', playerLabel: 'vi***6', wager: 40, multiplier: 2, payout: 80, type: 'regular' },
  { id: 'act-09', gameId: 'orig-limbo', playerLabel: 'kx***0', wager: 3, multiplier: 240, payout: 720, type: 'lucky-win' },
  { id: 'act-10', gameId: 'slot-hyper-fruits', playerLabel: 'd***5', wager: 15, multiplier: 2.6, payout: 39, type: 'regular' },
  { id: 'act-11', gameId: 'excl-obsidian-crown', playerLabel: 'mo***2', wager: 500, multiplier: 9.6, payout: 4800, type: 'high-win' },
  { id: 'act-12', gameId: 'orig-dice', playerLabel: 'sa***7', wager: 6, multiplier: 62.5, payout: 375, type: 'lucky-win' },

  { id: 'act-13', gameId: 'slot-jade-tiger', playerLabel: 'lu***4', wager: 20, multiplier: 1.9, payout: 38, type: 'regular' },
  { id: 'act-14', gameId: 'orig-keno', playerLabel: 'p***8', wager: 10, multiplier: 4.2, payout: 42, type: 'regular' },
  { id: 'act-15', gameId: 'live-crazy-wheel', playerLabel: 'ge***3', wager: 120, multiplier: 30, payout: 3600, type: 'high-win' },
  { id: 'act-16', gameId: 'orig-mines', playerLabel: 'br***9', wager: 4, multiplier: 125, payout: 500, type: 'lucky-win' },
  { id: 'act-17', gameId: 'slot-ruby-express', playerLabel: 'ci***1', wager: 18, multiplier: 2.2, payout: 39.6, type: 'regular' },
  { id: 'act-18', gameId: 'slot-starfall-reels', playerLabel: 'ha***5', wager: 300, multiplier: 14.8, payout: 4440, type: 'high-win' },
  { id: 'act-19', gameId: 'live-baccarat', playerLabel: 'n***2', wager: 60, multiplier: 1.9, payout: 114, type: 'regular' },
  { id: 'act-20', gameId: 'orig-crash', playerLabel: 'to***6', wager: 8, multiplier: 96.5, payout: 772, type: 'lucky-win' },
  { id: 'act-21', gameId: 'slot-frostfang-ridge', playerLabel: 'el***7', wager: 22, multiplier: 3.1, payout: 68.2, type: 'regular' },
  { id: 'act-22', gameId: 'excl-quantum-heist', playerLabel: 'va***0', wager: 400, multiplier: 7.5, payout: 3000, type: 'high-win' },
  { id: 'act-23', gameId: 'orig-hilo', playerLabel: 'ry***4', wager: 14, multiplier: 2.8, payout: 39.2, type: 'regular' },
  { id: 'act-24', gameId: 'slot-candy-cyclone', playerLabel: 'om***3', wager: 2, multiplier: 310, payout: 620, type: 'lucky-win' },
]

/** Live Wins strip — the first 12 rows (docs/03 §20.4). */
export const getLiveWins = (): ActivityItem[] => activity.slice(0, 12)

/** Recent Activity tabs — All / High Wins / Lucky Wins. */
export const filterActivity = (type: 'all' | ActivityType): ActivityItem[] =>
  type === 'all' ? activity : activity.filter((item) => item.type === type)
