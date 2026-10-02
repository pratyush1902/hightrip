const fs = require('fs');

const content = fs.readFileSync('./src/data/packages.ts', 'utf8');

// Find start of packages array
const arrayStart = content.indexOf('export const travelPackages: TravelPackage[] = [');
if (arrayStart === -1) {
  console.log('Could not find travelPackages array start');
  process.exit(1);
}

const header = content.slice(0, arrayStart + 'export const travelPackages: TravelPackage[] = ['.length);
const arrayContent = content.slice(arrayStart + 'export const travelPackages: TravelPackage[] = ['.length);

const legacySlugs = ['italy', 'switzerland', 'malaysia'];

// Parse objects in arrayContent
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
    if (depth === 0) {
      currentPkg = '{';
    } else {
      currentPkg += char;
    }
    depth++;
    continue;
  }

  if (char === '}') {
    depth--;
    currentPkg += char;
    if (depth === 0) {
      // Complete package object found
      // Check if it belongs to a legacy slug
      const slugMatch = currentPkg.match(/destinationSlug:\s*['"]([^'"]+)['"]/);
      const slug = slugMatch ? slugMatch[1] : '';
      if (!legacySlugs.includes(slug)) {
        packages.push(currentPkg);
      } else {
        console.log(`Removing legacy package: ${slug}`);
      }
      currentPkg = '';
    }
    continue;
  }

  if (depth > 0) {
    currentPkg += char;
  }
}

const newContent = header + '\n' + packages.join(',\n') + '\n];\n';

fs.writeFileSync('./src/data/packages.ts', newContent, 'utf8');
console.log(`Cleaned packages.ts! Total packages remaining: ${packages.length}`);
