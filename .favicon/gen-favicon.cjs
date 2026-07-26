const TextToSVG = require('text-to-svg');
const fs = require('fs');
const path = require('path');

const fontPath = path.join(__dirname, 'FiraCode-Bold.ttf');
if (!fs.existsSync(fontPath)) {
  console.error("Font not found!");
  process.exit(1);
}

const textToSVG = TextToSVG.loadSync(fontPath);

const attributes = { fill: '#000000', stroke: 'none' }; // The text color is #000000 because we'll invert it. Wait, the user wants #ededed.
const options = { x: 0, y: 0, fontSize: 60, anchor: 'top', attributes: { fill: '#ededed' } };

// Measure the text so we can center it
const metrics = textToSVG.getMetrics('AS', options);
const pathData = textToSVG.getD('AS', options);

// Background is #000000
const svgWidth = 100;
const svgHeight = 100;

const textWidth = metrics.width;
const textHeight = metrics.height;
const startX = (svgWidth - textWidth) / 2;
const startY = ((svgHeight - textHeight) / 2) + 4; // Add 4px to optically center the font

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#000000" />
  <path d="${textToSVG.getD('AS', { x: startX, y: startY, fontSize: 60, anchor: 'top' })}" fill="#ededed" />
</svg>
`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.svg'), svg.trim());
console.log("Favicon generated successfully!");
