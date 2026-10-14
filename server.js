const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { execSync } = require('child_process');

const PORT = 3003;

// 1. Terminate any existing process on port 3003
try {
  const pids = execSync(`lsof -ti :${PORT}`, { encoding: 'utf-8' }).trim();
  if (pids) {
    console.log(`Port ${PORT} is occupied by PID(s): ${pids.split('\n').join(', ')}. Stopping...`);
    pids.split('\n').forEach(pid => {
      try {
        process.kill(Number(pid), 'SIGKILL');
      } catch (e) {}
    });
    // Wait briefly for port release
    execSync('sleep 0.2');
    console.log(`Successfully freed port ${PORT}.`);
  }
} catch (e) {
  // Port is already free
}

// 2. Load products catalog
let productsCatalog = [];
const prodMap = new Map();
try {
  const rawCatalog = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8');
  productsCatalog = JSON.parse(rawCatalog).products || [];
  productsCatalog.forEach(p => {
    prodMap.set(p.handle.toLowerCase(), p);
  });
  console.log(`Loaded ${productsCatalog.length} products from catalog.`);
} catch (e) {
  console.warn('Could not load products.json:', e.message);
}

// 3. MIME types
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon'
};

// 4. Static Views Mapper
const STATIC_VIEWS = {
  '/': 'views/index.html',
  '/eu/en': 'views/index.html',
  '/category/silk-bouquets': 'views/category_silk_bouquets.html',
  '/eu/en/category/silk-bouquets': 'views/category_silk_bouquets.html',
  '/category/silk-garments': 'views/category_silk_bouquets.html',
  '/eu/en/category/silk-garments': 'views/category_silk_bouquets.html',
  '/category/flowers': 'views/category_single_flowers.html',
  '/eu/en/category/flowers': 'views/category_single_flowers.html',
  '/category/vases': 'views/category_vases.html',
  '/eu/en/category/vases': 'views/category_vases.html',
  '/products/wall-print': 'views/wall_prints.html',
  '/eu/en/products/wall-print': 'views/wall_prints.html',
  '/products/the-mini-collection': 'views/mini_collection.html',
  '/eu/en/products/the-mini-collection': 'views/mini_collection.html',
  '/bouquet-generator': 'views/bouquet_generator.html',
  '/eu/en/bouquet-generator': 'views/bouquet_generator.html',
  '/garment-generator': 'views/bouquet_generator.html',
  '/eu/en/garment-generator': 'views/bouquet_generator.html',
  '/gifting': 'views/gifting.html',
  '/eu/en/gifting': 'views/gifting.html',
  '/floral-gifts': 'views/gifting.html',
  '/eu/en/floral-gifts': 'views/gifting.html',
  '/products/gift-card': 'views/gifting.html',
  '/eu/en/products/gift-card': 'views/gifting.html',
  '/stores': 'views/stores.html',
  '/eu/en/stores': 'views/stores.html',
  '/team': 'views/team.html',
  '/eu/en/team': 'views/team.html',
  '/symbolism': 'views/symbolism.html',
  '/eu/en/symbolism': 'views/symbolism.html',
  '/sculptures': 'views/sculptures.html',
  '/eu/en/sculptures': 'views/sculptures.html',
  '/popular': 'views/popular.html',
  '/eu/en/popular': 'views/popular.html',
  '/portfolio': 'views/portfolio.html',
  '/eu/en/portfolio': 'views/portfolio.html',
  '/journal': 'views/journal.html',
  '/eu/en/journal': 'views/journal.html',
  '/how-renting-works': 'views/how_renting_works.html',
  '/eu/en/how-renting-works': 'views/how_renting_works.html',
  '/how-it-works': 'views/how_renting_works.html',
  '/eu/en/how-it-works': 'views/how_renting_works.html',
  '/for-business': 'views/for_business.html',
  '/eu/en/for-business': 'views/for_business.html',
  '/for-business/membership': 'views/for_business.html',
  '/eu/en/for-business/membership': 'views/for_business.html',
  '/corporate-gifting': 'views/gifting.html',
  '/eu/en/corporate-gifting': 'views/gifting.html',
  '/form/tailor-made-quote': 'views/contact.html',
  '/eu/en/form/tailor-made-quote': 'views/contact.html',
  '/events': 'views/portfolio.html',
  '/eu/en/events': 'views/portfolio.html',
  '/about-us': 'views/about_us.html',
  '/eu/en/about-us': 'views/about_us.html',
  '/lookbook': 'views/lookbook.html',
  '/eu/en/lookbook': 'views/lookbook.html',
  '/support/delivery-and-returns': 'views/delivery_returns.html',
  '/eu/en/support/delivery-and-returns': 'views/delivery_returns.html',
  '/support/faq': 'views/faq.html',
  '/eu/en/support/faq': 'views/faq.html',
  '/support/contact': 'views/contact.html',
  '/eu/en/support/contact': 'views/contact.html',
  '/login': 'views/login.html',
  '/eu/en/login': 'views/login.html',
  '/account': 'views/login.html',
  '/eu/en/account': 'views/login.html',
  '/terms-of-service': 'views/terms.html',
  '/eu/en/terms-of-service': 'views/terms.html',
  '/privacy-policy': 'views/privacy.html',
  '/eu/en/privacy-policy': 'views/privacy.html'
};

