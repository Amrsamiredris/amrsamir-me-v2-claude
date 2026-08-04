import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.join(process.cwd(), 'public', 'favicon.svg');
const publicDir = path.join(process.cwd(), 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 }
];

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(svgPath);

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toFile(path.join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Also convert to favicon.ico (just copying 32x32 for simplicity or let next.js use png/svg natively)
  // We'll generate a manifest
  const manifest = {
    name: "Amr Samir Edris",
    short_name: "Amr",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#1E7F8C",
    background_color: "#0B1220",
    display: "standalone"
  };

  fs.writeFileSync(path.join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated site.webmanifest');
}

generateFavicons().catch(console.error);
