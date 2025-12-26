import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Cormorant } from "next/font/google";
import { BookingScript } from "@/components/booking-script";
import { CookieConsent } from "@/components/cookie-consent";
import { StructuredData } from "@/components/structured-data";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "arial"],
});

const cormorant = Cormorant({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  preload: true,
  fallback: ["serif"],
});

const siteUrl = "https://hotel-demetra.com";

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "Хотел Деметра Берковица | Официален сайт",
    template: "%s | Хотел Деметра",
  },
  description:
    "Уютен 3-звезден семеен хотел в Берковица, в подножието на връх Ком. Ресторант, релакс център със сауна и джакузи, градина. Резервирайте директно! Cozy 3-star family hotel in Berkovitsa, Bulgaria.",
  keywords: [
    "хотел Берковица",
    "Hotel Berkovitsa",
    "хотел Деметра",
    "Hotel Demetra",
    "семеен хотел Берковица",
    "family hotel Berkovitsa",
    "настаняване Берковица",
    "accommodation Berkovitsa",
    "хотел връх Ком",
    "hotel Kom peak",
    "почивка Берковица",
    "vacation Berkovitsa",
    "ресторант Берковица",
    "релакс център",
    "сауна джакузи",
    "България хотел",
    "Bulgaria hotel",
    "Балкан хотел",
    "mountain hotel Bulgaria",
  ],
  authors: [{ name: "Хотел Деметра" }],
  creator: "Хотел Деметра",
  publisher: "Хотел Деметра",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Canonical
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      "bg-BG": "/",
      "en-US": "/",
    },
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "bg_BG",
    alternateLocale: "en_US",
    url: siteUrl,
    siteName: "Хотел Деметра | Hotel Demetra",
    title: "Хотел Деметра | Семеен хотел в Берковица",
    description:
      "Уютен 3-звезден семеен хотел в сърцето на Берковица. Ресторант, релакс център, градина. Резервирайте директно за най-добри цени!",
    images: [
      {
        url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/acc42e0e-2aa1-496e-6e63-1daa4b33b200/w=1200",
        width: 1200,
        height: 630,
        alt: "Хотел Деметра - Семеен хотел в Берковица",
      },
    ],
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "Хотел Деметра | Семеен хотел в Берковица",
    description:
      "Уютен 3-звезден семеен хотел в сърцето на Берковица. Резервирайте директно!",
    images: [
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/acc42e0e-2aa1-496e-6e63-1daa4b33b200/w=1200",
    ],
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },

  // Web App Manifest
  manifest: "/site.webmanifest",

  // Verification (add your actual verification codes)
  verification: {
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },

  // Category
  category: "travel",

  // Other
  other: {
    "geo.region": "BG-12",
    "geo.placename": "Берковица",
    "geo.position": "43.2372;23.1264",
    ICBM: "43.2372, 23.1264",
  },

  // Viewport (for Next.js 13)
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  // Theme Color
  themeColor: "#5D4E37",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://imagedelivery.net" />
        <link rel="dns-prefetch" href="https://imagedelivery.net" />
      </head>
      <body
        className={`${montserrat.variable} ${cormorant.variable} font-sans`}
      >
        <BookingScript />
        <main className="min-h-screen bg-background">{children}</main>
        <CookieConsent />
      </body>
    </html>
  );
}
