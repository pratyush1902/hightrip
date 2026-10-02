const fs = require('fs');

const content = fs.readFileSync('./src/data/packages.ts', 'utf8');
const lines = content.split('\n');

const dests = {};
let currentSlug = '';
lines.forEach(l => {
  if (l.includes('destinationSlug:')) {
    const match = l.match(/destinationSlug:\s*['"]([^'"]+)['"]/);
    if (match) {
      currentSlug = match[1];
      dests[currentSlug] = (dests[currentSlug] || 0) + 1;
    }
  }
});

console.log('Total packages in packages.ts:', Object.values(dests).reduce((a, b) => a + b, 0));
console.log('Breakdown by destination slug:');
console.log(JSON.stringify(dests, null, 2));
