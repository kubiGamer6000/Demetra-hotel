"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";

export default function CancellationPage() {
  const { t, language } = useI18n();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-32 pb-12 sm:pt-40 sm:pb-16 bg-[var(--brand-brown)]">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-4xl sm:text-6xl font-cormorant text-white mb-4"
          >
            {t("policies.cancellation.title")}
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-grow py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            className="max-w-4xl mx-auto prose prose-lg prose-brown"
          >
            {/* Bulgarian Content */}
            {language === "bg" && (
              <div className="policy-content">
                {/* PASTE YOUR BULGARIAN CANCELLATION POLICY MARKDOWN HERE */}
                <p className="text-[var(--brand-brown)]/70 italic">
                  Съдържанието на Политиката за отказ и възстановяване ще бъде добавено тук.
                </p>
              </div>
            )}

            {/* English Content */}
            {language === "en" && (
              <div className="policy-content">
                {/* PASTE YOUR ENGLISH CANCELLATION POLICY MARKDOWN HERE */}
                <p className="text-[var(--brand-brown)]/70 italic">
                  Cancellation & Refund Policy content will be added here.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

