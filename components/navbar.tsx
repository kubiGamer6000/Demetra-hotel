"use client";

import { Menu, X, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomButton } from "./custom-button";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n";

const menuVariants = {
  closed: {
    opacity: 0,
    scale: 0.98,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const menuItemVariants = {
  closed: { opacity: 0, x: -10 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { key: "nav.home", href: "#" },
    { key: "nav.rooms", href: "#" },
    { key: "nav.amenities", href: "#" },
    { key: "nav.contacts", href: "#" },
  ];

  return (
    <>
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

            <div className="hidden md:flex items-center space-x-8">
              <motion.div className="flex items-center space-x-8 text-sm tracking-wider text-white">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.key}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <Link href={item.href} className="relative group">
                      {t(item.key)}
                      <motion.span
                        className="absolute bottom-0 left-0 w-0 h-[1px] bg-current group-hover:w-full"
                        transition={{
                          duration: 0.5,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

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
                        className="!text-sm !tracking-wider !font-medium !border-white/20 !text-white hover:!border-white/40"
                      >
                        {t("nav.reserve")}
                      </CustomButton>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <LanguageSwitcher />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 bg-[var(--brand-brown)] z-40 md:hidden"
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center justify-center h-full space-y-6"
            >
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.key}
                  custom={i}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    href={item.href}
                    className="text-white text-2xl font-cormorant hover:text-[var(--brand-beige)]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={menuItemVariants} custom={menuItems.length}>
                <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                  <CustomButton variant="outline">
                    {t("nav.reserve")}
                  </CustomButton>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
