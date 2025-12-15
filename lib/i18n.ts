"use client";

import { create } from "zustand";
import commonTranslations from "../locales/common.json";
import homepageTranslations from "../locales/homepage.json";
import hotelpageTranslations from "../locales/hotelpage.json";

type Language = "bg" | "en";

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Import translation files with both languages
const translations = {
  common: commonTranslations,
  homepage: homepageTranslations,
  hotelpage: hotelpageTranslations,
};

/**
 * Helper function to get translation value from nested object
 * @param obj - The object to traverse
 * @param path - The path to the value (e.g., "hero.title")
 * @param language - The current language
 */
function getNestedValue(obj: any, path: string, language: Language): string {
  const keys = path.split(".");
  let value = obj;

  for (const key of keys) {
    if (value === undefined || value === null) return path;
    value = value[key];
  }

  // If we have an object with language keys, get the language-specific value
  if (value && typeof value === "object" && (value.bg || value.en)) {
    return value[language] || path;
  }

  // If it's already a string, return it
  if (typeof value === "string") {
    return value;
  }

  return path;
}

export const useI18n = create<I18nStore>((set, get) => ({
  language: "bg",
  setLanguage: (lang: Language) => set({ language: lang }),
  t: (key: string) => {
    const { language } = get();

    // First, check if the key starts with a known translation file prefix
    // This maintains backward compatibility with existing code
    const [firstPart, ...rest] = key.split(".");
    const remainingPath = rest.join(".");

    // Map old section names to new translation files
    const sectionMapping: Record<
      string,
      { file: keyof typeof translations; path?: string }
    > = {
      // Common translations (nav, footer, policies)
      nav: { file: "common", path: "nav" },
      footer: { file: "common", path: "footer" },
      policies: { file: "common", path: "policies" },

      // Homepage sections
      hero: { file: "homepage", path: "hero" },
      features: { file: "homepage", path: "features" },
      places: { file: "homepage", path: "places" },
      berkovitsa: { file: "homepage", path: "berkovitsa" },
      gallery: { file: "homepage", path: "gallery" },
      testimonials: { file: "homepage", path: "testimonials" },
      cta: { file: "homepage", path: "cta" },
      booking: { file: "homepage", path: "booking" },
      funding: { file: "homepage", path: "funding" },

      // Hotel page sections
      hotel: { file: "hotelpage", path: "" }, // hotel.* maps directly to hotelpage.*
    };

    // Check if we have a mapping for this section
    if (sectionMapping[firstPart]) {
      const mapping = sectionMapping[firstPart];
      const translationFile = translations[mapping.file];

      // Build the full path within the translation file
      let fullPath = remainingPath;
      if (mapping.path) {
        fullPath = mapping.path + (remainingPath ? "." + remainingPath : "");
      }

      return getNestedValue(translationFile, fullPath, language);
    }

    // If no mapping found, try to find it in all translation files
    // This provides a fallback for any unmapped keys
    for (const file of Object.values(translations)) {
      const value = getNestedValue(file, key, language);
      if (value !== key) {
        return value;
      }
    }

    return key;
  },
}));
