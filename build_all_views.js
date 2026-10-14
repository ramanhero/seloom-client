const fs = require('fs');

const spriteDefs = fs.readFileSync('public/sprite.html', 'utf-8');
const cartDrawer = fs.readFileSync('views/cart_drawer.html', 'utf-8');

function buildView(rawFilename, outputFilename, title) {
  if (!fs.existsSync(rawFilename)) return;
  const rawHtml = fs.readFileSync(rawFilename, 'utf-8');

  // Head
  const headEnd = rawHtml.indexOf('</head>');
  let head = rawHtml.slice(0, headEnd);
  head = head.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  head += '\n<link rel="stylesheet" href="/css/custom.css"/>\n</head>';

  // Body
  const bodyStart = rawHtml.indexOf('<body');
  const footerEnd = rawHtml.indexOf('</footer>') + 9;
  let bodyContent = rawHtml.slice(bodyStart, footerEnd);

  // Sprite injection
  if (bodyContent.includes('<div hidden="">')) {
    bodyContent = bodyContent.replace('<div hidden="">', '<div hidden="">' + spriteDefs);
  } else {
    bodyContent = bodyContent.replace('<body', '<body');
    bodyContent = bodyContent.replace('>', '><div hidden="">' + spriteDefs + '</div>');
  }

  const finalHtml = head + '\n' + bodyContent + '\n' + cartDrawer + '\n<script src="/js/store.js"></script>\n</body>\n</html>';
  fs.writeFileSync(outputFilename, finalHtml);
  console.log(`Generated ${outputFilename}! Length: ${finalHtml.length}`);
}

buildView('raw_for_business.html', 'views/for_business.html', 'For Business');
buildView('raw_about_us.html', 'views/about_us.html', 'About Us');
buildView('raw_faq.html', 'views/faq.html', 'FAQ');
