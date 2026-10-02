const fs = require('fs');

const content = fs.readFileSync('./src/data/destinations.ts', 'utf8');
const lines = content.split('\n');

const dests = [];
lines.forEach(l => {
  if (l.includes('slug:')) {
    const match = l.match(/slug:\s*['"]([^'"]+)['"]/);
    if (match) {
      dests.push(match[1]);
    }
  }
});

console.log('Total destinations in destinations.ts:', dests.length);
console.log('Slugs:', dests);
