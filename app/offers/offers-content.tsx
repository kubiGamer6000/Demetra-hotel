"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";
import { ChevronDown, Calendar, Coffee, Utensils, Waves, Wine, Flame, Gift, Sparkles } from "lucide-react";

interface Offer {
  id: string;
  titleBg: string;
  titleEn: string;
  subtitleBg: string;
  subtitleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  image: string;
  benefits: {
    icon: React.ReactNode;
    textBg: string;
    textEn: string;
  }[];
  validityBg: string;
  validityEn: string;
  badgeBg?: string;
  badgeEn?: string;
}

const offers: Offer[] = [
  {
    id: "weekend",
    titleBg: "Уикенд Оферта",
    titleEn: "Weekend Offer",
    subtitleBg: "Отпуснете се и се насладете на релаксиращ уикенд в сърцето на Берковица!",
    subtitleEn: "Relax and enjoy a rejuvenating weekend in the heart of Berkovitsa!",
    descriptionBg: "Перфектният уикенд пакет за двама, включващ настаняване, закуска и достъп до всички удобства на хотела.",
    descriptionEn: "The perfect weekend package for two, including accommodation, breakfast, and access to all hotel amenities.",
    image: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/639f53fb-d6b7-4348-8fdd-5b1bc8d77700/w=1000",
    benefits: [
      { icon: <Calendar className="w-5 h-5" />, textBg: "2 нощувки в двойна стая", textEn: "2 nights in a double room" },
      { icon: <Coffee className="w-5 h-5" />, textBg: "Закуска за двама", textEn: "Breakfast for two" },
      { icon: <Utensils className="w-5 h-5" />, textBg: "Ваучер за обяд на стойност €10 за всеки ден", textEn: "€10 lunch voucher for each day" },
      { icon: <Waves className="w-5 h-5" />, textBg: "Ползване на басейн", textEn: "Pool access" },
    ],
    validityBg: "Валидна за настаняване: петък, събота и неделя",
    validityEn: "Valid for check-in: Friday, Saturday and Sunday",
    badgeBg: "Популярна",
    badgeEn: "Popular",
  },
  {
    id: "holiday",
    titleBg: "Празнична Оферта",
    titleEn: "Holiday Offer",
    subtitleBg: "Отпразнувайте специалните моменти с уют, вкусно вино и СПА релакс!",
    subtitleEn: "Celebrate special moments with comfort, fine wine and SPA relaxation!",
    descriptionBg: "Перфектният повод да съчетаете празник, почивка и пълноценен релакс в спокойна и уютна атмосфера.",
    descriptionEn: "The perfect opportunity to combine celebration, rest and complete relaxation in a peaceful and cozy atmosphere.",
    image: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/6028a250-253d-4fc0-3ac4-5e6911131c00/w=1000",
    benefits: [
      { icon: <Gift className="w-5 h-5" />, textBg: "Подарък при минимум 3 нощувки", textEn: "Gift with minimum 3 nights stay" },
      { icon: <Wine className="w-5 h-5" />, textBg: "Бутилка вино", textEn: "Bottle of wine" },
      { icon: <Flame className="w-5 h-5" />, textBg: "Ваучер за сауна", textEn: "Sauna voucher" },
    ],
    validityBg: "Валидна за: 1 февруари (Трифон Зарезан), 14 февруари (Св. Валентин), 1 март (Баба Марта), 8 март (Ден на жената)",
    validityEn: "Valid for: February 1st (Trifon Zarezan), February 14th (Valentine's Day), March 1st (Baba Marta), March 8th (Women's Day)",
    badgeBg: "Празнична",
    badgeEn: "Festive",
  },
];

