const fs = require('fs');
const path = require('path');

const menCatalog = JSON.parse(fs.readFileSync('catalog_men.json', 'utf8'));
const womenCatalog = JSON.parse(fs.readFileSync('catalog_women.json', 'utf8'));
const trousersCatalog = JSON.parse(fs.readFileSync('catalog_trousers.json', 'utf8'));

// Extract header and footer template from raw_silk_bouquets.html or views/header.html
const rawBouquets = fs.readFileSync('raw_silk_bouquets.html', 'utf8');

// Get the master header HTML from views/header.html
const masterHeader = fs.readFileSync('views/header.html', 'utf8');
const cartDrawer = fs.readFileSync('views/cart_drawer.html', 'utf8');

// Extract SVG definitions from rawBouquets
const svgDefs = rawBouquets.match(/<svg[^>]*class="SvgDefinitions-module-scss-module__o7KxXW__container"[\s\S]*?<\/svg>/)?.[0] || '';

// Extract Footer from rawBouquets
const footerHtml = rawBouquets.match(/<footer[\s\S]*?<\/footer>/)?.[0] || '';

function generatePlpCards(products) {
  return products.map(p => `
    <li class="plp-grid-card" data-category="${p.gender}" style="list-style: none; position: relative; background: #000000; border: 1px solid #1c1c1c; border-radius: 8px; padding: 12px; transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;">
      <a href="${p.url}" style="display: block; width: 100%; text-decoration: none; color: inherit;">
        <div class="product-card-image-wrap">
          <span style="position: absolute; top: 10px; right: 10px; z-index: 10; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 7px; border-radius: 2px;">${p.tag}</span>
          <img src="${p.heroImage}" alt="${p.name}" class="product-primary-img" loading="lazy">
          <img src="${p.detailImage}" alt="${p.name} - Hover Alternate Angle" class="product-hover-img" loading="lazy">
        </div>
        <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <div>
            <h3 style="font-family: var(--font-graphik); font-size: 13.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #ffffff; margin: 0 0 4px 0;">${p.name}</h3>
            <p style="font-size: 12px; color: #888888; margin: 0;">${p.dimensions}</p>
          </div>
          <span style="font-family: var(--font-graphik); font-size: 14px; font-weight: 800; color: #ffffff; white-space: nowrap;">€${p.price},-</span>
        </div>
      </a>
      <div style="margin-top: 12px; display: flex; gap: 8px;">
        <button type="button" class="quick-add-btn" style="flex: 1; padding: 9px 12px; font-family: var(--font-graphik); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; background: #ffffff; color: #000000; border: none; border-radius: 3px; cursor: pointer; transition: background 0.2s ease, transform 0.1s ease;" onclick="event.preventDefault(); addToCart({id:'${p.id}', name:'${p.name.replace(/'/g, "\\'")}', price:${p.price}, image:'${p.heroImage}', variant:'Default'});">+ Add to Bag</button>
      </div>
    </li>
  `).join('\n');
}

function buildPlpPage({ title, heading, subtitle, heroBanner, filterTabs, products }) {
  const cardsHtml = generatePlpCards(products);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bloom &amp; Wolf | ${title}</title>
  <link rel="stylesheet" href="/_next/static/css/8061dbd15585f67b.css">
  <link rel="stylesheet" href="/_next/static/css/ffc7ae70f7cfc8cf.css">
  <link rel="stylesheet" href="/_next/static/css/b0ca190c76b92a2a.css">
  <link rel="stylesheet" href="/_next/static/css/3860bb7b6070eb3e.css">
  <link rel="stylesheet" href="/css/custom.css">
</head>
<body class="Theme-module-scss-module__o4UHcq__container" style="--theme-background:0 0 0;--theme-text:var(--color-black); background-color: #000000; color: #ffffff;">

  <!-- SVGs -->
  ${svgDefs}

  <!-- Header -->
  ${masterHeader}

  <!-- PLP Hero Banner (Category specific) -->
  <div style="position: relative; width: 100%; height: 380px; overflow: hidden; background: #080808; border-bottom: 1px solid #1a1a1a;">
    <img src="${heroBanner}" alt="${heading}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.72; filter: brightness(0.85);">
    <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%);"></div>
    <div style="position: absolute; bottom: 36px; left: 0; right: 0; max-width: 1440px; margin: 0 auto; padding: 0 24px; box-sizing: border-box;">
      <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; border-radius: 2px; margin-bottom: 12px;">CURATED COLLECTION</span>
      <h1 style="font-family: var(--font-graphik); font-size: 38px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; margin: 0 0 10px 0; color: #ffffff;">${heading}</h1>
      <p style="font-size: 15px; color: #cccccc; max-width: 720px; margin: 0; line-height: 1.5;">${subtitle}</p>
    </div>
  </div>

  <!-- Filter & Count Bar -->
  <div style="border-bottom: 1px solid #1f1f1f; background: #050505; position: sticky; top: 106px; z-index: 100;">
    <div style="max-width: 1440px; margin: 0 auto; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        ${filterTabs.map((tab, idx) => `
          <button type="button" class="quick-add-btn" style="background: ${idx === 0 ? '#ffffff' : '#141414'}; color: ${idx === 0 ? '#000000' : '#ffffff'}; border: 1px solid ${idx === 0 ? '#ffffff' : '#262626'}; font-size: 11px; padding: 6px 14px; border-radius: 20px;">${tab}</button>
        `).join('')}
      </div>
      <span style="font-family: var(--font-graphik); font-size: 12px; font-weight: 700; color: #888888; text-transform: uppercase; letter-spacing: 0.06em;">Showing ${products.length} Products</span>
    </div>
  </div>

  <!-- Product Grid -->
  <main style="max-width: 1440px; margin: 0 auto; padding: 40px 24px 100px 24px; box-sizing: border-box;">
    <ul id="plp-products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 28px; padding: 0; margin: 0;">
      ${cardsHtml}
    </ul>
  </main>

  <!-- Footer -->
  ${footerHtml}

  <!-- Cart Drawer -->
  ${cartDrawer}

  <!-- Store JS -->
  <script src="/js/store.js"></script>
</body>
</html>`;
}

