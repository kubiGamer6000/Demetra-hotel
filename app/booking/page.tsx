import { Metadata } from "next";
import BookingContent from "./booking-content";

export const metadata: Metadata = {
  title: "Резервация | Booking",
  description:
    "Резервирайте директно в Хотел Деметра, Берковица. Най-добри цени при директна резервация. Book directly at Hotel Demetra, Berkovitsa for the best rates.",
  openGraph: {
    title: "Резервация | Хотел Деметра",
    description:
      "Резервирайте директно за най-добри цени. Book directly for best rates.",
    url: "https://hotel-demetra.com/booking",
    type: "website",
  },
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return <BookingContent />;
}
