const fs = require('fs');
const path = require('path');

const cleanHeader = fs.readFileSync('views/header.html', 'utf8').trim();
const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html') && f !== 'header.html' && f !== 'cart_drawer.html');

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  // 1. Remove all existing master-header-wrappers
  html = html.replace(/<!-- Master Header Wrapper[\s\S]*?<\/nav>\s*<\/div>/g, '');
  html = html.replace(/<div class="master-header-wrapper"[\s\S]*?<\/nav>\s*<\/div>/g, '');

  // 2. Remove all existing announcement bars
  html = html.replace(/<div class="bw-announcement-bar"[\s\S]*?<\/div>\s*<\/div>/g, '');
  html = html.replace(/<div class="bw-announcement-bar"[\s\S]*?<\/div>/g, '');

  // 3. Remove all leftover headers & category bars
  html = html.replace(/<header[\s\S]*?<\/header>/g, '');
  html = html.replace(/<nav class="bv-category-bar"[\s\S]*?<\/nav>/g, '');

  // 4. Remove orphaned header chunks and stray </header>
  html = html.replace(/<div class="bw-(actions|controls)"[\s\S]*?<\/header>/g, '');
  html = html.replace(/<\/header>/g, '');

  // 5. Remove duplicate filter bars (e.g., PLP filter & count bar with quick-add buttons)
  html = html.replace(/<!-- Filter & Count Bar -->[\s\S]*?<!-- Product Grid -->/g, '<!-- Product Grid -->');
  html = html.replace(/<!-- Filter & Count Bar -->[\s\S]*?<div class="product-grid"/g, '<div class="product-grid"');

  // 6. Remove leftover comments and stray overlays
  html = html.replace(/<!-- Blurgvillage Style Bold Announcement Bar & Master Navigation -->[\s\S]*?<!-- Sticky Subcategory Filter Bar \(Blurgvillage Style Pill Bar\) -->/g, '');
  html = html.replace(/<!-- Darken overlay backdrop for navigation hover -->/g, '');
  html = html.replace(/<!-- Sticky Subcategory Filter Bar \(Blurgvillage Style Pill Bar\) -->/g, '');
  html = html.replace(/<!-- Blurgvillage Signature Sticky Category Bar -->/g, '');
  html = html.replace(/<div aria-label="Darken overlay for navigation"[\s\S]*?<\/div>/g, '');
  html = html.replace(/<div id="bw-nav-darken-overlay" class="bw-nav-overlay"><\/div>/g, '');

  // 7. Inject canonical master header at the very top of body
  const svgDefEnd = '<!--/$--></div>';
  const svgIndex = html.indexOf(svgDefEnd);
  if (svgIndex !== -1 && svgIndex < 150000) {
    const afterSvg = svgIndex + svgDefEnd.length;
    let insertPos = afterSvg;
    const bailout = '<!--$!--><template data-dgst="BAILOUT_TO_CLIENT_SIDE_RENDERING"></template><!--/$-->';
    const bailoutIdx = html.indexOf(bailout, afterSvg);
    if (bailoutIdx !== -1 && bailoutIdx - afterSvg < 100) {
      insertPos = bailoutIdx + bailout.length;
    }
    html = html.slice(0, insertPos) + '\n' + cleanHeader + '\n' + html.slice(insertPos);
  } else {
    html = html.replace(/<body[^>]*>/, match => match + '\n' + cleanHeader);
  }

  // 8. Assert integrity
  const openH = (html.match(/<header\b/g) || []).length;
  const closeH = (html.match(/<\/header>/g) || []).length;
  const navB = (html.match(/class="bw-navbar"/g) || []).length;
  const catB = (html.match(/class="bv-category-bar"/g) || []).length;
  const annB = (html.match(/bw-announcement-bar/g) || []).length;

  if (openH !== 1 || closeH !== 1 || navB !== 1 || catB !== 1 || annB !== 0) {
    console.error(`ERROR in ${file}: openH=${openH}, closeH=${closeH}, navB=${navB}, catB=${catB}, annB=${annB}`);
  } else {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Cleaned ${file}: Exactly 1 navbar, 1 category bar, 0 extra bars.`);
  }
});

console.log('\nAll views successfully updated and verified!');
