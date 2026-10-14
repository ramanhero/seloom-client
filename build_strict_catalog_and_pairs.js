const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('cottonworld_raw_products.json', 'utf8'));

// Strict classification
const allMen = [];
const allWomen = [];
const allTrousers = [];

raw.products.forEach(p => {
  if (!p.images || p.images.length < 2) return;
  
  const title = p.title;
  const isWomen = /\bwomen[’']?s?\b/i.test(title);
  const isMen = !isWomen && /\bmen[’']?s?\b/i.test(title);
  const isBottom = /pant|trouser|culotte|short|chino/i.test(title);

  const cleanItem = {
    id: `prod_${p.handle}`,
    name: title.replace(/Men’s|Men's|Women’s|Women's/g, '').trim(),
    fullName: title,
    handle: p.handle,
    url: `/eu/en/products/${p.handle}/without-vase`,
    gender: isMen ? 'men' : (isWomen ? 'women' : 'unisex'),
    isBottom: isBottom,
    price: Math.floor(Math.random() * 40) + 49, // €49 to €89
    formattedPrice: '',
    currency: '€',
    tag: p.title.includes('Linen') ? '100% Pure Linen' : (p.title.includes('Organic') ? 'Organic Cotton' : 'New Season'),
    inStock: true,
    heroImage: p.images[0].src,
    detailImage: p.images[1].src,
    allImages: p.images.slice(0, 5).map(img => img.src),
    description: `Crafted from 100% natural breathable European linen and combed organic cotton. Features a relaxed tailored fit, reinforced seams, and garment-washed softness for effortless everyday luxury.`,
    dimensions: 'Relaxed Tailored Fit • Sizes S, M, L, XL, XXL',
    care: 'Machine wash gentle cold with like colors. Line dry in shade. Warm iron if desired.'
  };
  cleanItem.formattedPrice = `${cleanItem.price},-`;

  if (isMen) {
    allMen.push(cleanItem);
  } else if (isWomen) {
    allWomen.push(cleanItem);
  }

  if (isBottom) {
    allTrousers.push(cleanItem);
  }
});

console.log(`Classified: ${allMen.length} Men's products, ${allWomen.length} Women's products, ${allTrousers.length} Trousers`);

// Save curated collections
fs.writeFileSync('catalog_men.json', JSON.stringify(allMen, null, 2), 'utf8');
fs.writeFileSync('catalog_women.json', JSON.stringify(allWomen, null, 2), 'utf8');
fs.writeFileSync('catalog_trousers.json', JSON.stringify(allTrousers, null, 2), 'utf8');

// Combine into master products.json
const masterCatalog = [...allMen, ...allWomen];
fs.writeFileSync('products.json', JSON.stringify({ products: masterCatalog }, null, 2), 'utf8');
console.log(`Generated products.json with ${masterCatalog.length} products.`);
