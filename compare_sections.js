const fs = require('fs');

const raw = fs.readFileSync('raw_homepage.html', 'utf8');
const cur = fs.readFileSync('views/index.html', 'utf8');

const rawSections = raw.split('<section').slice(1);
const curSections = cur.split('<section').slice(1);

console.log('Raw sections:', rawSections.length, '| Cur sections:', curSections.length);

rawSections.forEach((s, idx) => {
  const rawContent = s.split('</section>')[0];
  const curContent = (curSections[idx] || '').split('</section>')[0];
  
  const rawImgs = [...rawContent.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  const curImgs = [...curContent.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
  
  console.log(`\n--- Section ${idx + 1} ---`);
  console.log(`Raw imgs (${rawImgs.length}):`, rawImgs.map(i => i.split('/').pop().split('?')[0]));
  console.log(`Cur imgs (${curImgs.length}):`, curImgs.map(i => i.split('/').pop().split('?')[0]));
});
