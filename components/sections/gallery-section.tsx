"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useI18n } from "@/lib/i18n";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    key: "spa"
  },
  {
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    key: "restaurant"
  },
  {
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    key: "garden"
  },
  {
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    key: "rooms"
  },
  {
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
    key: "lobby"
  }
];

const autoplayOptions = {
  delay: 4000,
  rootNode: (emblaRoot: any) => emblaRoot.parentElement,
};

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true }, 
    [Autoplay(autoplayOptions)]
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useI18n();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const newIndex = direction === 'prev'
      ? (selectedImage - 1 + galleryImages.length) % galleryImages.length
      : (selectedImage + 1) % galleryImages.length;
    setSelectedImage(newIndex);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-cormorant mb-4 text-[var(--brand-brown)]">
            {t('gallery.title')}
          </h2>
          <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden rounded-xl" ref={emblaRef}>
            <div className="flex">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative flex-[0_0_100%] min-w-0 pl-0 sm:pl-4 cursor-pointer"
                  onClick={() => setSelectedImage(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="relative aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-xl group">
                    <img
                      src={image.url}
                      alt={t(`gallery.images.${image.key}.title`)}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white transform translate-y-4 opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 hidden sm:flex">
                      <h3 className="text-2xl font-cormorant mb-2">{t(`gallery.images.${image.key}.title`)}</h3>
                      <p className="text-white/90 text-sm">{t(`gallery.images.${image.key}.description`)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-black/40"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-black/40"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex justify-center gap-3 mt-6">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'bg-[var(--brand-brown)] w-4'
                  : 'bg-[var(--brand-brown)]/30'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImage].url}
                alt={t(`gallery.images.${galleryImages[selectedImage].key}.title`)}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="mt-4 text-center text-white">
                <h3 className="text-2xl font-cormorant mb-2">
                  {t(`gallery.images.${galleryImages[selectedImage].key}.title`)}
                </h3>
                <p className="text-white/80">
                  {t(`gallery.images.${galleryImages[selectedImage].key}.description`)}
                </p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Lightbox Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('prev');
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox('next');
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:bg-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}