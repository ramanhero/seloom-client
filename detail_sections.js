const fs = require('fs');
const html = fs.readFileSync('views/index.html', 'utf8');

const sections = html.split('<section');
sections.slice(1).forEach((s, idx) => {
  const content = '<section' + s.split('</section>')[0] + '</section>';
  console.log(`\n================ SECTION ${idx + 1} ================`);
  // Print class name
  const classMatch = content.match(/class=["']([^"']+)["']/);
  console.log('Class:', classMatch ? classMatch[1] : 'none');
  
  // Print all headings or text snippets
  const text = content.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  console.log('Text (first 250 chars):', text.slice(0, 250));

  // Print all images
  const imgs = [...content.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/g)].map(m => m[1]);
  console.log('Images (' + imgs.length + '):');
  imgs.forEach(i => console.log('  *', i.split('?')[0]));
});
