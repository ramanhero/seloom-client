const fs = require('fs');

const masterHeader = fs.readFileSync('views/header.html', 'utf8');

// 1. Update views/lookbook.html
console.log('Updating views/lookbook.html...');
let lookbookHtml = fs.readFileSync('views/lookbook.html', 'utf8');

// Replace header
const lbHeaderStart = lookbookHtml.indexOf('<!-- Blurgvillage Style Bold Announcement Bar');
const lbHeaderEnd = lookbookHtml.indexOf('</nav>', lbHeaderStart) + 6;
if (lbHeaderStart !== -1 && lbHeaderEnd !== -1) {
  lookbookHtml = lookbookHtml.slice(0, lbHeaderStart) + masterHeader + lookbookHtml.slice(lbHeaderEnd);
}

// Replace main lookbook content with curated lookbook shots
const lbMainStart = lookbookHtml.indexOf('<main');
const lbMainEnd = lookbookHtml.indexOf('</main>', lbMainStart) + 7;

const newLbMain = `<main style="min-height: 60vh; max-width: 1440px; margin: 0 auto; padding: 48px 24px 100px 24px; box-sizing: border-box; background: #000000; color: #ffffff;">
  
  <div style="text-align: center; max-width: 760px; margin: 0 auto 56px auto;">
    <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; margin-bottom: 12px;">EDITORIAL 2026</span>
    <h1 style="font-family: var(--font-graphik); font-size: 42px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; margin: 0 0 14px 0; color: #ffffff;">The Natural Texture Lookbook</h1>
    <p style="font-size: 16px; color: #999999; margin: 0; line-height: 1.6;">
      Captured under golden Mediterranean light: a sensory exploration of pre-washed European linen, unbleached flax fibers, and sun-dried organic cotton tailored for effortless living.
    </p>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 32px;">
    
    <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 3/4; overflow: hidden; background: #111111;">
        <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-23.jpg" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="Sun-Drenched Natural Flax" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      </div>
      <div style="padding: 20px 20px 24px 20px;">
        <span style="font-family: var(--font-graphik); font-size: 10.5px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">LOOK 01 • ESSENTIALS</span>
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; margin: 4px 0 6px 0; color: #ffffff;">Sun-Drenched Natural Flax</h3>
        <p style="font-size: 13.5px; color: #777777; margin: 0 0 16px 0;">Pure unbleached European linen tailored with relaxed drop-shoulders and horn buttons.</p>
        <a href="/eu/en/category/flowers" style="font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 2px;">Shop The Men's Shirt →</a>
      </div>
    </div>

    <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 3/4; overflow: hidden; background: #111111;">
        <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-32.jpg" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="Wide-Leg Summer Culotte" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      </div>
      <div style="padding: 20px 20px 24px 20px;">
        <span style="font-family: var(--font-graphik); font-size: 10.5px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">LOOK 02 • BOTTOMWEAR</span>
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; margin: 4px 0 6px 0; color: #ffffff;">Relaxed Linen Bottomwear</h3>
        <p style="font-size: 13.5px; color: #777777; margin: 0 0 16px 0;">Elasticated drawstring waist pants engineered with airy drape for warm coastal breezes.</p>
        <a href="/eu/en/category/vases" style="font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 2px;">Shop Linen Trousers →</a>
      </div>
    </div>

    <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 3/4; overflow: hidden; background: #111111;">
        <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_2-27.jpg" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="Earth-Toned Summer Blouse" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      </div>
      <div style="padding: 20px 20px 24px 20px;">
        <span style="font-family: var(--font-graphik); font-size: 10.5px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">LOOK 03 • WOMENSWEAR</span>
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; margin: 4px 0 6px 0; color: #ffffff;">Earthy Tones &amp; Summer Silhouettes</h3>
        <p style="font-size: 13.5px; color: #777777; margin: 0 0 16px 0;">Muted olive and desert peach tones dyed with non-toxic, eco-certified vegetable minerals.</p>
        <a href="/eu/en/products/the-mini-collection" style="font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 2px;">Shop Women's Tops →</a>
      </div>
    </div>

    <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 3/4; overflow: hidden; background: #111111;">
        <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-04.jpg" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="Casual Layering & Organic Knitwear" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      </div>
      <div style="padding: 20px 20px 24px 20px;">
        <span style="font-family: var(--font-graphik); font-size: 10.5px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">LOOK 04 • KNITWEAR</span>
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; margin: 4px 0 6px 0; color: #ffffff;">Lightweight Organic Cotton Layering</h3>
        <p style="font-size: 13.5px; color: #777777; margin: 0 0 16px 0;">Breathable mid-weight combed cotton sweaters for cool evening ocean walks.</p>
        <a href="/eu/en/category/flowers" style="font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 2px;">Shop Menswear →</a>
      </div>
    </div>

    <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 3/4; overflow: hidden; background: #111111;">
        <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-40.jpg" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="Artisanal Lime Linen Shirt" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      </div>
      <div style="padding: 20px 20px 24px 20px;">
        <span style="font-family: var(--font-graphik); font-size: 10.5px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">LOOK 05 • STATEMENT SHIRTS</span>
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; margin: 4px 0 6px 0; color: #ffffff;">Summer Lime Camp Shirt</h3>
        <p style="font-size: 13.5px; color: #777777; margin: 0 0 16px 0;">Vibrant botanical hues crafted from pure French linen yarn for an effortless relaxed statement.</p>
        <a href="/eu/en/category/flowers" style="font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 2px;">Shop Linen Shirts →</a>
      </div>
    </div>

    <div style="background: #0d0d0d; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;">
      <div style="aspect-ratio: 3/4; overflow: hidden; background: #111111;">
        <img src="https://cdn.shopify.com/s/files/1/1231/6442/files/WEBSITE_NEW_ARRIVAL_LOOK_BOOK_IMAGES_3-17.jpg" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" alt="Organic Cotton Summer Staples" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      </div>
      <div style="padding: 20px 20px 24px 20px;">
        <span style="font-family: var(--font-graphik); font-size: 10.5px; font-weight: 800; color: #888888; text-transform: uppercase; letter-spacing: 0.08em;">LOOK 06 • EVERYDAY WEAR</span>
        <h3 style="font-family: var(--font-graphik); font-size: 18px; font-weight: 800; text-transform: uppercase; margin: 4px 0 6px 0; color: #ffffff;">Sage Cotton Essentials</h3>
        <p style="font-size: 13.5px; color: #777777; margin: 0 0 16px 0;">Dense yet ultra-soft 220 GSM combed organic jersey, pre-washed to eliminate shrinkage forever.</p>
        <a href="/eu/en/category/flowers" style="font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: #ffffff; text-decoration: none; border-bottom: 2px solid #ffffff; padding-bottom: 2px;">Shop Cotton T-Shirts →</a>
      </div>
    </div>

  </div>
</main>`;

