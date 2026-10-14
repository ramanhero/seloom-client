const http = require('http');

const endpoints = [
  '/eu/en',
  '/eu/en/category/flowers',
  '/eu/en/category/silk-bouquets',
  '/eu/en/category/vases',
  '/eu/en/products/the-mini-collection',
  '/eu/en/lookbook',
  '/eu/en/popular'
];

endpoints.forEach(ep => {
  http.get(`http://localhost:3003${ep}`, res => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const title = data.match(/<title>([\s\S]*?)<\/title>/)?.[1] || 'No title';
      const h1 = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, '').trim() || 'No H1';
      const imgCount = (data.match(/<img/g) || []).length;
      const hoverImgs = (data.match(/product-hover-img/g) || []).length;
      console.log(`[${res.statusCode}] ${ep.padEnd(35)} | Imgs: ${imgCount} | Hover-Imgs: ${hoverImgs} | H1: ${h1}`);
    });
  }).on('error', err => console.log('Err:', ep, err.message));
});
