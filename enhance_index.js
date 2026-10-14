const fs = require('fs');

let html = fs.readFileSync('views/index.html', 'utf-8');
const { products } = JSON.parse(fs.readFileSync('products.json', 'utf-8'));
const prodMap = new Map(products.map(p => [p.name.toLowerCase(), p]));

// Enhance infoBars
html = html.replace(/<div class="ProductCard-module-scss-module__l3bOlW__infoBar">([\s\S]*?)<\/div>/gi, (match, inner) => {
  const nameMatch = inner.match(/class="ProductCard-module-scss-module__l3bOlW__name">([^<]+)<\/span>/i);
  if (!nameMatch) return match;

  const name = nameMatch[1].trim();
  const prod = prodMap.get(name.toLowerCase());
  if (!prod) return match;

  const inStock = prod.inStock;
  const btnHtml = inStock 
    ? `<button type="button" class="quick-add-btn" onclick="event.preventDefault(); event.stopPropagation(); addToCart({id:'${prod.handle}', name:'${prod.name.replace(/'/g, "\\'")}', price:${prod.price}, image:'${prod.heroImage}', variant:'Without vase'});">+ Add</button>`
    : `<span style="font-size: 11px; color: #999; font-weight: 500; text-transform: uppercase;">Sold out</span>`;

  return `<div class="ProductCard-module-scss-module__l3bOlW__infoBar" style="display: flex; align-items: center; justify-content: space-between;">${inner}${btnHtml}</div>`;
});

fs.writeFileSync('views/index.html', html);
console.log('views/index.html enhanced with Quick Add buttons!');
