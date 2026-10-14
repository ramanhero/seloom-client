const fs = require('fs');
const html = fs.readFileSync('views/index.html', 'utf8');

const sections = html.split('<section');
sections.slice(1).forEach((s, idx) => {
  const content = s.split('</section>')[0];
  const isCarousel = content.includes('BlockCarousel');
  const imgs = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)].map(m => m[1]);
  const hTags = [...content.matchAll(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/g)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  
  console.log(`\n================ Section ${idx + 1} (${isCarousel ? 'CAROUSEL' : 'CONTENT'}) ================`);
  console.log('Headings:', hTags);
  console.log('Images (' + imgs.length + '):');
  imgs.forEach(img => console.log('  -', img));
});
