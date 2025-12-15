"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FundingSection() {
  const { t } = useI18n();

  return (
    <section className="py-12 sm:py-24 bg-[var(--brand-beige)]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-cormorant mb-3 sm:mb-4 text-[var(--brand-brown)]">
              {t("funding.title")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-[var(--brand-brown)]/80 leading-relaxed">
                  {t("funding.paragraph1")}
                </p>
                <p className="text-[var(--brand-brown)]/80 leading-relaxed">
                  {t("funding.paragraph2")}
                </p>
                <p className="text-[var(--brand-brown)]/80 leading-relaxed">
                  {t("funding.paragraph3")}
                </p>
              </div>

              {/* MIG Logo and Link */}
              <motion.a
                href="https://www.mig-bg.org/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 group"
              >
                <img
                  src="https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/89b3f4fb-6055-408d-53cd-0f51421bec00/public"
                  alt="MIG Berkovitsa-Godech"
                  className="h-12 sm:h-16 w-auto"
                />
                <div className="flex items-center gap-2 text-[var(--brand-brown)]">
                  <span className="text-sm font-medium">
                    {t("funding.visitMIG")}
                  </span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </motion.a>
            </motion.div>

            {/* EU Funding Sign/Badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <img
                  src="https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/b3683bf8-3551-4d22-846f-3505e2634400/public"
                  alt={t("funding.euFundingAlt")}
                  className="w-full h-auto"
                />
              </div>

              {/* Decorative accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--brand-beige)]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[var(--brand-brown)]/5 rounded-full blur-3xl" />
            </motion.div>
          </div>

          {/* Additional Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-12 bg-gradient-to-r from-[var(--brand-beige)]/30 to-[var(--brand-beige)]/10 rounded-xl p-6 text-center"
          >
            <p className="text-sm text-[var(--brand-brown)]/70">
              {t("funding.programInfo")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



