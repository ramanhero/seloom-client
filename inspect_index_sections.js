const fs = require('fs');
const html = fs.readFileSync('views/index.html', 'utf8');

// Find all sections or main layout blocks
const parts = html.split('<section');
console.log('Total sections in index.html:', parts.length - 1);

parts.slice(1).forEach((part, i) => {
  const sectionContent = part.split('</section>')[0];
  const imgs = [];
  const imgMatches = sectionContent.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g);
  for (const m of imgMatches) {
    imgs.push(m[1]);
  }
  
  // Look for any empty containers, placeholders, or text blocks
  const textPreview = sectionContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100);
  console.log(`\n--- Section ${i + 1} ---`);
  console.log(`Imgs count: ${imgs.length}`);
  console.log(`Text preview: ${textPreview}`);
  if (imgs.length > 0) {
    console.log(`First img: ${imgs[0].slice(0, 80)}...`);
  }
});
