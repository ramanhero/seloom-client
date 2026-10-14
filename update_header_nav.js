const fs = require('fs');

const updatedHeader = `<!-- Blurgvillage Style Bold Announcement Bar & Master Navigation -->
<div class="bw-announcement-bar">
  <div class="bw-announcement-content">
    <span class="bv-announcement-tag">NEW DROPS</span>
    <span style="font-weight: 800; letter-spacing: 0.08em;">LEAD WITH CONFIDENCE</span>
    <span class="bw-announcement-separator">/</span>
    <span>FREE EUROPEAN SHIPPING OVER €75</span>
    <span class="bw-announcement-separator">/</span>
    <a href="https://www.trustpilot.com/review/cottonworld.net" target="_blank" rel="noopener" class="bw-announcement-trustpilot">
      <span style="color: #ffffff; font-weight: 800; margin-right: 4px;">★ ★ ★ ★ ★</span>
      <span>TRUSTPILOT <strong>4.8 / 5</strong></span>
    </a>
    <span class="bw-announcement-separator">/</span>
    <span>100% PURE EUROPEAN LINEN &amp; COMBED ORGANIC COTTON</span>
  </div>
</div>

<!-- Darken overlay backdrop for navigation hover -->
<div id="bw-nav-darken-overlay" class="bw-nav-overlay"></div>

<header class="bw-navbar" id="main-bw-navbar">
  <div class="bw-navbar-inner">
    <!-- Brand Logo (High-Contrast Monochrome) -->
    <a href="/eu/en" class="bw-logo-link" aria-label="Home">
      <svg class="bw-logo-svg" viewBox="0 0 1054 132">
        <use href="#_RI-logo"></use>
      </svg>
    </a>

    <!-- Desktop Navigation Links with Hover Flyouts -->
    <nav class="bw-desktop-nav" aria-label="Main Navigation">
      <ul class="bw-nav-list" id="bw-main-nav-list">
        <!-- 1. SHOP (Hover Dropdown) -->
        <li class="bw-nav-has-dropdown" data-dropdown="shop">
          <a href="/eu/en/category/silk-bouquets" class="bw-nav-item">
            <span>Shop</span>
            <svg viewBox="0 0 24 24" class="bw-dropdown-chevron"><use href="#_RI-chevron"></use></svg>
          </a>
          <!-- Shop Dropdown Mega Menu -->
          <div class="bw-mega-menu" id="dropdown-shop">
            <div class="bw-mega-menu-inner">
              <div class="bw-mega-column">
                <span class="bw-mega-heading">Men's Apparel</span>
                <ul class="bw-mega-links">
                  <li><a href="/eu/en/category/flowers" class="bw-mega-link"><strong>All Men's Collection</strong> <span>Complete linen &amp; cotton wardrobe</span></a></li>
                  <li><a href="/eu/en/category/flowers" class="bw-mega-link"><strong>Linen Shirts</strong> <span>Classic, camp collar &amp; poplin</span></a></li>
                  <li><a href="/eu/en/category/flowers" class="bw-mega-link"><strong>Mandarin Kurtas</strong> <span>Lightweight natural weave essentials</span></a></li>
                  <li><a href="/eu/en/category/vases" class="bw-mega-link"><strong>Trousers &amp; Chinos</strong> <span>Relaxed fit linen pants</span></a></li>
                  <li><a href="/eu/en/category/flowers" class="bw-mega-link"><strong>Organic Cotton Tees</strong> <span>Combed comfort basics</span></a></li>
                </ul>
              </div>
              <div class="bw-mega-column">
                <span class="bw-mega-heading">Women's Apparel</span>
                <ul class="bw-mega-links">
                  <li><a href="/eu/en/category/silk-bouquets" class="bw-mega-link"><strong>All Women's Collection</strong> <span>Dresses, blouses &amp; culottes</span></a></li>
                  <li><a href="/eu/en/category/silk-bouquets" class="bw-mega-link"><strong>Linen Dresses</strong> <span>Flowing silhouettes for warm days</span></a></li>
                  <li><a href="/eu/en/products/the-mini-collection" class="bw-mega-link"><strong>Blouses &amp; Tops</strong> <span>Breathable everyday popovers</span></a></li>
                  <li><a href="/eu/en/category/vases" class="bw-mega-link"><strong>Culottes &amp; Pants</strong> <span>Wide-leg linen bottomwear</span></a></li>
                  <li><a href="/eu/en/popular" class="bw-mega-link"><strong>Most Popular Bestsellers</strong> <span>Curated client favorites</span></a></li>
                </ul>
              </div>
              <div class="bw-mega-featured" style="display: flex; gap: 14px;">
                <div class="bw-mega-card" style="flex: 1;">
                  <img src="https://cottonworld.net/cdn/shop/files/Menu-Image-MENS-_Desktop-370X544.jpg" alt="Men's Collection" class="bw-mega-card-img" style="aspect-ratio: 3/4; object-fit: cover;">
                  <div class="bw-mega-card-body">
                    <span class="bw-mega-card-tag">FOR HIM</span>
                    <h4 class="bw-mega-card-title">Men's Linen Drop</h4>
                    <a href="/eu/en/category/flowers" class="bw-mega-card-btn">Explore Men's →</a>
                  </div>
                </div>
                <div class="bw-mega-card" style="flex: 1;">
                  <img src="https://cottonworld.net/cdn/shop/files/Menu-Image-WOMENS-_Desktop-370X544.jpg" alt="Women's Collection" class="bw-mega-card-img" style="aspect-ratio: 3/4; object-fit: cover;">
                  <div class="bw-mega-card-body">
                    <span class="bw-mega-card-tag">FOR HER</span>
                    <h4 class="bw-mega-card-title">Women's Dresses</h4>
                    <a href="/eu/en/category/silk-bouquets" class="bw-mega-card-btn">Explore Women's →</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>

        <!-- 2. DIRECT CATEGORY LINKS -->
        <li><a href="/eu/en/category/flowers" class="bw-nav-item">Men's Collection</a></li>
        <li><a href="/eu/en/category/silk-bouquets" class="bw-nav-item">Women's Collection</a></li>
        <li><a href="/eu/en/category/vases" class="bw-nav-item">Linen Trousers</a></li>
        <li><a href="/eu/en/products/the-mini-collection" class="bw-nav-item">Women's Tops</a></li>
        <li><a href="/eu/en/lookbook" class="bw-nav-item">Lookbook</a></li>
        <li><a href="/eu/en/popular" class="bw-nav-item">Bestsellers</a></li>
        <li><a href="/eu/en/bouquet-generator" class="bw-nav-item bw-nav-item-highlight">Create Look</a></li>
      </ul>
    </nav>

    <!-- Header Actions (Search, Account, Bag) -->
    <div class="bw-actions">
      <!-- Search Trigger -->
      <button type="button" class="bw-action-btn" aria-label="Search items" onclick="alert('Search: Enter keyword to filter pure linen & cotton pieces')">
        <svg viewBox="0 0 24 24"><use href="#_RI-filter"></use></svg>
      </button>

      <!-- Account / Login Link -->
      <a href="/eu/en/login" class="bw-action-btn" aria-label="User Account">
        <svg viewBox="0 0 24 24"><use href="#_RI-leaf"></use></svg>
      </a>

      <!-- Bag Trigger with Live Counter -->
      <button type="button" class="bw-action-btn bw-bag-btn" id="header-bag-btn" aria-label="Shopping Bag">
        <span class="bw-bag-label">Bag</span>
        <span class="bw-bag-badge" id="header-bag-count">0</span>
      </button>

      <!-- Mobile Hamburger Button -->
      <button type="button" class="bw-mobile-toggle" id="mobile-nav-toggle-btn" aria-label="Open menu" onclick="toggleMobileNav()">
        <svg viewBox="0 0 24 24"><use href="#_RI-hamburger"></use></svg>
      </button>
    </div>
  </div>
</header>

<!-- Sticky Subcategory Filter Bar (Blurgvillage Style Pill Bar) -->
<nav class="bv-category-bar" aria-label="Collection Filter Bar">
  <div class="bv-category-bar-inner">
    <a href="/eu/en/category/silk-bouquets" class="bv-pill bv-pill-active">All Clothing</a>
    <a href="/eu/en/category/flowers" class="bv-pill">Men's Collection</a>
    <a href="/eu/en/category/silk-bouquets" class="bv-pill">Women's Collection</a>
    <a href="/eu/en/category/vases" class="bv-pill">Linen Trousers</a>
    <a href="/eu/en/products/the-mini-collection" class="bv-pill">Women's Tops</a>
    <a href="/eu/en/popular" class="bv-pill">Bestsellers</a>
    <a href="/eu/en/lookbook" class="bv-pill">Lookbook</a>
    <a href="/eu/en/bouquet-generator" class="bv-pill bv-pill-highlight">Create Look</a>
  </div>
</nav>`;

fs.writeFileSync('views/header.html', updatedHeader, 'utf8');
console.log('Successfully updated views/header.html with clothing apparel navigation.');
