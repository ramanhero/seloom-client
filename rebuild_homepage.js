const fs = require('fs');

const menCatalog = JSON.parse(fs.readFileSync('catalog_men.json', 'utf8'));
const womenCatalog = JSON.parse(fs.readFileSync('catalog_women.json', 'utf8'));

// Curate 8 Men's items for Carousel 1
const menCarousel = menCatalog.slice(0, 8);
// Curate 8 Women's items for Carousel 2
const womenCarousel = womenCatalog.slice(0, 8);

function renderCarouselArticles(items) {
  return items.map((p, idx) => `
    <article class="ProductCard-module-scss-module__l3bOlW__container" data-variant="full" data-padding-left-base="gutter" data-padding-bottom-base="spacer" data-has-position-absolute-info-base="false" style="background: #000000; border: 1px solid #1a1a1a; border-radius: 8px; padding: 12px; margin-right: 16px;">
      <div class="ProductCard-module-scss-module__l3bOlW__carouselContainer" style="position: relative; aspect-ratio: 3/4; overflow: hidden; border-radius: 6px; background: #111111;">
        <div class="product-card-image-wrap">
          <div style="position: absolute; top: 10px; right: 10px; z-index: 10; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; padding: 3px 6px; border-radius: 2px;">${p.tag}</div>
          <a draggable="false" href="${p.url}">
            <img alt="${p.name}" draggable="false" loading="lazy" class="product-primary-img" src="${p.heroImage}"/>
            <img alt="${p.name} - Alternate Angle" draggable="false" loading="lazy" class="product-hover-img" src="${p.detailImage}"/>
          </a>
        </div>
      </div>
      <div class="ProductCard-module-scss-module__l3bOlW__infoBar" style="display: flex; align-items: center; justify-content: space-between; margin-top: 14px;">
        <a draggable="false" class="ProductCard-module-scss-module__l3bOlW__info" href="${p.url}" style="text-decoration: none;">
          <span class="ProductCard-module-scss-module__l3bOlW__name" style="font-family: var(--font-graphik); font-size: 13.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #ffffff;">${p.name}</span>
          <span class="ProductCard-module-scss-module__l3bOlW__pricesWrapper" style="font-family: var(--font-graphik); font-size: 13.5px; font-weight: 800; color: #ffffff;">€${p.price},-</span>
        </a>
        <button type="button" class="quick-add-btn" style="padding: 6px 12px; font-family: var(--font-graphik); font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; background: #ffffff; color: #000000; border: none; border-radius: 3px; cursor: pointer;" onclick="event.preventDefault(); addToCart({id:'${p.id}', name:'${p.name.replace(/'/g, "\\'")}', price:${p.price}, image:'${p.heroImage}', variant:'Default'});">+ Add</button>
      </div>
    </article>
  `).join('\n');
}

let html = fs.readFileSync('views/index.html', 'utf8');

// 1. REBUILD SECTION 2: Carousel 1 (STRICTLY MEN'S)
const sec2Start = html.indexOf('<section class="Theme-module-scss-module__o4UHcq__container BlockCarousel-module-scss-module__Kg87-q__container"');
const sec2End = html.indexOf('</section>', sec2Start) + 10;

const newSec2 = `<section class="Theme-module-scss-module__o4UHcq__container BlockCarousel-module-scss-module__Kg87-q__container" data-has-title="true" data-has-link="true" data-has-4-or-less-slides="false" data-has-products="true" data-has-content="false" style="--theme-background:0 0 0;--theme-text:var(--color-black); background-color: #000000; color: #ffffff; padding: 60px 0 40px 0;">
  <div style="max-width: 1440px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px;">
    <div>
      <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 9.5px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; margin-bottom: 8px;">MENSWEAR DROP</span>
      <h2 style="font-family: var(--font-graphik); font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; color: #ffffff; margin: 0 0 6px 0;">Men's Linen &amp; Cotton Essentials</h2>
      <p style="font-size: 14px; color: #888888; margin: 0;">Breathable tailoring, casual shirts, and relaxed tees crafted from pure European flax.</p>
    </div>
    <a href="/eu/en/category/flowers" style="font-family: var(--font-graphik); font-size: 12.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 4px;">View All Men's (84) →</a>
  </div>
  <div style="max-width: 1440px; margin: 0 auto; padding: 0 24px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
      ${renderCarouselArticles(menCarousel)}
    </div>
  </div>
</section>`;

