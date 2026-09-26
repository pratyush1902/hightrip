export interface AvailableExperience {
  id: string; // e.g. "01 / 08"
  slug: string;
  name: string;
  location: string;
  oneLine: string;
  heroImage: string;
  story: {
    lead: string;
    fullStory: string;
  };
  keyFacts: {
    label: string;
    value: string;
    sourceUrl?: string;
  }[];
  stopsOnTrail: {
    num: string;
    title: string;
    desc: string;
  }[];
  practical: {
    whenToGo: string;
    gettingThere: string;
    howToVisit: string[];
  };
}

export interface ResearchingExperience {
  slug: string;
  name: string;
  location: string;
  oneLine: string;
  image: string;
  status: 'Researching';
}

export interface EthicalCodeItem {
  num: string;
  title: string;
  desc: string;
}

export const availableExperiences: AvailableExperience[] = [
  {
    id: '01 / 08',
    slug: 'mayong',
    name: 'Mayong',
    location: 'Morigaon district, Assam, India',
    oneLine: "A Brahmaputra-side village long feared as India's centre of tantra and black magic.",
    heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Mayong sits on the bank of the Brahmaputra in Morigaon district. For centuries travellers and even Mughal generals are said to have feared the village; the Alamgir Nama records that Aurangzeb's general Raja Ram Singh hesitated to invade Assam partly because of Mayong's reputation for sorcery. Local tradition holds that tantriks and healers practising Ayurveda and Tantra Kriya sheltered in its forests.",
      fullStory: "Excavations near the village turned up sharp implements resembling tools used in ritual sacrifice, feeding the legend further. None of this has been independently verified by archaeologists as proof of historical human sacrifice; it remains local lore documented by the museum and popular press. In 2002 the Mayong Central Museum and Emporium opened to preserve what is left of this tantric and Ayurvedic heritage, displaying Sanchipat manuscripts, artefacts from local digs and dioramas of healing and taming rituals. It sits beside Pobitora Wildlife Sanctuary, home to one of the densest one-horned rhino populations in the world.",
    },
    keyFacts: [
      { label: 'District', value: 'Morigaon district, Assam', sourceUrl: 'https://en.wikipedia.org/wiki/Mayong,_Assam' },
      { label: 'Distance from Guwahati', value: 'About 40 km', sourceUrl: 'https://en.wikipedia.org/wiki/Mayong,_Assam' },
      { label: 'Museum opened', value: '1 November 2002', sourceUrl: 'https://raiot.in/demystifying-black-magic-mayong-village-museum-and-research-centre-assam/' },
      { label: 'Museum founders', value: 'INTACH, Gerda Henkel Stiftung (Germany) and the Nath Yogi Development Council', sourceUrl: 'https://raiot.in/demystifying-black-magic-mayong-village-museum-and-research-centre-assam/' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'Mayong Central Museum', desc: 'Sanchipat manuscripts, tantric relics and dioramas of sorcery and healing rituals.' },
      { num: '02', title: 'Pobitora Wildlife Sanctuary', desc: 'Jeep and elephant safaris to see one-horned rhinos, next door to Mayong village.' },
      { num: '03', title: 'Village folklore walk', desc: 'Guided walks through Mayong hear first-hand black-magic legends from residents.' },
      { num: '04', title: 'Brahmaputra riverbank', desc: 'Quiet river views a short walk from the village centre.' },
    ],
    practical: {
      whenToGo: 'Mid-October to end of March, when Pobitora and the wider Brahmaputra valley have the most pleasant weather.',
      gettingThere: 'Nearest airport is Lokpriya Gopinath Bordoloi International Airport, Guwahati, about 40 km away; visitors travel onward by road.',
      howToVisit: [
        'Treat black-magic stories as local folklore, not verified history — present them respectfully, not as sensational fact.',
        'Follow sanctuary rules at Pobitora (guides/vehicles required inside the reserve).',
      ],
    },
  },
  {
    id: '02 / 08',
    slug: 'cellular-jail',
    name: 'The Cellular Jail',
    location: 'Port Blair, Andaman and Nicobar Islands, India',
    oneLine: "The British colonial prison in Port Blair where Indian freedom fighters were exiled across the 'black water'.",
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Constructed between 1896 and 1906 by the British colonial administration, the Cellular Jail was specifically engineered for solitary confinement to crush the morale of Indian freedom fighters. Exiled across the Kala Pani ('black water'), hundreds of political prisoners endured relentless hard labour in individual cells radiating like spokes from a central watchtower.",
      fullStory: "Each of the original seven wings was positioned so that no prisoner could see or communicate with another. Prominent revolutionaries including Veer Savarkar, Barindra Kumar Ghosh, and Batukeshwar Dutt were incarcerated here. Following India's independence, four wings were dismantled due to earthquake damage, while the surviving three wings and central tower were declared a National Memorial Monument in 1969 to preserve the collective memory of the freedom struggle.",
    },
    keyFacts: [
      { label: 'Construction', value: '1896 – 1906', sourceUrl: 'https://en.wikipedia.org/wiki/Cellular_Jail' },
      { label: 'Location', value: 'Atlanta Point, Port Blair, South Andaman' },
      { label: 'Original structure', value: '7 radial wings with 693 individual cells' },
      { label: 'Memorial status', value: 'Dedicated to the nation on 11 February 1979' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'Solitary Cell Wings', desc: "Individual brick cells designed with staggered ventilation so inmates could not speak." },
      { num: '02', title: 'The Central Watchtower', desc: 'The hub of surveillance where guards monitored all seven radiating cell wings.' },
      { num: '03', title: 'The Gallows & Courtyard', desc: 'The preserved colonial execution chamber facing the quiet Andaman sea.' },
      { num: '04', title: 'Sound & Light Memorial', desc: 'Evening commemoration chronicling the endurance and resilience of political prisoners.' },
    ],
    practical: {
      whenToGo: 'October to May when sea conditions are tranquil and tropical weather is pleasant.',
      gettingThere: 'Direct flights connect Veer Savarkar International Airport (IXZ) in Port Blair with Kolkata, Chennai, Delhi and Bengaluru.',
      howToVisit: [
        'Observe solemn silence within cell wings and near the gallows courtyard.',
        'Engage certified memorial historians who can explain the documented archival records.',
      ],
    },
  },
  {
    id: '03 / 08',
    slug: 'jallianwala-bagh',
    name: 'Jallianwala Bagh',
    location: 'Amritsar, Punjab, India',
    oneLine: 'The walled garden in Amritsar where British troops fired on an unarmed crowd on 13 April 1919.',
    heroImage: 'https://images.unsplash.com/photo-1609137144822-45e0545fe221?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "On Baisakhi day, 13 April 1919, thousands of men, women, and children gathered peacefully in Jallianwala Bagh to protest the arrest of national leaders under the Rowlatt Act. Acting Brigadier-General Reginald Dyer deployed troops to seal the only narrow passage out of the garden and ordered continuous firing without giving an order to disperse.",
      fullStory: "For ten agonizing minutes, 1,650 rounds were fired point-blank into the trapped crowd. Hundreds died, many drowning in the garden's deep well while attempting to escape the volley. Rabindranath Tagore renounced his British knighthood in protest, and Mahatma Gandhi cited the massacre as the definitive moment that shattered Indian trust in the British colonial empire. Today, the preserved bullet marks on the high brick walls stand as quiet, indelible witnesses.",
    },
    keyFacts: [
      { label: 'Date of tragedy', value: '13 April 1919' },
      { label: 'Location', value: 'Near Golden Temple, Amritsar, Punjab' },
      { label: 'Memorial flame', value: 'Amar Jawan Jyoti lit inside a sunken pool' },
      { label: 'Preservation', value: 'Protected national memorial managed by Jallianwala Bagh National Memorial Trust' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'The Narrow Passage', desc: 'The narrow brick alleyway Dyer used to block the crowd from fleeing.' },
      { num: '02', title: "The Martyrs' Well", desc: 'The historic well where scores leapt in desperation to escape continuous gunfire.' },
      { num: '03', title: 'The Bullet Mark Walls', desc: 'Preserved red brick walls bearing white square markings around authentic bullet holes.' },
      { num: '04', title: 'The Flame Memorial & Museum', desc: 'The 45-foot red stone memorial obelisk and archival photo galleries.' },
    ],
    practical: {
      whenToGo: 'October to March during Punjab’s crisp winter months.',
      gettingThere: 'Amritsar is connected by Sri Guru Ram Dass Jee International Airport (ATQ) and direct express trains from New Delhi.',
      howToVisit: [
        'Visit early in the morning before crowds for an atmosphere of solemn reflection.',
        'Pair respectfully with an evening visit to the adjacent Golden Temple.',
      ],
    },
  },
  {
    id: '04 / 08',
    slug: 'kuldhara-bhangarh',
    name: 'Kuldhara & Bhangarh',
    location: 'Jaisalmer and Alwar districts, Rajasthan, India',
    oneLine: "An abandoned Paliwal Brahmin village and a 16th-century fort, each wrapped in India's best-known curse legends.",
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Kuldhara, situated 18 km southwest of Jaisalmer, was once a thriving settlement of wealthy Paliwal Brahmins who had pioneered ingenious arid-zone agriculture. Around 1825 CE, the entire village and 84 surrounding hamlets abandoned their homes overnight to protect their honour and escape the tyrannical extortion of the prime minister Salim Singh.",
      fullStory: "Legend says the departing elders laid a curse ensuring no one could ever inhabit the village again. Hundreds of years later, its sandstone streets, carved doorframes, and empty courtyards remain open to the desert wind. In Alwar, the 16th-century fortress city of Bhangarh tells a parallel story: founded in 1573 by Raja Bhagwant Das, it was abruptly abandoned following military invasion, famine, and dark sorcery legends, leaving an intricate ghost citadel where the Archaeological Survey of India strictly prohibits entry after dusk.",
    },
    keyFacts: [
      { label: 'Kuldhara Abandonment', value: 'Circa 1825 CE (overnight exodus of 84 villages)' },
      { label: 'Bhangarh Fort Founded', value: '1573 CE by Raja Bhagwant Das' },
      { label: 'ASI Regulation', value: 'Strict prohibition on entry between sunset and sunrise at Bhangarh' },
      { label: 'Architecture', value: 'Paliwal stone grid masonry and multi-tiered Rajput palaces' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'Kuldhara Sandstone Streets', desc: 'Walk the grid layout of hundreds of unroofed stone houses and the central step-well.' },
      { num: '02', title: 'Kuldhara Temple Sanctuary', desc: 'The preserved community temple that stood at the spiritual heart of the village.' },
      { num: '03', title: 'Bhangarh Royal Citadel', desc: 'The multi-tiered palace ruins looking over the abandoned Johari bazaar.' },
      { num: '04', title: 'Gopinath & Someshwar Temples', desc: 'Delicately carved ancient Hindu shrines standing preserved among the fort ruins.' },
    ],
    practical: {
      whenToGo: 'November to February when Thar desert temperatures remain comfortable for walking.',
      gettingThere: 'Kuldhara is an easy 30-minute drive from Jaisalmer; Bhangarh is approximately 85 km from Jaipur via NH21.',
      howToVisit: [
        'Strictly respect the official sunset exit rules enforced at Bhangarh.',
        'Bring drinking water and sun protection as neither site has indoor commercial stalls.',
      ],
    },
  },
  {
    id: '05 / 08',
    slug: 'dhanushkodi',
    name: 'Dhanushkodi',
    location: 'Rameswaram, Tamil Nadu, India',
    oneLine: 'A ghost town at India’s southeastern tip, wiped out by a cyclone in 1964 and never rebuilt.',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Located on the slender eastern tip of Pamban Island just 18 miles from Sri Lanka, Dhanushkodi was once a bustling commercial port where passenger ferries met the famous Boat Mail express train. On the catastrophic night of 22 December 1964, a category-5 super cyclone brought 20-foot storm surges that completely erased the town.",
      fullStory: "A passenger train approaching the station with over 100 passengers was swept into the ocean with no survivors. Following the devastation, the Government of Madras declared Dhanushkodi 'unfit for human habitation' and ordered that it never be rebuilt. Today, bleached brick walls of the railway station, customs office, and St. Anthony’s Church rise silently from the shimmering coastal sands where the Bay of Bengal meets the Indian Ocean.",
    },
    keyFacts: [
      { label: 'Date of cyclone', value: '22–23 December 1964 (Rameswaram cyclone)' },
      { label: 'Proximity to Sri Lanka', value: 'Approximately 29 km (18 miles) across the Palk Strait' },
      { label: 'Pamban Rail Reconstruction', value: 'Rebuilt in a record 46 days under E. Sreedharan' },
      { label: 'Current status', value: 'Official uninhabited ghost settlement; artisanal seasonal fishing outpost' },
    ],
    stopsOnTrail: [
      { num: '01', title: "Ruined St. Anthony's Church", desc: 'Roofless gothic stone arches standing alone against the rolling ocean winds.' },
      { num: '02', title: 'Old Railway Station & Water Tank', desc: 'Corroded tracks and brick masonry remnants where the Boat Mail once concluded.' },
      { num: '03', title: "Arichal Munai (Land's End)", desc: 'The dramatic geographic point where the rough Bay of Bengal meets the calm Indian Ocean.' },
      { num: '04', title: 'Ram Setu (Adam’s Bridge) Viewpoint', desc: 'The submerged chain of limestone shoals stretching toward the Talaimannar coast.' },
    ],
    practical: {
      whenToGo: 'November to March when sea breezes are calm and humidity is moderate.',
      gettingThere: 'Madurai Airport (IXM) is 175 km away; road drive across the dramatic new Pamban road bridge.',
      howToVisit: [
        'Private vehicles must leave the Arichal Munai sandspit before sunset per local safety regulations.',
        'Bring protective sunglasses and scarves against ocean spray and blowing sand.',
      ],
    },
  },
  {
    id: '06 / 08',
    slug: 'nahargarh',
    name: 'Nahargarh',
    location: 'Jaipur, Rajasthan, India',
    oneLine: 'A hilltop Jaipur fort said to have been built only after the restless spirit of a Rathore prince, Nahar Singh Bhomia, was appeased with a temple in his name.',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Commanding the steep crest of the Aravalli ridge directly above the Pink City, Nahargarh ('Abode of Tigers') formed a formidable defensive triad alongside Amer Fort and Jaigarh. Commissioned in 1734 by the astronomer-king Maharaja Sawai Jai Singh II, the fort's construction was repeatedly plagued by nocturnal collapses attributed to the spirit of Prince Nahar Singh Bhomia.",
      fullStory: "To pacify the restless spirit whose land had been claimed for the fortress, Jai Singh built a memorial temple within the ramparts and renamed the citadel in his honour, after which construction proceeded without hindrance. Later expanded in 1868 with the Madhavendra Bhawan — nine identical, interconnected two-storey royal suites designed for the queens — Nahargarh stands as a monument to tactical mountain architecture and enduring folklore.",
    },
    keyFacts: [
      { label: 'Built', value: '1734 CE by Maharaja Sawai Jai Singh II' },
      { label: 'Expanded', value: '1868 CE by Sawai Madho Singh' },
      { label: 'Architecture', value: 'Indo-European Rajput defense with extensive water baoris' },
      { label: 'Military record', value: 'Never conquered or taken by enemy assault' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'Madhavendra Bhawan', desc: 'Nine interconnected luxury apartments decorated with exquisite Rajput wall murals.' },
      { num: '02', title: 'Ancient Step-Well Baoris', desc: 'Dramatic geometric water harvesting reservoirs cut directly into sheer mountain bedrock.' },
      { num: '03', title: 'Nahar Singh Bhomia Temple', desc: 'The solemn hilltop memorial shrine erected to placate the spirit of the Rathore prince.' },
      { num: '04', title: 'Zigzag Bastion Walk', desc: 'Panoramic cliffside ramparts offering sweeping 360-degree views of Jaipur below.' },
    ],
    practical: {
      whenToGo: 'October to March, ideally during late afternoon to experience sunset over the Aravallis.',
      gettingThere: 'Jaipur International Airport (JAI) is 25 km away; winding road ascends through the Nahargarh biological park.',
      howToVisit: [
        'Wear comfortable walking shoes with traction for the stone steps and inclined parapets.',
      ],
    },
  },
  {
    id: '07 / 08',
    slug: 'lambi-dehar-mines',
    name: 'Lambi Dehar',
    location: 'Near Mussoorie, Uttarakhand, India',
    oneLine: 'Abandoned limestone quarry ruins above the Doon Valley, left behind after India’s first major environmental court order shut the mines down.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Perched along the cloud-veiled ridges near Mussoorie, Lambi Dehar represents one of modern India's most significant industrial ruins. Throughout the mid-20th century, extensive open-cast limestone quarrying ripped through the Himalayan slopes, inflicting severe lung ailments upon hundreds of laborers and stripping the Doon Valley of its protective canopy.",
      fullStory: "In the 1980s, local communities and environmentalists filed a landmark public interest litigation in the Supreme Court of India. The historic ruling permanently shut down the quarrying operations to halt ecological ruin, leaving behind an eerie, overgrown ghost colony of collapsed worker settlements, limestone rubble, and rusting machines. As nature gradually reclaims the hillside, the site remains an atmospheric monument to the ecological cost of unchecked industrial exploitation.",
    },
    keyFacts: [
      { label: 'Shutdown', value: '1980s following Supreme Court of India environmental ruling' },
      { label: 'Altitude', value: 'Approx. 1,900 metres (6,230 ft) above sea level' },
      { label: 'Terrain', value: 'Sub-Himalayan oak and pine ridges with exposed limestone crags' },
      { label: 'Significance', value: 'Foundational precedent in Indian environmental jurisprudence' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'The Abandoned Miner Quarters', desc: 'Overgrown stone houses with silent hearths slowly being draped in wild mountain moss.' },
      { num: '02', title: 'Limestone Quarry Scars', desc: 'The stark white sheer cliffs cut into the mountain, showing the scale of past excavation.' },
      { num: '03', title: 'Doon Valley Lookout', desc: 'A breathtaking vantage point looking down into the misty valley and deodar ridges.' },
    ],
    practical: {
      whenToGo: 'March to June and September to November; avoid heavy Himalayan monsoon downpours.',
      gettingThere: 'Dehradun Jolly Grant Airport (DED) is 60 km away; short drive from Mussoorie via the Hathipaon road.',
      howToVisit: [
        'Travel strictly with an experienced local guide due to steep drops and loose scree.',
        'Treat the site with respectful ecological mindfulness; leave no trace.',
      ],
    },
  },
  {
    id: '08 / 08',
    slug: 'nalanda',
    name: 'Nalanda',
    location: 'Nalanda district, Bihar, India (about 90 km from Patna)',
    oneLine: 'The ruined Gupta-era university where Xuanzang studied for two years, sacked around 1200 CE — and still debated by historians as to how, and how completely.',
    heroImage: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=1800&q=85',
    story: {
      lead: "Established in the 5th century CE under the patronage of the Gupta emperors, Nalanda Mahavihara stood for over seven centuries as the ancient world's foremost residential university. In its zenith, 10,000 monks, philosophers, and scholars gathered from China, Korea, Japan, Tibet, and Persia to master astronomy, medicine, logic, mathematics, and Buddhist metaphysics.",
      fullStory: "Chinese traveler Xuanzang lived and studied here for two years, recording vivid descriptions of its soaring multi-tiered shrines, gardens, and pristine debate courtyards. Around 1200 CE, the university was sacked and its colossal nine-storey library, Dharmaganja ('Treasury of Truth'), was said to have burned for months. Today, the red-brick excavated ruins spanning 12 hectares — a UNESCO World Heritage site — offer an awe-inspiring glimpse into an unparalleled center of global learning.",
    },
    keyFacts: [
      { label: 'Founded', value: '5th century CE under Gupta Emperor Kumaragupta I' },
      { label: 'Capacity', value: '10,000 students and 2,000 resident faculty' },
      { label: 'Library', value: 'Dharmaganja comprised 3 nine-storey buildings (Ratnasagara, Ratnodadhi, Ratnaranjaka)' },
      { label: 'UNESCO Inscription', value: 'Designated World Heritage Site in 2016' },
    ],
    stopsOnTrail: [
      { num: '01', title: 'Sariputta Stupa (Temple 3)', desc: 'The iconic stepped red-brick votive stupa surrounded by smaller commemorative shrines.' },
      { num: '02', title: 'Monastic Courtyards (Monasteries 1–11)', desc: 'Double-row student cells, meditation niches, lecture platforms, and deep central wells.' },
      { num: '03', title: 'Nalanda Archaeological Museum', desc: 'Pala-era bronze statues, stone carvings, terracotta seals, and preserved burnt grains.' },
      { num: '04', title: 'Xuanzang Memorial Hall', desc: 'Peaceful memorial hall commemorating the Chinese monk whose travelogues rediscovered Nalanda.' },
    ],
    practical: {
      whenToGo: 'October to March when weather in Bihar is cool and sunny.',
      gettingThere: 'Jay Prakash Narayan Airport, Patna (PAT) is 90 km away; direct rail link connects to Rajgir and Nalanda.',
      howToVisit: [
        'Engage an ASI-certified heritage historian to appreciate the architectural evolution.',
        'Plan at least 3–4 hours to explore the excavated grounds and adjacent museum.',
      ],
    },
  },
];

