const fs = require('fs');

const html = fs.readFileSync('raw_homepage.html', 'utf-8');

// 1. Check sections
const sections = [];
const sectionRegex = /<section[^>]*class=["']([^"']*)["'][^>]*>/gi;
let m;
while ((m = sectionRegex.exec(html)) !== null) {
  sections.push(m[1]);
}
console.log('Sections found:', sections.length);
sections.forEach((s, i) => console.log(`Section ${i + 1}:`, s));

// 2. Headings
const hRegex = /<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi;
const headings = [];
while ((m = hRegex.exec(html)) !== null) {
  const text = m[2].replace(/<[^>]+>/g, '').trim();
  headings.push(`${m[1]}: ${text}`);
}
console.log('\nHeadings found:', headings);

// 3. Products in homepage
const prodRegex = /href=["'](\/eu\/en\/products\/[^"']+)["']/gi;
const prods = new Set();
while ((m = prodRegex.exec(html)) !== null) {
  prods.add(m[1]);
}
console.log('\nProducts mentioned in homepage:', Array.from(prods));

// 4. Extract any Contentful / Next.js JSON data
const nextDataMatch = html.match(/self\.__next_f\.push\(\[1,"(.*)"\]\)/g);
console.log('\nNext.js data pushes count:', nextDataMatch ? nextDataMatch.length : 0);
