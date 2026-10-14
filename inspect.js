const fs = require('fs');

const html = fs.readFileSync('raw_homepage.html', 'utf-8');

// Scripts
const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
const scripts = [];
let match;
while ((match = scriptRegex.exec(html)) !== null) {
  scripts.push(match[1]);
}
console.log('Scripts count:', scripts.length);
console.log('Scripts sample:', scripts.slice(0, 10));

// Images (ctfassets and others)
const imgRegex = /(?:src|href|url\()=?["']?([^"'()>\s]+\.(?:png|jpg|jpeg|webp|svg|gif|woff2?|ttf)[^"'()>\s]*)/gi;
const assets = new Set();
while ((match = imgRegex.exec(html)) !== null) {
  assets.add(match[1]);
}
console.log('Assets count:', assets.size);
console.log('Assets sample:', Array.from(assets).slice(0, 20));

// Also check next/image URLs
const nextImgRegex = /\/_next\/image\?url=([^&"'\s]+)&amp;[^"'\s]*/gi;
const nextImgs = new Set();
while ((match = nextImgRegex.exec(html)) !== null) {
  nextImgs.add(decodeURIComponent(match[1]));
}
console.log('Next Image source count:', nextImgs.size);
console.log('Next Image sample:', Array.from(nextImgs).slice(0, 10));
