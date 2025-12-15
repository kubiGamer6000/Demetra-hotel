"use client";

import { Phone, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { CustomButton } from "@/components/custom-button";
import { useI18n } from "@/lib/i18n";
import { useState, useEffect } from "react";

const desktopImages = [
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/3737690b-a6d0-4c60-1ace-f53f5b4e5300/w=1200", // lobby
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/a7727b18-99bd-4531-c77b-b66632ed4d00/w=1200", // RESTORANT
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/d8536628-bfe7-4a10-8d04-e4a780602f00/w=1200", // spa zona
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/2c76d2ab-12d8-432e-6312-9b5741010200/w=1200", // chai
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/b3eaea81-7215-48f4-0608-5638c8bbc100/w=1200", // menu
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/9580aa58-0aad-4583-590c-c07d2fa68000/w=1200", // sauna
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/1779c791-7403-48d6-577c-499358a53300/w=1200", // biblioteka
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/0df5f4a9-c869-4de2-86a5-fb3a2bef2800/w=1200", // starata kushta
];

const mobileImages = [
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/5a9f7200-3403-460d-7f8d-3ce1f18c6900/w=1200",
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/995ce72e-3578-416e-03ed-32c9f1b3a900/w=1200",
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7172dce5-5207-4324-85bd-f95b12321100/w=1200",
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7a15151a-efc6-4608-baca-923b98647000/w=1200",
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/07be3dd6-e17c-47ae-52f8-5db429185c00/w=1200",
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/7c3bd776-07f4-4ba7-e49e-17a2bb80e600/w=1200",
  "https://imagedelivery.net/35no9GFfwq2slSYoRYVHtA/e99ff4df-d218-4b08-63db-bdc7290b9000/w=1200",
];

export function HeroSection() {
  const { t } = useI18n();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          (isMobile ? mobileImages.length : desktopImages.length)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  const currentImages = isMobile ? mobileImages : desktopImages;

  return (
    <section className="h-screen relative flex items-center justify-center overflow-hidden pt-20 sm:pt-0">
      {/* Background Images */}
      {currentImages.map((image, index) => (
        <motion.div
          key={`${isMobile ? "mobile" : "desktop"}-${index}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: index === currentImageIndex ? 1 : 0,
            scale: index === currentImageIndex ? [1, 1.08] : 1,
          }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: {
              duration: 12,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 bg-black/40"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
      />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center space-y-4 sm:space-y-6"
        >
          <div className="space-y-1 sm:space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.5,
              }}
              className="flex items-center justify-center gap-2 sm:gap-4"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.7,
                }}
                className="block w-8 sm:w-16 h-[1px] bg-white/60 origin-right"
              />
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.6,
                }}
                className="text-xs sm:text-base text-white/90 font-light tracking-[0.2em] sm:tracking-[0.3em] uppercase whitespace-nowrap"
              >
                {t("hero.subtitle")}
              </motion.span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.7,
                }}
                className="block w-8 sm:w-16 h-[1px] bg-white/60 origin-left"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.8,
              }}
              className="text-7xl sm:text-9xl font-normal text-white tracking-wide font-cormorant leading-tight"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 1,
              }}
              className="max-w-sm sm:max-w-2xl mx-auto -mt-2 sm:-mt-4 px-4 sm:px-0"
            >
              <p className="text-lg sm:text-3xl text-white/90 font-light italic font-cormorant leading-snug">
                "{t("hero.quote")}"
              </p>
            </motion.div>
          </div>

          {/* Mobile: Book Now & Call Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 1.4,
            }}
            className="flex md:hidden flex-row items-center justify-center gap-3 mt-8"
          >
            <a href="/booking">
              <CustomButton className="bg-[var(--brand-beige)] hover:bg-[var(--brand-beige)]/90 !text-[var(--brand-brown)] !tracking-widest group">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">{t("hero.buttons.reserve")}</span>
              </CustomButton>
            </a>
            <a href="tel:+359888123456">
              <CustomButton
                variant="outline"
                className="!px-3 !py-2.5 !border-white/20 !text-white hover:!border-white/40 !bg-black/20 !aspect-square !flex !items-center !justify-center"
              >
                <Phone className="w-4 h-4" />
              </CustomButton>
            </a>
          </motion.div>

          {/* Desktop: Booking Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 1.4,
            }}
            className="hidden md:block mt-10 w-full max-w-4xl mx-auto"
          >
            <div id="block-search" className="booking-search-container">
              <div id="be-search-form" className="be-container">
                {/* Booking engine will render here */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1], delay: 1 }}
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"
      />

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {currentImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
