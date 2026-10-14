const fs = require('fs');
const path = require('path');

// 1. Load mappings
const prodMapping = JSON.parse(fs.readFileSync('product_image_mapping.json', 'utf8'));

// Additional Banner, Editorial, UGC and Lifestyle Mappings
const comprehensiveMapping = {
  ...prodMapping,

  // Hero Banners (Exact Landscape & Portrait)
  'Roberton-SIZE-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-New-arrivals-DESKTOP_jpg.jpg',
  'Roberton-SIZE-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-New-arrivals-MOBILE_jpg.jpg',
  'Bowman-SIZE-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Bestsellers-DESKTOP_jpg.jpg',
  'Bowman-SIZE-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Bestsellers-MOBILE_jpg.jpg',

  // Lookbook / Section Banners
  'Single_Yellow_Poppy-SIZE-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Bestsellers-DESKTOP_jpg.jpg',
  'Single_Yellow_Poppy-SIZE-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Bestsellers-MOBILE_jpg.jpg',
  'Single_Grey_Protea-SIZE-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Mens-DESKTOP_jpg.jpg',
  'Single_Grey_Protea-SIZE-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Mens-MOBILE_jpg.jpg',
  'Leavold-INT-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-Womens-DESKTOP_jpg.jpg',
  'Leavold-INT-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Womens-4-Thumbnail_jpg.jpg',
  'Laine-SIZE-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/Category-Cards-SHOP-THE-LOOK-FOR-HER-_Desktop-_-Mobile-900X506__jpg.jpg',
  'Laine-SIZE-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/Category-Cards-SHOP-THE-LOOK-FOR-HIM-_Desktop-_-Mobile-900X506__jpg.jpg',

  // Highlight & Feature Assets
  'MH_AMSMH_4.jpg': 'https://cottonworld.net/cdn/shop/files/Category-Cards-MENSWEAR-_Desktop-_-Mobile-900X506__jpg.jpg',
  'WhatsApp_Image_2024-07-31_at_22.10.54-01.jpg': 'https://cottonworld.net/cdn/shop/files/Category-Cards-WOMENSWEAR-_Desktop-_-Mobile-900X506__jpg.jpg',

  // UGC / Testimonial Lifestyle Cards
  'ulman-UGC-Sanne-Linda-01.png': 'https://cottonworld.net/cdn/shop/files/Category-Cards-NEW-ARRIVALS-_Desktop-_-Mobile-900X506__jpg.jpg',
  'coyne-UGC-Lennert_Spek-01.png': 'https://cottonworld.net/cdn/shop/files/Category-Cards-BESTSELLERS-_Desktop-_-Mobile-900X506__jpg.jpg',
  'B_W_Edge-selection-2-ECR_9697.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-New-arrivals-4-Thumbnail_jpg.jpg',
  'morisot-UGC-wolf-atelier-01.png': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Bestsellers-4-Thumbnail_jpg.jpg',
  'blair-UGC-marleen-01.png': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Mens-4-Thumbnail_jpg.jpg',

  // Secondary Collection / Mini Cards
  'wall-prints-Hydrangea-INT-uncroppped.jpg': 'https://cottonworld.net/cdn/shop/files/Menu-Image-MENS-_Desktop-370X544.jpg',
  'wall-prints-Hydrangea.jpg': 'https://cottonworld.net/cdn/shop/files/Menu-Image-MENS-_Desktop-370X544.jpg',
  'Woodman-SIZE-portrait.png': 'https://cottonworld.net/cdn/shop/files/Menu-Image-WOMENS-_Desktop-370X544.jpg',
  'Woodman-SIZE-landscape.png': 'https://cottonworld.net/cdn/shop/files/Menu-Image-WOMENS-_Desktop-370X544.jpg',
  'Mini-Tulip-INT-portrait.png': 'https://cottonworld.net/cdn/shop/files/Menu-Image-ABOUT-US-_Desktop-370X544.jpg',
  'Mini_Peony-SIZE-portrait.jpg': 'https://cottonworld.net/cdn/shop/files/Menu-Image-SALE-_Desktop-370X544.jpg',
  'Mini_Peony-SIZE-landscape.jpg': 'https://cottonworld.net/cdn/shop/files/Menu-Image-SALE-_Desktop-370X544.jpg',
  'Octavie-INT-portrait.png': 'https://cottonworld.net/cdn/shop/files/CW_-_Whatsapp_-_Thumbnail-01.jpg',
  'social-share.jpg': 'https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-New-arrivals-DESKTOP_jpg.jpg'
};

// 2. Update views/index.html
console.log('Transforming views/index.html...');
let indexContent = fs.readFileSync('views/index.html', 'utf8');

for (const [oldBase, newUrl] of Object.entries(comprehensiveMapping)) {
  // Replace direct references or encoded ctfassets references containing oldBase
  const escapedBase = oldBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('https?:\\/\\/[^\\s"\'\\)]*' + escapedBase + '[^\\s"\'\\)]*', 'g');
  indexContent = indexContent.replace(regex, newUrl);
}