export const researchingExperiences: ResearchingExperience[] = [
  {
    slug: 'roopkund',
    name: 'Roopkund',
    location: 'Uttarakhand, India',
    oneLine: 'A high-Himalayan glacial lake ringed by centuries-old human skeletons, nicknamed Skeleton Lake.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    status: 'Researching',
  },
  {
    slug: 'hiroshima',
    name: 'Hiroshima',
    location: 'Hiroshima, Japan',
    oneLine: "The memorial park and museum built around the ruins of the world's first atomic bomb attack.",
    image: 'https://images.unsplash.com/photo-1578637387939-43c525550085?auto=format&fit=crop&w=1000&q=85',
    status: 'Researching',
  },
  {
    slug: 'phnom-penh',
    name: 'Phnom Penh & Angkor',
    location: 'Phnom Penh and Siem Reap, Cambodia',
    oneLine: "Cambodia's Khmer Rouge memorial sites in Phnom Penh, paired with the Angkor temples near Siem Reap.",
    image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=85',
    status: 'Researching',
  },
  {
    slug: 'auschwitz-krakow',
    name: 'Auschwitz & Kraków',
    location: 'near Kraków, Poland',
    oneLine: 'The largest Nazi German concentration and extermination camp complex, preserved as a memorial museum near Kraków.',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1000&q=85',
    status: 'Researching',
  },
  {
    slug: 'pompeii',
    name: 'Pompeii',
    location: 'near Naples, Italy',
    oneLine: 'The Roman city buried by Mount Vesuvius in 79 AD, preserved almost intact under volcanic ash.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=85',
    status: 'Researching',
  },
  {
    slug: 'khooni-nala',
    name: 'Khooni Nala',
    location: 'Jammu & Kashmir, India (research only — not an active itinerary stop)',
    oneLine: 'A landslide-prone stretch of the Jammu-Srinagar highway known locally as the "Bloody Stream" — real, documented geological danger, plus unverified ghost stories.',
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=85',
    status: 'Researching',
  },
];

