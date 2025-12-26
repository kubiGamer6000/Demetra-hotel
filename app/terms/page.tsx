import { Metadata } from "next";
import TermsContent from "./terms-content";

export const metadata: Metadata = {
  title: "Общи условия | Terms & Conditions",
  description:
    "Общи условия за хотелско настаняване в Хотел Деметра. Terms and conditions for accommodation at Hotel Demetra, Berkovitsa.",
  openGraph: {
    title: "Общи условия | Хотел Деметра",
    description: "Общи условия за хотелско настаняване в Хотел Деметра",
    url: "https://hotel-demetra.com/terms",
    type: "website",
  },
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
