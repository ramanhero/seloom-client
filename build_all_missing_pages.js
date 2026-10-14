const fs = require('fs');
const path = require('path');

const spriteDefs = fs.readFileSync('public/sprite.html', 'utf-8');
const headerMarkup = fs.readFileSync('views/header.html', 'utf-8');
const cartDrawer = fs.readFileSync('views/cart_drawer.html', 'utf-8');

// Read footer from raw_homepage
const rawHtml = fs.readFileSync('raw_homepage.html', 'utf-8');
const footerStart = rawHtml.indexOf('<footer');
const footerEnd = rawHtml.indexOf('</footer>') + 9;
const footerMarkup = rawHtml.slice(footerStart, footerEnd);

function makePage(title, mainContent, outputFile) {
  const html = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Bloom &amp; Wolf | ${title}</title>
  <link rel="stylesheet" href="/_next/static/chunks/3w_bidj41z01a.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/1q5zow7o9o7kb.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/3f5tqkwv-uaj3.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/318tqw0e4e6w5.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/34o7cj8om0c45.css"/>
  <link rel="stylesheet" href="/_next/static/chunks/0rtfm7pmhcrqr.css"/>
  <link rel="stylesheet" href="/css/custom.css"/>
</head>
<body>
<div hidden="">
  ${spriteDefs}
</div>
${headerMarkup}
<main style="min-height: 70vh; max-width: 1440px; margin: 0 auto; padding: 40px 24px 80px 24px; box-sizing: border-box;">
  ${mainContent}
</main>
${footerMarkup}
${cartDrawer}
<script src="/js/store.js"></script>
</body>
</html>`;

  fs.writeFileSync(path.join('views', outputFile), html);
  console.log(`Generated views/${outputFile}`);
}

// ── 1. SINGLE FLOWERS ──────────────────────────────────────────────
const singleFlowersContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">Single Flowers &amp; Stems</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      Create your own personal styling moments with individual handcrafted silk stems. Each flower is sculpted with authentic texture, natural botanical curves, and lifelike real-touch petals.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px;">
    ${[
      { id: 'stem-velvet-rose', name: 'Velvet Silk Rose (Rust)', price: 18, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-HERO-og.jpg?v=1790113522&width=960&quality=80', desc: 'Deep rust-colored garden rose with velvety real-touch petals.' },
      { id: 'stem-coral-peony', name: 'Giant Coral Peony', price: 24, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-HERO-og.jpg?v=1790113179&width=960&quality=80', desc: 'Lush blooming peony with multi-layered petals and natural gradient.' },
      { id: 'stem-king-protea', name: 'King Protea Stem', price: 32, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Compton-HERO-og.jpg?v=1790113228&width=960&quality=80', desc: 'Architectural botanical statement piece with delicate fuzzy bracts.' },
      { id: 'stem-orchid-spray', name: 'Dancing Orchid Spray', price: 22, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-INT-PDP.jpg?v=1790113522&width=960&quality=80', desc: 'Branch of 5 delicate fluttery orchid blooms in rich amber.' },
      { id: 'stem-pompon-dahlia', name: 'Pompon Dahlia (Crimson)', price: 21, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Thatcher-HERO-og.jpg?v=1790113614&width=960&quality=80', desc: 'Intricately spiraled petals in moody autumn berry hues.' },
      { id: 'stem-autumn-hydrangea', name: 'Antiqued Hydrangea Head', price: 26, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-HERO-og.jpg?v=1790113299&width=960&quality=80', desc: 'Voluminous clustered blossoms with two-tone botanical distress.' },
      { id: 'stem-golden-poppy', name: 'Yellow Silk Poppy', price: 19, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Yellow_poppy_bouquet-HERO-og.jpg?v=1790113685&width=960&quality=80', desc: 'Delicate tissue-thin petals on a fuzzy natural curving stem.' },
      { id: 'stem-snow-dahlia', name: 'Snow White Dahlia', price: 22, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Snow_dahlia_bouquet-HERO-og.jpg?v=1790113118&width=960&quality=80', desc: 'Pure porcelain white petals with soft buttery central tones.' }
    ].map(stem => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 3/4; overflow: hidden; background: #faf9f5;">
          <img src="${stem.img}" alt="${stem.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 16px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 18px; margin: 0 0 4px 0;">${stem.name}</h3>
            <span style="font-size: 14px; font-weight: 600; color: #2c2c12;">€${stem.price},-</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${stem.id}', name: '${stem.name.replace(/'/g, "\\'")}', price: ${stem.price}, image: '${stem.img}', variant: 'Single Stem'})">+ Add Stem</button>
        </div>
        <p style="font-size: 13px; color: #777; margin: 4px 0 0 0; line-height: 1.4;">${stem.desc}</p>
      </div>
    `).join('')}
  </div>
