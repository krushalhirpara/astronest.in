export interface Celebrity {
  name: string;
  slug: string;
  dob: string;
  birthPlace: string;
  zodiac: string;
  image: string;
  kundliSummary: string;
  career: string;
  traits: string[];
}

export const celebrities: Celebrity[] = [
  {
    name: "A. R. Rahman",
    slug: "ar-rahman",
    dob: "06 January 1967",
    birthPlace: "Chennai, India",
    zodiac: "Capricorn",
    image: "/celebrities/ar-rahman.jpg",
    kundliSummary: "A creative genius with a dominant Venus. His chart shows a rare combination of discipline and spiritual depth, allowing him to bridge global sounds with traditional roots.",
    career: "Music Composition, Global Awards",
    traits: ["Creative", "Spiritual", "Visionary", "Disciplined"]
  },
  {
    name: "Virat Kohli",
    slug: "virat-kohli",
    dob: "05 November 1988",
    birthPlace: "Delhi, India",
    zodiac: "Scorpio",
    image: "/celebrities/virat-kohli.jpeg",
    kundliSummary: "Mars dominant personality with strong leadership traits. His chart indicates immense physical energy and a competitive spirit that thrives under pressure.",
    career: "Professional Cricket",
    traits: ["Aggressive", "Leader", "Focused", "Resilient"]
  },
  {
    name: "Sachin Tendulkar",
    slug: "sachin-tendulkar",
    dob: "24 April 1973",
    birthPlace: "Mumbai, India",
    zodiac: "Taurus",
    image: "/celebrities/sachin-tendulkar.jpg",
    kundliSummary: "Venus in the 10th house indicates sustained mastery and fame. His chart shows incredible patience and technique, characteristics of a true Earth sign dominance.",
    career: "Cricket Legend",
    traits: ["Patient", "Masterful", "Humble", "Dedicated"]
  },
  {
    name: "Priyanka Chopra",
    slug: "priyanka-chopra",
    dob: "18 July 1982",
    birthPlace: "Jamshedpur, India",
    zodiac: "Cancer",
    image: "/celebrities/priyanka-chopra.webp",
    kundliSummary: "Strong Moon influence gives her global emotional appeal. Her chart shows a powerful Rahu that facilitates international success and breaking boundaries.",
    career: "Acting, Global Entrepreneurship",
    traits: ["Empathetic", "Ambitious", "Versatile", "Expressive"]
  },
  {
    name: "MS Dhoni",
    slug: "ms-dhoni",
    dob: "07 July 1981",
    birthPlace: "Ranchi, India",
    zodiac: "Cancer",
    image: "/celebrities/ms-dhoni.jpg",
    kundliSummary: "A cool Moon placement gives him the ability to stay calm under cosmic pressure. His Saturn placement ensures longevity and respect in his chosen field.",
    career: "Cricket Captaincy, Mentorship",
    traits: ["Calm", "Strategic", "Intuitive", "Leader"]
  }
];

export const getCelebrityBySlug = (slug: string) => {
  return celebrities.find(c => c.slug === slug);
};
