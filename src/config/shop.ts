// ─────────────────────────────────────────────────────────────────────────────
// Cake Palace — shop settings and contact details.
// This is the ONE place to change business rules. The admin Settings screen
// edits a copy of DEFAULT_SETTINGS (saved in this browser for the demo).
// TODO (database): load/save settings from the real API instead of localStorage.
// ─────────────────────────────────────────────────────────────────────────────
import type { ShopSettings } from '../types';
import { addDaysISO, todayISO } from '../lib/dates';

/**
 * PLACEHOLDER contact details — every value here must be replaced with the
 * real shop details before launch.
 */
export const SHOP = {
  name: 'Cake Palace',
  tagline: 'Freshly baked happiness for every Hyderabad celebration',
  phoneDisplay: '+91 90000 00000', // PLACEHOLDER phone
  phoneE164: '+919000000000', // PLACEHOLDER phone (for tel: links)
  whatsappDefault: '919000000000', // PLACEHOLDER WhatsApp (country code + number, digits only)
  address: 'Cake Palace, Road No. 12, Banjara Hills, Hyderabad 500034', // PLACEHOLDER address
  hours: '9:00 AM – 10:00 PM', // PLACEHOLDER opening hours
  instagram: '', // PLACEHOLDER — add the real Instagram handle URL
} as const;

export const SHOP_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SHOP.address);

/**
 * Placeholder images live in /public/images with fixed names:
 *   products/<slug>-1.svg, <slug>-2.svg, <slug>-3.svg
 *   categories/<category-id>.svg, site/hero.svg, site/custom-cake.svg
 * To use real photos, save them with the same base names (e.g. black-forest-1.jpg)
 * and change this extension. See README.
 */
export const PRODUCT_IMAGE_EXT = 'svg';

/**
 * Products that have REAL photos: slug → file extension. These load
 * /images/products/<slug>-1.<ext> instead of the SVG illustration.
 * To add one: save an 800×800 px photo (WebP or JPEG, under ~150 KB) as
 * public/images/products/<slug>-1.webp and add the slug here.
 */
/** Big photo at the top of Home (also preloaded for speed). */
export const HERO_IMAGE = '/images/products/black-forest-1.webp';
/** Photo on the About page and the "Custom cake" sections. */
export const FEATURE_IMAGE = '/images/products/chocolate-truffle-1.webp';
export const CUSTOM_CAKE_IMAGE = '/images/products/rasmalai-cake-1.webp';

/** Photo used for each category tile on Home (a product slug with a real photo). */
export const CATEGORY_PHOTOS: Record<string, string> = {
  cakes: 'red-velvet',
  pastries: 'belgian-chocolate-pastry',
  cupcakes: 'red-velvet-cupcake',
  'jar-cakes': 'tiramisu-jar',
  'dry-cakes-cookies': 'banana-walnut-loaf',
};

export const REAL_PHOTOS: Record<string, string> = {
  // Supplied by the owner
  'black-forest': 'webp',
  'chocolate-truffle': 'webp',
  'red-velvet': 'webp',
  'rasmalai-cake': 'webp',
  // Openly licensed stock photos — credited on /credits (src/data/photoCredits.ts).
  // Replace with photos of your own cakes when you can.
  'mango-delight': 'webp',
  'dutch-truffle': 'webp',
  'blueberry-cheesecake': 'webp',
  'coffee-mocha-cake': 'webp',
  'belgian-chocolate-pastry': 'webp',
  'black-forest-pastry': 'webp',
  'pineapple-pastry': 'webp',
  'red-velvet-pastry': 'webp',
  'blueberry-cheesecake-slice': 'webp',
  'red-velvet-cupcake': 'webp',
  'choco-chip-cupcake': 'webp',
  'vanilla-sprinkle-cupcake': 'webp',
  'tiramisu-jar': 'webp',
  'banana-walnut-loaf': 'webp',
  'fruit-rusk': 'webp',
};

export const DEFAULT_SETTINGS: ShopSettings = {
  timeSlots: [
    { id: '10-12', startHour: 10, endHour: 12, enabled: true },
    { id: '12-14', startHour: 12, endHour: 14, enabled: true },
    { id: '14-16', startHour: 14, endHour: 16, enabled: true },
    { id: '16-18', startHour: 16, endHour: 18, enabled: true },
    { id: '18-20', startHour: 18, endHour: 20, enabled: true },
    { id: '20-22', startHour: 20, endHour: 22, enabled: true },
  ],
  sameDayCutoff: '16:00',
  slotLeadMinutes: 120,
  customCakeNoticeDays: 2,
  advanceNoticeDays: 1,
  deliveryTiers: [
    { maxKm: 3, charge: 0 },
    { maxKm: 6, charge: 40 },
    { maxKm: 8, charge: 80 },
  ],
  ownDeliveryMaxKm: 8,
  partnerFlatCharge: 120, // sample — Porter/Rapido flat rate
  maxDeliveryKm: 15,
  freeDeliveryMin: 1500,
  partnerSuggestOrderValue: 3000,
  // Sample holiday: one upcoming date, worked out from today so the demo always has one.
  holidays: [addDaysISO(todayISO(), 6)],
  whatsappNumber: SHOP.whatsappDefault,
  egglessSurchargePerHalfKg: 50,
  egglessSurchargePerUnit: 10,
  bookingWindowDays: 14,
};

export const CAKE_MESSAGE_MAX = 30;
export const MAX_REFERENCE_IMAGES = 3;
