const fs = require('fs');

let html = fs.readFileSync('views/index.html', 'utf8');

const sec1Start = html.indexOf('<section class="Theme-module-scss-module__o4UHcq__container LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__container"');
const sec1End = html.indexOf('</section>', sec1Start) + 10;

const newSec1 = `<section class="Theme-module-scss-module__o4UHcq__container LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__container" data-alignment="left" data-asset-theme="dark" style="--theme-background:0 0 0;--theme-text:var(--color-black); position: relative;">
  <div class="LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__assetAndInformationContainer">
    <div class="LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__assetOuterContainer" style="inset:0 0px">
      <div class="LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__assetInnerContainer" style="transform:scale(1.02)">
        <picture class="Image-module-scss-module__RMZxYq__container LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__asset" data-animate-on-load="false" draggable="false">
          <source media="(orientation:portrait)" srcSet="https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-New-arrivals-MOBILE_jpg.jpg 1080w" />
          <source media="(orientation:landscape)" srcSet="https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-New-arrivals-DESKTOP_jpg.jpg 1920w" />
          <img class="Image-module-scss-module__RMZxYq__image" draggable="false" style="color:transparent;object-fit:cover;filter:brightness(0.82);" alt="Pure European Linen" width="1920" height="850" decoding="async" src="https://cottonworld.net/cdn/shop/files/CW-Homepage-Banners-4-New-arrivals-DESKTOP_jpg.jpg"/>
        </picture>
      </div>
    </div>
    <div class="LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__informationContainer" style="transform:none; padding: 48px 32px;">
      <span style="display: inline-block; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 10px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; margin-bottom: 14px;">AUTUMN / SUMMER 2026</span>
      <h1 class="RichTextHeadline-module-scss-module__BALx5G__container" data-size-base="xxlarge" data-variant-base="light" data-has-size-medium="true" data-size-medium="xlarge" data-variant-medium="light" style="margin: 0 0 14px 0;">
        <span style="font-family: var(--font-graphik); font-size: 48px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.01em; color: #ffffff;">Pure European Linen &amp; Organic Cotton</span>
      </h1>
      <div class="RichTextBody-module-scss-module__heoRjW__container LayoutFullscreenWithBottomInformation-module-scss-module__WaO2ja__body" style="max-width: 620px; margin-bottom: 24px;">
        <p class="RichTextBody-module-scss-module__heoRjW__paragraph" style="font-size: 16px; color: #dddddd; line-height: 1.55;">
          Consciously tailored everyday luxury. Breathable natural fibers designed for effortless style, relaxed silhouettes, and lasting comfort.
        </p>
      </div>
      <div style="display: flex; gap: 14px; flex-wrap: wrap;">
        <a draggable="false" class="ButtonSolid-module-scss-module__tnxCfW__container" style="display: inline-flex; align-items: center; justify-content: center; padding: 13px 26px; background: #ffffff; color: #000000; font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 4px; text-decoration: none;" href="/eu/en/category/flowers">
          Shop Men's Collection →
        </a>
        <a draggable="false" class="ButtonSolid-module-scss-module__tnxCfW__container" style="display: inline-flex; align-items: center; justify-content: center; padding: 13px 26px; background: rgba(0,0,0,0.6); color: #ffffff; border: 1px solid #ffffff; font-family: var(--font-graphik); font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; border-radius: 4px; text-decoration: none; backdrop-filter: blur(8px);" href="/eu/en/category/silk-bouquets">
          Shop Women's Collection →
        </a>
      </div>
    </div>
  </div>
</section>`;

html = html.slice(0, sec1Start) + newSec1 + html.slice(sec1End);
fs.writeFileSync('views/index.html', html, 'utf8');
console.log('Successfully updated Section 1 (Hero Banner).');
