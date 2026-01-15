import { Metadata } from "next";
import OffersContent from "./offers-content";

export const metadata: Metadata = {
  title: "Оферти | Special Offers",
  description:
    "Специални оферти и промоции в Хотел Деметра, Берковица. Уикенд пакети, празнични оферти и СПА релакс. Special offers and promotions at Hotel Demetra, Berkovitsa.",
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

