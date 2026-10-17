"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ZoomIn, RotateCcw } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import Masonry from "react-masonry-css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useI18n } from "@/lib/i18n";
import { galleryImages, type Category } from "@/lib/gallery-images";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

const IMAGES_PER_PAGE = 15;

export function GallerySection() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [displayCount, setDisplayCount] = useState(IMAGES_PER_PAGE);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (!selectedCategory) {
      return galleryImages;
    }
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  // Get images to display based on pagination
  const displayedImages = useMemo(() => {
    return filteredImages.slice(0, displayCount);
  }, [filteredImages, displayCount]);

  // Check if there are more images to load
  const hasMore = displayCount < filteredImages.length;

  // Select category
  const selectCategory = useCallback((category: Category | null) => {
    setSelectedCategory(category);
    setDisplayCount(IMAGES_PER_PAGE); // Reset pagination when filtering
  }, []);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  // Load more images
  const loadMore = useCallback(() => {
    setDisplayCount((prev) =>
      Math.min(prev + IMAGES_PER_PAGE, filteredImages.length)
    );
  }, [filteredImages.length]);

  // Responsive columns for masonry
  const breakpointColumns = {
    default: 3, // Fewer columns = bigger images on desktop
    1100: 3,
    900: 2,
    500: 1,
  };

  // Category buttons data
  const categories = [
    { key: "hotel" as Category, label: t("gallery.categories.hotel") },
    { key: "garden" as Category, label: t("gallery.categories.garden") },
    { key: "oldHouse" as Category, label: t("gallery.categories.oldHouse") },
    {
      key: "restaurant" as Category,
      label: t("gallery.categories.restaurant"),
    },
    {
      key: "relaxCenter" as Category,
      label: t("gallery.categories.relaxCenter"),
    },
  ];

  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <h2 className="text-4xl sm:text-5xl font-cormorant mb-3 sm:mb-4 text-[var(--brand-brown)]">
            {t("gallery.title")}
          </h2>
          <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto mb-6 sm:mb-8">
            {t("gallery.subtitle")}
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map(({ key, label }) => (
              <motion.button
                key={key}
                onClick={() =>
                  selectCategory(selectedCategory === key ? null : key)
                }
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium tracking-wider transition-all duration-300 ${
                  selectedCategory === key
                    ? "bg-[var(--brand-brown)] text-white shadow-lg"
                    : "bg-[var(--brand-beige)]/30 text-[var(--brand-brown)] hover:bg-[var(--brand-beige)]/50"
                }`}
              >
                {label}
              </motion.button>
            ))}
            {selectedCategory && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => selectCategory(null)}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium tracking-wider bg-red-500 text-white hover:bg-red-600 transition-all duration-300 flex items-center gap-2 shadow-md"
              >
                <RotateCcw className="w-4 h-4" />
                {t("gallery.clearFilter")}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Masonry Gallery */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
          <Masonry
            breakpointCols={breakpointColumns}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {displayedImages.map((image, index) => (
              <motion.div
                key={`${image.url}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: index * 0.02,
                }}
                className="mb-4 group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <ZoomIn className="w-5 h-5 text-[var(--brand-brown)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mt-8 sm:mt-12 px-4"
          >
            <motion.button
              onClick={loadMore}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="px-8 py-3 bg-[var(--brand-beige)] hover:bg-[var(--brand-beige)]/90 text-[var(--brand-brown)] rounded-lg font-medium tracking-wider flex items-center gap-2 transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              {t("gallery.loadMore")}
            </motion.button>
          </motion.div>
        )}

        {/* Lightbox/Fullscreen Viewer */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors p-2"
              >
                <X className="w-8 h-8" />
              </button>

              <Swiper
                modules={[Navigation, Zoom, Keyboard]}
                navigation
                zoom={{
                  maxRatio: 3,
                  minRatio: 1,
                }}
                keyboard={{
                  enabled: true,
                  onlyInViewport: false,
                }}
                initialSlide={lightboxIndex}
                onSwiper={setSwiperInstance}
                className="w-full h-full"
                style={
                  {
                    "--swiper-navigation-color": "#fff",
                    "--swiper-navigation-size": "44px",
                  } as React.CSSProperties
                }
              >
                {displayedImages.map((image, index) => (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom styles for masonry and swiper */}
      <style jsx global>{`
        .masonry-grid {
          display: flex;
          margin-left: -24px;
          width: auto;
        }

        .masonry-grid-column {
          padding-left: 24px;
          background-clip: padding-box;
        }

        /* Ensure images fill their containers */
        .masonry-grid-column > * {
          width: 100%;
        }

        @media (max-width: 900px) {
          .masonry-grid {
            margin-left: -16px;
          }
          .masonry-grid-column {
            padding-left: 16px;
          }
        }

        @media (max-width: 500px) {
          .masonry-grid {
            margin-left: -8px;
          }
          .masonry-grid-column {
            padding-left: 8px;
          }
        }

        .swiper-button-prev,
        .swiper-button-next {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-size: 20px;
          font-weight: bold;
        }

        .swiper-zoom-container {
          cursor: zoom-in;
        }

        .swiper-zoom-container.swiper-zoom-scaled {
          cursor: move;
        }
      `}</style>
    </section>
  );
}
