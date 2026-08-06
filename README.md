# KD Capitals — Brand Website

Single-page marketing site for KD Capitals, a loan advisory firm founded by CA & Ex-Banker Kinjal Shah.
Built for conversion with an audience that is often neither finance-literate nor especially tech-savvy:
plain language, large tap targets, one obvious action on every screen, and a bilingual EN / हिंदी toggle.

## Stack

React 18 · TypeScript (strict) · Vite 6 · Tailwind CSS 3.4 · Motion (Framer Motion) · Radix Slot · lucide-react · vite-plugin-svgr

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typechecks, then outputs to dist/
npm run preview
```

> The build was not run in the authoring environment (no npm registry access there).
> Run `npm install && npm run build` once locally — that is the real typecheck.

## Where to put your own details

Everything user-facing lives in two files. No component edits needed.

| What | Where |
|---|---|
| English copy | `src/i18n/en.ts` |
| Hindi copy | `src/i18n/hi.ts` |
| Phone, WhatsApp, email, address, socials | the `brand` block at the top of `src/i18n/en.ts` |
| Where the lead form POSTs | `VITE_LEAD_ENDPOINT` in `.env` (see `.env.example`) |

`src/i18n/types.ts` is the shared shape — TypeScript will error if EN and HI ever drift apart, so a
missing translation is caught at build time rather than in production.

## Before you launch

1. **Contact details.** `brand` in `src/i18n/en.ts` currently holds placeholders (`+91 98765 43210`,
   `hello@kdcapitals.in`). The same number is reused for the `tel:` link, the WhatsApp deep link and
   the footer.
2. **Lead endpoint.** Copy `.env.example` to `.env` and set `VITE_LEAD_ENDPOINT`. Until you do, form
   submissions are logged to the browser console and nothing is emailed anywhere.
3. **Founder photo.** `src/components/sections/why-us.tsx` renders a silhouette placeholder. Drop a
   portrait at `public/founder.jpg` and swap the placeholder `<svg>` for an `<img>`.
4. **Lender logos.** `src/components/ui/logo.tsx` → `LenderMark` renders neutral text wordmarks on
   purpose. Bank logos are trademarks; get the official SVGs from each institution's brand kit (and
   confirm you're permitted to display them) before replacing. `vite-plugin-svgr` is already wired up,
   so `import HDFC from "./hdfc.svg?react"` will work.
5. **Compliance.** The footer disclaimer states KD Capitals is an advisory firm, not a lender, and that
   case-study figures are indicative. Have someone confirm it matches how you're registered.
6. **Analytics.** No tracking is installed. Add GA4 / Meta Pixel in `index.html` and fire a conversion
   event in the `setStatus("done")` branch of `src/components/sections/contact.tsx`.

## Structure

```
src/
  i18n/            en.ts · hi.ts · types.ts · index.tsx (context + localStorage + <html lang>)
  components/
    motion/        reveal · number-ticker · marquee · tilt-card · backdrop (grid, growth line)
    ui/            button · card · badge · input · slider · logo · section-heading · language-toggle
    sections/      navbar · hero · services · why-not-banks · why-us · case-studies
                   testimonials · lenders · emi-calculator · social · contact · footer · mobile-cta
  lib/             utils.ts (cn, INR formatting, EMI math) · submit.ts (lead POST)
```

## Design system

- **Navy `#0A1F44`** carries authority and trust; **emerald `#0E9F6E`** is reserved for growth,
  savings and the primary action — never decorative. Off-white `#FAFAF8` base.
- Type: Plus Jakarta Sans (display) / Inter (body) / Noto Sans Devanagari (Hindi), all preconnected.
- Motion is deliberately restrained: reveal-on-scroll, one word-by-word headline, a marquee, a ±5°
  card tilt. Every animation respects `prefers-reduced-motion`.
- Money is always shown in Indian units — ₹1.25 Cr, ₹80 L, ₹12,34,567 — via `formatINRShort`.

## Conversion mechanics

- Sticky action bar on mobile below 600px scroll: call · WhatsApp · Check Eligibility.
- Floating WhatsApp button on desktop.
- The eligibility form is three short steps (type → amount & income → contact) rather than one long
  form, and every step is answerable with taps except the final name/phone.
- Ten-digit Indian mobile validation, explicit consent checkbox, WhatsApp fallback on every screen.
- The EMI calculator is a genuine utility that ends in a CTA ("Get a better rate than this").
