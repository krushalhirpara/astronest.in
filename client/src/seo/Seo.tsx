import React, { useEffect } from "react";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE, defaultSeo, PageSeoMetadata } from "./seoConfig";

export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  noindex?: boolean;
  structuredData?: Record<string, any> | Record<string, any>[];
  keywords?: string[];
}

function updateMetaTag(attribute: string, key: string, content: string | undefined) {
  if (typeof document === "undefined") return;

  let element = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!element && content) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  if (element) {
    if (content) {
      element.setAttribute("content", content);
    } else {
      element.remove();
    }
  }
}

function updateCanonical(url: string) {
  if (typeof document === "undefined") return;

  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export const Seo: React.FC<SeoProps> = ({
  title = defaultSeo.title,
  description = defaultSeo.description,
  canonical = defaultSeo.canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  structuredData,
  keywords,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Standard Meta Tags
    updateMetaTag("name", "description", description);
    updateMetaTag(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    if (keywords && keywords.length > 0) {
      updateMetaTag("name", "keywords", keywords.join(", "));
    }

    // 3. Canonical Link
    const normalizedCanonical = canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical}`;
    updateCanonical(normalizedCanonical);

    // 4. Open Graph Tags
    updateMetaTag("property", "og:title", title);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:url", normalizedCanonical);
    updateMetaTag("property", "og:type", ogType);
    updateMetaTag("property", "og:site_name", SITE_NAME);
    updateMetaTag("property", "og:image", ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`);

    // 5. Twitter Card Tags
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", title);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`);

    // 6. JSON-LD Structured Data
    const scriptId = "seo-json-ld-data";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (structuredData) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(structuredData);
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Clean up dynamic structured data script on unmount
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, noindex, structuredData, keywords]);

  return null;
};
