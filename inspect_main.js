const fs = require('fs');

const html = fs.readFileSync('raw_homepage.html', 'utf-8');

// Find all <main> contents
const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>');
console.log('Main start:', mainStart, 'end:', mainEnd);

const mainHtml = html.slice(mainStart, mainEnd + 7);
console.log('Main length:', mainHtml.length);

// Split by <section
const sectionParts = mainHtml.split(/<section/);
console.log('Total sections in <main>:', sectionParts.length - 1);

sectionParts.slice(1).forEach((part, i) => {
  const classMatch = part.match(/class="([^"]+)"/);
  const hMatch = part.match(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/i);
  const pMatch = part.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  const links = Array.from(part.matchAll(/href="([^"]+)"/g)).map(m => m[1]);
  console.log(`\n--- Section ${i + 1} ---`);
  console.log('Class:', classMatch ? classMatch[1].slice(0, 80) : 'none');
  console.log('Heading:', hMatch ? hMatch[2].replace(/<[^>]+>/g, '').trim() : 'none');
  console.log('Sample text:', pMatch ? pMatch[1].replace(/<[^>]+>/g, '').trim().slice(0, 120) : 'none');
  console.log('Links count:', links.length, 'Sample links:', links.slice(0, 5));
});