html = html.slice(0, sec2Start) + newSec2 + html.slice(sec2End);
console.log('Rebuilt Section 2 (Men\'s Collection Carousel).');

// 2. REBUILD SECTION 3: PRESS QUOTES
const sec3Start = html.indexOf('<section class="BlockQuotes-module-scss-module__VjELXa__container">');
const sec3End = html.indexOf('</section>', sec3Start) + 10;

const newSec3 = `<section class="BlockQuotes-module-scss-module__VjELXa__container" style="background: #000000; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; padding: 60px 24px;">
  <div style="max-width: 1440px; margin: 0 auto; text-align: center;">
    <span style="font-family: var(--font-graphik); font-size: 11px; font-weight: 800; letter-spacing: 0.16em; text-transform: uppercase; color: #888888; display: block; margin-bottom: 28px;">FEATURED &amp; ACCLAIMED BY</span>
    <div style="display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; margin-bottom: 36px;">
      <span class="press-logo-badge">VOGUE</span>
      <span class="press-logo-badge">GQ</span>
      <span class="press-logo-badge">ELLE</span>
      <span class="press-logo-badge">ESQUIRE</span>
    </div>
    <blockquote style="max-width: 860px; margin: 0 auto; font-family: var(--font-graphik); font-size: 24px; font-weight: 700; line-height: 1.45; color: #ffffff; text-transform: uppercase; letter-spacing: 0.02em;">
      "The definitive voice in contemporary sustainable apparel. Pure European linen tailoring that sets a new standard for everyday luxury."
    </blockquote>
    <cite style="display: block; margin-top: 14px; font-family: var(--font-graphik); font-size: 12px; font-weight: 700; color: #888888; letter-spacing: 0.1em; text-transform: uppercase;">— VOGUE INTERNATIONAL</cite>
  </div>
</section>`;

html = html.slice(0, sec3Start) + newSec3 + html.slice(sec3End);
console.log('Rebuilt Section 3 (Press Quotes & Badges).');

// 3. REBUILD SECTION 4: THE BIG SIZE EDITORIAL MOOD IMAGE
const sec4Start = html.indexOf('<section class="LayoutFullscreenAboveCarousel-module-scss-module__JK0Mga__container"');
const sec4End = html.indexOf('</section>', sec4Start) + 10;

const newSec4 = `<section class="LayoutFullscreenAboveCarousel-module-scss-module__JK0Mga__container" data-asset-theme="dark" style="position: relative; width: 100%; height: 75vh; min-height: 560px; overflow: hidden; background: #000000;">
  <picture style="width: 100%; height: 100%;">
    <source media="(orientation:portrait)" srcset="https://cottonworld.net/cdn/shop/files/Menu-Image-ABOUT-US-_Mobile-654X420__jpg.jpg" />
    <source media="(orientation:landscape)" srcset="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-23.jpg" />
    <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-23.jpg" alt="The Natural Texture Lookbook" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.78);" loading="lazy" />
  </picture>
  <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.92) 100%);"></div>
  <div style="position: absolute; bottom: 50px; left: 0; right: 0; max-width: 1440px; margin: 0 auto; padding: 0 32px; box-sizing: border-box; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 20px;">
    <div>
      <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; margin-bottom: 12px;">EDITORIAL LOOKBOOK</span>
      <h2 style="font-family: var(--font-graphik); font-size: 42px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; color: #ffffff; margin: 0 0 10px 0; line-height: 1.1;">The Natural Texture Lookbook</h2>
      <p style="font-size: 16px; color: #dddddd; max-width: 640px; margin: 0; line-height: 1.5;">A tactile study in raw European flax, sun-dried organic cotton, and understated relaxed silhouettes designed for boundless movement.</p>
    </div>
    <a href="/eu/en/lookbook" style="display: inline-flex; align-items: center; gap: 8px; padding: 14px 28px; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; border-radius: 4px; text-decoration: none; transition: transform 0.2s ease, background 0.2s ease;">
      Explore Lookbook 2026 →
    </a>
  </div>
</section>`;

