const fs = require('fs');

const masterHeader = fs.readFileSync('views/header.html', 'utf8');

// Update views/index.html
let indexHtml = fs.readFileSync('views/index.html', 'utf8');
const headerStart = indexHtml.indexOf('<!-- Blurgvillage Style Bold Announcement Bar');
const headerEnd = indexHtml.indexOf('</nav>', headerStart) + 6;

if (headerStart !== -1 && headerEnd !== -1) {
  indexHtml = indexHtml.slice(0, headerStart) + masterHeader + indexHtml.slice(headerEnd);
  fs.writeFileSync('views/index.html', indexHtml, 'utf8');
  console.log('Successfully injected updated header into views/index.html.');
}

// Re-run build_category_pages.js to include updated header
require('./build_category_pages.js');
