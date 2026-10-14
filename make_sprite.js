const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, 'public', 'svg');
const svgFiles = fs.readdirSync(svgDir).filter(f => f.endsWith('.svg'));

let spriteHtml = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none;" id="bloom-svg-defs"><defs>\n';

for (const file of svgFiles) {
  const name = file.replace('.svg', '');
  const content = fs.readFileSync(path.join(svgDir, file), 'utf-8');
  // Strip outer <svg ...> and </svg>
  const inner = content.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
  spriteHtml += `  <g id="_RI-${name}">${inner}</g>\n`;
}

spriteHtml += '</defs></svg>';

fs.writeFileSync(path.join(__dirname, 'public', 'sprite.html'), spriteHtml);
console.log(`Generated sprite.html with ${svgFiles.length} SVG symbols. Size: ${spriteHtml.length} bytes.`);