// Update text copy on homepage from flowers to clothing brand
indexContent = indexContent.replace(/Rich shades for your home, office, or as a gift\./g, 'Pure natural linen and organic cotton essentials tailored for effortless comfort.');
indexContent = indexContent.replace(/Leader in luxury silk flowers/gi, 'Leader in Luxury Cotton & Linen Wear');
indexContent = indexContent.replace(/Leader in Luxury Silk Flowers/gi, 'Leader in Luxury Cotton & Linen Wear');
indexContent = indexContent.replace(/luxury silk flowers/gi, 'breathable linen and cotton apparel');
indexContent = indexContent.replace(/silk bouquets/gi, 'linen collections');
indexContent = indexContent.replace(/silk flowers/gi, 'natural fibers');
indexContent = indexContent.replace(/bouquet/gi, 'wardrobe piece');
indexContent = indexContent.replace(/Bouquet/gi, 'Garment');

fs.writeFileSync('views/index.html', indexContent, 'utf8');
console.log('Successfully updated views/index.html with Cottonworld apparel images.');

// 3. Update views/header.html
console.log('Updating views/header.html with clothing category navigation...');
let headerContent = fs.readFileSync('views/header.html', 'utf8');

// Replace images in header
for (const [oldBase, newUrl] of Object.entries(comprehensiveMapping)) {
  const escapedBase = oldBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('https?:\\/\\/[^\\s"\'\\)]*' + escapedBase + '[^\\s"\'\\)]*', 'g');
  headerContent = headerContent.replace(regex, newUrl);
}

// Replace category bar pills
const oldPillBar = `<div class="bv-category-bar-inner">
    <a href="/eu/en/category/silk-bouquets" class="bv-pill bv-pill-active">All Bouquets</a>
    <a href="/eu/en/category/flowers" class="bv-pill">Single Flowers</a>
    <a href="/eu/en/category/vases" class="bv-pill">Designer Vases</a>
    <a href="/eu/en/products/the-mini-collection" class="bv-pill">The Mini Collection</a>
    <a href="/eu/en/bouquet-generator" class="bv-pill bv-pill-highlight">Create Bouquet</a>
    <a href="/eu/en/for-business" class="bv-pill">Business</a>
    <a href="/eu/en/gifting" class="bv-pill">Gifts</a>
    <a href="/eu/en/popular" class="bv-pill">Bestsellers</a>
    <a href="/eu/en/lookbook" class="bv-pill">Lookbook</a>
  </div>`;

const newPillBar = `<div class="bv-category-bar-inner">
    <a href="/eu/en/category/silk-bouquets" class="bv-pill bv-pill-active">All Clothing</a>
    <a href="/eu/en/category/flowers" class="bv-pill">Men's Shirts</a>
    <a href="/eu/en/category/vases" class="bv-pill">Linen Trousers</a>
    <a href="/eu/en/products/the-mini-collection" class="bv-pill">Women's Tops</a>
    <a href="/eu/en/bouquet-generator" class="bv-pill bv-pill-highlight">Create Look</a>
    <a href="/eu/en/for-business" class="bv-pill">Corporate Wear</a>
    <a href="/eu/en/gifting" class="bv-pill">Gifts</a>
    <a href="/eu/en/popular" class="bv-pill">Bestsellers</a>
    <a href="/eu/en/lookbook" class="bv-pill">Lookbook</a>
  </div>`;

headerContent = headerContent.replace(oldPillBar, newPillBar);
headerContent = headerContent.replace(/Leader in Luxury Silk Flowers/gi, 'Leader in Luxury Cotton & Linen Wear');
headerContent = headerContent.replace(/100% CIRCULAR SUSTAINABLE SILK/gi, '100% PURE EUROPEAN LINEN & COMBED COTTON');

fs.writeFileSync('views/header.html', headerContent, 'utf8');
console.log('Successfully updated views/header.html.');

// 4. Update all other views in views/
const viewsDir = path.join(__dirname, 'views');
const viewFiles = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html') && f !== 'header.html' && f !== 'cart_drawer.html' && f !== 'index.html');

viewFiles.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  for (const [oldBase, newUrl] of Object.entries(comprehensiveMapping)) {
    const escapedBase = oldBase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('https?:\\/\\/[^\\s"\'\\)]*' + escapedBase + '[^\\s"\'\\)]*', 'g');
    if (regex.test(content)) {
      content = content.replace(regex, newUrl);
      changed = true;
    }
  }

  // Update flowers to clothing wording
  content = content.replace(/silk flowers/gi, 'natural cotton & linen');
  content = content.replace(/silk bouquets/gi, 'linen apparel');
  content = content.replace(/silk bouquet/gi, 'linen garment');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated images and wording in ${file}`);
});

console.log('\nAll view templates updated with Cottonworld imagery!');
