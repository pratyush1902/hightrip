const fs = require('fs');

const content = fs.readFileSync('./src/data/packages.ts', 'utf8');

const regex = /{\s*slug:\s*['"]([^'"]+)['"][\s\S]*?destinationSlug:\s*['"]vietnam['"][\s\S]*?}/g;

const matches = [];
let match;

// Parse objects in arrayContent
const packages = [];
let depth = 0;
let inString = false;
let stringChar = '';
let currentPkg = '';
let isEscaped = false;

const arrayStart = content.indexOf('export const travelPackages: TravelPackage[] = [');
const arrayContent = content.slice(arrayStart + 'export const travelPackages: TravelPackage[] = ['.length);

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
      const titleMatch = currentPkg.match(/title:\s*['"]([^'"]+)['"]/);
      const destMatch = currentPkg.match(/destinationSlug:\s*['"]([^'"]+)['"]/);
      const heroMatch = currentPkg.match(/heroImage:\s*['"]([^'"]+)['"]/);
      if (destMatch && destMatch[1] === 'vietnam') {
        packages.push({
          slug: slugMatch ? slugMatch[1] : '',
          title: titleMatch ? titleMatch[1] : '',
          heroImage: heroMatch ? heroMatch[1] : ''
        });
      }
      currentPkg = '';
    }
    continue;
  }

  if (depth > 0) currentPkg += char;
}

console.log('Total Vietnam packages:', packages.length);
console.log(JSON.stringify(packages, null, 2));
