const fs = require('fs');

const rawHtml = fs.readFileSync('raw_homepage.html', 'utf-8');
const spriteDefs = fs.readFileSync('public/sprite.html', 'utf-8');
const cartDrawer = fs.readFileSync('views/cart_drawer.html', 'utf-8');

// Find head end and footer end
const headEnd = rawHtml.indexOf('</head>');
let head = rawHtml.slice(0, headEnd);

// Remove scripts from head
head = head.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
head += '\n<link rel="stylesheet" href="/css/custom.css"/>\n</head>';

// Body up to footer
const bodyStart = rawHtml.indexOf('<body');
const footerEnd = rawHtml.indexOf('</footer>') + 9;
let bodyContent = rawHtml.slice(bodyStart, footerEnd);

// Inject spriteDefs into <div hidden="">
if (bodyContent.includes('<div hidden="">')) {
  bodyContent = bodyContent.replace('<div hidden="">', '<div hidden="">' + spriteDefs);
} else {
  bodyContent = bodyContent.replace('<body', '<body');
  bodyContent = bodyContent.replace('>', '><div hidden="">' + spriteDefs + '</div>');
}

// Assemble final HTML
const finalHtml = head + '\n' + bodyContent + '\n' + cartDrawer + '\n<script src="/js/store.js"></script>\n</body>\n</html>';

fs.writeFileSync('views/index.html', finalHtml);
console.log('views/index.html built cleanly! Length:', finalHtml.length);
