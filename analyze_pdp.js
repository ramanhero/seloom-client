const fs = require('fs');

const html = fs.readFileSync('raw_product_oscar.html', 'utf-8');

// Title
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1] : 'none');

// Heading h1
const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : 'none');

// Price
const priceMatch = html.match(/class=["'][^"']*price[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
console.log('Price block:', priceMatch ? priceMatch[1].replace(/<[^>]+>/g, '').trim() : 'none');

// Sections
const sections = Array.from(html.matchAll(/<section[^>]*class=["']([^"']*)["'][^>]*>/gi)).map(m => m[1]);
console.log('Sections:', sections.slice(0, 10));

// Vases or options
const buttons = Array.from(html.matchAll(/<button[^>]*>([\s\S]*?)<\/button>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(Boolean);
console.log('Sample buttons:', buttons.slice(0, 15));