html = html.slice(0, sec4Start) + newSec4 + html.slice(sec4End);
console.log('Rebuilt Section 4 (Editorial Mood Image & Lookbook).');

// 4. UPDATE SECTION 5: Shop The Look (For Him)
html = html.replace(/Flowers with special meaning/g, 'Shop The Look: Tailored For Him');
html = html.replace(/Discover symbolism/g, 'Explore Men\'s Shirts');
html = html.replace(/Flowers don’t just look beautiful; each one symbolizes something\. Pick the bloom that expresses what you want to say\./g, 'Every seam, shell button, and pre-washed weave reflects over three decades of dedication to artisanal European linen and combed organic cotton.');

// 5. UPDATE SECTION 6: Why 100% Pure Natural Fibers
html = html.replace(/Why Bloom &amp; Wolf/g, 'Why 100% Pure Natural Fibers');
html = html.replace(/Super sustainable: circular &amp; planet proof/g, '100% Biodegradable &amp; Plastic Free');
html = html.replace(/Crafted not grown/g, 'Consciously Woven');

// 6. UPDATE SECTION 7: Signature Womenswear
html = html.replace(/Our collection floral sculptures/g, 'Signature Womenswear');
html = html.replace(/Shop collection/g, 'Shop Women\'s');
html = html.replace(/These floral creations go beyond flowers in a vase\. Lift up your interior with a carefully crafted sculptural masterpiece\./g, 'Effortlessly flowing dresses, breezy culottes, and delicate tops crafted from lightweight organic linen designed for summer ease.');

// 7. REBUILD SECTION 8: Carousel 2 (STRICTLY WOMEN'S)
const sec8Start = html.indexOf('<section class="Theme-module-scss-module__o4UHcq__container BlockCarousel-module-scss-module__Kg87-q__container"', sec4Start);
const sec8End = html.indexOf('</section>', sec8Start) + 10;

const newSec8 = `<section class="Theme-module-scss-module__o4UHcq__container BlockCarousel-module-scss-module__Kg87-q__container" data-has-title="true" data-has-link="true" data-has-4-or-less-slides="false" data-has-products="true" data-has-content="false" style="--theme-background:0 0 0;--theme-text:var(--color-black); background-color: #000000; color: #ffffff; padding: 60px 0 40px 0; border-top: 1px solid #1a1a1a;">
  <div style="max-width: 1440px; margin: 0 auto; padding: 0 24px; display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 28px;">
    <div>
      <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 9.5px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; margin-bottom: 8px;">WOMENSWEAR DROP</span>
      <h2 style="font-family: var(--font-graphik); font-size: 28px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; color: #ffffff; margin: 0 0 6px 0;">Women's Linen &amp; Summer Dresses</h2>
      <p style="font-size: 14px; color: #888888; margin: 0;">Flowing dresses, breezy culottes, and delicate linen blouses tailored for her.</p>
    </div>
    <a href="/eu/en/category/silk-bouquets" style="font-family: var(--font-graphik); font-size: 12.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 4px;">View All Women's (166) →</a>
  </div>
  <div style="max-width: 1440px; margin: 0 auto; padding: 0 24px;">
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
      ${renderCarouselArticles(womenCarousel)}
    </div>
  </div>
</section>`;

html = html.slice(0, sec8Start) + newSec8 + html.slice(sec8End);
console.log('Rebuilt Section 8 (Women\'s Collection Carousel).');

// 8. UPDATE SECTION 9: Brand Heritage Story
html = html.replace(/Where every detail tells a story/g, 'Artisanal Craftsmanship Since 1993');
html = html.replace(/Discover More Stories/g, 'Our Heritage &amp; Craft');
html = html.replace(/The Amsterdam Marriott Hotel is a space where design is never accidental[\s\S]*?designed to elevate each space\./g, 'Thirty years ago, Cottonworld was founded on a simple belief: clothing should feel as pure and natural as the earth it came from. From European flax fields to our zero-waste artisan atelier, every fiber is woven with mindful integrity.');

// 9. REBUILD SECTION 13: FAQ WITH VISUAL BRAND CARD
const sec13Start = html.indexOf('<section class="Theme-module-scss-module__o4UHcq__container BlockAccordions-module-scss-module__gWsw0G__container"');
const sec13End = html.indexOf('</section>', sec13Start) + 10;

