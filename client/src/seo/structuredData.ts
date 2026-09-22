import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./seoConfig";

/**
 * Generates Schema.org Organization structured data
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": `${SITE_URL}/bharat_astro_logo.png`,
    "sameAs": [
      "https://twitter.com/astronest_in",
      "https://facebook.com/astronest",
      "https://instagram.com/astronest.in"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@astronest.in",
      "availableLanguage": ["English", "Hindi", "Gujarati"]
    }
  };
}

/**
 * Generates Schema.org WebSite structured data with SearchAction
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Online Kundli, Vedic Astrology & Daily Horoscope Platform",
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/horoscope?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generates Schema.org BreadcrumbList structured data
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };
}

/**
 * Generates Schema.org Article / BlogPosting structured data
 */
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "url": article.url.startsWith("http") ? article.url : `${SITE_URL}${article.url}`,
    "image": article.image || DEFAULT_OG_IMAGE,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "author": {
      "@type": "Person",
      "name": article.authorName || "AstroNest Vedic Research Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/bharat_astro_logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url.startsWith("http") ? article.url : `${SITE_URL}${article.url}`
    }
  };
}

/**
 * Generates Schema.org Person (Astrologer profile) structured data
 */
export function getAstrologerPersonSchema(astrologer: {
  name: string;
  specialization: string;
  rating?: number;
  reviews?: number;
  image?: string;
  experience?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": astrologer.name,
    "jobTitle": `Vedic Astrologer - ${astrologer.specialization}`,
    "image": astrologer.image || DEFAULT_OG_IMAGE,
    "worksFor": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "knowsAbout": ["Vedic Astrology", "Kundli", "Horoscope", astrologer.specialization]
  };
}

/**
 * Generates SoftwareApplication schema for interactive tools
 */
export function getSoftwareAppSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${name} - ${SITE_NAME}`,
    "description": description,
    "url": `${SITE_URL}${path}`,
    "applicationCategory": "LifestyleApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    }
  };
}
