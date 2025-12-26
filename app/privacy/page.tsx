import { Metadata } from "next";
import PrivacyContent from "./privacy-content";

export const metadata: Metadata = {
  title: "Политика за поверителност | Privacy Policy",
  description:
    "Политика за защита на личните данни на Хотел Деметра. Privacy policy for Hotel Demetra, Berkovitsa - how we collect, use and protect your personal data.",
  openGraph: {
    title: "Политика за поверителност | Хотел Деметра",
    description: "Политика за защита на личните данни на Хотел Деметра",
    url: "https://hotel-demetra.com/privacy",
    type: "website",
  },
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