const newSec13 = `<section class="Theme-module-scss-module__o4UHcq__container BlockAccordions-module-scss-module__gWsw0G__container" style="background: #000000; border-top: 1px solid #1a1a1a; padding: 80px 24px;">
  <div style="max-width: 1440px; margin: 0 auto; display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: start;">
    
    <!-- Left: Accordion Questions -->
    <div>
      <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; padding: 4px 8px; border-radius: 2px; margin-bottom: 12px;">CLIENT CONCIERGE</span>
      <h2 style="font-family: var(--font-graphik); font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; color: #ffffff; margin: 0 0 28px 0;">Frequently Asked Questions</h2>
      
      <div style="border-top: 1px solid #222222;">
        <details style="padding: 20px 0; border-bottom: 1px solid #222222; cursor: pointer;">
          <summary style="font-family: var(--font-graphik); font-size: 16px; font-weight: 700; color: #ffffff; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            <span>What makes European linen superior for everyday wear?</span>
            <span style="font-size: 20px; font-weight: 400;">+</span>
          </summary>
          <p style="margin-top: 12px; font-size: 14px; color: #999999; line-height: 1.6;">European linen is naturally thermo-regulating, meaning it keeps you cool in summer and warm in cooler months. It absorbs up to 20% of its weight in moisture before feeling damp, softens with every wash, and is twice as durable as regular cotton.</p>
        </details>
        
        <details style="padding: 20px 0; border-bottom: 1px solid #222222; cursor: pointer;">
          <summary style="font-family: var(--font-graphik); font-size: 16px; font-weight: 700; color: #ffffff; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            <span>How should I wash and care for my garments?</span>
            <span style="font-size: 20px; font-weight: 400;">+</span>
          </summary>
          <p style="margin-top: 12px; font-size: 14px; color: #999999; line-height: 1.6;">Machine wash cold (30°C) on a gentle cycle with mild eco-friendly detergent. Do not bleach or tumble dry. Line dry in the shade to preserve the natural plant fibers. If ironing, use a warm iron while slightly damp.</p>
        </details>

        <details style="padding: 20px 0; border-bottom: 1px solid #222222; cursor: pointer;">
          <summary style="font-family: var(--font-graphik); font-size: 16px; font-weight: 700; color: #ffffff; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            <span>What is your European delivery and returns policy?</span>
            <span style="font-size: 20px; font-weight: 400;">+</span>
          </summary>
          <p style="margin-top: 12px; font-size: 14px; color: #999999; line-height: 1.6;">We offer free tracked carbon-neutral shipping on all orders over €75 across the European Union (2-4 business days). You may return or exchange any unworn item with original tags within 30 days of delivery free of charge.</p>
        </details>
      </div>
    </div>

    <!-- Right: Visual Concierge Brand Card (Fulfills Homepage Image Slot requirement) -->
    <div style="background: #0d0d0d; border: 1px solid #222222; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 16/10; overflow: hidden; position: relative;">
        <img src="https://cottonworld.net/cdn/shop/files/About-us-Image-2.jpg" alt="Textile Styling Advice" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.85);" loading="lazy">
        <span style="position: absolute; top: 14px; left: 14px; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 8px; border-radius: 2px;">PERSONAL STYLING</span>
      </div>
      <div style="padding: 28px 24px;">
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; color: #ffffff; margin: 0 0 8px 0;">Need Sizing or Fabric Advice?</h3>
        <p style="font-size: 13.5px; color: #888888; line-height: 1.5; margin: 0 0 20px 0;">Our apparel specialists are available 7 days a week to assist with exact measurements, styling recommendations, and fabric care guidance.</p>
        <a href="/eu/en/support/contact" style="display: inline-flex; align-items: center; justify-content: center; width: 100%; padding: 12px 20px; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 11.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 4px; text-decoration: none; box-sizing: border-box;">
          Connect With A Stylist →
        </a>
      </div>
    </div>

  </div>
</section>`;

html = html.slice(0, sec13Start) + newSec13 + html.slice(sec13End);
console.log('Rebuilt Section 13 (FAQ with Visual Brand Card).');

fs.writeFileSync('views/index.html', html, 'utf8');
console.log('Successfully updated views/index.html with all requirements satisfied!');
