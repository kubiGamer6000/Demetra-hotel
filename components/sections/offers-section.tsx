"use client";

import { motion } from "framer-motion";
import { ArrowRight, Gift, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { resizeImage } from "@/lib/gallery-images";
import { BOOKING_PHONE, conditionIcons, useActiveOffers } from "@/lib/offers";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function OffersSection() {
  const { language } = useI18n();
  const activeOffers = useActiveOffers();

  if (activeOffers.length === 0) return null;
  const l = (text: { bg: string; en: string }) => text[language];

  return (
    <section id="offers" className="py-12 sm:py-24 bg-[var(--brand-beige)]/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-14"
        >
          <h2 className="text-4xl sm:text-5xl font-cormorant mb-3 sm:mb-4 text-[var(--brand-brown)]">
            {language === "bg" ? "Специални оферти" : "Special Offers"}
          </h2>
          <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto">
            {language === "bg"
              ? "Резервирайте директно и се възползвайте от актуалните ни промоции"
              : "Book direct and enjoy our current promotions"}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-8">
          {activeOffers.map((offer) => (
            <motion.article
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="group relative overflow-hidden rounded-3xl bg-[var(--brand-brown)] text-white grid md:grid-cols-[6fr_5fr] shadow-[0_30px_80px_-40px_rgba(74,63,53,0.7)]"
            >
              {/* Content */}
              <div className="relative z-10 p-7 sm:p-10 lg:p-14 order-2 md:order-1 flex flex-col">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-beige)] text-[var(--brand-brown)] px-3.5 py-1.5 text-xs font-medium tracking-wider uppercase">
                    <Gift className="w-3.5 h-3.5" />
                    {l(offer.badge)}
                  </span>
                  <span className="text-xs tracking-[0.2em] uppercase text-white/60">
                    {l(offer.validityLabel)}
                  </span>
                </div>

                <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl leading-[1.08] mb-4">
                  {l(offer.title)}
                </h3>
                <p className="text-lg sm:text-xl text-[var(--brand-beige)] font-cormorant italic mb-8">
                  {l(offer.headline)}
                </p>

                <ul className="space-y-3 mb-10">
                  {offer.conditions.map((condition) => {
                    const Icon = conditionIcons[condition.icon];
                    return (
                      <li key={condition.icon} className="flex items-center gap-3 text-sm text-white/85">
                        <span className="w-8 h-8 shrink-0 rounded-full bg-white/10 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </span>
                        {l(condition.text)}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <a
                    href={BOOKING_PHONE.href}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand-beige)] text-[var(--brand-brown)] py-3.5 px-6 text-sm font-medium tracking-wide transition-colors hover:bg-white"
                  >
                    <Phone className="w-4 h-4" />
                    {BOOKING_PHONE.display}
                  </a>
                  <a
                    href="/offers"
                    className="group/link inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 py-3.5 px-6 text-sm font-medium tracking-wide transition-colors hover:bg-white/10"
                  >
                    {language === "bg" ? "Вижте офертата" : "View the offer"}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Artwork */}
              <div className="relative min-h-[260px] sm:min-h-[340px] order-1 md:order-2">
                <img
                  src={resizeImage(offer.image, 1200)}
                  srcSet={`${resizeImage(offer.image, 700)} 700w, ${resizeImage(offer.image, 1200)} 1200w`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                />
                {/* Blend the photo into the brown panel */}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--brand-brown)] via-[var(--brand-brown)]/20 to-transparent" />
                <div className="absolute right-6 bottom-4 md:right-8 md:bottom-6 text-right">
                  <p className="font-cormorant text-[5rem] sm:text-[7rem] lg:text-[8.5rem] leading-none text-white drop-shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
                    {offer.highlight}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