`;
makePage('Single Flowers', singleFlowersContent, 'category_single_flowers.html');

// ── 2. VASES ───────────────────────────────────────────────────────
const vasesContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">Designer Vases</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      Each Bloom &amp; Wolf vase is specifically sculpted by ceramicists and master glassblowers to provide the perfect neck proportion and gravitational balance for silk bouquet arrangements.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 36px;">
    ${[
      { id: 'vase-fluted-amber', name: 'The Fluted Amber Glass Vase', price: 49, img: 'https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80', h: '30cm', d: 'Mouthblown ribbed amber glass that radiates warm candlelight hues.' },
      { id: 'vase-matte-urn', name: 'The Matte Ceramic Urn (Sand)', price: 65, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-INT-PDP.jpg?v=1790113522&width=1200&quality=80', h: '32cm', d: 'Stoneware with rough chalky matte finish for serene scandinavian calm.' },
      { id: 'vase-terracotta-vessel', name: 'Sculptural Terracotta Vessel', price: 59, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-INT-PDP.jpg?v=1790113179&width=1200&quality=80', h: '28cm', d: 'Warm Mediterranean clay vessel featuring subtle organic asymmetry.' },
      { id: 'vase-smoked-cylinder', name: 'Smoked Charcoal Cylinder', price: 45, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-INT-PDP.jpg?v=1790113299&width=1200&quality=80', h: '35cm', d: 'Minimalist industrial smoked crystal glass with weighted solid base.' },
      { id: 'vase-organic-travertine', name: 'Raw Travertine Vessel', price: 89, img: 'https://images.ctfassets.net/wcz043ql5e3j/2smUhCHIIBmqN2B9znI2pP/555a640cb094f8a7683a11ca9be51a59/Billowes-SIZE-share.jpg?w=1200&q=80', h: '26cm', d: 'Hand-carved porous natural travertine stone for monumental architectural impact.' },
      { id: 'vase-olive-pitcher', name: 'The Olive Heritage Pitcher', price: 55, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Compton-INT-PDP.jpg?v=1790113228&width=1200&quality=80', h: '29cm', d: 'Classic European pitcher with slender arched handle in muted sage-olive.' }
    ].map(v => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 4/5; overflow: hidden; background: #faf9f5;">
          <img src="${v.img}" alt="${v.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 18px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 4px 0;">${v.name}</h3>
            <span style="font-size: 15px; font-weight: 600; color: #2c2c12;">€${v.price},-</span>
            <span style="font-size: 12px; color: #888; margin-left: 8px;">(${v.h})</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${v.id}', name: '${v.name.replace(/'/g, "\\'")}', price: ${v.price}, image: '${v.img}', variant: 'Standard (${v.h})'})">+ Add to Bag</button>
        </div>
        <p style="font-size: 13px; color: #777; margin: 4px 0 0 0; line-height: 1.4;">${v.d}</p>
      </div>
    `).join('')}
  </div>
`;
makePage('Designer Vases', vasesContent, 'category_vases.html');

// ── 3. WALL PRINTS ─────────────────────────────────────────────────
const wallPrintsContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">Fine Art Wall Prints</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      Our master floral photography, captured in natural Amsterdam studio daylight on archival museum-grade cotton paper. Bring the sculptural serenity of blooms into your gallery walls.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 36px;">
    ${[
      { id: 'print-botanical-solitude', name: 'Botanical Solitude No. 1', price: 79, img: 'https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80', desc: '50 x 70 cm museum print on 310gsm Hahnemühle paper.' },
      { id: 'print-autumn-orchid', name: 'The Autumn Orchid Study', price: 89, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-HERO-og.jpg?v=1790113522&width=1200&quality=80', desc: '60 x 80 cm dramatic macro photograph capturing orchid textures.' },
      { id: 'print-peony-twilight', name: 'Peony in Twilight', price: 79, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-HERO-og.jpg?v=1790113179&width=1200&quality=80', desc: '50 x 70 cm moody floral still life with painterly chiaroscuro.' },
      { id: 'print-protea-macro', name: 'Protea Architectural Detail', price: 95, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Compton-HERO-og.jpg?v=1790113228&width=1200&quality=80', desc: '70 x 100 cm large-scale statement exhibition print.' }
    ].map(p => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 4/5; overflow: hidden; background: #faf9f5; padding: 20px; box-sizing: border-box; display: flex; align-items: center; justify-content: center;">
          <img src="${p.img}" alt="${p.name}" style="max-width: 100%; max-height: 100%; object-fit: contain; box-shadow: 0 10px 30px rgba(0,0,0,0.12); transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 18px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 4px 0;">${p.name}</h3>
            <span style="font-size: 15px; font-weight: 600; color: #2c2c12;">€${p.price},-</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${p.id}', name: '${p.name.replace(/'/g, "\\'")}', price: ${p.price}, image: '${p.img}', variant: '50x70cm Archival Print'})">+ Add to Bag</button>
        </div>
        <p style="font-size: 13px; color: #777; margin: 4px 0 0 0; line-height: 1.4;">${p.desc}</p>
      </div>
    `).join('')}
  </div>
