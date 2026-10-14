const fs = require('fs');
const path = require('path');

const headerMarkup = fs.readFileSync('views/header.html', 'utf8').trim();
const cartDrawerMarkup = fs.readFileSync('views/cart_drawer.html', 'utf8').trim();

const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html') && f !== 'header.html' && f !== 'cart_drawer.html');

let updatedCount = 0;

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Locate announcement bar / header start
  let startIdx = content.indexOf('<!-- Blurgvillage Style Bold Announcement Bar');
  if (startIdx === -1) {
    startIdx = content.indexOf('<!-- Bloom & Wolf Master Navigation Header');
  }
  if (startIdx === -1) {
    startIdx = content.indexOf('<div class="bw-announcement-bar">');
  }
  if (startIdx === -1) {
    startIdx = content.indexOf('<div class="AnnouncementBar-module-scss-module');
  }
  if (startIdx === -1) {
    startIdx = content.indexOf('<header');
  }

  if (startIdx === -1) {
    console.warn(`Could not locate header start in ${file}`);
    return;
  }

  let endIdx = -1;
  const bvCatIdx = content.indexOf('id="bv-category-bar"', startIdx);
  if (bvCatIdx !== -1) {
    const navEnd = content.indexOf('</nav>', bvCatIdx);
    if (navEnd !== -1) {
      endIdx = navEnd + '</nav>'.length;
    }
  }

  if (endIdx === -1) {
    const headerEnd = content.indexOf('</header>', startIdx);
    if (headerEnd !== -1) {
      endIdx = headerEnd + '</header>'.length;
    }
  }

  if (endIdx === -1) {
    console.warn(`Could not locate header end in ${file}`);
    return;
  }

  const before = content.slice(0, startIdx);
  const after = content.slice(endIdx);

  let newContent = before + headerMarkup + after;

  // Ensure custom.css is included in <head>
  if (!newContent.includes('/css/custom.css')) {
    newContent = newContent.replace('</head>', '  <link rel="stylesheet" href="/css/custom.css">\n</head>');
  }

  // Ensure store.js is included before </body>
  if (!newContent.includes('/js/store.js')) {
    newContent = newContent.replace('</body>', '  <script src="/js/store.js" defer></script>\n</body>');
  }

  // Ensure cart drawer is included before </body>
  if (!newContent.includes('id="cart-drawer-items-list"')) {
    newContent = newContent.replace('</body>', '\n' + cartDrawerMarkup + '\n</body>');
  }

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Successfully updated: ${file}`);
  updatedCount++;
});

console.log(`\nFinished updating ${updatedCount} view files with Blurgvillage master header & sticky category bar!`);
