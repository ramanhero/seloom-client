const fs = require('fs');

const indexHtml = fs.readFileSync('views/index.html', 'utf-8');

// Extract shell parts
const head = indexHtml.slice(0, indexHtml.indexOf('</head>') + 7);
const headerStart = indexHtml.indexOf('<div aria-label="Darken overlay');
const headerEnd = indexHtml.indexOf('</header>') + 9;
const headerMarkup = indexHtml.slice(headerStart, headerEnd);

const footerStart = indexHtml.indexOf('<footer');
const footerAndEnd = indexHtml.slice(footerStart);

function createPage(title, mainContent, outputFile) {
  const pageHtml = `
<!DOCTYPE html>
<html lang="en-US">
${head.replace(/<title>[\s\S]*?<\/title>/, `<title>Bloom & Wolf | ${title}</title>`)}
<body>
<div hidden=""><!--defs included in custom.css or sprite--></div>
${headerMarkup}
<main style="min-height: 60vh; max-width: 1200px; margin: 0 auto; padding: 48px 24px 80px 24px;">
  ${mainContent}
</main>
${footerAndEnd}
`;
  fs.writeFileSync(outputFile, pageHtml);
  console.log(`Generated ${outputFile}`);
}

// 1. Contact Page
const contactMain = `
  <div style="max-width: 800px; margin: 0 auto;">
    <h1 style="font-family: var(--font-times-now); font-size: 38px; font-weight: 400; margin-bottom: 12px; text-align: center;">Get in Touch</h1>
    <p style="font-size: 16px; color: #666; text-align: center; margin-bottom: 48px; line-height: 1.6;">
      Have a question about our silk floral collections, bespoke arrangements, or corporate subscriptions? Our florists and customer service team are here to help.
    </p>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; margin-bottom: 48px;">
      <div style="padding: 24px; background: #faf9f5; border-radius: 8px; text-align: center;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 8px 0;">WhatsApp</h3>
        <p style="font-size: 14px; color: #666; margin: 0 0 16px 0;">Chat directly with our floral stylists</p>
        <a href="https://wa.me/31202444555" target="_blank" class="quick-add-btn" style="background: var(--bw-deep-green); color: #fff;">Open WhatsApp</a>
      </div>
      <div style="padding: 24px; background: #faf9f5; border-radius: 8px; text-align: center;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 8px 0;">Email Us</h3>
        <p style="font-size: 14px; color: #666; margin: 0 0 16px 0;">hello@bloomandwolf.com</p>
        <a href="mailto:hello@bloomandwolf.com" class="quick-add-btn">Send Email</a>
      </div>
      <div style="padding: 24px; background: #faf9f5; border-radius: 8px; text-align: center;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 8px 0;">Visit Studio</h3>
        <p style="font-size: 14px; color: #666; margin: 0 0 16px 0;">Haarlemmerstraatweg 13<br>1165 MJ Halfweg, NL</p>
        <span style="font-size: 12px; color: #888;">Mon - Fri 9:00 - 18:00</span>
      </div>
    </div>

    <div style="background: #ffffff; border: 1px solid var(--bw-border); border-radius: 12px; padding: 36px;">
      <h2 style="font-family: var(--font-times-now); font-size: 26px; margin: 0 0 20px 0;">Send us a Message</h2>
      <form onsubmit="event.preventDefault(); showToast('Thank you! Your inquiry has been sent to our floral designers.'); this.reset();" style="display: flex; flex-direction: column; gap: 18px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <label style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; display: block; margin-bottom: 6px;">Your Name</label>
            <input type="text" required placeholder="Jane Doe" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
          </div>
          <div>
            <label style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; display: block; margin-bottom: 6px;">Email</label>
            <input type="email" required placeholder="jane@example.com" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
          </div>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; display: block; margin-bottom: 6px;">Subject</label>
          <input type="text" placeholder="Bespoke arrangement / Order inquiry" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px;">
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #555; display: block; margin-bottom: 6px;">Message</label>
          <textarea rows="5" required placeholder="How can we help you?" style="width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #ccc; border-radius: 6px; font-size: 14px; font-family: inherit;"></textarea>
        </div>
        <button type="submit" class="checkout-btn" style="max-width: 200px;">Send Message</button>
      </form>
    </div>
  </div>
`;
createPage('Contact', contactMain, 'views/contact.html');

