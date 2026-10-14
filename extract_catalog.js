const fs = require('fs');

function extractProducts(filename) {
  const html = fs.readFileSync(filename, 'utf-8');
  const products = [];

  // Product cards usually have <article class="ProductCard... or link to /products/
  const cardRegex = /<article[^>]*class=["'][^"']*ProductCard[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    const cardHtml = match[1];

    // Name
    const nameMatch = cardHtml.match(/class=["'][^"']*ProductCard[^"']*__name["'][^>]*>([^<]+)<\/span>/i);
    // Price
    const priceMatch = cardHtml.match(/class=["'][^"']*ProductCard[^"']*__pricesWrapper["'][^>]*>([^<]+)<\/span>/i);
    // Link
    const linkMatch = cardHtml.match(/href=["'](\/eu\/en\/products\/[^"']+)["']/i);
    // Tag
    const tagMatch = cardHtml.match(/class=["'][^"']*Tag-module[^"']*["'][^>]*>([^<]+)<\/div>/i);
    // Images
    const imgMatches = Array.from(cardHtml.matchAll(/src=["']([^"']+)["']/gi)).map(m => m[1]);
    const srcSets = Array.from(cardHtml.matchAll(/srcSet=["']([^"']+)["']/gi)).map(m => m[1]);

    const allImgs = [...imgMatches];
    srcSets.forEach(s => {
      s.split(',').forEach(part => {
        const url = part.trim().split(' ')[0];
        if (url && !allImgs.includes(url)) allImgs.push(url);
      });
    });

    const product = {
      name: nameMatch ? nameMatch[1].trim() : 'Unknown',
      price: priceMatch ? priceMatch[1].trim() : '€99,-',
      url: linkMatch ? linkMatch[1] : '',
      tag: tagMatch ? tagMatch[1].trim() : '',
      images: allImgs.filter(u => u.includes('cdn.shopify.com') || u.includes('ctfassets'))
    };

    if (product.name !== 'Unknown' && !products.find(p => p.name === product.name)) {
      products.push(product);
    }
  }

  // Also check RSC payload
  const rscProdRegex = /"title":"([^"]+)","handle":"([^"]+)","price":(\d+)/g;
  while ((match = rscProdRegex.exec(html)) !== null) {
    console.log('RSC product:', match[1], match[2], match[3]);
  }

  return products;
}

console.log('Homepage products:');
const homeProds = extractProducts('raw_homepage.html');
console.log(homeProds);

console.log('\nSilk Bouquets products:');
const catProds = extractProducts('raw_silk_bouquets.html');
console.log(catProds);
