"use client";

import { motion } from "framer-motion";
import { Images } from "lucide-react";
import { useCallback, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  imagesForCategory,
  type Category,
  type GalleryImage,
} from "@/lib/gallery-images";
import { SpaceGallery, type Space } from "@/components/space-gallery";

const hotelSections: {
  key: string;
  image: string;
  // Gallery categories shown when the card is opened, in order.
  categories: Category[];
}[] = [
  {
    key: "hotel",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5aacfd14-b90c-4d3e-5f6c-d2c2c3664700/w=1200",
    categories: ["hotel", "garden"],
  },
  {
    key: "oldHouse",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/c97014a2-541b-4119-4d0c-4470dd5fbb00/w=1200",
    categories: ["oldHouse"],
  },
  {
    key: "restaurant",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5e12099e-477b-48cd-bf9d-9be8cef33600/w=1200",
    categories: ["restaurant"],
  },
  {
    key: "spa",
    image:
      "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/af216f5b-9576-42ce-2a47-292c698b7b00/w=1200",
    categories: ["relaxCenter"],
  },
];

const imageId = (url: string) => url.split("/").slice(-2, -1)[0];

// The card's cover photo opens the gallery, followed by the space's gallery photos.
const spaces: Space[] = hotelSections.map(({ key, image, categories }) => {
  const gallery = categories.flatMap(imagesForCategory);
  const cover: GalleryImage = { url: image, category: categories[0], alt: "" };
  return {
    key,
    images: [
      cover,
      ...gallery.filter((item) => imageId(item.url) !== imageId(image)),
    ],
  };
});

export function PlacesSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

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
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-haspopup="dialog"
                aria-label={`${t(`places.sections.${section.key}.title`)} – ${t("places.gallery.open")}`}
                className="group relative block w-full h-[350px] sm:h-[450px] overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-brown)] focus-visible:ring-offset-4"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                  style={{ backgroundImage: `url(${section.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                <span className="absolute top-5 right-5 inline-flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs tracking-wider text-white transition-all duration-500 sm:opacity-0 sm:-translate-y-1 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:group-focus-visible:opacity-100">
                  <Images className="w-3.5 h-3.5" />
                  {t("places.gallery.photos").replace(
                    "{count}",
                    String(spaces[index].images.length),
                  )}
                </span>

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
                    <span className="mt-5 inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-white/90">
                      {t("places.gallery.open")}
                      <span className="block h-px w-8 bg-white/60 transition-all duration-500 group-hover:w-14" />
                    </span>
                  </motion.div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <SpaceGallery
        spaces={spaces}
        openIndex={openIndex}
        onChangeSpace={setOpenIndex}
        onClose={close}
      />
    </section>
  );
}
