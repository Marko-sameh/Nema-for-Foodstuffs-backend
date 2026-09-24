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
export declare function normalizeSearchText(input?: string | null): string;
/**
 * Builds the normalised `search_text` value for a product from its bilingual
 * name/description fields plus brand.
 */
export declare function buildProductSearchText(fields: {
    name?: string | null;
    name_ar?: string | null;
    name_en?: string | null;
    brand?: string | null;
    description?: string | null;
}): string;
//# sourceMappingURL=arabic.d.ts.map