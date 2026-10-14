const fs = require('fs');

const rawHtml = fs.readFileSync('raw_product_oscar.html', 'utf-8');
const spriteDefs = fs.readFileSync('public/sprite.html', 'utf-8');
const cartDrawer = fs.readFileSync('views/cart_drawer.html', 'utf-8');

// Extract head and body
const headEnd = rawHtml.indexOf('</head>');
let head = rawHtml.slice(0, headEnd);
head = head.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
head += '\n<link rel="stylesheet" href="/css/custom.css"/>\n</head>';

const bodyStart = rawHtml.indexOf('<body');
const footerEnd = rawHtml.indexOf('</footer>') + 9;
let bodyContent = rawHtml.slice(bodyStart, footerEnd);

// Inject spriteDefs
if (bodyContent.includes('<div hidden="">')) {
  bodyContent = bodyContent.replace('<div hidden="">', '<div hidden="">' + spriteDefs);
} else {
  bodyContent = bodyContent.replace('<body', '<body');
  bodyContent = bodyContent.replace('>', '><div hidden="">' + spriteDefs + '</div>');
}

// Write master PDP template with placeholders:
// {{PRODUCT_NAME}}, {{PRODUCT_PRICE}}, {{PRODUCT_HANDLE}}, {{HERO_IMAGE}}, {{DETAIL_IMAGE}}, {{DESCRIPTION}}, {{TAG}}
fs.writeFileSync('views/product.html', head + '\n' + bodyContent + '\n' + cartDrawer + '\n<script src="/js/store.js"></script>\n<script src="/js/pdp.js"></script>\n</body>\n</html>');
console.log('Saved views/product.html template, size:', fs.statSync('views/product.html').size);
