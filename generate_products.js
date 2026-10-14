const fs = require('fs');

function extractAll() {
  const sources = ['raw_homepage.html', 'raw_silk_bouquets.html'];
  const map = new Map();

  for (const src of sources) {
    if (!fs.existsSync(src)) continue;
    const html = fs.readFileSync(src, 'utf-8');
    const cardRegex = /<article[^>]*class=["'][^"']*ProductCard[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi;
    let match;
    while ((match = cardRegex.exec(html)) !== null) {
      const cardHtml = match[1];
      const nameMatch = cardHtml.match(/class=["'][^"']*ProductCard[^"']*__name["'][^>]*>([^<]+)<\/span>/i);
      const priceMatch = cardHtml.match(/class=["'][^"']*ProductCard[^"']*__pricesWrapper["'][^>]*>([^<]+)<\/span>/i);
      const linkMatch = cardHtml.match(/href=["'](\/eu\/en\/products\/[^"']+)["']/i);
      const tagMatch = cardHtml.match(/class=["'][^"']*Tag-module[^"']*["'][^>]*>([^<]+)<\/div>/i);
      const imgs = Array.from(cardHtml.matchAll(/srcSet=["']([^"']+)["']/gi)).flatMap(m => {
        return m[1].split(',').map(s => s.trim().split(' ')[0]);
      });
      const singleImgs = Array.from(cardHtml.matchAll(/src=["']([^"']+)["']/gi)).map(m => m[1]);
      const allImgs = [...new Set([...singleImgs, ...imgs])].filter(u => u.startsWith('http'));

      if (nameMatch && nameMatch[1]) {
        const name = nameMatch[1].trim();
        const priceStr = priceMatch ? priceMatch[1].trim() : '99,-';
        const numPrice = parseInt(priceStr.replace(/[^0-9]/g, '')) || 99;
        const link = linkMatch ? linkMatch[1] : `/eu/en/products/${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/without-vase`;
        const handle = link.split('/products/')[1] ? link.split('/products/')[1].split('/')[0] : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const tag = tagMatch ? tagMatch[1].trim() : '';

        // Pick distinct high-res image URLs
        const heroImg = allImgs.find(img => img.includes('HERO')) || allImgs[0] || '';
        const pdpImg = allImgs.find(img => img.includes('INT-PDP') || img.includes('PDP')) || allImgs[1] || heroImg;

        if (!map.has(name)) {
          map.set(name, {
            id: 'prod_' + handle,
            name,
            handle,
            url: `/eu/en/products/${handle}/without-vase`,
            price: numPrice,
            formattedPrice: `${numPrice},-`,
            currency: '€',
            tag,
            inStock: !tag.toLowerCase().includes('sold out'),
            heroImage: heroImg,
            detailImage: pdpImg,
            allImages: allImgs.slice(0, 4),
            description: `The ${name} is an exquisite floral design object created by Bloom & Wolf. Handcrafted from premium silk flowers with a real-touch texture, this timeless arrangement delivers long-lasting elegance without wilting or requiring water.`,
            dimensions: 'Height approx. 65 - 75 cm',
            care: 'Clean carefully with a hair dryer on low, cold setting or with a feather duster.'
          });
        }
      }
    }
  }

  const list = Array.from(map.values());
  console.log(`Extracted ${list.length} products total.`);
  fs.writeFileSync('products.json', JSON.stringify({ products: list }, null, 2));
  console.log('Saved products.json');
}

extractAll();
