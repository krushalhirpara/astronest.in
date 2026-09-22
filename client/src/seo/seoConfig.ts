/**
 * AstroNest SEO Configuration
 * Centralized domain, metadata, and Open Graph constants.
 */

export const SITE_URL = "https://astronest.in";
export const SITE_NAME = "AstroNest";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/bharat_astro_logo.png`;
export const DEFAULT_TWITTER_HANDLE = "@astronest_in";

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

export const defaultSeo: PageSeoMetadata = {
  title: "AstroNest – Online Kundli, Vedic Astrology & Daily Horoscope",
  description:
    "Generate accurate Janam Kundli, explore daily horoscope forecasts, talk to Vedic astrologers, and uncover cosmic insights with AstroNest's modern AI astrology platform.",
  canonical: SITE_URL,
  ogType: "website",
  ogImage: DEFAULT_OG_IMAGE,
  keywords: [
    "Online Kundli",
    "Janam Kundli",
    "Vedic Astrology",
    "Daily Horoscope",
    "Kundli Matching",
    "Birth Chart",
    "Astrologers Online",
    "AI Astrology"
  ]
};

export const pageSeoConfig: Record<string, PageSeoMetadata> = {
  home: {
    title: "AstroNest – Online Kundli, Vedic Astrology & Daily Horoscope",
    description:
      "Explore your free Janam Kundli, Vedic astrology birth charts, daily horoscopes, and personal astrological guidance online with AstroNest.",
    canonical: `${SITE_URL}/`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  kundli: {
    title: "Free Online Kundli – Janam Kundli & Vedic Birth Chart | AstroNest",
    description:
      "Generate your free Janam Kundli online with detailed planetary positions, Lagna chart, Nakshatra details, and personalized Vedic life predictions.",
    canonical: `${SITE_URL}/kundli`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  kundliMatching: {
    title: "Kundli Matching Online – 36 Guna Milan for Marriage | AstroNest",
    description:
      "Check marriage compatibility with free online Kundli matching. Detailed 36 Gunas Ashtakoot Milan, Manglik Dosha analysis, and Vedic matrimonial guidance.",
    canonical: `${SITE_URL}/kundli-matching`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  horoscope: {
    title: "Daily Horoscope – Today's Horoscope for All 12 Zodiac Signs | AstroNest",
    description:
      "Read today's daily, weekly, and monthly horoscope for Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces.",
    canonical: `${SITE_URL}/horoscope`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  vedicAstrology: {
    title: "Vedic Astrology Guide – Planets, 12 Houses & Nakshatras | AstroNest",
    description:
      "Learn the foundational principles of Vedic astrology (Jyotish). Discover the secrets of the 12 Bhavas, 9 Grahas, Rashis, and lunar Nakshatras.",
    canonical: `${SITE_URL}/vedic-astrology`,
    ogType: "article",
    ogImage: DEFAULT_OG_IMAGE,
  },
  astrologers: {
    title: "Talk to Vedic Astrologers Online – Expert Astrology Consultations | AstroNest",
    description:
      "Connect with certified Vedic astrologers online for career, love, marriage, health, and wealth consultations. 24/7 available trusted astrology experts.",
    canonical: `${SITE_URL}/astrologers`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  chatbot: {
    title: "AI Astro Chatbot – Instant Vedic Astrology Answers Online | AstroNest",
    description:
      "Ask any astrology question to AstroNest's AI Vedic Astrologer. Get instant personalized answers about your Kundli, planets, career, and love life.",
    canonical: `${SITE_URL}/chatbot`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  calculator: {
    title: "Vedic Astrology Calculators – Love, Numerology & Vastu | AstroNest",
    description:
      "Explore free Vedic calculators: Love Compatibility, Numerology Destiny Number, Shubh Muhurat, and Vastu direction analysis.",
    canonical: `${SITE_URL}/calculator`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  calculatorLove: {
    title: "Love Compatibility Calculator – Astrology Match by Name | AstroNest",
    description:
      "Calculate love compatibility percentage using Vedic numerology and astrological sign harmony with AstroNest's Love Calculator.",
    canonical: `${SITE_URL}/calculator/love`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  calculatorNumerology: {
    title: "Free Numerology Calculator – Life Path & Destiny Number | AstroNest",
    description:
      "Calculate your Life Path, Destiny, and Soul Urge numbers with our free Vedic numerology calculator to unlock your hidden potential.",
    canonical: `${SITE_URL}/calculator/numerology`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  calculatorVastu: {
    title: "Vastu Shastra Calculator – Home & Direction Harmony | AstroNest",
    description:
      "Optimize positive cosmic energies in your home and office with our free Vastu Shastra direction recommendations.",
    canonical: `${SITE_URL}/calculator/vastu`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  calculatorMuhurat: {
    title: "Shubh Muhurat Calculator – Auspicious Timings Today | AstroNest",
    description:
      "Find auspicious Choghadiya and Shubh Muhurat for marriage, buying property, business openings, and important life events.",
    canonical: `${SITE_URL}/calculator/muhurat`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  prediction: {
    title: "Astrology Predictions – Career, Love, Wealth & Health Forecasts | AstroNest",
    description:
      "Read detailed Vedic predictions covering career milestones, financial stability, marriage timing, and long-term future trends.",
    canonical: `${SITE_URL}/prediction`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  predictionCareer: {
    title: "Career & Wealth Astrology Predictions – Professional Success | AstroNest",
    description:
      "Analyze your 10th house, Saturn, and Jupiter placements for career growth, job promotions, and wealth accumulation through Vedic astrology.",
    canonical: `${SITE_URL}/prediction/career`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  predictionLove: {
    title: "Love & Relationship Predictions – Vedic Romance Analysis | AstroNest",
    description:
      "Gain clarity on relationship timing, soulmate connections, and emotional harmony based on Venus and 7th house alignments.",
    canonical: `${SITE_URL}/prediction/love`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  predictionHealth: {
    title: "Health & Wellness Astrology Predictions – Vedic Vitality Insights | AstroNest",
    description:
      "Understand your elemental balance (Ayurveda Doshas) and cosmic vitality indicators for holistic wellness and vitality.",
    canonical: `${SITE_URL}/prediction/health`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  predictionFuture: {
    title: "Future Planetary Trends – Dasha & Transit Forecasts | AstroNest",
    description:
      "Discover upcoming planetary transits (Gochar) of Saturn, Jupiter, Rahu, and Ketu and how they influence your life path.",
    canonical: `${SITE_URL}/prediction/future`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  blog: {
    title: "Astrology Blog – Kundli, Horoscope & Vedic Wisdom | AstroNest",
    description:
      "Read in-depth articles on Janam Kundli interpretation, Nakshatras, planetary transits, and practical Vedic astrology wisdom.",
    canonical: `${SITE_URL}/blog`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  about: {
    title: "About AstroNest – Modern AI Meets Ancient Vedic Astrology",
    description:
      "Learn about AstroNest's mission to bridge thousands of years of Vedic wisdom with cutting-edge computational intelligence for authentic cosmic guidance.",
    canonical: `${SITE_URL}/about`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  contact: {
    title: "Contact AstroNest – Astrological Support & Inquiries",
    description:
      "Have questions about your Kundli, horoscope, or consultation? Get in touch with the AstroNest customer support team.",
    canonical: `${SITE_URL}/contact`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  privacyPolicy: {
    title: "Privacy Policy | AstroNest",
    description:
      "Read the AstroNest Privacy Policy. We ensure strict confidentiality and industry-standard encryption for your personal and birth details.",
    canonical: `${SITE_URL}/privacy-policy`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  terms: {
    title: "Terms of Service & Astrological Disclaimer | AstroNest",
    description:
      "Review the Terms of Service for AstroNest. Understand our service conditions, payment terms, and astrological guidance disclaimer.",
    canonical: `${SITE_URL}/terms`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
  },
  notFound: {
    title: "Page Not Found (404) | AstroNest",
    description: "The cosmic coordinates you requested could not be found. Return to AstroNest home or explore our Kundli and Horoscope tools.",
    canonical: `${SITE_URL}/404`,
    noindex: true,
  }
};
