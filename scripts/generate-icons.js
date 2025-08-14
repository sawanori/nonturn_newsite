const fs = require('fs');
const path = require('path');

// Create a simple placeholder icon generator
function generatePlaceholderSVG(size) {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#fbbf24"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.3}px" font-weight="bold" text-anchor="middle" dy=".3em" fill="#000000">NT</text>
  </svg>`;
}

// Icon sizes required for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Ensure icons directory exists
const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons as placeholders
iconSizes.forEach(size => {
  const svg = generatePlaceholderSVG(size);
  const fileName = `icon-${size}x${size}.svg`;
  const filePath = path.join(iconsDir, fileName);
  fs.writeFileSync(filePath, svg);
  console.log(`Generated ${fileName}`);
});

// Also create apple-touch-icon
const appleTouchIconSVG = generatePlaceholderSVG(180);
fs.writeFileSync(path.join(process.cwd(), 'public', 'apple-touch-icon.svg'), appleTouchIconSVG);
console.log('Generated apple-touch-icon.svg');

// Create icon.svg as a general icon
const iconSVG = generatePlaceholderSVG(32);
fs.writeFileSync(path.join(process.cwd(), 'public', 'icon.svg'), iconSVG);
console.log('Generated icon.svg');

console.log('All icons generated successfully!');