function OfferCard({ offer, isExpanded, onToggle, language }: { 
  offer: Offer; 
  isExpanded: boolean; 
  onToggle: () => void;
  language: string;
}) {
  const title = language === "bg" ? offer.titleBg : offer.titleEn;
  const subtitle = language === "bg" ? offer.subtitleBg : offer.subtitleEn;
  const description = language === "bg" ? offer.descriptionBg : offer.descriptionEn;
  const validity = language === "bg" ? offer.validityBg : offer.validityEn;
  const badge = language === "bg" ? offer.badgeBg : offer.badgeEn;
  const bookNow = language === "bg" ? "Резервирайте" : "Book Now";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[var(--brand-beige)]"
    >
      {/* Image Header */}
      <div className="relative bg-[var(--brand-beige)]/20">
        <img 
          src={offer.image} 
          alt={title}
          className="w-full h-auto transition-transform duration-500 hover:scale-[1.02]"
        />
        {badge && (
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-[var(--brand-brown)] text-white rounded-full shadow-lg">
            {badge}
          </span>
        )}
      </div>

      {/* Card Header - Always Visible */}
      <button
        onClick={onToggle}
        className="w-full p-6 sm:p-8 text-left focus:outline-none group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[var(--brand-brown)]/60" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-cormorant text-[var(--brand-brown)] mb-2 group-hover:text-[var(--brand-brown)]/80 transition-colors">
              {title}
            </h3>
            <p className="text-[var(--brand-brown)]/70 text-sm sm:text-base">
              {subtitle}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--brand-beige)] flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5 text-[var(--brand-brown)]" />
          </motion.div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 border-t border-[var(--brand-beige)]">
              <div className="pt-6">
                <p className="text-[var(--brand-brown)]/80 mb-6">
                  {description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3 mb-6">
                  {offer.benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-[var(--brand-brown)]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-beige)]/50 flex items-center justify-center text-[var(--brand-brown)]">
                        {benefit.icon}
                      </div>
                      <span className="font-medium">
                        {language === "bg" ? benefit.textBg : benefit.textEn}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Validity */}
                <div className="p-4 bg-[var(--brand-beige)]/30 rounded-xl mb-6">
                  <p className="text-sm text-[var(--brand-brown)]/70 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {validity}
                  </p>
                </div>

                {/* Book Now Button */}
                <motion.a
                  href="/booking"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 bg-[var(--brand-brown)] text-white font-medium rounded-xl hover:bg-[var(--brand-brown)]/90 transition-colors text-center"
                >
                  {bookNow}
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function OffersContent() {
  const { t, language } = useI18n();
  const [expandedId, setExpandedId] = useState<string | null>("weekend");

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const pageTitle = language === "bg" ? "Специални Оферти" : "Special Offers";
  const pageSubtitle = language === "bg" 
    ? "Открийте нашите ексклузивни пакети и промоции за незабравим престой"
    : "Discover our exclusive packages and promotions for an unforgettable stay";
  const autoApplied = language === "bg"
    ? "Офертите се прилагат автоматично в нашата резервационна система при избор на подходящи дати."
    : "Offers are automatically applied in our booking system when you select eligible dates.";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-[var(--brand-brown)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm mb-6">
              <Gift className="w-4 h-4" />
              {language === "bg" ? "Актуални Промоции" : "Current Promotions"}
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="text-4xl sm:text-6xl font-cormorant text-white mb-4"
          >
            {pageTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {pageSubtitle}
          </motion.p>
        </div>
      </section>

      {/* Offers Section */}
      <section className="flex-grow py-12 sm:py-16 bg-[var(--brand-beige)]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {offers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <OfferCard
                  offer={offer}
                  isExpanded={expandedId === offer.id}
                  onToggle={() => handleToggle(offer.id)}
                  language={language}
                />
              </motion.div>
            ))}
          </div>

          {/* Auto-applied Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl mx-auto mt-8"
          >
            <p className="text-center text-sm text-[var(--brand-brown)]/60 bg-white/50 rounded-xl p-4">
              <Sparkles className="w-4 h-4 inline mr-2" />
              {autoApplied}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

