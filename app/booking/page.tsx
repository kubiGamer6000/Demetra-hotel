"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useI18n } from "@/lib/i18n";

export default function BookingPage() {
  const { t } = useI18n();

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
            {t("booking.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            className="text-white/80 text-lg max-w-2xl mx-auto"
          >
            {t("booking.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="flex-grow py-8 sm:py-12 bg-[var(--brand-beige)]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            {/* Booking Form Container */}
            <div id="be-booking-form" className="booking-form-container" />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

