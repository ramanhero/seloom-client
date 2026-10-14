const https = require('https');
const fs = require('fs');

const opt = {
  hostname: 'cottonworld.net',
  path: '/',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html'
  }
};

https.get(opt, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const rawMatches = [...data.matchAll(/\/\/cottonworld\.net\/cdn\/shop\/files\/([^\s"'?&]+)/g)].map(m => m[1]);
    const unique = [...new Set(rawMatches)];
    const campaigns = unique.filter(u => /banner|homepage|desktop|look|him|her|menswear|womenswear|story|about|arrivals|bestseller/i.test(u));
    fs.writeFileSync('campaign_banners.json', JSON.stringify(campaigns.map(c => 'https://cottonworld.net/cdn/shop/files/' + c), null, 2));
    console.log('Saved', campaigns.length, 'campaign banners to campaign_banners.json');
    campaigns.forEach(c => console.log('https://cottonworld.net/cdn/shop/files/' + c));
  });
}).on('error', err => console.log('Err:', err.message));
