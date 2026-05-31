const KEYWORD_SPLIT_PATTERN = /[、,，/／\s\n]+/;
const MAX_KEYWORDS = 5;
const MAX_CJK_KEYWORD_LENGTH = 6;
const MAX_LATIN_KEYWORD_LENGTH = 18;

function hasLatinText(value: string) {
  return /[A-Za-z]/.test(value);
}

function trimKeyword(value: unknown) {
  const text = String(value ?? "")
    .trim()
    .replace(/^["'「『]|["'」』]$/g, "")
    .trim();

  const maxLength = hasLatinText(text) ? MAX_LATIN_KEYWORD_LENGTH : MAX_CJK_KEYWORD_LENGTH;
  return Array.from(text).slice(0, maxLength).join("");
}

export function normalizeKeywords(
  source: { keyword?: unknown; keywords?: unknown } | null | undefined,
  fallback: string[] = [],
) {
  const rawKeywords = Array.isArray(source?.keywords)
    ? source.keywords
    : typeof source?.keyword === "string"
      ? source.keyword.split(KEYWORD_SPLIT_PATTERN)
      : fallback;

  return pickRandomKeywords(rawKeywords, MAX_KEYWORDS);
}

export function pickRandomKeywords(keywords: unknown[], max = MAX_KEYWORDS) {
  const uniqueKeywords = Array.from(
    new Set(
      keywords
        .map(trimKeyword)
        .filter(Boolean),
    ),
  );

  if (uniqueKeywords.length <= max) return uniqueKeywords;

  const shuffled = [...uniqueKeywords];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, max);
}

export function keywordsToText(keywords: string[]) {
  return keywords.some(hasLatinText) ? keywords.join(", ") : keywords.join("、");
}
