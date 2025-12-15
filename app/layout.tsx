import "./globals.css";
import type { Metadata } from "next";
import { Montserrat, Cormorant } from "next/font/google";
import { BookingScript } from "@/components/booking-script";

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

export const metadata: Metadata = {
  title: "Хотел Деметра - Берковица",
  description:
    "Насладете се на спокойствие и комфорт в прегръдката на Берковския Балкан. Модерен хотел с традиционно българско гостоприемство.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg">
      <body
        className={`${montserrat.variable} ${cormorant.variable} font-sans`}
      >
        <BookingScript />
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  );
}
