# Cake Palace — online ordering (v1, front end only)

This is the first version of the Cake Palace website: customers in Hyderabad can browse the menu, choose cake options, add to cart, pick pickup or delivery with a date and time slot, "pay" and track their order. There's also a custom-cake request form, a shop admin area and a simple screen for delivery staff.

**Everything runs in the browser on sample data.** There is no real login, database, payment or WhatsApp/SMS sending yet — those places are marked with mock labels on screen and `TODO` comments in the code.

## Run it on your computer

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

| Page | Address |
| --- | --- |
| Home | `/` |
| Menu | `/menu` |
| Product | `/product/black-forest` (any item's slug) |
| Custom cake request | `/custom-cake` |
| Cart / Checkout | `/cart`, `/checkout` |
| Order confirmed | `/order/CP-10246` |
| My orders / tracking | `/orders` |
| Custom-cake quote | `/quote/CR-1002` |
| Admin – orders board | `/admin` |
| Admin – order detail | `/admin/orders/CP-10251` |
| Admin – custom requests | `/admin/custom`, `/admin/custom/CR-1001` |
| Admin – menu, settings, daily summary | `/admin/menu`, `/admin/settings`, `/admin/summary` |
| Delivery person | `/delivery` |

**Demo tip:** open the customer site in one tab and `/admin` in another. Orders you place show up on the admin board straight away (the demo data is shared through the browser's storage). To start again, use **Admin → Settings → Reset demo data**.

## Build

```bash
npm run build     # type-checks, then builds into ./dist
npm run preview   # serves the built site locally
```

## Deploy to Cloudflare Workers

The site is served as static files by Cloudflare Workers ([Static Assets](https://developers.cloudflare.com/workers/static-assets/)); see `wrangler.jsonc`. Unknown paths fall back to `index.html` so links like `/admin` or `/order/CP-10260` work.

```bash
npx wrangler login    # once, opens your browser to sign in to Cloudflare
npm run deploy        # builds, then uploads to the "cake-palace" Worker
```

Wrangler prints the live URL (e.g. `https://cake-palace.<your-subdomain>.workers.dev`). Add a custom domain in the Cloudflare dashboard.

## Where to change things

| What | File |
| --- | --- |
| Shop name, phone, WhatsApp, address, hours (**placeholders**) | `src/config/shop.ts` → `SHOP` |
| Business rules: time slots, same-day cut-off (4 PM), custom-cake notice (2 days), delivery charges, free-delivery minimum, max distance, holidays, eggless surcharge | `src/config/shop.ts` → `DEFAULT_SETTINGS` |
| Menu items, prices, categories | `src/data/menu.ts` |
| Mock pincode → distance table | `src/data/pincodes.ts` |
| Sample orders / custom requests | `src/data/orders.ts`, `src/data/customRequests.ts` |
| Delivery staff | `src/data/people.ts` |
| Sample reviews (**not real**) | `src/data/reviews.ts` |
| Colours and font | top of `src/styles/global.css` (`--brown`, `--pink`, `--font`) |

The admin Settings and Menu screens change a copy stored in that browser only; edit the files above to change the defaults for everyone.

### Photos

Placeholder illustrations live in `public/images` with fixed names:

- `public/images/products/<slug>-1.svg`, `-2.svg`, `-3.svg` (1 is the main photo)
- `public/images/categories/<category>.svg`, `public/images/site/hero.svg`, `public/images/site/custom-cake.svg`

To use real photos, save them with the same base names (e.g. `black-forest-1.jpg`) and change `PRODUCT_IMAGE_EXT` in `src/config/shop.ts` to `'jpg'`. Square photos about 1200×1200 px, compressed to under 200 KB, work best. `npm run images` regenerates the placeholders.

## How the code is organised

- `src/services/api.ts` — **the only place screens get or change data.** Every function returns a Promise. To connect a real backend, rewrite these functions to call your API; the screens don't change. `src/services/demoStore.ts` is the in-browser stand-in and can then be deleted.
- `src/lib/rules.ts` — pricing, dates/slots, delivery charge and status-flow rules (all driven by settings).
- `src/pages` — customer screens. `src/admin` and `src/delivery` — staff screens, loaded separately so customers never download them.
- Cart and "orders placed in this browser" are saved in `localStorage`.

Search the code for `TODO` to find every integration point (login, database, Razorpay, WhatsApp, SMS, maps, photo storage, Porter/Rapido).

## Before launch checklist

- [ ] Real product photos in `public/images` (same file names)
- [ ] Real phone, WhatsApp number, address, hours and Instagram in `src/config/shop.ts`
- [ ] Remove or replace the sample reviews (`src/data/reviews.ts` and the Home page section)
- [ ] Replace the sample menu, prices and delivery-distance table with real ones
- [ ] Phone OTP login for customers
- [ ] Database + API for menu, orders, custom requests and settings (replace `src/services/api.ts` internals)
- [ ] Razorpay: create orders and verify payment signatures on the server; refunds via the Razorpay API
- [ ] WhatsApp Business API alerts to the shop and customers (SMS fallback)
- [ ] Real distance from the customer's address (maps API) instead of the pincode table
- [ ] Upload custom-cake reference photos to storage (e.g. Cloudflare R2)
- [ ] **Protect `/admin` (owner only) and `/delivery` (delivery staff only)** with login and server-side checks, and remove the "Demo mode" banners
- [ ] Re-check all ordering rules (prices, dates, slots, delivery charges) on the server
- [ ] Keep secrets out of git: copy `.env.example` to `.env` locally and use `npx wrangler secret put` for Worker secrets
