"use client";

import { Star, Quote, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { CustomButton } from "@/components/custom-button";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { useI18n } from "@/lib/i18n";

const testimonials = [
  {
    key: "maria",
    rating: 5,
    platform: "Google",
    date: "2024-02"
  },
  {
    key: "george",
    rating: 5,
    platform: "Booking.com",
    date: "2024-01"
  },
  {
    key: "elena",
    rating: 5,
    platform: "Google",
    date: "2024-03"
  }
];

const platformLogos = {
  Google: (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
      <path d="M3.15302 7.3455L6.43852 9.755C7.32752 7.554 9.48052 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15902 2 4.82802 4.1685 3.15302 7.3455Z" fill="#FF3D00"/>
      <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.0011 12 18C9.39897 18 7.19047 16.3415 6.35847 14.027L3.09747 16.5395C4.75247 19.778 8.11347 22 12 22Z" fill="#4CAF50"/>
      <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.785L18.7045 19.404C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
    </svg>
  ),
  "Booking.com": (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.6 12C20.6 16.7496 16.7496 20.6 12 20.6C7.25044 20.6 3.4 16.7496 3.4 12C3.4 7.25044 7.25044 3.4 12 3.4C16.7496 3.4 20.6 7.25044 20.6 12Z" fill="#003580"/>
      <path d="M12.0002 6.40002L13.8002 10.0667H17.7335L14.6668 12.5334L15.8668 16.2L12.0002 13.7334L8.13348 16.2L9.33348 12.5334L6.26682 10.0667H10.2002L12.0002 6.40002Z" fill="#FEBB02"/>
    </svg>
  )
};

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
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
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-12 sm:py-24 bg-[var(--brand-beige)]/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-cormorant mb-3 sm:mb-4 text-[var(--brand-brown)]">
            {t('testimonials.title')}
          </h2>
          <p className="text-[var(--brand-brown)]/70 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_80%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="bg-gradient-to-br from-[var(--brand-beige)]/30 to-white p-8 rounded-2xl shadow-sm border border-[var(--brand-brown)]/5 h-full flex flex-col relative group hover:shadow-md transition-all duration-300">
                    <Quote className="absolute top-6 right-6 w-8 h-8 text-[var(--brand-brown)]/10" />
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                    <p className="text-[var(--brand-brown)]/80 mb-6 italic">
                      "{t(`testimonials.reviews.${testimonial.key}.text`)}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-cormorant text-xl text-[var(--brand-brown)]">
                        {t(`testimonials.reviews.${testimonial.key}.author`)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-sm text-[var(--brand-brown)]/60">
                          {t(`testimonials.reviews.${testimonial.key}.date`)}
                        </p>
                        <span className="text-sm text-[var(--brand-brown)]/80 flex items-center gap-2 bg-white px-2 py-1 rounded-full shadow-sm">
                          {platformLogos[testimonial.platform as keyof typeof platformLogos]}
                          {testimonial.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-6 sm:mt-8">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'bg-[var(--brand-brown)] w-4'
                    : 'bg-[var(--brand-brown)]/30'
                }`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8 sm:mt-12">
            <CustomButton 
              className="bg-[var(--brand-brown)] hover:bg-[var(--brand-brown)]/90 !text-white group"
              onClick={() => window.open('https://g.page/r/CX-YOUR-GOOGLE-REVIEW-LINK', '_blank')}
            >
              <span>{t('testimonials.leaveReview')}</span>
              <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
}