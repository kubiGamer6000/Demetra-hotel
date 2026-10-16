"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import { resizeImage } from "@/lib/gallery-images";
import { BOOKING_PHONE, conditionIcons, useActiveOffers, type Offer } from "@/lib/offers";
import { Gift, Phone, Calendar, Info } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function OfferFeature({ offer, index }: { offer: Offer; index: number }) {
  const { language } = useI18n();
  const l = (text: { bg: string; en: string }) => text[language];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.1 }}
      className="bg-white rounded-3xl shadow-[0_30px_80px_-40px_rgba(74,63,53,0.45)] overflow-hidden border border-[var(--brand-beige)] grid lg:grid-cols-[5fr_6fr]"
    >
      {/* Artwork */}
      <div className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-full">
        <img
          src={resizeImage(offer.image, 1400)}
          srcSet={`${resizeImage(offer.image, 800)} 800w, ${resizeImage(offer.image, 1400)} 1400w`}
          sizes="(min-width: 1024px) 45vw, 100vw"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a211a]/85 via-[#2a211a]/25 to-transparent" />
        <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase text-[var(--brand-brown)]">
          <Gift className="w-3.5 h-3.5" />
          {l(offer.badge)}
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
          <p className="font-cormorant text-[5.5rem] sm:text-[7rem] leading-none tracking-tight">
            {offer.highlight}
          </p>
          <p className="mt-2 text-white/85 text-sm sm:text-base max-w-xs">{l(offer.headline)}</p>
        </div>
      </div>

      {/* Details */}
      <div className="p-6 sm:p-10 lg:p-12 flex flex-col">
        <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] text-[var(--brand-brown)] mb-5">
          {l(offer.title)}
        </h2>
        <p className="text-[var(--brand-brown)]/75 leading-relaxed mb-8">{l(offer.description)}</p>

        <ul className="grid gap-3 sm:grid-cols-3 mb-8">
          {offer.conditions.map((condition) => {
            const Icon = conditionIcons[condition.icon];
            return (
              <li
                key={condition.icon}
                className="flex sm:flex-col items-center sm:items-start gap-3 rounded-2xl bg-[var(--brand-beige)]/35 p-4"
              >
                <span className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center text-[var(--brand-brown)]">
                  <Icon className="w-5 h-5" />
                </span>
                <span className="text-sm font-medium text-[var(--brand-brown)] leading-snug">
                  {l(condition.text)}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a
            href={BOOKING_PHONE.href}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-brown)] text-white py-4 px-6 font-medium transition-colors hover:bg-[var(--brand-brown)]/90"
          >
            <Phone className="w-4 h-4" />
            <span className="whitespace-nowrap">{BOOKING_PHONE.display}</span>
          </a>
          <a
            href="/booking"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--brand-brown)]/20 text-[var(--brand-brown)] py-4 px-6 font-medium transition-colors hover:bg-[var(--brand-beige)]/40"
          >
            <Calendar className="w-4 h-4" />
            {language === "bg" ? "Онлайн резервация" : "Book online"}
          </a>
        </div>

        <p className="mt-auto flex gap-2 text-xs leading-relaxed text-[var(--brand-brown)]/55 border-t border-[var(--brand-beige)] pt-5">
          <Info className="w-4 h-4 shrink-0 mt-px" />
          {l(offer.terms)}
        </p>
      </div>
    </motion.article>
  );
}

export default function OffersContent() {
  const { language } = useI18n();
  const activeOffers = useActiveOffers();

  const pageTitle = language === "bg" ? "Специални Оферти" : "Special Offers";
  const pageSubtitle = language === "bg"
    ? "Открийте нашите ексклузивни пакети и промоции за незабравим престой"
    : "Discover our exclusive packages and promotions for an unforgettable stay";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-[var(--brand-brown)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm mb-6">
              <Gift className="w-4 h-4" />
              {language === "bg" ? "Актуални Промоции" : "Current Promotions"}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-cormorant text-white mb-4"
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Offers */}
      <section className="flex-grow py-12 sm:py-20 bg-[var(--brand-beige)]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-10">
            {activeOffers.map((offer, index) => (
              <OfferFeature key={offer.id} offer={offer} index={index} />
            ))}

            {activeOffers.length === 0 && (
              <div className="max-w-xl mx-auto text-center bg-white rounded-2xl p-10 border border-[var(--brand-beige)]">
                <h2 className="font-cormorant text-3xl text-[var(--brand-brown)] mb-3">
                  {language === "bg" ? "Очаквайте скоро нови оферти" : "New offers coming soon"}
                </h2>
                <p className="text-[var(--brand-brown)]/70 mb-6">
                  {language === "bg"
                    ? "В момента нямаме активни промоции. Свържете се с нас за най-добра цена при директна резервация."
                    : "There are no active promotions right now. Contact us for the best rate when booking direct."}
                </p>
                <a
                  href={BOOKING_PHONE.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-brown)] text-white py-3 px-6 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  {BOOKING_PHONE.display}
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
