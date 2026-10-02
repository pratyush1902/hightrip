const fs = require('fs');

// 1. Clean destinations.ts
let destContent = fs.readFileSync('./src/data/destinations.ts', 'utf8');

// Parse destinations array objects
const legacySlugs = ['italy', 'switzerland', 'malaysia'];

legacySlugs.forEach(slug => {
  // Regex to remove destination object with given slug
  const regex = new RegExp(`\\s*\\{\\s*id:\\s*['"][^'"]+['"],\\s*slug:\\s*['"]${slug}['"][\\s\\S]*?\\},`, 'g');
  destContent = destContent.replace(regex, '');
});

fs.writeFileSync('./src/data/destinations.ts', destContent, 'utf8');

// 2. Clean packages.ts
let pkgContent = fs.readFileSync('./src/data/packages.ts', 'utf8');

legacySlugs.forEach(slug => {
  const regex = new RegExp(`\\s*\\{[\\s\\S]*?destinationSlug:\\s*['"]${slug}['"][\\s\\S]*?\\},`, 'g');
  pkgContent = pkgContent.replace(regex, '');
});

fs.writeFileSync('./src/data/packages.ts', pkgContent, 'utf8');

console.log('Legacy destinations and packages removed successfully!');