lookbookHtml = lookbookHtml.slice(0, lbMainStart) + newLbMain + lookbookHtml.slice(lbMainEnd);
fs.writeFileSync('views/lookbook.html', lookbookHtml, 'utf8');
console.log('Successfully updated views/lookbook.html.');

// 2. Update views/about_us.html with official Cottonworld brand story imagery
console.log('Updating views/about_us.html...');
let aboutHtml = fs.readFileSync('views/about_us.html', 'utf8');

// Replace header
const abHeaderStart = aboutHtml.indexOf('<!-- Blurgvillage Style Bold Announcement Bar');
const abHeaderEnd = aboutHtml.indexOf('</nav>', abHeaderStart) + 6;
if (abHeaderStart !== -1 && abHeaderEnd !== -1) {
  aboutHtml = aboutHtml.slice(0, abHeaderStart) + masterHeader + aboutHtml.slice(abHeaderEnd);
}

// Replace images in about us with authentic brand images
aboutHtml = aboutHtml.replace(/https:\/\/cottonworld\.net\/cdn\/shop\/files\/CW-Homepage-Banners-4-New-arrivals-DESKTOP_jpg\.jpg/g, (match, offset) => {
  if (offset % 3 === 0) return 'https://cottonworld.net/cdn/shop/files/About-us--Image-1.jpg';
  if (offset % 3 === 1) return 'https://cottonworld.net/cdn/shop/files/About-us-Image-2.jpg';
  return 'https://cottonworld.net/cdn/shop/files/About-us-Image-3.jpg';
});

aboutHtml = aboutHtml.replace(/silk flowers/gi, 'pure European linen & organic cotton');
aboutHtml = aboutHtml.replace(/silk bouquets/gi, 'natural fiber apparel');
aboutHtml = aboutHtml.replace(/floral arrangements/gi, 'timeless linen collections');

fs.writeFileSync('views/about_us.html', aboutHtml, 'utf8');
console.log('Successfully updated views/about_us.html.');
