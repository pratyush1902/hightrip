const fs = require('fs');

const activeSlugs = [
  'andaman',
  'bhutan',
  'gujarat',
  'kashmir',
  'kerala',
  'maldives',
  'mauritius',
  'meghalaya',
  'morocco',
  'philippines',
  'singapore',
  'spiti-valley',
  'sri-lanka',
  'thailand',
  'vietnam'
];

let destContent = fs.readFileSync('./src/data/destinations.ts', 'utf8');

// Filter destinations in file
const lines = destContent.split('\n');
const newLines = [];
let insideKeep = true;
let insideDest = false;
let currentBlock = [];
let currentSlug = '';

lines.forEach(l => {
  if (l.includes('id:') && l.includes('slug:')) {
    // start of destination item or inline
  }
  if (l.trim().startsWith('{') && !l.includes('export')) {
    insideDest = true;
    currentBlock = [l];
    currentSlug = '';
    return;
  }
  if (insideDest) {
    currentBlock.push(l);
    if (l.includes('slug:')) {
      const match = l.match(/slug:\s*['"]([^'"]+)['"]/);
      if (match) currentSlug = match[1];
    }
    if (l.trim().startsWith('},')) {
      insideDest = false;
      if (currentSlug && activeSlugs.includes(currentSlug)) {
        newLines.push(...currentBlock);
      } else {
        console.log('Removed unneeded destination from destinations.ts:', currentSlug);
      }
      currentBlock = [];
    }
    return;
  }
  newLines.push(l);
});

fs.writeFileSync('./src/data/destinations.ts', newLines.join('\n'), 'utf8');
console.log('destinations.ts synchronized successfully!');
