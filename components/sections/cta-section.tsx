"use client";

import { motion } from "framer-motion";
import { CustomButton } from "@/components/custom-button";
import { Calendar } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function CTASection() {
  const { t } = useI18n();

  return (
    <section
      className="relative h-[50vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/acc42e0e-2aa1-496e-6e63-1daa4b33b200/w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl sm:text-6xl font-cormorant mb-4 sm:mb-6 text-white">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-white/90 mb-6 sm:mb-8 font-cormorant italic">
            {t("cta.subtitle")}
          </p>
          <div className="flex justify-center">
            <a href="/booking" className="inline-block">
              <CustomButton className="bg-[var(--brand-beige)] hover:bg-[var(--brand-beige)]/90 !text-[var(--brand-brown)] group w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-base">{t("cta.button")}</span>
              </CustomButton>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
