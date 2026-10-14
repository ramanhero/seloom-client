const fs = require('fs');

const rawHtml = fs.readFileSync('raw_silk_bouquets.html', 'utf-8');
const spriteDefs = fs.readFileSync('public/sprite.html', 'utf-8');
const cartDrawer = fs.readFileSync('views/cart_drawer.html', 'utf-8');
const { products } = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

// Extract head and body
const headEnd = rawHtml.indexOf('</head>');
let head = rawHtml.slice(0, headEnd);
head = head.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
head += '\n<link rel="stylesheet" href="/css/custom.css"/>\n</head>';

const bodyStart = rawHtml.indexOf('<body');
const footerEnd = rawHtml.indexOf('</footer>') + 9;
let bodyContent = rawHtml.slice(bodyStart, footerEnd);

// Inject spriteDefs into <div hidden=""> or after <body>
if (bodyContent.includes('<div hidden="">')) {
  bodyContent = bodyContent.replace('<div hidden="">', '<div hidden="">' + spriteDefs);
} else {
  bodyContent = bodyContent.replace('<body', '<body');
  bodyContent = bodyContent.replace('>', '><div hidden="">' + spriteDefs + '</div>');
}

// Generate Product Grid Items
let productCardsHtml = '';
products.forEach(p => {
  const inStock = p.inStock;
  const tagHtml = p.tag ? `
    <div style="position: absolute; top: 12px; left: 12px; z-index: 2;">
      <span style="display: inline-block; padding: 4px 10px; font-size: 11px; text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; background: ${p.tag.includes('sold out') ? '#e8e6dd' : '#c7dbfa'}; color: ${p.tag.includes('sold out') ? '#666' : '#2a488d'}; border-radius: 2px;">
        ${p.tag}
      </span>
    </div>
  ` : '';

  const btnHtml = inStock 
    ? `<button type="button" class="quick-add-btn" onclick="event.preventDefault(); event.stopPropagation(); addToCart({id:'${p.handle}', name:'${p.name.replace(/'/g, "\\'")}', price:${p.price}, image:'${p.heroImage}', variant:'Without vase'});">+ Add</button>`
    : `<span style="font-size: 11px; color: #999; font-weight: 500; text-transform: uppercase;">Sold out</span>`;

  productCardsHtml += `
    <li class="plp-grid-card" style="list-style: none; position: relative;">
      <div style="position: relative; overflow: hidden; border-radius: 4px; background: #faf9f5; aspect-ratio: 3/4;">
        ${tagHtml}
        <a href="${p.url}" style="display: block; width: 100%; height: 100%; text-decoration: none;">
          <img src="${p.heroImage}" alt="${p.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease;" onmouseover="if ('${p.detailImage}') this.src='${p.detailImage}'" onmouseout="this.src='${p.heroImage}'">
        </a>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-top: 14px;">
        <div>
          <a href="${p.url}" style="text-decoration: none; color: inherit;">
            <h3 style="font-family: var(--font-times-now); font-size: 18px; font-weight: 500; margin: 0 0 4px 0;">${p.name}</h3>
          </a>
          <span style="font-size: 14px; font-weight: 600; color: #2C2C12;">€${p.price},-</span>
        </div>
        <div>
          ${btnHtml}
        </div>
      </div>
    </li>
  `;
});

// Category Filter Toolbar
const filterToolbar = `
  <div style="max-width: 1440px; margin: 0 auto; padding: 24px 24px 16px 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; border-bottom: 1px solid rgba(0,0,0,0.06);">
    <div>
      <h1 style="font-family: var(--font-times-now); font-size: 32px; font-weight: 400; margin: 0 0 6px 0;">Silk Bouquets</h1>
      <p style="font-size: 14px; color: #666; margin: 0;">${products.length} luxury bouquets arranged by master florists</p>
    </div>
    <div style="display: flex; gap: 12px; align-items: center;">
      <button type="button" class="quick-add-btn" onclick="filterBouquets('all')" style="background: var(--bw-deep-green); color: #fff;">All (${products.length})</button>
      <button type="button" class="quick-add-btn" onclick="filterBouquets('available')">In Stock</button>
      <button type="button" class="quick-add-btn" onclick="filterBouquets('under100')">Under €100</button>
    </div>
  </div>
`;

// Replace skeleton grid with populated products grid
const gridMarkup = `
  ${filterToolbar}
  <div style="max-width: 1440px; margin: 0 auto; padding: 32px 24px 60px 24px;">
    <ul id="plp-products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 32px; padding: 0; margin: 0;">
      ${productCardsHtml}
    </ul>
  </div>
`;

bodyContent = bodyContent.replace(/<!--\$\?-->[\s\S]*?<!--\/\$-->/, gridMarkup);

// Filter script
const filterScript = `
<script>
  function filterBouquets(type) {
    const cards = document.querySelectorAll('.plp-grid-card');
    cards.forEach(card => {
      const isSoldOut = card.innerText.includes('Sold out');
      const priceText = card.querySelector('span[style*="font-weight: 600"]').innerText;
      const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
      
      if (type === 'all') {
        card.style.display = 'block';
      } else if (type === 'available') {
        card.style.display = isSoldOut ? 'none' : 'block';
      } else if (type === 'under100') {
        card.style.display = (price < 100 && !isSoldOut) ? 'none' : (price < 100 ? 'block' : 'none');
      }
    });
  }
</script>
`;

const finalHtml = head + '\n' + bodyContent + '\n' + cartDrawer + '\n<script src="/js/store.js"></script>\n' + filterScript + '\n</body>\n</html>';
fs.writeFileSync('views/category_silk_bouquets.html', finalHtml);
console.log('Successfully created views/category_silk_bouquets.html!');
