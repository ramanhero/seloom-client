# Bloom & Wolf Replica

A pixel-perfect replica of the luxury Dutch silk floral design store [Bloom & Wolf](https://www.bloomandwolf.com/eu/en).

## Features
- **Editorial Design & Typography**: Custom serif headlines (`Playfair Display` / `TimesNow`), grotesque modern body typography, and authentic brand color palettes (`#364f1b`, `#EFEEDA`, `#853e25`).
- **Complete Vector Icon Library**: 45 original SVG icons and brand marks rendered via inline SVG symbols.
- **Product Catalog (29 Bouquets)**: Full product dataset extracted with high-res photography, pricing, stock statuses, dimensions, and floral descriptions.
- **Interactive Cart Drawer**:
  - Sliding right drawer with backdrop blur
  - Live item counter badge on the navbar shopping bag icon
  - Free delivery threshold meter (€75 EU threshold)
  - Stepper quantity controls `[-]` `[+]` & item removal
  - Subtotal calculation & simulated checkout modal
- **Pages Replicated**:
  - Homepage (`/` & `/eu/en`)
  - All Bouquets Catalog (`/eu/en/category/silk-bouquets`) with filters
  - Product Detail Pages (`/eu/en/products/:handle`) with vase toggles & buy/rent selectors
  - Business Subscriptions (`/eu/en/for-business`)
  - Mission & Story (`/eu/en/about-us`)
  - FAQ (`/eu/en/support/faq`) with interactive accordions
  - Lookbook Editorial (`/eu/en/lookbook`)
  - Contact Studio (`/eu/en/support/contact`)
  - Terms of Service & Privacy Policy

## Running the Server
```bash
# Start server (automatically frees port 3003 if occupied)
npm start
# or
node server.js
```
The store is live at [http://localhost:3003](http://localhost:3003) and [http://localhost:3003/eu/en](http://localhost:3003/eu/en).
