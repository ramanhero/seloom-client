const https = require('https');

function fetchPage(pathName, label) {
  const opt = {
    hostname: 'cottonworld.net',
    path: pathName,
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
      console.log(`\n=== ${label} (${unique.length} images) ===`);
      unique.forEach(u => console.log('https://cottonworld.net/cdn/shop/files/' + u));
    });
  }).on('error', err => console.log('Err:', err.message));
}

fetchPage('/pages/about-us', 'About Us');
fetchPage('/pages/our-story', 'Our Story');
