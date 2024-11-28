const sharp = require('sharp');

const sizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' }
];

// Create a gradient background
const width = 512;
const height = 512;
const svg = `
<svg width="${width}" height="${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#35566B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8F6566;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)" rx="128" ry="128"/>
  <text x="50%" y="50%" font-family="Arial" font-size="280" fill="white" text-anchor="middle" dominant-baseline="middle">H</text>
</svg>`;

// Generate icons for each size
sizes.forEach(({ size, name }) => {
  sharp(Buffer.from(svg))
    .resize(size, size)
    .toFile(`public/${name}`)
    .catch(err => console.error(`Error generating ${name}:`, err));
}); 