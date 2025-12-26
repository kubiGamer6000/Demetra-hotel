import { Metadata } from "next";
import CancellationContent from "./cancellation-content";

export const metadata: Metadata = {
  title: "Отказ и възстановяване | Cancellation & Refund",
  description:
    "Политика за анулация и връщане на суми на Хотел Деметра. Cancellation and refund policy for Hotel Demetra, Berkovitsa.",
  openGraph: {
    title: "Отказ и възстановяване | Хотел Деметра",
    description: "Политика за анулация и връщане на суми",
    url: "https://hotel-demetra.com/cancellation",
    type: "website",
  },
  alternates: {
    canonical: "/cancellation",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CancellationPage() {
  return <CancellationContent />;
}
