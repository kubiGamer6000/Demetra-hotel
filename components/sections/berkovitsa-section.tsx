"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CustomButton } from "@/components/custom-button";
import { useI18n } from "@/lib/i18n";

export function BerkovitsaSection() {
  const { t } = useI18n();

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://hotel-demetra.com/wp-content/uploads/2025/02/wmremove-transformed.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-black/60"
      />

      <div className="relative z-10 container mx-auto px-6 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4 text-white" />
              <span className="text-sm text-white font-medium tracking-wide whitespace-nowrap">
                {t("berkovitsa.location")}
              </span>
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl font-cormorant mb-6 text-white">
            {t("berkovitsa.title")}
          </h2>

          <p className="text-base sm:text-lg text-white/95 mb-8 leading-relaxed">
            {t("berkovitsa.description")}
          </p>

          <div className="flex justify-center">
            <CustomButton
              variant="outline"
              className="!border-white/20 !text-white hover:!border-white/40"
            >
              {t("berkovitsa.button")}
            </CustomButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
