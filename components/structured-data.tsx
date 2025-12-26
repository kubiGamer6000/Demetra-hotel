export function StructuredData() {
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    "@id": "https://hotel-demetra.com/#hotel",
    name: "Хотел Деметра",
    alternateName: "Hotel Demetra",
    description:
      "Уютен 3-звезден семеен хотел в Берковица, съчетаващ модерен комфорт с традиционно българско гостоприемство. Cozy 3-star family hotel in Berkovitsa combining modern comfort with traditional Bulgarian hospitality.",
    url: "https://hotel-demetra.com",
    telephone: ["+359895641292", "+359884430292"],
    email: "comvers@mail.bg",
    image: [
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/acc42e0e-2aa1-496e-6e63-1daa4b33b200/w=1200",
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/605b8443-5cb2-4137-939f-8ffd833f9600/w=1500",
    ],
    logo: "https://hotel-demetra.com/logo.png",
    priceRange: "$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "3",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Владимир Заимов 6",
      addressLocality: "Берковица",
      addressRegion: "Монтана",
      postalCode: "3500",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2372,
      longitude: 23.1264,
    },
    hasMap: "https://maps.app.goo.gl/EkFdwLRJrLgo9PbC8",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    checkinTime: "14:00",
    checkoutTime: "12:00",
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "Restaurant",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free WiFi",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Sauna",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Hot Tub",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Garden",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free Parking",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Meeting Rooms",
        value: true,
      },
    ],
    sameAs: [
      "https://www.facebook.com/hoteldemetra/",
      "https://www.instagram.com/hotel_demetra/",
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hotel-demetra.com/booking",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "LodgingReservation",
        name: "Book a room",
      },
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://hotel-demetra.com/#localbusiness",
    name: "Хотел Деметра",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/acc42e0e-2aa1-496e-6e63-1daa4b33b200/w=1200",
    telephone: "+359895641292",
    email: "comvers@mail.bg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Владимир Заимов 6",
      addressLocality: "Берковица",
      addressRegion: "Монтана",
      postalCode: "3500",
      addressCountry: "BG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2372,
      longitude: 23.1264,
    },
    url: "https://hotel-demetra.com",
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://hotel-demetra.com/#organization",
    name: "Хотел Деметра",
    alternateName: "Hotel Demetra",
    url: "https://hotel-demetra.com",
    logo: "https://hotel-demetra.com/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+359895641292",
      contactType: "reservations",
      availableLanguage: ["Bulgarian", "English"],
    },
    sameAs: [
      "https://www.facebook.com/hoteldemetra/",
      "https://www.instagram.com/hotel_demetra/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://hotel-demetra.com/#website",
    url: "https://hotel-demetra.com",
    name: "Хотел Деметра | Hotel Demetra",
    description: "Официален уебсайт на Хотел Деметра, Берковица",
    publisher: {
      "@id": "https://hotel-demetra.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://hotel-demetra.com/?s={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["bg", "en"],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Начало",
        item: "https://hotel-demetra.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Резервация",
        item: "https://hotel-demetra.com/booking",
      },
    ],
  };

  // Navigation/Sitelinks schema for search engines
  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Резервация / Book Now",
        description: "Резервирайте стая директно",
        url: "https://hotel-demetra.com/booking",
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Контакти / Contact",
        description: "Свържете се с нас",
        url: "https://hotel-demetra.com/#contact-section",
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "Общи условия / Terms",
        description: "Общи условия за ползване",
        url: "https://hotel-demetra.com/terms",
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "Поверителност / Privacy",
        description: "Политика за поверителност",
        url: "https://hotel-demetra.com/privacy",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteNavigationSchema),
        }}
      />
    </>
  );
}

