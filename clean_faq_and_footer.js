const fs = require('fs');

let html = fs.readFileSync('views/index.html', 'utf8');

// Replace Schema.org FAQ
html = html.replace(/Do they look like real flowers\?[\s\S]*?reminiscent of fresh flowers\./g, 'What makes European linen superior for everyday wear? European linen is naturally thermo-regulating, highly breathable, moisture-wicking, and softens with every wash.');
html = html.replace(/Should I clean the flowers\?[\s\S]*?dust off carefully\./g, 'How should I wash and care for my linen garments? Machine wash cold on a gentle cycle with eco-friendly detergent and line dry in shade.');

// Replace Mobile Nav links
html = html.replace(/<a href="\/eu\/en\/category\/flowers" class="mobile-nav-link"[^>]*>Single flowers<\/a>/g, '<a href="/eu/en/category/flowers" class="mobile-nav-link">Men\'s Collection</a>');
html = html.replace(/<a href="\/eu\/en\/category\/silk-bouquets" class="mobile-nav-link"[^>]*>All bouquets<\/a>/g, '<a href="/eu/en/category/silk-bouquets" class="mobile-nav-link">Women\'s Collection</a>');
html = html.replace(/<a href="\/eu\/en\/category\/vases" class="mobile-nav-link"[^>]*>Vases<\/a>/g, '<a href="/eu/en/category/vases" class="mobile-nav-link">Linen Trousers</a>');
html = html.replace(/<a href="\/eu\/en\/products\/the-mini-collection" class="mobile-nav-link"[^>]*>The Mini Collection<\/a>/g, '<a href="/eu/en/products/the-mini-collection" class="mobile-nav-link">Women\'s Tops</a>');
html = html.replace(/<a href="\/eu\/en\/bouquet-generator"[^>]*>Create your bouquet<\/a>/g, '<a href="/eu/en/bouquet-generator" class="mobile-nav-link" style="color: #ffffff; font-weight: 700;">Create Look</a>');

// Section 10 Customer Reviews images
const sec10Imgs = [
  'https://cottonworld.net/cdn/shop/files/Category-Cards-NEW-ARRIVALS-_Desktop-_-Mobile-900X506__jpg.jpg',
  'https://cottonworld.net/cdn/shop/files/Category-Cards-BESTSELLERS-_Desktop-_-Mobile-900X506__jpg.jpg',
  'https://cottonworld.net/cdn/shop/files/CW-Homepage-New-arrivals-4-Thumbnail_jpg.jpg',
  'https://cottonworld.net/cdn/shop/files/CW-Homepage-Bestsellers-4-Thumbnail_jpg.jpg',
  'https://cottonworld.net/cdn/shop/files/CW-Homepage-Mens-4-Thumbnail_jpg.jpg',
  'https://cottonworld.net/cdn/shop/files/CW-Homepage-Womens-4-Thumbnail_jpg.jpg'
];

let imgIdx = 0;
html = html.replace(/(<div class="BlockStackedItems-module-scss-module__bdXoSa__container"[\s\S]*?<\/section>)/, (match) => {
  return match.replace(/https:\/\/cottonworld\.net\/cdn\/shop\/files\/[a-zA-Z0-9_\-\.]+\.(?:jpg|png)/g, () => {
    const url = sec10Imgs[imgIdx % sec10Imgs.length];
    imgIdx++;
    return url;
  });
});

fs.writeFileSync('views/index.html', html, 'utf8');
console.log('Successfully cleaned FAQ Schema and mobile nav links in index.html.');
