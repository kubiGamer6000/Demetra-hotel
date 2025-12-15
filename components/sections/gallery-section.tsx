"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, ZoomIn, RotateCcw } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import Masonry from "react-masonry-css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useI18n } from "@/lib/i18n";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

// Category types
type Category =
  | "hotel"
  | "garden"
  | "oldHouse"
  | "restaurant"
  | "relaxCenter"
  | "other";

// Image data structure
interface GalleryImage {
  url: string;
  category: Category;
  alt: string;
}

// Gallery images data - you can add as many as you want here
const galleryImages: GalleryImage[] = [
  // Hotel images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7d7dae1f-ce9f-4dd7-062a-c7a4b6de0800/w=1200",
    category: "hotel",
    alt: "Hotel Lobby",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0cb91799-1786-4ccc-4caa-ead62804ca00/public",
    category: "restaurant",
    alt: "Restaurant",
  },

  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/f35ac973-9920-4720-ea92-a1c87a4f0200/w=1200",
    category: "hotel",
    alt: "Hotel Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/2d80ed0a-4781-4a5d-def7-74a61544e800/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/c68adc50-af9f-49ac-3080-6c38232c7400/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/d533f10d-692b-44b5-2bb5-f28ca97fbd00/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/214eacd5-ff87-48d3-62cd-2b76e48eae00/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/688c8720-32ee-4c74-8469-7e28ca618f00/public",
    category: "oldHouse",
    alt: "Old House Interior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/bb72037b-9571-4e54-afd8-d8ea887fb700/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/8c8e3e84-7aec-40b1-9f51-88b210fc6000/w=1200",
    category: "hotel",
    alt: "Hotel Room",
  },

  // Restaurant images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/a8cc9e84-abe0-48af-00ce-e00d87806900/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/ef30929e-d28d-4499-fffd-b01b4cb70d00/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/9903fee7-eb59-48a1-1d53-7338b50f7900/public",
    category: "hotel",
    alt: "Hotel Room",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7b01ef4d-f818-4419-ba07-3ead9c299a00/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/3f2678d3-441a-47bb-d3c5-0fa806031900/w=1200",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/4f5a12b3-a570-42d6-56c2-4170fead1100/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e569a87e-49de-4926-685a-d51915e26d00/public",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/9f4f4d74-721f-445b-4358-f2f3bd022400/public",
    category: "restaurant",
    alt: "Restaurant",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/4b88f973-3ead-491b-8bc9-f47e1a6b5a00/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0815c470-29a1-4885-607d-9d008f01d800/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1723d8fe-f209-40a3-57cc-9a1619f56800/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/aac0755a-2181-4cd7-4271-1ac401466800/public",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/597b33da-10d2-4892-8967-19b5e0cb8800/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/a55a564b-03aa-427e-0153-5f76ac509d00/public",
    category: "restaurant",
    alt: "Restaurant Terrace",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/22c4e709-113d-4b36-33d0-bbec4f1e0400/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/01d5b925-54f5-4be9-9013-3caa91090400/public",
    category: "garden",
    alt: "Garden View",
  },

  // Relax Center images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/c4afd910-82df-4bba-a8c2-c9ae5f4f9700/public",
    category: "relaxCenter",
    alt: "Spa Zone",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e1055b63-e5bb-4651-21ca-fd68e10a5800/public",
    category: "relaxCenter",
    alt: "Sauna",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e904c7e8-20bc-4790-9d14-cb25dfecfb00/public",
    category: "relaxCenter",
    alt: "Sauna",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/53092fd9-6304-4a40-b280-f7b9a8075200/public",
    category: "hotel",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/43a2b3b2-8992-49d8-44d3-e5ac2655d900/public",
    category: "relaxCenter",
    alt: "Spa Treatment",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1cc98be3-541f-4b80-143b-393ab0ea9a00/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/31af5279-8f44-42e0-f79f-d400cdc72a00/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/6ee82e5a-0315-4c25-ad2e-5b81275ec300/public",
    category: "relaxCenter",
    alt: "Spa Reception",
  },

  // Garden images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/732c8d14-f976-4bdd-e6cb-44b4ad88cc00/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5949f57f-c414-459c-5610-8dd28a5f5f00/public",
    category: "garden",
    alt: "Garden View",
  },

  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/ef68bc5b-220f-4f8e-1d2d-034820079800/public",
    category: "hotel",
    alt: "Hotel View",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/48327c26-b240-4529-d2e6-dc314756f100/public",
    category: "garden",
    alt: "Garden Tea Area",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/ec9f9c60-a548-4210-e3ca-93ca6818f600/public",
    category: "garden",
    alt: "Garden View",
  },

  // Old House images
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/89657b4c-c10f-446c-bd83-dbfb44a27f00/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },

  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/149ccaec-8966-4f4d-7482-8f38fdc30200/public",
    category: "oldHouse",
    alt: "Old House Interior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0df4ceb5-1e5e-4772-4fbd-32744c535500/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1afe4bef-e4c9-4162-c947-cc3f503c8f00/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/eab0064b-13cc-44fa-e13f-5ec42d20d100/public",
    category: "oldHouse",
    alt: "Old House Exterior",
  },
  {
    url: "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/f5627c1e-3105-415a-fde2-130b6752dd00/public",
    category: "hotel",
    alt: "Hotel View",
  },
  // Add more images as needed...
];

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
