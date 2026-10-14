const fs = require('fs');
const path = require('path');

const views = [
  'views/index.html',
  'views/category_silk_bouquets.html',
  'views/for_business.html',
  'views/about_us.html',
  'views/faq.html',
  'views/contact.html',
  'views/lookbook.html',
  'views/terms.html',
  'views/privacy.html',
  'views/product.html'
];

console.log('--- Verifying Views on Disk ---');
for (const v of views) {
  const p = path.join(__dirname, v);
  if (fs.existsSync(p)) {
    const stat = fs.statSync(p);
    console.log(`✅ ${v}: ${stat.size} bytes`);
  } else {
    console.error(`❌ MISSING: ${v}`);
  }
}

console.log('\n--- Verifying Products Catalog ---');
const catalog = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'));
console.log(`✅ ${catalog.products.length} products loaded in catalog.`);

console.log('\n--- Verifying Public Assets ---');
const svgs = fs.readdirSync(path.join(__dirname, 'public/svg')).filter(f => f.endsWith('.svg'));
console.log(`✅ ${svgs.length} SVG symbols in public/svg/`);
const css = fs.readdirSync(path.join(__dirname, 'public/_next/static/chunks')).filter(f => f.endsWith('.css'));
console.log(`✅ ${css.length} CSS stylesheets in public/_next/static/chunks/`);
console.log(`✅ Custom CSS: ${fs.statSync('public/css/custom.css').size} bytes`);
console.log(`✅ Store JS: ${fs.statSync('public/js/store.js').size} bytes`);
