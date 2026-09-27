const PUNCTUATION = /[.,;:!?—–"'’]/g;

/** Normalises a word for accent matching ("core." → "core"). */
export function bareWord(word: string) {
  return word.replace(PUNCTUATION, "").toLowerCase();
}

/** Returns a predicate that tells whether a word should take the serif accent. */
export function accentMatcher(accent: string[] = []) {
  const set = new Set(accent.map(bareWord));
  return (word: string) => set.has(bareWord(word));
}