export const ethicalCode: EthicalCodeItem[] = [
  {
    num: '01',
    title: 'Let time pass',
    desc: 'We plan memorials and long-standing sites, never places of recent or ongoing grief.',
  },
  {
    num: '02',
    title: 'Behave as a guest',
    desc: 'Quiet voices, covered shoulders where asked. It is not a funfair.',
  },
  {
    num: '03',
    title: 'No smiling selfies',
    desc: 'Photograph the place, not yourself in front of someone’s tragedy.',
  },
  {
    num: '04',
    title: 'Tread lightly',
    desc: 'Local guides, local stays, and a small footprint on fragile places.',
  },
  {
    num: '05',
    title: 'Leave something behind',
    desc: 'Your money should reach the community that keeps the story.',
  },
];

// Legacy export compatibility
export const experiences = availableExperiences.map((exp) => ({
  slug: exp.slug,
  title: exp.name,
  tagline: exp.oneLine,
  category: 'Dark Tourism & Historic Trails' as const,
  heroImage: exp.heroImage,
  overview: exp.story.lead,
  ethos: 'We do not run photo-safaris of tragedy. Our journeys focus on education, cultural preservation, and memorial support.',
  duration: '3 to 6 Days',
  regions: [exp.location],
  keyLocations: exp.stopsOnTrail.map((s) => s.title),
  guidelines: exp.practical.howToVisit,
  featured: true,
}));
