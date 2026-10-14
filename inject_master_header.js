const fs = require('fs');
const path = require('path');

const headerMarkup = fs.readFileSync('views/header.html', 'utf-8');

const viewsToUpdate = [
  'views/index.html',
  'views/category_silk_bouquets.html',
  'views/for_business.html',
  'views/about_us.html',
  'views/faq.html',
  'views/product.html',
  'views/contact.html',
  'views/lookbook.html',
  'views/terms.html',
  'views/privacy.html'
];

viewsToUpdate.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf-8');

  // If file already has the new header, skip
  if (content.includes('class="bw-navbar"')) {
    console.log(`Skipping ${file} (already has new header)`);
    return;
  }

  // Find old announcement bar & header
  let start = content.indexOf('<div class="AnnouncementBar-module-scss-module__xg8YNq__container">');
  if (start === -1) {
    start = content.indexOf('<header');
  }

  const end = content.indexOf('</header>');

  if (start !== -1 && end !== -1) {
    const before = content.slice(0, start);
    const after = content.slice(end + 9);
    content = before + headerMarkup + after;
    fs.writeFileSync(file, content);
    console.log(`Updated header in ${file}`);
  } else {
    console.warn(`Could not find header in ${file}`);
  }
});
