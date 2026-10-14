const fs = require('fs');

function inspectFile(filePath) {
  console.log(`\n================== ${filePath} ==================`);
  const html = fs.readFileSync(filePath, 'utf8');
  const lines = html.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('/products/') || l.includes('Product') || l.includes('Card') || l.includes('card')) {
      if (l.length < 200) {
        console.log(`L${i+1}: ${l.trim()}`);
      } else {
        console.log(`L${i+1} (truncated): ${l.trim().slice(0, 150)}...`);
      }
    }
  });
}

inspectFile('views/category_single_flowers.html');
inspectFile('views/category_silk_bouquets.html');
