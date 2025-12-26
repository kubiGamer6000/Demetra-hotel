"use client";

import { Sparkles, Utensils, Coffee, Users } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const images = [
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/b974f643-32ca-49c6-480b-48d7630fcd00/w=1500",
    key: "restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1210820d-7441-4075-12aa-dc8be9c4ce00/w=1500",
    key: "spa",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/605b8443-5cb2-4137-939f-8ffd833f9600/w=1500",
    key: "rooms",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/3ff35b03-3523-4be3-7dbd-5d8299217300/w=1500",
    key: "garden",
  },
];

const benefits = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    key: "spa",
  },
  {
    icon: <Utensils className="w-6 h-6" />,
    key: "restaurant",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    key: "garden",
  },
  {
    icon: <Users className="w-6 h-6" />,
    key: "business",
  },
];

const autoplayOptions = {
  delay: 4000,
  rootNode: (emblaRoot: any) => emblaRoot.parentElement,
};

export function FeaturesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(autoplayOptions),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useI18n();

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-cormorant mb-3 sm:mb-4 text-[var(--brand-brown)]">
              {t("features.title")}
            </h2>
            <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto">
              {t("features.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group h-[400px] lg:h-full"
            >
              <div
                className="overflow-hidden rounded-2xl shadow-lg h-full"
                ref={emblaRef}
              >
                <div className="flex h-full">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative flex-[0_0_100%] h-full"
                    >
                      <div className="relative h-full">
                        <img
                          src={image.url}
                          alt={t(`features.images.${image.key}.title`)}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <h3 className="text-xl font-cormorant">
                            {t(`features.images.${image.key}.title`)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? "bg-white w-4" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-br from-[var(--brand-beige)]/40 to-[var(--brand-beige)]/20 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-[var(--brand-brown)]/5 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1 h-full flex flex-col">
                    <div className="bg-[var(--brand-beige)] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 text-[var(--brand-brown)] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-cormorant mb-2 text-[var(--brand-brown)]">
                        {t(`features.benefits.${benefit.key}.title`)}
                      </h3>
                      <p className="text-[var(--brand-brown)]/70 text-xs sm:text-sm leading-relaxed">
                        {t(`features.benefits.${benefit.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
