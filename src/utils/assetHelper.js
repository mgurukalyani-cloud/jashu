/**
 * Helper to resolve assets accurately in both local dev ('/')
 * and GitHub Pages production ('/jashu/').
 */
export const BASE_URL = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export const asset = (path) => {
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('data:')) return path;
  const clean = path.replace(/^\.?\//, '');
  return `${BASE_URL}/${clean}`;
};
