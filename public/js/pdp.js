// Bloom & Wolf Product Detail Page (PDP) Interactive Controller
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Tab switching
    const tabLinks = document.querySelectorAll('.ProductDetailTabs-module-scss-module__fa-inG__link');
    const tabBody = document.querySelector('.ProductDetailTabs-module-scss-module__fa-inG__body p');

    const tabContents = {
      'Description': window.__PDP_DATA__?.description || 'Five rust-coloured silk orchids, nothing more needed. Feminine, sculptural and unmistakably autumnal. The bouquet comes with our complimentary floral scent.',
      'Dimensions': 'Height approx. 65 - 75 cm. Suitable for vases with a height of 25 - 35 cm and neck opening of 10 - 15 cm.',
      'Care': 'Should you want to clean your bouquet, you can do so carefully with a hair dryer on the low, cold setting, or with a feather duster.',
      'Delivery': 'Free shipping in Europe for orders over €75. Delivered in our luxury sustainable presentation box within 2 - 4 business days.'
    };

    tabLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const label = link.getAttribute('aria-label') || link.innerText.trim();
        tabLinks.forEach(l => l.setAttribute('data-is-active', 'false'));
        link.setAttribute('data-is-active', 'true');
        if (tabBody && tabContents[label]) {
          tabBody.textContent = tabContents[label];
        }
      });
    });

    // 2. Buy vs Rent radio options
    const buyRadios = document.querySelectorAll('input[name="payment-method"]');
    buyRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        const isRent = this.value === 'rent';
        const ctaBtn = document.querySelector('#add-to-cart-form button[type="submit"], #pdp-add-to-bag-btn');
        if (ctaBtn) {
          ctaBtn.textContent = isRent ? 'Start Subscription • €29/mo' : 'Add to bag';
        }
      });
    });

    // 3. Add to Bag button
    const form = document.getElementById('add-to-cart-form');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = window.__PDP_DATA__ || {};
        const selectedVase = document.querySelector('input[name="vase-option"]:checked')?.value || 'Without vase';
        let price = data.price || 99;
        if (selectedVase.includes('Glass')) price += 39;
        if (selectedVase.includes('Ceramic')) price += 49;

        addToCart({
          id: (data.handle || 'the-oscar') + '-' + selectedVase.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: data.name || 'The Oscar',
          price: price,
          image: data.heroImage || 'https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-HERO-og.jpg',
          variant: selectedVase
        });
      });
    }
  });
})();