function serveFile(req, res, filePath) {
  try {
    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stat.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    });
    fs.createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
}

// In-memory session cart storage
let serverCart = { items: [], total_price: 0, item_count: 0 };

function renderProductDetail(req, res, handle) {
  let prod = prodMap.get(handle.toLowerCase());
  if (!prod) {
    const clean = handle.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const [key, p] of prodMap.entries()) {
      const cleanKey = key.replace(/[^a-z0-9]/g, '');
      if (cleanKey === clean || (clean.length > 4 && cleanKey.includes(clean)) || (cleanKey.length > 4 && clean.includes(cleanKey))) {
        prod = p;
        break;
      }
    }
  }
  if (!prod) prod = productsCatalog[0];
  if (!prod) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    return res.end('Product not found');
  }

  try {
    let pdpHtml = fs.readFileSync(path.join(__dirname, 'views', 'product.html'), 'utf-8');

    // Title & Meta
    pdpHtml = pdpHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>SÈLOOM | ${prod.name}</title>`);
    
    // Product Title
    pdpHtml = pdpHtml.replace(/<h1 class="B2CHero-module-scss-module__ELtPEG__title">[\s\S]*?<\/h1>/i, `<h1 class="B2CHero-module-scss-module__ELtPEG__title">${prod.name}</h1>`);
    pdpHtml = pdpHtml.replace(/<h1 class="B2CBuyWidget-module-scss-module__GNANQa__stickyTitle">[\s\S]*?<\/h1>/i, `<h1 class="B2CBuyWidget-module-scss-module__GNANQa__stickyTitle">${prod.name}</h1>`);

    // Price
    pdpHtml = pdpHtml.replace(/99,-/g, `${prod.price},-`);

    // Status tag
    if (prod.tag) {
      pdpHtml = pdpHtml.replace(/Temporarily sold out/g, prod.tag);
    }

    // Hero image
    if (prod.heroImage) {
      pdpHtml = pdpHtml.replace(/https:\/\/cdn\.shopify\.com\/s\/files\/1\/1231\/6442\/files\/M-TSHIRT-15906-21550-MUSTARD_1\.jpg[^\s"']*/g, prod.heroImage);
      pdpHtml = pdpHtml.replace(/Oscar-HERO-og\.jpg[^\s"']*/g, prod.heroImage);
      pdpHtml = pdpHtml.replace(/Oscar-HERO-PDP\.jpg[^\s"']*/g, prod.heroImage);
    }
    // Detail image
    if (prod.detailImage) {
      pdpHtml = pdpHtml.replace(/https:\/\/cdn\.shopify\.com\/s\/files\/1\/1231\/6442\/files\/M-TSHIRT-15906-21550-MUSTARD_3\.jpg[^\s"']*/g, prod.detailImage);
      pdpHtml = pdpHtml.replace(/Oscar-INT-PDP\.jpg[^\s"']*/g, prod.detailImage);
    }

    // Tab description
    pdpHtml = pdpHtml.replace(/Five rust-coloured silk orchids, nothing more needed\. Feminine, sculptural and unmistakably autumnal\. The bouquet comes with our complimentary floral scent\./g, prod.description);

    // Inject __PDP_DATA__ script
    const injection = `<script>window.__PDP_DATA__ = ${JSON.stringify(prod)};</script>`;
    pdpHtml = pdpHtml.replace('</head>', injection + '</head>');

    // Replace Add button if sold out
    if (!prod.inStock) {
      pdpHtml = pdpHtml.replace(/<button type="submit"[^>]*>[\s\S]*?<\/button>/i, '<button type="button" class="checkout-btn" style="background: #999; cursor: not-allowed;" disabled>Temporarily Sold Out</button>');
    } else {
      pdpHtml = pdpHtml.replace(/<button type="submit"[^>]*>[\s\S]*?<\/button>/i, `<button type="submit" id="pdp-add-to-bag-btn" class="checkout-btn" style="background: var(--bw-deep-green);">Add to bag • €${prod.price},-</button>`);
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(pdpHtml);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error rendering product: ' + err.message);
  }
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';
  console.log(`[REQ] ${req.method} ${pathname}`);

  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  // 1. API: /products.json
  if (pathname === '/products.json') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify({ products: productsCatalog }));
  }

  // 2. All /cart APIs
  if (pathname.startsWith('/cart')) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const item = JSON.parse(body || '{}');
          if (item.id || item.name) {
            serverCart.items.push(item);
          }
          serverCart.item_count = serverCart.items.reduce((s, i) => s + (i.quantity || 1), 0);
          serverCart.total_price = serverCart.items.reduce((s, i) => s + ((i.price || 0) * (i.quantity || 1)), 0);
        } catch (e) {}
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(serverCart));
      });
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(serverCart));
  }

  // 4. Check static public assets (public/)
  let publicPath = path.join(__dirname, 'public', pathname);
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    return serveFile(req, res, publicPath);
  }

  // Also check if request starts with /public/
  if (pathname.startsWith('/public/')) {
    let sub = pathname.replace('/public/', '');
    let check = path.join(__dirname, 'public', sub);
    if (fs.existsSync(check) && fs.statSync(check).isFile()) {
      return serveFile(req, res, check);
    }
  }

  // 5. Check Static Views
  const viewFile = STATIC_VIEWS[pathname];
  if (viewFile) {
    const fullPath = path.join(__dirname, viewFile);
    if (fs.existsSync(fullPath)) {
      return serveFile(req, res, fullPath);
    }
  }

  // 6. Product Detail Page routes: /products/:handle or /eu/en/products/:handle
  const pdpMatch = pathname.match(/^(?:\/eu\/en)?\/products\/([^\/]+)(?:\/.*)?$/);
  if (pdpMatch) {
    const handle = pdpMatch[1];
    return renderProductDetail(req, res, handle);
  }

  // Fallback: Default to Homepage
  const fallbackIndex = path.join(__dirname, 'views', 'index.html');
  if (fs.existsSync(fallbackIndex)) {
    return serveFile(req, res, fallbackIndex);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('SÈLOOM: Page Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ SÈLOOM luxury wear server running at http://localhost:${PORT}`);
  console.log(`✨ Live preview ready at http://localhost:${PORT}/eu/en`);
});
