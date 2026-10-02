const fs = require('fs');

// 1. Remove from packages.ts
let pkgContent = fs.readFileSync('./src/data/packages.ts', 'utf8');

const arrayStart = pkgContent.indexOf('export const travelPackages: TravelPackage[] = [');
const header = pkgContent.slice(0, arrayStart + 'export const travelPackages: TravelPackage[] = ['.length);
const arrayContent = pkgContent.slice(arrayStart + 'export const travelPackages: TravelPackage[] = ['.length);

const packages = [];
let depth = 0;
let inString = false;
let stringChar = '';
let currentPkg = '';
let isEscaped = false;

for (let i = 0; i < arrayContent.length; i++) {
  const char = arrayContent[i];

  if (inString) {
    currentPkg += char;
    if (isEscaped) {
      isEscaped = false;
    } else if (char === '\\') {
      isEscaped = true;
    } else if (char === stringChar) {
      inString = false;
    }
    continue;
  }

  if (char === '"' || char === "'") {
    inString = true;
    stringChar = char;
    currentPkg += char;
    continue;
  }

  if (char === '{') {
    if (depth === 0) currentPkg = '{';
    else currentPkg += char;
    depth++;
    continue;
  }

  if (char === '}') {
    depth--;
    currentPkg += char;
    if (depth === 0) {
      const slugMatch = currentPkg.match(/slug:\s*['"]([^'"]+)['"]/);
      const slug = slugMatch ? slugMatch[1] : '';
      if (slug !== 'phu-quoc-island-escape-all-inclusive-vietnam-direct-flight') {
        packages.push(currentPkg);
      } else {
        console.log('Removed phu-quoc package from packages.ts');
      }
      currentPkg = '';
    }
    continue;
  }

  if (depth > 0) currentPkg += char;
}

const newPkgContent = header + '\n' + packages.join(',\n') + '\n];\n';
fs.writeFileSync('./src/data/packages.ts', newPkgContent, 'utf8');

// 2. Remove from FlashSaleSlider.tsx
let flashContent = fs.readFileSync('./src/components/home/FlashSaleSlider.tsx', 'utf8');
const flashOfferRegex = /\s*\{\s*id:\s*['"]fo-phuquoc['"][\s\S]*?\},\n/g;
flashContent = flashContent.replace(flashOfferRegex, '\n');
fs.writeFileSync('./src/components/home/FlashSaleSlider.tsx', flashContent, 'utf8');
console.log('Removed fo-phuquoc from FlashSaleSlider.tsx');
