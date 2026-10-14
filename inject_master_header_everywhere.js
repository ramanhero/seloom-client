const fs = require('fs');
const path = require('path');

const masterHeader = fs.readFileSync('views/header.html', 'utf8');
const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html') && f !== 'header.html' && f !== 'cart_drawer.html');

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace header block if exists
  const headerStart = html.indexOf('<!-- Blurgvillage Style Bold Announcement Bar');
  if (headerStart !== -1) {
    const headerEnd = html.indexOf('</nav>', headerStart) + 6;
    if (headerEnd !== -1) {
      html = html.slice(0, headerStart) + masterHeader + html.slice(headerEnd);
    }
  }

  // Wording cleanups
  html = html.replace(/Create Your Own Bouquet/g, 'Create Your Own Look');
  html = html.replace(/Create your bouquet/g, 'Create Look');
  html = html.replace(/create your bouquet/gi, 'create look');
  html = html.replace(/silk bouquets/gi, 'linen collections');
  html = html.replace(/silk bouquet/gi, 'linen collection');
  html = html.replace(/silk flowers/gi, 'natural fibers');
  html = html.replace(/silk flower/gi, 'natural fiber');
  html = html.replace(/bouquet/gi, 'garment');
  html = html.replace(/Bouquet/gi, 'Garment');

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Synced header and copy in ${file}`);
});
console.log('Finished updating all views!');
