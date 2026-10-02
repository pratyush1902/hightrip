const fs = require('fs');
const path = require('path');

const andamanFDPackage = {
  slug: 'andaman-winter-fixed-departure-5n',
  title: '5N Andaman Winter Fixed Departure',
  tagline: '5 Nights in Port Blair, Havelock & Neil Island with Elephant Beach & Neil Stargazing',
  destinationSlug: 'andaman',
  destinationName: 'Andaman Islands',
  durationDays: 6,
  durationNights: 5,
  priceINR: 29000, // 25000 + 4000 (Triple Occupancy base)
  originalPriceINR: 25000,
  priceValidUntil: '',
  hasStarMark: true,
  type: 'fixed-departure',
  style: 'Expedition & Culture',
  heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=2000&q=85',
  cardImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  gallery: [
    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  ],
  overview: 'Join our curated Andaman Winter Fixed Departure exploring Port Blair, Havelock, and Neil Island. Stay in handpicked 4-star and luxury beach resorts with breakfast & dinner included, high-speed private catamaran ferries, speed boat ride to Elephant Beach, and magical stargazing at Neil Island.',
  highlights: [
    '5 Nights accommodation: 2N Port Blair, 2N Havelock, 1N Neil Island',
    'Hotel SR Castle (Super Deluxe), Haywizz Havelock (Pool View Room), Pearl Park Beach Resort & SPA (Deluxe Garden View)',
    'Daily Breakfast & Dinner (MAP Plan) included',
    'High-speed Private AC Catamaran Ferries between islands',
    'Elephant Beach Speed Boat excursion & Neil Island Stargazing session',
    'Cellular Jail Light & Sound Show, Radhanagar Beach, Bharatpur & Laxmanpur beaches'
  ],
  departureDates: [
    '12 Oct 2026', '17 Oct 2026',
    '09 Nov 2026', '23 Nov 2026', '30 Nov 2026',
    '07 Dec 2026', '18 Dec 2026 (Peak)', '22 Dec 2026 (Xmas Gala)', '29 Dec 2026 (New Year Gala)',
    '18 Jan 2027', '25 Jan 2027', '28 Jan 2027',
    '02 Feb 2027', '08 Feb 2027', '15 Feb 2027', '22 Feb 2027',
    '01 Mar 2027', '08 Mar 2027', '15 Mar 2027', '22 Mar 2027', '25 Mar 2027', '28 Mar 2027'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Port Blair, Cellular Jail & Light & Sound Show',
      location: 'Port Blair',
      description: 'Arrive at Port Blair Airport by 2:00 PM. Meet our dedicated tour coordinator and transfer to Hotel SR Castle. Check into your Super Deluxe room. Afternoon visit to Cellular Jail Museum, followed by the iconic evening Light & Sound Show narrating the heroic saga of India’s freedom fighters.',
      meals: 'Dinner Included (MAP)',
      stay: 'Hotel SR Castle (Super Deluxe Room)',
      activities: ['Airport Meet & Transfer', 'Cellular Jail & Museum', 'Light & Sound Show']
    },
    {
      day: 2,
      title: 'Port Blair to Havelock Island & Radhanagar Beach',
      location: 'Havelock Island',
      description: 'Morning transfer to jetty for high-speed private AC catamaran ferry to Havelock Island (Swaraj Dweep). Check in to Haywizz Havelock Island Resort in a Pool View Room. In the afternoon, head to Radhanagar Beach (Beach No. 7) for a magnificent sunset along crystal turquoise waters.',
      meals: 'Breakfast & Dinner Included',
      stay: 'Haywizz Havelock Island Resort (Pool View Room)',
      activities: ['Private AC Ferry to Havelock', 'Radhanagar Beach Sunset Stroll']
    },
    {
      day: 3,
      title: 'Speed Boat Excursion to Elephant Beach',
      location: 'Havelock Island',
      description: 'Board a speed boat to Elephant Beach, known for its vibrant coral reef ecosystems and white sand coves. Enjoy optional snorkeling, sea walking, or relaxing along the pristine coastline.',
      meals: 'Breakfast & Dinner Included',
      stay: 'Haywizz Havelock Island Resort (Pool View Room)',
      activities: ['Speed Boat to Elephant Beach', 'Beach Relaxation & Coral Reef Viewing']
    },
    {
      day: 4,
      title: 'Havelock to Neil Island, Beaches & Stargazing',
      location: 'Neil Island',
      description: 'Board the morning private ferry to Neil Island (Shaheed Dweep). Check into Pearl Park Beach Resort & SPA. Visit Bharatpur Beach and Laxmanpur Beach for sunset, marvel at the Natural Coral Bridge (Howrah Bridge), and enjoy a complimentary night stargazing session on Neil’s dark, unpolluted shores.',
      meals: 'Breakfast & Dinner Included',
      stay: 'Pearl Park Beach Resort & SPA (Deluxe Room Garden View)',
      activities: ['Private Ferry to Neil', 'Bharatpur Beach', 'Laxmanpur Sunset', 'Natural Coral Bridge', 'Complimentary Neil Stargazing']
    },
    {
      day: 5,
      title: 'Neil to Port Blair, Corbyn’s Cove & Sagarika Shopping',
      location: 'Port Blair',
      description: 'Return by private catamaran ferry to Port Blair. Check in to Hotel SR Castle. Visit scenic coconut-palm lined Corbyn’s Cove Beach, followed by shopping for authentic handicrafts and pearl jewelry at Sagarika Emporium.',
      meals: 'Breakfast & Dinner Included',
      stay: 'Hotel SR Castle (Super Deluxe Room)',
      activities: ['Private Ferry to Port Blair', 'Corbyn’s Cove Beach', 'Sagarika Emporium Shopping']
    },
    {
      day: 6,
      title: 'Port Blair Departure',
      location: 'Port Blair Airport (IXZ)',
      description: 'Breakfast at hotel before your scheduled transfer to Veer Savarkar International Airport for your flight back home.',
      meals: 'Breakfast Included',
      stay: 'Departure',
      activities: ['Airport Departure Transfer']
    }
  ],
  inclusions: [
    '5 Nights accommodation (2N Port Blair, 2N Havelock, 1N Neil Island)',
    'Daily Breakfast & Dinner (MAP Plan)',
    'All inter-island transfers by Private AC Catamaran Ferry',
    'Speed boat excursion to Elephant Beach',
    'All private cab road transfers & sightseeing as per occupancy',
    'Cellular Jail entry and Light & Sound show tickets',
    'Dedicated on-ground Tour Coordinator & 24×7 support',
    'Complimentary stargazing experience at Neil Island'
  ],
  exclusions: [
    'Flight tickets to/from Port Blair',
    'Lunches',
    'Water sports activities (scuba diving, sea walking, jet ski)',
    'Personal expenses & shopping',
    'Travel insurance'
  ],
  hotelStandard: 'Hotel SR Castle (Port Blair), Haywizz Havelock Resort, Pearl Park Beach Resort & SPA (Neil)',
  groupSize: 'Fixed Group Departure (Triple: ₹29,000* | Double: ₹31,000* | Single: ₹42,000*)',
  featured: true,
  cardFeatures: [
    '5N Port Blair, Havelock & Neil Island',
    'SR Castle, Haywizz & Pearl Park Resort',
    'Elephant Beach Speed Boat & Neil Star Gazing',
    'Pvt AC Ferries, MAP Meals & Airport Transfers'
  ]
};

// Read existing packages.ts
const packagesFilePath = path.join(__dirname, 'src', 'data', 'packages.ts');
let content = fs.readFileSync(packagesFilePath, 'utf8');

// Find the last closing bracket `];`
const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error("Could not find closing bracket '];' in packages.ts");
  process.exit(1);
}

// Format into valid TypeScript code
let newPackageTs = '  ' + JSON.stringify(andamanFDPackage, null, 2).split('\n').map((line, idx) => idx === 0 ? line : '  ' + line).join('\n')
  .replace(/"([^"]+)":/g, '$1:')
  .replace(/"/g, "'");

let before = content.substring(0, lastBracketIdx).trimEnd();
if (!before.endsWith(',')) {
  before += ',';
}

const updatedContent = before + '\n' + newPackageTs + '\n];\n';
fs.writeFileSync(packagesFilePath, updatedContent, 'utf8');
console.log('Successfully appended Andaman Fixed Departure package to packages.ts!');