// 1. Build Men's Collection (views/category_single_flowers.html)
console.log('Building Men\'s Collection page (views/category_single_flowers.html)...');
const mensPageHtml = buildPlpPage({
  title: "Men's Collection | Pure European Linen & Organic Cotton",
  heading: "Men's Collection",
  subtitle: "Consciously crafted menswear featuring breathable linen shirts, mandarin kurtas, relaxed cotton t-shirts, and tailored chinos designed for effortless everyday luxury.",
  heroBanner: "https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Mens-DESKTOP_jpg.jpg",
  filterTabs: ["All Men's", "Linen Shirts", "Mandarin Kurtas", "Organic T-Shirts", "Chinos & Trousers"],
  products: menCatalog.slice(0, 24)
});
fs.writeFileSync('views/category_single_flowers.html', mensPageHtml, 'utf8');

// 2. Build Women's Collection (views/category_silk_bouquets.html)
console.log('Building Women\'s Collection page (views/category_silk_bouquets.html)...');
const womensPageHtml = buildPlpPage({
  title: "Women's Collection | Pure European Linen & Organic Cotton",
  heading: "Women's Collection",
  subtitle: "Flowing linen dresses, relaxed tunics, breezy culottes, and everyday organic tops crafted with understated elegance and all-day natural comfort.",
  heroBanner: "https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Womens-DESKTOP_jpg.jpg",
  filterTabs: ["All Women's", "Linen Dresses", "Blouses & Tunics", "Culottes & Pants", "Tops & Blouses"],
  products: womenCatalog.slice(0, 24)
});
fs.writeFileSync('views/category_silk_bouquets.html', womensPageHtml, 'utf8');

// 3. Build Trousers & Pants Collection (views/category_vases.html)
console.log('Building Trousers Collection page (views/category_vases.html)...');
const trousersPageHtml = buildPlpPage({
  title: "Linen Trousers & Bottomwear | Men's & Women's Pants",
  heading: "Trousers & Pants",
  subtitle: "Tailored European linen trousers, relaxed cotton chinos, wide-leg culottes, and lounge pants engineered for perfect drape and breathable movement.",
  heroBanner: "https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-32.jpg?v=1758692035",
  filterTabs: ["All Bottoms", "Men's Chinos", "Women's Culottes", "Linen Lounge Pants"],
  products: trousersCatalog.slice(0, 20)
});
fs.writeFileSync('views/category_vases.html', trousersPageHtml, 'utf8');

// 4. Build Women's Tops Collection (views/mini_collection.html)
console.log('Building Women\'s Tops page (views/mini_collection.html)...');
const womenTops = womenCatalog.filter(p => /blouse|top|shirt|tunic/i.test(p.fullName));
const topsPageHtml = buildPlpPage({
  title: "Women's Tops & Blouses | Breathable Natural Fibers",
  heading: "Women's Tops & Blouses",
  subtitle: "Airy linen popovers, relaxed boat-neck tops, and crisp organic cotton shirts designed for easy layering and warm summer afternoons.",
  heroBanner: "https://cottonworld.net/cdn/shop/files/Category-Cards-SHOP-THE-LOOK-FOR-HER-_Desktop-_-Mobile-900X506__jpg.jpg",
  filterTabs: ["All Tops", "Linen Blouses", "Boxy Fit", "Popover Tunics"],
  products: (womenTops.length >= 16 ? womenTops : womenCatalog).slice(0, 18)
});
fs.writeFileSync('views/mini_collection.html', topsPageHtml, 'utf8');

// 5. Build Bestsellers (views/popular.html)
console.log('Building Popular / Bestsellers page (views/popular.html)...');
const bestsellersList = [
  ...menCatalog.slice(0, 10),
  ...womenCatalog.slice(0, 10)
].sort(() => 0.5 - Math.random());
const popularPageHtml = buildPlpPage({
  title: "Most Popular Bestsellers | Men's & Women's Essentials",
  heading: "Most Popular Bestsellers",
  subtitle: "Our most coveted linen shirts, breezy dresses, and essential bottoms loved by thousands of conscious wardrobes across Europe.",
  heroBanner: "https://cottonworld.net/cdn/shop/files/Category-Cards-BESTSELLERS-_Desktop-_-Mobile-900X506__jpg.jpg",
  filterTabs: ["All Bestsellers", "Men's Favorites", "Women's Favorites", "100% Pure Linen"],
  products: bestsellersList
});
fs.writeFileSync('views/popular.html', popularPageHtml, 'utf8');

console.log('Successfully regenerated all category PLP pages with strict gender segregation and interactive hover image swap!');
