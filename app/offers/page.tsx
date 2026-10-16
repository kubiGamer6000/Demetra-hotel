import { Metadata } from "next";
import OffersContent from "./offers-content";

export const metadata: Metadata = {
  title: "Оферти | Special Offers",
  description:
    "Есенна оферта в Хотел Деметра, Берковица: плащате 2 нощувки – третата е подарък. Autumn offer at Hotel Demetra, Berkovitsa: pay for 2 nights, the third is on us.",
  openGraph: {
    title: "Оферти | Хотел Деметра",
    description:
      "Специални оферти и промоции. Резервирайте директно за най-добри цени.",
    url: "https://hotel-demetra.com/offers",
    type: "website",
  },
  alternates: {
    canonical: "/offers",
  },
};

export default function OffersPage() {
  return <OffersContent />;
}



