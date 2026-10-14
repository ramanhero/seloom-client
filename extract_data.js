const fs = require('fs');

const html = fs.readFileSync('raw_homepage.html', 'utf-8');

// Find all self.__next_f.push
const matches = [];
const pushRegex = /self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g;
let m;
while ((m = pushRegex.exec(html)) !== null) {
  matches.push(m[1]);
}

console.log('Total push matches:', matches.length);

// Join or unescape the data chunks
let fullPush = matches.join('');
// Unescape js string
fullPush = fullPush.replace(/\\"/g, '"').replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\t/g, '\t');

fs.writeFileSync('extracted_next_data.txt', fullPush);
console.log('Wrote extracted_next_data.txt, size:', fullPush.length);

// Search for products or content blocks
const prodMatch = fullPush.match(/"title":\{[^}]*"value":"([^"]+)"/g) || [];
console.log('Sample titles found:', prodMatch.slice(0, 20));
