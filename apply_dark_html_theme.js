const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html'));

let count = 0;

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Next.js root inline theme variables
  content = content.replace(
    /--color-black:\s*0\s+0\s+0;/g,
    '--color-black:255 255 255;'
  );
  content = content.replace(
    /--color-white:\s*255\s+255\s+255;/g,
    '--color-white:0 0 0;'
  );
  content = content.replace(
    /--color-off-white:\s*239\s+238\s+234;/g,
    '--color-off-white:14 14 14;'
  );
  content = content.replace(
    /--color-beige-light:\s*222\s+220\s+211;/g,
    '--color-beige-light:18 18 18;'
  );
  content = content.replace(
    /--color-beige-dark:\s*211\s+208\s+197;/g,
    '--color-beige-dark:24 24 24;'
  );
  content = content.replace(
    /--theme-background:\s*var\(--color-white\);/g,
    '--theme-background:0 0 0;'
  );
  content = content.replace(
    /--theme-text:\s*var\(--color-black\);/g,
    '--theme-text:255 255 255;'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  count++;
});

console.log(`Updated root inline theme variables in ${count} files.`);
