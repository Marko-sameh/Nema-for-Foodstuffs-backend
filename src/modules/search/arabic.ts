/**
 * Normalisation helper used both when populating `Product.search_text` and when
 * normalising incoming search queries, so that `contains` matching is diacritic/
 * letter-variant insensitive for Arabic (and safe/no-op for Latin) text.
 *
 * Steps:
 *  - lowercase
 *  - strip Arabic diacritics (harakat) and the tatweel (kashida) character
 *  - unify letter variants: أ/إ/آ -> ا, ة -> ه, ى -> ي
 *  - collapse consecutive whitespace into a single space and trim
 */
export function normalizeSearchText(input?: string | null): string {
  if (!input) return '';

  let text = input.toLowerCase();

  // Strip Arabic diacritics (U+0610-U+061A, U+064B-U+065F, U+0670) and tatweel (U+0640)
  text = text.replace(/[\u0610-\u061A\u064B-\u065F\u0670\u0640]/g, '');

  // Unify letter variants
  text = text
    .replace(/[أإآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي');

  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

/**
 * Builds the normalised `search_text` value for a product from its bilingual
 * name/description fields plus brand.
 */
export function buildProductSearchText(fields: {
  name?: string | null;
  name_ar?: string | null;
  name_en?: string | null;
  brand?: string | null;
  description?: string | null;
}): string {
  const parts = [fields.name, fields.name_ar, fields.name_en, fields.brand, fields.description]
    .filter((p): p is string => Boolean(p && p.trim().length));

  return normalizeSearchText(parts.join(' '));
}