`;
makePage('Fine Art Wall Prints', wallPrintsContent, 'wall_prints.html');

// ── 4. THE MINI COLLECTION ─────────────────────────────────────────
const miniCollectionContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">The Mini Collection</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      Petite silk floral creations. Perfectly scaled for nightstands, coffee tables, vanity consoles, and charming gifts. Complete with bespoke ceramic bud vase.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px;">
    ${[
      { id: 'mini-becker', name: 'The Mini Becker', price: 29, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-HERO-og.jpg?v=1790113522&width=960&quality=80', desc: 'Petite 25cm arrangement with single rust orchid and eucalyptus accent.' },
      { id: 'mini-inki', name: 'The Mini Inki', price: 49, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-HERO-og.jpg?v=1790113179&width=960&quality=80', desc: 'Warm autumnal blush peony bud arrangement in ceramic pot.' },
      { id: 'mini-dahlia', name: 'The Mini Dahlia Trio', price: 39, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Thatcher-HERO-og.jpg?v=1790113614&width=960&quality=80', desc: 'Three miniature crimson dahlias paired with textured dried seedpod lookalikes.' },
      { id: 'mini-benetton', name: 'The Mini Benetton', price: 59, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Compton-HERO-og.jpg?v=1790113228&width=960&quality=80', desc: 'Eclectic colorful mix in miniature hand-thrown stoneware cup.' }
    ].map(m => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 3/4; overflow: hidden; background: #faf9f5;">
          <img src="${m.img}" alt="${m.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 16px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 19px; margin: 0 0 4px 0;">${m.name}</h3>
            <span style="font-size: 14px; font-weight: 600; color: #2c2c12;">€${m.price},-</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${m.id}', name: '${m.name.replace(/'/g, "\\'")}', price: ${m.price}, image: '${m.img}', variant: 'With Ceramic Mini Vase'})">+ Add to Bag</button>
        </div>
        <p style="font-size: 13px; color: #777; margin: 4px 0 0 0; line-height: 1.4;">${m.desc}</p>
      </div>
    `).join('')}
  </div>
`;
makePage('The Mini Collection', miniCollectionContent, 'mini_collection.html');

// ── 5. BOUQUET GENERATOR (INTERACTIVE BUILDER) ─────────────────────
const bouquetGenContent = `
  <div style="max-width: 900px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 40px;">
      <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #853e25;">Bloom &amp; Wolf Atelier</span>
      <h1 style="font-family: var(--font-times-now); font-size: 44px; font-weight: 400; margin: 8px 0 12px 0;">Create Your Own Bouquet</h1>
      <p style="font-size: 16px; color: #666; line-height: 1.6; max-width: 600px; margin: 0 auto;">
        Design a custom silk flower arrangement tailored to your aesthetic. Choose your floral color palette, volume, vase pairing, and gift card.
      </p>
    </div>

    <div style="background: #ffffff; border: 1px solid var(--bw-border); border-radius: 12px; padding: 36px; box-shadow: 0 4px 24px rgba(0,0,0,0.04);">
      <!-- Step 1: Palette -->
      <div style="margin-bottom: 32px;">
        <label style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #2c2c12; display: block; margin-bottom: 12px;">
          1. Select Color Palette
        </label>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px;" id="palette-selector">
          <label class="custom-builder-pill is-selected" onclick="selectBuilderOption(this, 'palette', 'Autumn Amber', 0)">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #964e28; display: inline-block;"></span>
            <span>Autumn Amber</span>
          </label>
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'palette', 'Blush & Peony Rose', 0)">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #e09ba5; display: inline-block;"></span>
            <span>Blush &amp; Rose</span>
          </label>
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'palette', 'Botanical Greens & White', 0)">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #4e6538; display: inline-block;"></span>
            <span>Greens &amp; White</span>
          </label>
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'palette', 'Moody Sunset Berry', 0)">
            <span style="width: 16px; height: 16px; border-radius: 50%; background: #6b1462; display: inline-block;"></span>
            <span>Sunset Berry</span>
          </label>
        </div>
      </div>

      <!-- Step 2: Size & Stem Volume -->
      <div style="margin-bottom: 32px;">
        <label style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #2c2c12; display: block; margin-bottom: 12px;">
          2. Bouquet Volume &amp; Height
        </label>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px;">
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'size', 'Classic (9 stems • 60cm)', 89)">
            <div>
              <strong>Classic</strong> • 9 stems<br>
              <small style="color: #666;">€89,-</small>
            </div>
          </label>
          <label class="custom-builder-pill is-selected" onclick="selectBuilderOption(this, 'size', 'Luxe (15 stems • 75cm)', 129)">
            <div>
              <strong>Luxe (Recommended)</strong> • 15 stems<br>
              <small style="color: #666;">€129,-</small>
            </div>
          </label>
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'size', 'Grand Statement (21 stems • 90cm)', 189)">
            <div>
              <strong>Grand Statement</strong> • 21 stems<br>
              <small style="color: #666;">€189,-</small>
            </div>
          </label>
        </div>
      </div>

      <!-- Step 3: Vase Pairing -->
      <div style="margin-bottom: 32px;">
        <label style="font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #2c2c12; display: block; margin-bottom: 12px;">
          3. Matching Designer Vase
        </label>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px;">
          <label class="custom-builder-pill is-selected" onclick="selectBuilderOption(this, 'vase', 'Without Vase', 0)">
            <div>No vase (I have my own)<br><small style="color: #666;">+€0,-</small></div>
          </label>
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'vase', 'Fluted Amber Glass', 39)">
            <div>Fluted Amber Glass<br><small style="color: #666;">+€39,-</small></div>
          </label>
          <label class="custom-builder-pill" onclick="selectBuilderOption(this, 'vase', 'Matte Ceramic Urn', 49)">
            <div>Matte Ceramic Urn<br><small style="color: #666;">+€49,-</small></div>
          </label>
        </div>
      </div>

      <!-- Live Price & Summary -->
      <div style="background: #faf9f5; border-radius: 8px; padding: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-top: 24px;">
        <div>
          <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #777;">Your Custom Configuration</span>
          <div id="builder-summary-text" style="font-family: var(--font-times-now); font-size: 20px; font-weight: 500; margin-top: 4px; color: #2c2c12;">
            Autumn Amber • Luxe (15 stems) • Without Vase
          </div>
          <div style="font-size: 13px; color: #364f1b; margin-top: 4px;">✓ Hand-tied by master florist with complimentary scent infusion</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 28px; font-weight: 700; color: #2c2c12;" id="builder-total-price">€129,-</div>
          <button type="button" class="checkout-btn" style="margin-top: 8px; padding: 12px 28px;" onclick="addCustomBouquetToBag()">
            Add Custom Bouquet to Bag
          </button>
        </div>
      </div>
    </div>
  </div>

  <style>
    .custom-builder-pill {
      border: 1px solid #d5d3ca;
      border-radius: 8px;
      padding: 14px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      transition: all 0.2s ease;
      background: #ffffff;
    }
    .custom-builder-pill:hover {
      border-color: #364f1b;
      background: #faf9f5;
    }
    .custom-builder-pill.is-selected {
      border-color: #364f1b;
      background: rgba(54, 79, 27, 0.08);
      font-weight: 600;
    }
  </style>

  <script>
    const builderState = {
      palette: 'Autumn Amber',
      size: 'Luxe (15 stems • 75cm)',
      sizePrice: 129,
      vase: 'Without Vase',
      vasePrice: 0
    };

    function selectBuilderOption(el, category, name, price) {
      el.parentElement.querySelectorAll('.custom-builder-pill').forEach(pill => pill.classList.remove('is-selected'));
      el.classList.add('is-selected');

      if (category === 'palette') builderState.palette = name;
      if (category === 'size') {
        builderState.size = name;
        builderState.sizePrice = price;
      }
      if (category === 'vase') {
        builderState.vase = name;
        builderState.vasePrice = price;
      }

      const total = builderState.sizePrice + builderState.vasePrice;
      document.getElementById('builder-total-price').textContent = '€' + total + ',-';
      document.getElementById('builder-summary-text').textContent = builderState.palette + ' • ' + builderState.size.split('•')[0] + ' • ' + builderState.vase;
    }

    function addCustomBouquetToBag() {
      const total = builderState.sizePrice + builderState.vasePrice;
      addToCart({
        id: 'custom-' + builderState.palette.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + total,
        name: 'Custom Bouquet: ' + builderState.palette,
        price: total,
        image: 'https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=960&q=80',
        variant: builderState.size + ' | ' + builderState.vase
      });
    }
  </script>