// 2. Lookbook Page
const lookbookMain = `
  <div style="text-align: center; margin-bottom: 48px;">
    <h1 style="font-family: var(--font-times-now); font-size: 44px; font-weight: 400; margin-bottom: 12px;">The Lookbook</h1>
    <p style="font-size: 16px; color: #666; max-width: 600px; margin: 0 auto; line-height: 1.6;">
      Explore our seasonal editorials showcasing Bloom &amp; Wolf silk floral sculptures styled across interiors, design residences, and luxury boutique hotels.
    </p>
  </div>
  <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px;">
    <div style="overflow: hidden; border-radius: 6px; background: #faf9f5;">
      <img src="https://images.ctfassets.net/wcz043ql5e3j/1usJzwFYg9AST2tRIgmrVF/4d941d6d7d3271b48d3fa6750394d9c9/Roberton-SIZE-landscape.jpg?w=1200&q=80" style="width: 100%; height: 420px; object-fit: cover;" alt="Editorial Fall 2026">
      <div style="padding: 16px;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 6px 0;">Fall Symphony in Amber</h3>
        <p style="font-size: 13px; color: #777; margin: 0;">Amsterdam Canal Suite</p>
      </div>
    </div>
    <div style="overflow: hidden; border-radius: 6px; background: #faf9f5;">
      <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Oscar-INT-PDP.jpg?v=1790113522&width=1200&quality=80" style="width: 100%; height: 420px; object-fit: cover;" alt="The Oscar Interior">
      <div style="padding: 16px;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 6px 0;">The Oscar at Home</h3>
        <p style="font-size: 13px; color: #777; margin: 0;">Living Studio Styling</p>
      </div>
    </div>
    <div style="overflow: hidden; border-radius: 6px; background: #faf9f5;">
      <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Bowman-INT-PDP.jpg?v=1790113179&width=1200&quality=80" style="width: 100%; height: 420px; object-fit: cover;" alt="The Bowman Interior">
      <div style="padding: 16px;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 6px 0;">Warm Sculptural Botanicals</h3>
        <p style="font-size: 13px; color: #777; margin: 0;">Modern Dining Experience</p>
      </div>
    </div>
    <div style="overflow: hidden; border-radius: 6px; background: #faf9f5;">
      <img src="https://cdn.shopify.com/s/files/1/1035/9963/6818/files/Hoff-INT-PDP.jpg?v=1790113299&width=1200&quality=80" style="width: 100%; height: 420px; object-fit: cover;" alt="The Hoff">
      <div style="padding: 16px;">
        <h3 style="font-family: var(--font-times-now); font-size: 20px; margin: 0 0 6px 0;">Grand Architectural Florals</h3>
        <p style="font-size: 13px; color: #777; margin: 0;">Hotel Lobby Feature</p>
      </div>
    </div>
  </div>
`;
createPage('Lookbook', lookbookMain, 'views/lookbook.html');

// 3. Terms of Service
const termsMain = `
  <div style="max-width: 800px; margin: 0 auto; line-height: 1.8;">
    <h1 style="font-family: var(--font-times-now); font-size: 38px; margin-bottom: 24px;">Terms &amp; Conditions</h1>
    <p>Welcome to Bloom &amp; Wolf. By placing an order or using our services, you agree to these terms.</p>
    <h3 style="font-family: var(--font-times-now); font-size: 20px; margin-top: 24px;">1. Products &amp; Craftsmanship</h3>
    <p>Each Bloom &amp; Wolf arrangement is handcrafted with silk and lifelike synthetic botanical elements. Slight artistic variations make every creation unique.</p>
    <h3 style="font-family: var(--font-times-now); font-size: 20px; margin-top: 24px;">2. Delivery &amp; Returns</h3>
    <p>We deliver across Europe. Items may be returned within 14 days of receipt in their original presentation packaging.</p>
  </div>
`;
createPage('Terms & Conditions', termsMain, 'views/terms.html');

// 4. Privacy Policy
const privacyMain = `
  <div style="max-width: 800px; margin: 0 auto; line-height: 1.8;">
    <h1 style="font-family: var(--font-times-now); font-size: 38px; margin-bottom: 24px;">Privacy Policy</h1>
    <p>Bloom &amp; Wolf respects your personal privacy. We only process personal information necessary to deliver our bouquets and services with full GDPR compliance.</p>
  </div>
`;
createPage('Privacy Policy', privacyMain, 'views/privacy.html');
