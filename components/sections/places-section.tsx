"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const hotelSections = [
  {
    key: "hotel",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5aacfd14-b90c-4d3e-5f6c-d2c2c3664700/w=1200",
  },
  {
    key: "oldHouse",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/c97014a2-541b-4119-4d0c-4470dd5fbb00/w=1200",
  },
  {
    key: "restaurant",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5e12099e-477b-48cd-bf9d-9be8cef33600/w=1200",
  },
  {
    key: "spa",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/af216f5b-9576-42ce-2a47-292c698b7b00/w=1200",
  },
];

export function PlacesSection() {
  const { t } = useI18n();

  return (
    <section className="py-12 sm:py-24 bg-[var(--brand-beige)]/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-cormorant mb-3 sm:mb-4 text-[var(--brand-brown)]">
            {t("places.title")}
          </h2>
          <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto">
            {t("places.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {hotelSections.map((section, index) => (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className="relative h-[350px] sm:h-[450px] overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${section.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.2 }}
                  >
                    <h3 className="text-3xl font-cormorant mb-3">
                      {t(`places.sections.${section.key}.title`)}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {t(`places.sections.${section.key}.description`)}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
