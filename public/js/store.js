// Bloom & Wolf Client-side Store Controller
(function() {
  'use strict';

  // ── CART MANAGEMENT ─────────────────────────────────────────────
  const CART_KEY = 'bloom_cart_v1';

  function getCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : { items: [], total_price: 0, item_count: 0 };
    } catch (e) {
      return { items: [], total_price: 0, item_count: 0 };
    }
  }

  function saveCart(cart) {
    cart.item_count = cart.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    cart.total_price = cart.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderCartDrawer();
  }

  window.addToCart = function(product) {
    const cart = getCart();
    const existingIndex = cart.items.findIndex(i => i.id === product.id && i.variant === product.variant);

    if (existingIndex > -1) {
      cart.items[existingIndex].quantity = (cart.items[existingIndex].quantity || 1) + 1;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        variant: product.variant || '100% Linen / Regular Fit',
        quantity: 1
      });
    }

    saveCart(cart);
    openCartDrawer();
    showToast(`Added "${product.name}" to your bag!`);
  };

  window.updateCartQty = function(index, delta) {
    const cart = getCart();
    if (!cart.items[index]) return;

    cart.items[index].quantity += delta;
    if (cart.items[index].quantity <= 0) {
      cart.items.splice(index, 1);
    }
    saveCart(cart);
  };

  window.removeCartItem = function(index) {
    const cart = getCart();
    if (!cart.items[index]) return;
    const name = cart.items[index].name;
    cart.items.splice(index, 1);
    saveCart(cart);
    showToast(`Removed "${name}" from bag`);
  };

  function updateCartBadge() {
    const cart = getCart();
    const count = cart.item_count || 0;

    // Update master navbar badge
    const navbarBadge = document.getElementById('navbar-cart-badge');
    if (navbarBadge) {
      navbarBadge.textContent = count;
      navbarBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    // Also support any other bag buttons
    const bagButtons = document.querySelectorAll('[data-testid="bag"], .BagLinkWithNumberCircle-module-scss-module__fEpqyq__link');
    bagButtons.forEach(btn => {
      let badge = btn.querySelector('.cart-count-badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'cart-count-badge';
        btn.style.position = 'relative';
        btn.appendChild(badge);
      }
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function renderCartDrawer() {
    const cart = getCart();
    const container = document.getElementById('cart-drawer-items-list');
    const subtotalEl = document.getElementById('cart-subtotal-amount');
    const freeShippingEl = document.getElementById('shipping-progress-fill');
    const shippingTextEl = document.getElementById('shipping-progress-text');
    const footerEl = document.getElementById('cart-drawer-footer');

    if (!container) return;

    if (cart.items.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <svg viewBox="0 0 24 24" style="width: 48px; height: 48px; opacity: 0.3; fill: #ffffff;">
            <use href="#_RI-bag"></use>
          </svg>
          <div class="cart-empty-title">Your bag is empty</div>
          <div class="cart-empty-text">Discover our timeless 100% natural European linen and combed organic cotton essentials.</div>
          <a href="/eu/en/category/silk-bouquets" class="checkout-btn" style="margin-top: 12px; text-decoration: none; max-width: 240px;">
            Shop All Clothing
          </a>
        </div>
      `;
      if (footerEl) footerEl.style.display = 'none';
      if (shippingTextEl) shippingTextEl.textContent = 'Free shipping on orders over €75';
      if (freeShippingEl) freeShippingEl.style.width = '0%';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';

    const freeThreshold = 75;
    const diff = freeThreshold - cart.total_price;
    const percent = Math.min(100, Math.round((cart.total_price / freeThreshold) * 100));

    if (shippingTextEl) {
      if (diff <= 0) {
        shippingTextEl.innerHTML = '🎉 <strong>Free shipping unlocked!</strong>';
      } else {
        shippingTextEl.innerHTML = `Add <strong>€${diff},-</strong> more to unlock <strong>free shipping</strong>`;
      }
    }
    if (freeShippingEl) {
      freeShippingEl.style.width = `${percent}%`;
    }

    let html = '';
    cart.items.forEach((item, idx) => {
      html += `
        <div class="cart-item">
          <img src="${item.image || 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-HERO-og.jpg'}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-info">
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="cart-item-variant">${item.variant}</div>
            </div>
            <div class="cart-item-bottom">
              <div class="qty-stepper">
                <button type="button" class="qty-btn" onclick="updateCartQty(${idx}, -1)">−</button>
                <span class="qty-number">${item.quantity}</span>
                <button type="button" class="qty-btn" onclick="updateCartQty(${idx}, 1)">+</button>
              </div>
              <div class="cart-item-price">€${item.price * item.quantity},-</div>
            </div>
            <button type="button" class="cart-item-remove" onclick="removeCartItem(${idx})">Remove</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (subtotalEl) {
      subtotalEl.textContent = `€${cart.total_price},-`;
    }
  }

  window.openCartDrawer = function() {
    const backdrop = document.getElementById('cart-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (backdrop && drawer) {
      renderCartDrawer();
      backdrop.classList.add('is-open');
      drawer.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeCartDrawer = function() {
    const backdrop = document.getElementById('cart-backdrop');
    const drawer = document.getElementById('cart-drawer');
    if (backdrop && drawer) {
      backdrop.classList.remove('is-open');
      drawer.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  // Toast alert
  window.showToast = function(msg) {
    let toast = document.getElementById('bw-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bw-toast';
      toast.className = 'bw-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;">
        <use href="#_RI-tick"></use>
      </svg>
      <span>${msg}</span>
    `;
    toast.classList.add('is-visible');
    setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 3200);
  };

  // ── NAVBAR & LOCALE INTERACTIONS ─────────────────────────────────
  window.toggleLocaleMenu = function() {
    const dropdown = document.getElementById('bw-locale-dropdown');
    if (dropdown) dropdown.classList.toggle('is-open');
  };

  window.selectLanguage = function(lang, e) {
    e.preventDefault();
    const map = { 'nl': 'NL', 'en': 'EN', 'fr': 'FR' };
    const btnSpan = document.querySelector('#bw-locale-btn span');
    if (btnSpan) btnSpan.textContent = map[lang] || 'EN';
    
    document.querySelectorAll('.bw-locale-option').forEach(opt => {
      opt.classList.remove('is-active');
    });
    if (e.currentTarget) e.currentTarget.classList.add('is-active');
    
    toggleLocaleMenu();
    showToast(`Language switched to ${lang.toUpperCase()}`);
  };

  window.toggleMobileNav = function() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (drawer && backdrop) {
      drawer.classList.toggle('is-open');
      backdrop.classList.toggle('is-open');
    }
  };

  // Checkout modal
  window.triggerCheckout = function() {
    const cart = getCart();
    if (cart.items.length === 0) {
      showToast('Your bag is currently empty');
      return;
    }
    closeCartDrawer();
    let modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.add('is-open');
      const orderSummaryEl = document.getElementById('checkout-modal-summary');
      if (orderSummaryEl) {
        orderSummaryEl.textContent = `${cart.item_count} items • Total: €${cart.total_price},-`;
      }
    }
  };

  window.closeCheckoutModal = function() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.remove('is-open');
    }
  };

  window.completeSimulatedOrder = function() {
    saveCart({ items: [], total_price: 0, item_count: 0 });
    const modalContent = document.getElementById('checkout-modal-card');
    if (modalContent) {
      modalContent.innerHTML = `
        <svg viewBox="0 0 24 24" style="width: 60px; height: 60px; fill: #364f1b; margin-bottom: 16px;">
          <use href="#_RI-tick"></use>
        </svg>
        <h2 style="font-family: var(--font-times-now); font-size: 28px; margin: 0 0 12px 0;">Order Confirmed!</h2>
        <p style="color: #666; font-size: 15px; line-height: 1.5; margin-bottom: 24px;">
          Thank you for choosing Bloom &amp; Wolf. Your luxury silk flower bouquet order has been received and is being prepared with our complimentary floral fragrance.
        </p>
        <button type="button" class="checkout-btn" onclick="closeCheckoutModal(); window.location.href='/eu/en';">
          Continue Exploring
        </button>
      `;
    }
  };

  // ── ATTACH LISTENERS ──────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    renderCartDrawer();

    // Scroll listener for sticky navbar shadow
    const navbar = document.getElementById('main-bw-navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
      }, { passive: true });
    }

    // Mark current active nav item based on URL
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    document.querySelectorAll('.bw-nav-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href === currentPath || href.replace('/eu/en', '') === currentPath.replace('/eu/en', ''))) {
        link.classList.add('is-active');
      }
    });

    // Mark current active category pill based on URL (strictly single active pill)
    const pills = Array.from(document.querySelectorAll('.bv-pill'));
    pills.forEach(pill => pill.classList.remove('bv-pill-active'));

    if (currentPath === '/' || currentPath === '/eu/en') {
      if (pills[0]) pills[0].classList.add('bv-pill-active');
    } else {
      for (const pill of pills) {
        const href = pill.getAttribute('href');
        if (href && (href === currentPath || href.replace('/eu/en', '') === currentPath.replace('/eu/en', ''))) {
          pill.classList.add('bv-pill-active');
          break;
        }
      }
    }

    // ── NAVBAR HOVER DROPDOWN & OVERLAY CONTROLLER ────────────────
    const navOverlay = document.getElementById('bw-nav-darken-overlay');
    const dropdownItems = document.querySelectorAll('.bw-nav-has-dropdown');
    let navHoverTimer = null;

    function openDropdown(item) {
      if (navHoverTimer) {
        clearTimeout(navHoverTimer);
        navHoverTimer = null;
      }
      dropdownItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherMenu = other.querySelector('.bw-mega-menu');
          if (otherMenu) otherMenu.classList.remove('is-open');
        }
      });
      item.classList.add('is-open');
      const menu = item.querySelector('.bw-mega-menu');
      if (menu) menu.classList.add('is-open');
      if (navOverlay) navOverlay.classList.add('is-active');
    }

    function closeAllDropdowns() {
      if (navHoverTimer) {
        clearTimeout(navHoverTimer);
        navHoverTimer = null;
      }
      dropdownItems.forEach(item => {
        item.classList.remove('is-open');
        const menu = item.querySelector('.bw-mega-menu');
        if (menu) menu.classList.remove('is-open');
      });
      if (navOverlay) navOverlay.classList.remove('is-active');
    }

    dropdownItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        openDropdown(item);
      });

      item.addEventListener('mouseleave', function() {
        if (navHoverTimer) clearTimeout(navHoverTimer);
        navHoverTimer = setTimeout(function() {
          closeAllDropdowns();
        }, 120);
      });

      // Also handle click on touch devices
      const mainLink = item.querySelector('.bw-nav-item');
      if (mainLink && 'ontouchstart' in window) {
        mainLink.addEventListener('click', function(e) {
          if (!item.classList.contains('is-open')) {
            e.preventDefault();
            openDropdown(item);
          }
        });
      }
    });

    if (navOverlay) {
      navOverlay.addEventListener('mouseenter', closeAllDropdowns);
      navOverlay.addEventListener('click', closeAllDropdowns);
    }

    // Close locale dropdown when clicking outside
    document.addEventListener('click', function(e) {
      const wrapper = document.getElementById('bw-locale-wrapper');
      const dropdown = document.getElementById('bw-locale-dropdown');
      if (wrapper && dropdown && !wrapper.contains(e.target)) {
        dropdown.classList.remove('is-open');
      }
    });

    // Close cart on backdrop or close button
    const backdrop = document.getElementById('cart-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeCartDrawer);

    const closeBtn = document.getElementById('cart-drawer-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

    // Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeCheckoutModal();
        const drawer = document.getElementById('mobile-nav-drawer');
        const mobileBackdrop = document.getElementById('mobile-nav-backdrop');
        if (drawer && mobileBackdrop) {
          drawer.classList.remove('is-open');
          mobileBackdrop.classList.remove('is-open');
        }
      }
    });

    // Carousels (Left / Right chevrons)
    document.querySelectorAll('.ProductCard-module-scss-module__l3bOlW__controls').forEach(controls => {
      const card = controls.closest('.ProductCard-module-scss-module__l3bOlW__container');
      if (!card) return;
      const list = card.querySelector('ol.CarouselContainer-module-scss-module__ZYMN0W__container');
      const prevBtn = controls.querySelector('.ProductCard-module-scss-module__l3bOlW__previous');
      const nextBtn = controls.querySelector('.ProductCard-module-scss-module__l3bOlW__next');

      if (list && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function(e) {
          e.preventDefault();
          list.scrollBy({ left: -list.clientWidth, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', function(e) {
          e.preventDefault();
          list.scrollBy({ left: list.clientWidth, behavior: 'smooth' });
        });
      }
    });

    // Accordions
    document.querySelectorAll('details').forEach(detail => {
      detail.addEventListener('toggle', function() {
        const icon = detail.querySelector('[data-is-open]');
        if (icon) {
          icon.setAttribute('data-is-open', detail.open ? 'true' : 'false');
        }
      });
    });

    // Newsletter form
    document.querySelectorAll('form[class*="NewsletterBlock"]').forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = form.querySelector('input[type="text"]');
        if (input && input.value) {
          showToast('Thank you! Welcome email & 10% discount sent to ' + input.value);
          input.value = '';
          form.setAttribute('data-has-subscribed', 'true');
        }
      });
    });
  });
})();
