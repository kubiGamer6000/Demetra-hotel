"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomButton } from "./custom-button";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed left-0 right-0 z-50 transition-colors duration-300 overflow-hidden ${
        scrolled
          ? "bg-[var(--brand-brown)] shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
            }}
          >
            <Link
              href="/"
              className="text-2xl font-cormorant tracking-wide text-white"
            >
              {t("hero.title")}
            </Link>
          </motion.div>

          {/* Right side: Language switcher + Reserve button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <LanguageSwitcher />

            <AnimatePresence mode="wait">
              {scrolled && (
                <motion.div
                  key="reserve-button"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link href="/booking">
                    <CustomButton
                      variant="outline"
                      className="!text-xs sm:!text-sm !tracking-wider !font-medium !border-white/20 !text-white hover:!border-white/40 !px-3 sm:!px-4"
                    >
                      {t("nav.reserve")}
                    </CustomButton>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
