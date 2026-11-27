import { CATEGORY_PHOTOS, PRODUCT_IMAGE_EXT, REAL_PHOTOS } from '../config/shop';
import type { CategoryId } from '../types';

/** /images/products/<slug>-<n>.<ext> — see the naming scheme in src/config/shop.ts. */
export function productImage(slug: string, n = 1): string {
  const ext = n === 1 && REAL_PHOTOS[slug] ? REAL_PHOTOS[slug] : PRODUCT_IMAGE_EXT;
  return `/images/products/${slug}-${n}.${ext}`;
}

/** Real photo available? (Products with one show just that photo, not illustrations.) */
export function hasRealPhoto(slug: string): boolean {
  return Boolean(REAL_PHOTOS[slug]);
}

export const PLACEHOLDER_IMAGE = '/images/products/placeholder.svg';

export function categoryImage(id: CategoryId): string {
  const slug = CATEGORY_PHOTOS[id];
  return slug && REAL_PHOTOS[slug] ? productImage(slug) : `/images/categories/${id}.svg`;
}

/** wa.me link with a pre-filled message. Number = country code + digits, e.g. 919000000000. */
export function whatsappLink(number: string, text: string): string {
  return `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

export function mapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