`;
makePage('Create Your Own Bouquet', bouquetGenContent, 'bouquet_generator.html');

// ── 6. GIFTS & GIFT CARDS ──────────────────────────────────────────
const giftsContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">Gifts &amp; Gift Cards</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      An everlasting floral gift that never withers. Every gift bouquet arrives in our signature dark-forest luxury presentation packaging with a complimentary calligraphed personal gift message.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 36px;">
    ${[
      { id: 'gift-card-50', name: 'Bloom & Wolf Gift Card €50', price: 50, img: 'https://images.ctfassets.net/wcz043ql5e3j/2smUhCHIIBmqN2B9znI2pP/555a640cb094f8a7683a11ca9be51a59/Billowes-SIZE-share.jpg?w=1200&q=80', desc: 'Digital voucher delivered instantly via email or physical gold-foil gift envelope.' },
      { id: 'gift-card-100', name: 'Bloom & Wolf Gift Card €100', price: 100, img: 'https://images.ctfassets.net/wcz043ql5e3j/2smUhCHIIBmqN2B9znI2pP/555a640cb094f8a7683a11ca9be51a59/Billowes-SIZE-share.jpg?w=1200&q=80', desc: 'Sufficient for any classic seasonal bouquet arrangement.' },
      { id: 'gift-card-150', name: 'Bloom & Wolf Gift Card €150', price: 150, img: 'https://images.ctfassets.net/wcz043ql5e3j/2smUhCHIIBmqN2B9znI2pP/555a640cb094f8a7683a11ca9be51a59/Billowes-SIZE-share.jpg?w=1200&q=80', desc: 'Covers bouquet and designer mouthblown vase pairing.' },
      { id: 'gift-card-250', name: 'Bloom & Wolf Gift Card €250', price: 250, img: 'https://images.ctfassets.net/wcz043ql5e3j/2smUhCHIIBmqN2B9znI2pP/555a640cb094f8a7683a11ca9be51a59/Billowes-SIZE-share.jpg?w=1200&q=80', desc: 'The ultimate floral sculpture or luxury subscription gift credit.' }
    ].map(g => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 4/5; overflow: hidden; background: #faf9f5;">
          <img src="${g.img}" alt="${g.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 18px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 4px 0;">${g.name}</h3>
            <span style="font-size: 15px; font-weight: 600; color: #2c2c12;">€${g.price},-</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${g.id}', name: '${g.name.replace(/'/g, "\\'")}', price: ${g.price}, image: '${g.img}', variant: 'Gift Card Voucher'})">+ Select Gift</button>
        </div>
        <p style="font-size: 13px; color: #777; margin: 4px 0 0 0; line-height: 1.4;">${g.desc}</p>
      </div>
    `).join('')}
  </div>
