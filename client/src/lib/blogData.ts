export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  publishedDate: string;
  readTime: string;
  image: string;
  content: string[];
  keyTakeaways: string[];
  relatedTool: { label: string; to: string };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "what-is-janam-kundli",
    title: "What Is a Janam Kundli? Understanding Your Vedic Birth Chart",
    excerpt:
      "A Janam Kundli is your exact cosmic birth blueprint. Learn what it represents, how planetary angles at birth define your nature, and why Vedic charts differ from Western charts.",
    category: "Kundli Basics",
    author: "Pt. Arjun Sharma",
    authorRole: "Senior Vedic Astrologer",
    publishedDate: "2024-03-10",
    readTime: "6 min read",
    image: "/bharat_astro_logo.png",
    keyTakeaways: [
      "A Janam Kundli maps the exact position of the 9 Grahas and 12 Bhavas at your exact moment of birth.",
      "The Lagna (Ascendant) sets the foundation of your chart and defines physical vitality and identity.",
      "Vedic astrology uses the sidereal zodiac which accounts for axial precession (Ayanamsha).",
      "Planetary periods (Dasha) reveal when specific karmic events are activated in your life."
    ],
    relatedTool: { label: "Generate Free Janam Kundli", to: "/kundli" },
    content: [
      "In the Vedic tradition of Jyotish, a Janam Kundli (natal birth chart) is far more than a simple horoscope—it is a detailed energetic blueprint of the cosmos at the exact second, minute, and geographical coordinate of your birth.",
      "The ancient rishis understood that human consciousness is deeply interconnected with the electromagnetic and gravitational rhythms of the planetary system. When you take your first breath, the prevailing astronomical geometry stamps an energetic impression on your subtle body.",
      "Your Kundli is divided into 12 houses (Bhavas), each representing a vital area of your earthly journey—from career and finance to marriage, health, and spiritual realization. Within these houses sit the 9 Grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu).",
      "Unlike Western tropical astrology which links signs to the seasons, Vedic astrology uses the sidereal (Nirayana) zodiac. This system aligns precisely with the observable constellations in the night sky, producing unprecedented accuracy in timing life milestones through the Vimshottari Dasha system.",
      "To unlock the secrets of your own chart, you can generate your comprehensive Janam Kundli with detailed planetary positions and dasha timelines using AstroNest's free online Kundli calculator."
    ]
  },
  {
    slug: "how-to-read-a-kundli",
    title: "How to Read a Kundli: A Beginner's Step-by-Step Guide",
    excerpt:
      "Demystify the diamond-shaped North Indian chart. Learn how to locate your Lagna, identify house numbers, read planetary placements, and decipher cosmic aspects.",
    category: "Guides",
    author: "Acharya Meera Joshi",
    authorRole: "Vedic Scholar & Astrologer",
    publishedDate: "2024-03-18",
    readTime: "7 min read",
    image: "/bharat_astro_logo.png",
    keyTakeaways: [
      "The top central diamond is always the 1st House (Lagna / Ascendant), regardless of the sign number inside it.",
      "Numbers inside chart houses denote Zodiac signs (1 for Aries, 2 for Taurus... 12 for Pisces).",
      "Planets with a circle, underline, or 'R' indicate Retrograde (Vakri) motion.",
      "Exalted (Uccha) planets offer peak strength, while Debilitated (Neecha) planets require conscious remedial focus."
    ],
    relatedTool: { label: "View Your Chart Analysis", to: "/kundli" },
    content: [
      "Looking at a traditional North Indian diamond-shaped Kundli can seem intimidating at first. However, once you grasp a few core conventions, reading your birth chart becomes an intuitive and enlightening process.",
      "Step 1: Locate the 1st House (Lagna). In the North Indian chart format, the top center diamond is permanently fixed as the 1st House. This house represents your physical body, temperament, and life approach.",
      "Step 2: Understand the Numbers in the Houses. The small numbers written in each house are NOT the house numbers—they are the Zodiac signs (Rashis) residing in those houses! A number '1' denotes Aries, '2' denotes Taurus, all the way to '12' for Pisces. If the number in your 1st House is '4', you are a Cancer Ascendant.",
      "Step 3: Track the Planets. Abbreviations like Su (Sun), Mo (Moon), Ma (Mars), Me (Mercury), Ju (Jupiter), Ve (Venus), Sa (Saturn), Ra (Rahu), and Ke (Ketu) indicate where the cosmic forces sit in your chart.",
      "Step 4: Check Conjunctions and Aspects (Drishti). When two planets share the same house, they combine their energies. Additionally, planets cast rays (Drishti) across the chart, significantly influencing opposite houses.",
      "By following these foundational steps, you can immediately begin understanding why certain periods of your life bring immense growth while others require patience and resilience."
    ]
  },
  {
    slug: "what-is-kundli-matching",
    title: "What Is Kundli Matching? The 36 Gunas in Marriage Compatibility",
    excerpt:
      "Explore the science of Ashtakoot Milan. Learn why families check 36 Gunas, what happens if scores are low, and how modern couples can navigate Manglik Dosha.",
    category: "Matrimonial Astrology",
    author: "Pt. Arjun Sharma",
    authorRole: "Senior Vedic Astrologer",
    publishedDate: "2024-04-02",
    readTime: "8 min read",
    image: "/bharat_astro_logo.png",
    keyTakeaways: [
      "Ashtakoot Milan evaluates 8 specific compatibility dimensions totaling 36 points (Gunas).",
      "A minimum score of 18 Gunas is classically recommended for marital harmony.",
      "Nadi Koota carries the highest weight (8 points) and governs physiological compatibility and genetic health.",
      "Manglik Dosha can be effectively neutralized through cancellation principles and specific planetary placements."
    ],
    relatedTool: { label: "Run 36 Gunas Kundli Match", to: "/kundli-matching" },
    content: [
      "In Indian culture, marriage is not merely a social agreement—it is considered a sacred union of two cosmic energies, ancestral lineages, and karmic destinies. Kundli matching (Gun Milan) provides a scientific method to assess whether two individuals can thrive together over decades.",
      "The primary method used across Northern and Western India is the Ashtakoot system. 'Ashta' means eight and 'Koota' means categories. Each category evaluates an essential facet of human compatibility:",
      "1. Varna (1 pt) – Spiritual and ego harmony. 2. Vashya (2 pts) – Power balance and mutual attraction. 3. Tara (3 pts) – Longevity and fortune. 4. Yoni (4 pts) – Biological and intimate resonance. 5. Graha Maitri (5 pts) – Friendship and intellectual alignment. 6. Gana (6 pts) – Psychological temperament. 7. Bhakoot (7 pts) – Financial stability and emotional bonding. 8. Nadi (8 pts) – Genetic compatibility and offspring vitality.",
      "If a couple scores between 18 and 24 points, it indicates a stable foundation. Scores above 25 signify exceptional harmony. Even if the score is below 18, experienced Vedic astrologers assess overall 7th house strength and planetary dasha cycles before concluding compatibility.",
      "Check your marriage compatibility today using AstroNest's comprehensive 36 Guna Milan calculator with instant Ashtakoot breakdown."
    ]
  },
  {
    slug: "what-are-the-12-houses",
    title: "The 12 Houses in Vedic Astrology and Their Deep Life Meanings",
    excerpt:
      "A comprehensive deep dive into the 12 Bhavas of Jyotish. Discover which houses govern your career, hidden wealth, romantic soulmates, and spiritual enlightenment.",
    category: "Houses & Bhavas",
    author: "Acharya Meera Joshi",
    authorRole: "Vedic Scholar & Astrologer",
    publishedDate: "2024-04-12",
    readTime: "9 min read",
    image: "/bharat_astro_logo.png",
    keyTakeaways: [
      "The 12 Houses map to the four primary Vedic life pursuits: Dharma (Duty), Artha (Wealth), Kama (Desire), and Moksha (Liberation).",
      "Kendra houses (1, 4, 7, 10) are the pillars of strength that uphold your entire life structure.",
      "Trikona houses (1, 5, 9) represent divine grace, luck, and virtuous karma from past incarnations.",
      "Dusthana houses (6, 8, 12) challenge us through obstacles, transformation, and spiritual detachment."
    ],
    relatedTool: { label: "Explore Vedic Astrology Guide", to: "/vedic-astrology" },
    content: [
      "Every life experience imaginable fits into one of the 12 houses (Bhavas) of your birth chart. These houses act as stages where planetary actors play out their karmic roles.",
      "The Dharma Houses (1st, 5th, 9th) are known as the Trikona houses. They govern your authentic life purpose, creative intelligence, and spiritual righteousness. When benefic planets occupy these houses, success arrives with natural grace.",
      "The Artha Houses (2nd, 6th, 10th) govern material security, wealth accumulation, daily work discipline, and professional status. Strong placements here create financial independence and recognized leadership.",
      "The Kama Houses (3rd, 7th, 11th) represent your desires, ambitions, social relationships, and partnerships. They drive the hunger to connect with others and achieve broad influence.",
      "The Moksha Houses (4th, 8th, 12th) represent the inward journey—inner peace, emotional security, psychological transformation, and ultimate spiritual liberation. They guide you back to your transcendent source.",
      "Understanding which planets occupy these houses in your personal Janam Kundli provides profound clarity on your highest life callings and potential pitfalls."
    ]
  },
  {
    slug: "what-is-vedic-astrology",
    title: "Vedic Astrology vs Western Astrology: Key Differences Explained",
    excerpt:
      "Why does your Vedic zodiac sign differ from your Western sign? Understand the astronomical differences between the Sidereal and Tropical zodiac systems.",
    category: "Astrology Foundations",
    author: "Pt. Arjun Sharma",
    authorRole: "Senior Vedic Astrologer",
    publishedDate: "2024-04-20",
    readTime: "7 min read",
    image: "/bharat_astro_logo.png",
    keyTakeaways: [
      "Western astrology uses the Tropical zodiac based on the Vernal Equinox, while Vedic astrology uses the Sidereal zodiac based on fixed stars.",
      "Due to the precession of the equinoxes (Ayanamsha), there is an approximate 24-degree difference between the two systems.",
      "In Vedic astrology, the Moon Sign (Chandra Rashi) and Ascendant (Lagna) are given far greater importance than the Sun Sign.",
      "Vedic astrology uniquely features the Nakshatra system (27 lunar mansions) and the Dasha predictive timing engine."
    ],
    relatedTool: { label: "Find Your Vedic Moon Sign", to: "/horoscope" },
    content: [
      "One of the most common questions from people exploring astrology is: 'Why is my Sun sign different in Vedic astrology compared to Western astrology?'",
      "The answer lies in astronomical mathematics. Western astrology relies on the Tropical zodiac, which fixes 0° Aries to the Vernal Equinox (the first day of spring in the Northern hemisphere). However, due to a slight wobble in the Earth's axis called the Precession of the Equinoxes, the equinox shifts backward through the stars by approximately 1 degree every 72 years.",
      "Vedic astrology uses the Sidereal (Nirayana) zodiac, which remains locked to the fixed constellations of the night sky. The difference between the two systems is known as Ayanamsha (currently roughly 24 degrees). Consequently, if your Western sign is early Taurus, your Vedic sign is likely Aries.",
      "Furthermore, while Western astrology places primary emphasis on the Sun sign (ego and solar identity), Vedic astrology views the Moon sign (Chandra Rashi) and Ascendant (Lagna) as paramount. The Moon governs the human mind, emotions, and subconscious programming.",
      "Additionally, Vedic astrology incorporates the 27 Nakshatras—micro-zodiac constellations that provide pinpoint psychological insights and power the Vimshottari Dasha predictive system.",
      "Explore both your Vedic Sun sign, Moon sign, and Ascendant today on AstroNest to discover your true cosmic identity."
    ]
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
