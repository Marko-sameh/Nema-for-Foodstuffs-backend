// Shared slugify utility wrapping the slugify package
import _slugify from 'slugify';

export const createSlug = (text: string): string => {
  return _slugify(text, { lower: true, strict: true, trim: true });
};

export const createUniqueSlug = (text: string): string => {
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${createSlug(text)}-${suffix}`;
};