`;
makePage('Gifts &amp; Gift Cards', giftsContent, 'gifting.html');

// ── 7. STORES & SHOWROOMS ──────────────────────────────────────────
const storesContent = `
  <div style="max-width: 900px; margin: 0 auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; text-align: center; margin-bottom: 12px;">Stores &amp; Ateliers</h1>
    <p style="font-size: 16px; color: #666; text-align: center; max-width: 600px; margin: 0 auto 48px auto; line-height: 1.6;">
      Experience the lifelike real-touch feel and floral architecture in person at our flagship showroom and curated partner design spaces.
    </p>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 48px;">
      <div style="border-radius: 8px; overflow: hidden; background: #faf9f5; border: 1px solid var(--bw-border);">
        <img src="https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80" style="width: 100%; height: 260px; object-fit: cover;" alt="Amsterdam Atelier">
        <div style="padding: 24px;">
          <h2 style="font-family: var(--font-times-now); font-size: 24px; margin: 0 0 8px 0;">Amsterdam Floral Atelier</h2>
          <p style="font-size: 14px; color: #555; line-height: 1.5; margin: 0 0 16px 0;">
            Haarlemmerstraatweg 13<br>
            1165 MJ Halfweg (Amsterdam Area), Netherlands
          </p>
          <div style="font-size: 13px; color: #777; margin-bottom: 16px;">
            Monday – Friday: 09:30 – 17:30<br>
            Saturday: 10:00 – 16:00 (By Appointment)
          </div>
          <a href="/eu/en/support/contact" class="quick-add-btn">Book Styling Appointment</a>
        </div>
      </div>

      <div style="border-radius: 8px; overflow: hidden; background: #faf9f5; border: 1px solid var(--bw-border);">
        <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-INT-PDP.jpg?v=1790113299&width=1200&quality=80" style="width: 100%; height: 260px; object-fit: cover;" alt="Partner Showrooms">
        <div style="padding: 24px;">
          <h2 style="font-family: var(--font-times-now); font-size: 24px; margin: 0 0 8px 0;">Hotel &amp; Boutique Partners</h2>
          <p style="font-size: 14px; color: #555; line-height: 1.5; margin: 0 0 16px 0;">
            View permanent floral installations in the lobbies and lounges of:<br>
            • Amsterdam Marriott Hotel<br>
            • W Amsterdam Residences<br>
            • Boutique Design Showrooms in Brussels &amp; Paris
          </p>
          <a href="/eu/en/portfolio" class="quick-add-btn">Explore Hotel Projects</a>
        </div>
      </div>
    </div>
  </div>
`;
makePage('Stores &amp; Showrooms', storesContent, 'stores.html');

// ── 8. THE TEAM ────────────────────────────────────────────────────
const teamContent = `
  <div style="max-width: 900px; margin: 0 auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; text-align: center; margin-bottom: 12px;">The Team</h1>
    <p style="font-size: 16px; color: #666; text-align: center; max-width: 600px; margin: 0 auto 48px auto; line-height: 1.6;">
      Meet the artisans, floral master designers, and innovators reshaping interior botanical design without seasonal waste.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 32px;">
      <div style="text-align: center;">
        <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-INT-PDP.jpg?v=1790113522&width=600&quality=80" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 50%; max-width: 220px; margin: 0 auto 16px auto; display: block;" alt="Creative Director">
        <h3 style="font-family: var(--font-times-now); font-size: 22px; margin: 0 0 4px 0;">Fleur van Dijk</h3>
        <span style="font-size: 13px; font-weight: 600; color: #853e25; text-transform: uppercase;">Head of Floral Art &amp; Design</span>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Master florist with 18 years experience curating haute floral styling across Europe.</p>
      </div>

      <div style="text-align: center;">
        <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-INT-PDP.jpg?v=1790113179&width=600&quality=80" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 50%; max-width: 220px; margin: 0 auto 16px auto; display: block;" alt="Founding Partner">
        <h3 style="font-family: var(--font-times-now); font-size: 22px; margin: 0 0 4px 0;">Daan Wolf</h3>
        <span style="font-size: 13px; font-weight: 600; color: #364f1b; text-transform: uppercase;">Founder &amp; Managing Director</span>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Pioneering the circular subscription model that saves millions of liters of fresh water annually.</p>
      </div>

      <div style="text-align: center;">
        <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-INT-PDP.jpg?v=1790113299&width=600&quality=80" style="width: 100%; aspect-ratio: 1/1; object-fit: cover; border-radius: 50%; max-width: 220px; margin: 0 auto 16px auto; display: block;" alt="B2B Director">
        <h3 style="font-family: var(--font-times-now); font-size: 22px; margin: 0 0 4px 0;">Charlotte de Jong</h3>
        <span style="font-size: 13px; font-weight: 600; color: #2a488d; text-transform: uppercase;">Director of Corporate Subscriptions</span>
        <p style="font-size: 14px; color: #666; margin-top: 8px;">Directing corporate floral partnerships for Europe’s premier hospitality groups.</p>
      </div>
    </div>
  </div>
