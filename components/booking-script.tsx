"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

// Booking engine scripts for different languages
const BOOKING_SCRIPTS = {
  bg: `
    !function(e,n){
        var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
        if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
        !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
        a.onerror=a.onload=function(n,i){return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
        ["bg-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
    }(window, [
            ["setContext", "BE-INT-demetra-hotel_2025-11-12", "bg"],
            ["embed", "booking-form", {
                    container: "be-booking-form"
            }],
            ["embed", "search-form", {
                    container: "be-search-form"
            }]
        ]);
  `,
  en: `
    !function(e,n){
        var t="bookingengine",o="integration",i=e[t]=e[t]||{},a=i[o]=i[o]||{},r="__cq",c="__loader",d="getElementsByTagName";
        if(n=n||[],a[r]=a[r]?a[r].concat(n):n,!a[c]){a[c]=!0;var l=e.document,g=l[d]("head")[0]||l[d]("body")[0];
        !function n(i){if(0!==i.length){var a=l.createElement("script");a.type="text/javascript",a.async=!0,a.src="https://"+i[0]+"/integration/loader.js",
        a.onerror=a.onload=function(n,i){return function(){e[t]&&e[t][o]&&e[t][o].loaded||(g.removeChild(n),i())}}(a,(function(){n(i.slice(1,i.length))})),g.appendChild(a)}}(
        ["bg-ibe.hopenapi.com", "ibe.hopenapi.com", "ibe.behopenapi.com"])}
    }(window, [
            ["setContext", "BE-INT-demetra-hotel_2025-11-12", "en"],
            ["embed", "booking-form", {
                    container: "be-booking-form"
            }],
            ["embed", "search-form", {
                    container: "be-search-form"
            }]
        ]);
  `,
};

export function BookingScript() {
  const { language } = useI18n();

  useEffect(() => {
    // Remove any existing booking script
    const existingScript = document.getElementById("booking-engine-script");
    if (existingScript) {
      existingScript.remove();
    }

    // Create and inject new script based on current language
    const script = document.createElement("script");
    script.id = "booking-engine-script";
    script.type = "text/javascript";
    script.innerHTML = BOOKING_SCRIPTS[language];

    document.head.appendChild(script);

    // Cleanup on unmount or language change
    return () => {
      const scriptToRemove = document.getElementById("booking-engine-script");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [language]);

  return null;
}
