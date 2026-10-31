/** Small stable string hash (FNV-1a 32-bit). Deterministic across sessions and concepts. */
export function hashString(input: string): number {
  let hash = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return hash >>> 0
}

/** Deterministic pseudo-random in [0, 1) derived from a seed string and a salt. */
export function seededUnit(seed: string, salt = 0): number {
  return (hashString(`${seed}:${salt}`) % 10000) / 10000
}