`;
makePage('The Team', teamContent, 'team.html');

// ── 9. SYMBOLISM GUIDE ─────────────────────────────────────────────
const symbolismContent = `
  <div style="max-width: 900px; margin: 0 auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; text-align: center; margin-bottom: 12px;">The Language of Flowers</h1>
    <p style="font-size: 16px; color: #666; text-align: center; max-width: 600px; margin: 0 auto 48px auto; line-height: 1.6;">
      Flowers don’t just look beautiful; each bloom carries historic meaning. Discover the poetic symbolism within our bouquets.
    </p>

    <div style="display: flex; flex-direction: column; gap: 32px;">
      ${[
        { name: 'The Orchid', symbol: 'Refinement & Rarity', text: 'In ancient Greek botanics, orchids represented majestic grace and deep personal admiration. In Bloom & Wolf arrangements like The Oscar, orchids bring sculptural, serene dignity.' },
        { name: 'The Peony', symbol: 'Honor, Prosperity & Joy', text: 'Known as the king of flowers in traditional Chinese imperial gardens, peonies celebrate good fortune, prosperity, and joyous companionship.' },
        { name: 'The Protea', symbol: 'Courage & Transformation', text: 'Named after the Greek god Proteus who could change form at will, the king protea symbolizes boldness, resilience, and daring creative evolution.' },
        { name: 'The Dahlia', symbol: 'Inner Strength & Dignity', text: 'Victorian floral symbolism celebrated dahlias as emblems of personal commitment and standing firmly in one’s own unique beauty.' }
      ].map(s => `
        <div style="background: #faf9f5; border-radius: 8px; padding: 28px; border-left: 4px solid #364f1b;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
            <h2 style="font-family: var(--font-times-now); font-size: 24px; margin: 0;">${s.name}</h2>
            <span style="font-size: 13px; font-weight: 700; color: #853e25; text-transform: uppercase;">${s.symbol}</span>
          </div>
          <p style="font-size: 15px; color: #555; line-height: 1.6; margin: 0;">${s.text}</p>
        </div>
      `).join('')}
    </div>
  </div>
`;
makePage('Symbolism Guide', symbolismContent, 'symbolism.html');

// ── 10. FLORAL SCULPTURES ──────────────────────────────────────────
const sculpturesContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">Floral Sculptures</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      These floral creations go beyond flowers in a vase. Designed as grand architectural art objects that lift up spacious living rooms, grand staircases, hotel lobbies, and executive suites.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 36px;">
    ${[
      { id: 'sculpt-the-hoff', name: 'The Hoff Monumental', price: 179, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-HERO-og.jpg?v=1790113299&width=1200&quality=80', desc: 'Over 100cm height. Sprawling autumn boughs and golden architectural stems.' },
      { id: 'sculpt-the-warnix', name: 'The Warnix Masterpiece', price: 339, img: 'https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80', desc: 'Our largest floor-standing floral sculpture, curated with 35 handcrafted rare stems.' },
      { id: 'sculpt-the-thompson', name: 'The Thompson Grand', price: 279, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Royle-HERO-og.jpg?v=1790113584&width=1200&quality=80', desc: 'Dramatic asymmetric floral sculpture that commands high ceiling spaces.' }
    ].map(sc => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 3/4; overflow: hidden; background: #faf9f5;">
          <img src="${sc.img}" alt="${sc.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 18px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 4px 0;">${sc.name}</h3>
            <span style="font-size: 15px; font-weight: 600; color: #2c2c12;">€${sc.price},-</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${sc.id}', name: '${sc.name.replace(/'/g, "\\'")}', price: ${sc.price}, image: '${sc.img}', variant: 'Monumental Sculpture'})">+ Add to Bag</button>
        </div>
        <p style="font-size: 13px; color: #777; margin: 4px 0 0 0; line-height: 1.4;">${sc.desc}</p>
      </div>
    `).join('')}
  </div>
