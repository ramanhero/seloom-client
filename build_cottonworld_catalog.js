const fs = require('fs');
const path = require('path');

const cwData = JSON.parse(fs.readFileSync('cottonworld_raw_products.json', 'utf8'));
const currentProds = JSON.parse(fs.readFileSync('products.json', 'utf8')).products;

// Used image URLs tracker to guarantee NO duplicates across product slots
const usedImageUrls = new Set();
const usedProductIds = new Set();

// 29 Color & Product specifications
const productSpecs = [
  { handle: 'the-oscar', color: 'mustard', name: "The Oscar Linen T-Shirt", category: "Men's Tops" },
  { handle: 'the-bowman', color: 'olive', name: "The Bowman Olive Linen Pant", category: "Women's Pants" },
  { handle: 'the-compton', color: 'beige', name: "The Compton Wide-Leg Linen Trouser", category: "Women's Pants" },
  { handle: 'the-thatcher', color: 'maroon', name: "The Thatcher Cotton Culotte", category: "Women's Culottes" },
  { handle: 'the-becker', color: 'peach', name: "The Becker Peach Linen Blouse", category: "Women's Tops" },
  { handle: 'the-inki', color: 'navy', name: "The Inki Cotton Poplin Shirt", category: "Men's Shirts" },
  { handle: 'the-lowe', color: 'khaki', name: "The Lowe Linen Relaxed Short", category: "Women's Shorts" },
  { handle: 'ruby-rose-bouquet', color: 'red', name: "The Ruby Cotton Slim Tee", category: "Women's T-Shirts" },
  { handle: 'the-fitzgerald', color: 'sage', name: "The Fitzgerald Sage Barrel Pant", category: "Women's Pants" },
  { handle: 'the-zacchero', color: 'blue', name: "The Zacchero Linen Boxy Dress", category: "Women's Dresses" },
  { handle: 'the-newman', color: 'yellow', name: "The Newman Cotton Regular T-Shirt", category: "Men's T-Shirts" },
  { handle: 'the-benetton', color: 'orange', name: "The Benetton Coral Linen Blouse", category: "Women's Tops" },
  { handle: 'the-roman', color: 'white', name: "The Roman Pure White Linen Shirt", category: "Men's Shirts" },
  { handle: 'king-protea-bouquet', color: 'pink', name: "The Protea Pink Linen Blouse", category: "Women's Tops" },
  { handle: 'fuchsia-peony-bouquet', color: 'pink', name: "The Fuchsia Linen Popover Tunic", category: "Women's Tops" },
  { handle: 'the-moracchini', color: 'green', name: "The Moracchini Olive Camp Shirt", category: "Men's Shirts" },
  { handle: 'the-louis', color: 'navy', name: "The Louis Navy Mandarin Kurta", category: "Men's Kurtas" },
  { handle: 'the-malherbe', color: 'cream', name: "The Malherbe Cream Linen Culotte", category: "Women's Culottes" },
  { handle: 'the-warnix', color: 'black', name: "The Warnix Black Linen Shirt", category: "Men's Shirts" },
  { handle: 'white-rose-bouquet', color: 'white', name: "The Classic White Cotton Shirt", category: "Men's Shirts" },
  { handle: 'the-roth', color: 'grey', name: "The Roth Grey Linen Lounge Pant", category: "Men's Pants" },
  { handle: 'the-sinclair-c26fw', color: 'navy', name: "The Sinclair Indigo Linen Blazer", category: "Men's Jackets" },
  { handle: 'the-thompson', color: 'khaki', name: "The Thompson Pleated Linen Trouser", category: "Men's Pants" },
  { handle: 'yellow-rose-bouquet', color: 'yellow', name: "The Sunflow Yellow Cotton Polo", category: "Men's T-Shirts" },
  { handle: 'lotus-bouquet', color: 'blue', name: "The Lotus Tencel Sleeveless Dress", category: "Women's Dresses" },
  { handle: 'yellow-poppy-bouquet', color: 'mustard', name: "The Ochre Linen Casual Shirt", category: "Men's Shirts" },
  { handle: 'snow-dahlia-bouquet', color: 'white', name: "The Snow White Linen Relaxed Top", category: "Women's Tops" },
  { handle: 'the-hoff', color: 'brown', name: "The Hoff Espresso Linen Chino", category: "Men's Pants" },
  { handle: 'the-royle', color: 'black', name: "The Royle Noir Linen Trouser", category: "Men's Pants" }
];

const updatedProducts = [];
const imageMapping = {}; // Old filename -> New Cottonworld URL

productSpecs.forEach(spec => {
  // Find matching Cottonworld product
  let matched = cwData.products.find(p => {
    if (usedProductIds.has(p.id)) return false;
    const hasColor = new RegExp('\\b' + spec.color + '\\b', 'i').test(p.title) ||
                     (p.tags && p.tags.some(t => new RegExp('\\b' + spec.color + '\\b', 'i').test(t)));
    return hasColor && p.images && p.images.length >= 2;
  });

  // Fallback if specific color exhausted
  if (!matched) {
    matched = cwData.products.find(p => !usedProductIds.has(p.id) && p.images && p.images.length >= 2);
  }

  if (matched) {
    usedProductIds.add(matched.id);
    const imgs = matched.images.map(img => img.src);
    imgs.forEach(url => usedImageUrls.add(url));

    const oldProd = currentProds.find(p => p.handle === spec.handle) || {};
    
    // Associate old hero/detail image with new ones
    if (oldProd.heroImage) {
      const oldHeroBase = oldProd.heroImage.split('?')[0].split('/').pop();
      imageMapping[oldHeroBase] = imgs[0];
    }
    if (oldProd.detailImage) {
      const oldDetailBase = oldProd.detailImage.split('?')[0].split('/').pop();
      imageMapping[oldDetailBase] = imgs[1] || imgs[0];
    }

    updatedProducts.push({
      id: oldProd.id || `prod_${spec.handle}`,
      name: spec.name,
      handle: spec.handle,
      url: `/eu/en/products/${spec.handle}/without-vase`,
      price: oldProd.price || 99,
      formattedPrice: `${oldProd.price || 99},-`,
      currency: "€",
      tag: oldProd.tag || "New Arrival",
      inStock: true,
      heroImage: imgs[0],
      detailImage: imgs[1] || imgs[0],
      allImages: imgs.slice(0, 4),
      description: `The ${spec.name} is crafted from 100% natural breathable European linen and combed organic cotton. Designed with a modern relaxed silhouette, refined tailoring, and pre-washed softness for everyday comfort and effortless understated luxury.`,
      dimensions: "Regular Fit • Available in Sizes S, M, L, XL, XXL",
      care: "Machine wash cold with like colours on gentle cycle. Use eco-friendly liquid detergent. Do not bleach. Line dry in shade. Warm iron if desired."
    });
  }
});

fs.writeFileSync('products.json', JSON.stringify({ products: updatedProducts }, null, 2), 'utf8');
console.log(`Successfully generated products.json with ${updatedProducts.length} apparel products.`);
fs.writeFileSync('product_image_mapping.json', JSON.stringify(imageMapping, null, 2), 'utf8');
