const fs = require('fs');
const html = fs.readFileSync('raw_homepage.html', 'utf-8');
const matches = html.match(/[^"'()<>\s]+\.svg[^"'()<>\s]*/g) || [];
console.log('SVG matches:', Array.from(new Set(matches)));

// Check for _RI-
const riMatches = html.match(/#_RI-[a-zA-Z0-9_-]+/g) || [];
console.log('RI symbol references:', Array.from(new Set(riMatches)));

// Check if there is any <svg with symbols
const svgSymbols = html.match(/<svg[^>]*>[\s\S]*?<\/svg>/gi) || [];
console.log('Number of svg tags:', svgSymbols.length);
svgSymbols.forEach((s, i) => {
  if (s.includes('id=')) {
    console.log(`SVG #${i} has id:`, s.slice(0, 100));
  }
});