`;
makePage('Floral Sculptures', sculpturesContent, 'sculptures.html');

// ── 11. MOST POPULAR ───────────────────────────────────────────────
const popularContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">Most Popular Bestsellers</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      Our most sought-after arrangements, as recommended by interior stylists and loved by our clients across Europe.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px;">
    ${[
      { id: 'the-bowman', name: 'The Bowman', price: 99, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-HERO-og.jpg?v=1790113179&width=960&quality=80' },
      { id: 'the-compton', name: 'The Compton', price: 139, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Compton-HERO-og.jpg?v=1790113228&width=960&quality=80' },
      { id: 'the-oscar', name: 'The Oscar', price: 99, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-HERO-og.jpg?v=1790113522&width=960&quality=80' },
      { id: 'the-lowe', name: 'The Lowe', price: 89, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-HERO-og.jpg?v=1790113179&width=960&quality=80' },
      { id: 'ruby-rose-bouquet', name: 'Ruby Rose Bouquet', price: 150, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Thatcher-HERO-og.jpg?v=1790113614&width=960&quality=80' },
      { id: 'the-fitzgerald', name: 'The Fitzgerald', price: 199, img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-HERO-og.jpg?v=1790113299&width=960&quality=80' }
    ].map(p => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 3/4; overflow: hidden; background: #faf9f5;">
          <a href="/eu/en/products/${p.id}/without-vase">
            <img src="${p.img}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
          </a>
        </div>
        <div style="padding: 16px 4px 8px 4px; display: flex; justify-content: space-between; align-items: baseline;">
          <div>
            <h3 style="font-family: var(--font-times-now); font-size: 19px; margin: 0 0 4px 0;">
              <a href="/eu/en/products/${p.id}/without-vase" style="text-decoration: none; color: inherit;">${p.name}</a>
            </h3>
            <span style="font-size: 15px; font-weight: 600; color: #2c2c12;">€${p.price},-</span>
          </div>
          <button type="button" class="quick-add-btn" onclick="addToCart({id: '${p.id}', name: '${p.name}', price: ${p.price}, image: '${p.img}', variant: 'Without vase'})">+ Add</button>
        </div>
      </div>
    `).join('')}
  </div>
`;
makePage('Most Popular', popularContent, 'popular.html');

// ── 12. PORTFOLIO & STORIES ────────────────────────────────────────
const portfolioContent = `
  <div style="max-width: 900px; margin: 0 auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; text-align: center; margin-bottom: 12px;">Stories &amp; Hotel Portfolio</h1>
    <p style="font-size: 16px; color: #666; text-align: center; max-width: 600px; margin: 0 auto 48px auto; line-height: 1.6;">
      Where every detail tells a story. Explore our bespoke floral curations created in partnership with international hotels, luxury residences, and architectural studios.
    </p>

    <div style="display: flex; flex-direction: column; gap: 48px;">
      <div style="background: #faf9f5; border-radius: 12px; overflow: hidden; border: 1px solid var(--bw-border);">
        <img src="https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80" style="width: 100%; height: 380px; object-fit: cover;" alt="Amsterdam Marriott Hotel">
        <div style="padding: 32px;">
          <span style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #853e25;">Hospitality Partnership</span>
          <h2 style="font-family: var(--font-times-now); font-size: 28px; margin: 8px 0 12px 0;">The Amsterdam Marriott Hotel</h2>
          <p style="font-size: 15px; color: #555; line-height: 1.7; margin-bottom: 20px;">
            The Amsterdam Marriott Hotel is a space where design is never accidental. By partnering with Bloom &amp; Wolf, the lobby, club lounge, and presidential suites feature seasonal rotations of architectural silk bouquets—eliminating over 12,000 wilted fresh bouquets per year while maintaining a flawless luxury botanical presence.
          </p>
          <a href="/eu/en/for-business" class="quick-add-btn">Explore Business Subscriptions</a>
        </div>
      </div>
    </div>
  </div>
`;
makePage('Portfolio &amp; Stories', portfolioContent, 'portfolio.html');

// ── 13. JOURNAL ────────────────────────────────────────────────────
const journalContent = `
  <div style="text-align: center; max-width: 700px; margin: 0 auto 48px auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; margin-bottom: 12px;">The Bloom Journal</h1>
    <p style="font-size: 15px; color: #666; line-height: 1.6;">
      Stories on botanical aesthetics, sustainable luxury, interior design interviews, and seasonal styling techniques from our Amsterdam floral studio.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 36px;">
    ${[
      { title: 'Why Silk Flowers are the Sustainable Choice in Luxury Design', date: 'October 2026', img: 'https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80', excerpt: 'How circular rental models and lifelike botanical polymers are replacing resource-intensive imported cut flowers.' },
      { title: 'The Art of Floral Scenting: How We Fragrance Our Bouquets', date: 'September 2026', img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-INT-PDP.jpg?v=1790113522&width=1200&quality=80', excerpt: 'Discover our proprietary floral oil mist that gives our silk bouquets their delicate, freshly-cut morning garden fragrance.' },
      { title: 'Interior Styling: Bringing Warm Amber &amp; Terracotta Into Fall', date: 'September 2026', img: 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-INT-PDP.jpg?v=1790113179&width=1200&quality=80', excerpt: 'How to harmonize botanical silhouettes with raw travertine, dark walnut, and natural linen textures.' }
    ].map(a => `
      <div style="background: #ffffff; border-radius: 6px; overflow: hidden; display: flex; flex-direction: column;">
        <div style="aspect-ratio: 16/10; overflow: hidden; background: #faf9f5;">
          <img src="${a.img}" alt="${a.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <div style="padding: 20px 4px 8px 4px;">
          <span style="font-size: 12px; color: #888; text-transform: uppercase;">${a.date}</span>
          <h3 style="font-family: var(--font-times-now); font-size: 21px; margin: 6px 0 8px 0; line-height: 1.3;">${a.title}</h3>
          <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 0;">${a.excerpt}</p>
        </div>
      </div>
    `).join('')}
  </div>
`;
makePage('The Journal', journalContent, 'journal.html');

// ── 14. HOW RENTING WORKS ──────────────────────────────────────────
const rentingContent = `
  <div style="max-width: 900px; margin: 0 auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 42px; font-weight: 400; text-align: center; margin-bottom: 12px;">How Renting Works</h1>
    <p style="font-size: 16px; color: #666; text-align: center; max-width: 600px; margin: 0 auto 48px auto; line-height: 1.6;">
      Enjoy perpetually fresh botanical design in your home or office. Never throw away dead flowers again.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 28px; margin-bottom: 48px;">
      <div style="background: #faf9f5; border-radius: 8px; padding: 32px 24px; text-align: center;">
        <span style="font-family: var(--font-times-now); font-size: 40px; color: #364f1b; font-weight: 400;">01</span>
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 12px 0 8px 0;">Select Your Bouquet</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 0;">Choose from our seasonal collection of silk bouquets and matching designer vases.</p>
      </div>

      <div style="background: #faf9f5; border-radius: 8px; padding: 32px 24px; text-align: center;">
        <span style="font-family: var(--font-times-now); font-size: 40px; color: #364f1b; font-weight: 400;">02</span>
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 12px 0 8px 0;">Delivered &amp; Scented</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 0;">Delivered to your door ready-arranged in our shockproof presentation box with complimentary scent.</p>
      </div>

      <div style="background: #faf9f5; border-radius: 8px; padding: 32px 24px; text-align: center;">
        <span style="font-family: var(--font-times-now); font-size: 40px; color: #364f1b; font-weight: 400;">03</span>
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 12px 0 8px 0;">Seasonal Swap</h3>
        <p style="font-size: 14px; color: #666; line-height: 1.5; margin: 0;">Whenever the seasons change (every 3 to 6 months), choose a new arrangement and we swap it seamlessly.</p>
      </div>
    </div>

    <div style="text-align: center;">
      <a href="/eu/en/category/silk-bouquets" class="checkout-btn" style="display: inline-flex; max-width: 260px;">Explore Bouquets to Rent</a>
    </div>
  </div>
`;
makePage('How Renting Works', rentingContent, 'how_renting_works.html');

// ── 15. DELIVERY & RETURNS ─────────────────────────────────────────
const deliveryReturnsContent = `
  <div style="max-width: 800px; margin: 0 auto; line-height: 1.7;">
    <h1 style="font-family: var(--font-times-now); font-size: 40px; font-weight: 400; text-align: center; margin-bottom: 24px;">Delivery &amp; Returns</h1>
    
    <div style="background: #faf9f5; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
      <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 8px 0;">Free Shipping Over €75</h3>
      <p style="font-size: 14px; color: #666; margin: 0;">We deliver across all European Union countries with carbon-neutral shipping partners (PostNL, DHL Express, DPD).</p>
    </div>

    <h2 style="font-family: var(--font-times-now); font-size: 24px; margin-top: 32px;">Delivery Times</h2>
    <p>• Netherlands &amp; Belgium: 1 - 2 business days<br>• Germany, France &amp; Austria: 2 - 3 business days<br>• Rest of European Union: 3 - 5 business days</p>

    <h2 style="font-family: var(--font-times-now); font-size: 24px; margin-top: 32px;">14-Day Hassle-Free Returns</h2>
    <p>We want you to love your floral sculpture. If it does not suit your space perfectly, you may return it in its original packaging within 14 days of delivery for a full refund or exchange.</p>
  </div>
`;
makePage('Delivery &amp; Returns', deliveryReturnsContent, 'delivery_returns.html');

// ── 16. LOGIN / ACCOUNT ────────────────────────────────────────────
const loginContent = `
  <div style="max-width: 440px; margin: 40px auto; background: #ffffff; border: 1px solid var(--bw-border); border-radius: 12px; padding: 36px; box-shadow: 0 8px 30px rgba(0,0,0,0.04);">
    <div style="text-align: center; margin-bottom: 28px;">
      <h1 style="font-family: var(--font-times-now); font-size: 32px; font-weight: 400; margin: 0 0 8px 0;">Sign In</h1>
      <p style="font-size: 14px; color: #666; margin: 0;">Access your Bloom &amp; Wolf orders, subscriptions, and address book.</p>
    </div>

    <form onsubmit="event.preventDefault(); showToast('Welcome back! Signed in to your Bloom & Wolf account.'); setTimeout(() => window.location.href='/eu/en', 1200);" style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <label style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; display: block; margin-bottom: 6px;">Email address</label>
        <input type="email" required placeholder="name@example.com" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
      </div>
      <div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <label style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555;">Password</label>
          <a href="#" onclick="event.preventDefault(); showToast('Password reset link sent to your email.');" style="font-size: 12px; color: #364f1b; text-decoration: underline;">Forgot?</a>
        </div>
        <input type="password" required placeholder="••••••••" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
      </div>
      <button type="submit" class="checkout-btn" style="margin-top: 8px;">Sign In</button>
    </form>

    <div style="text-align: center; margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.06); font-size: 13px; color: #666;">
      Don't have an account yet? <a href="#" onclick="event.preventDefault(); showToast('Registration open during checkout.');" style="color: #364f1b; font-weight: 600;">Create one</a>
    </div>
  </div>
`;
makePage('Sign In', loginContent, 'login.html');

console.log('All missing pages built successfully!');
