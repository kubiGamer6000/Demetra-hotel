"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomButton } from "./custom-button";
import { LanguageSwitcher, MobileLanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n";
import { Menu, X, Calendar, Mail } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle hash-based scrolling on page load
  useEffect(() => {
    if (window.location.hash === "#contact-section") {
      // Wait for page to fully render
      setTimeout(() => {
        const contactSection = document.getElementById("contact-section");
        if (contactSection) {
          const navbarHeight = 80;
          const elementPosition = contactSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    
    // Check if we're on the homepage
    const isHomepage = window.location.pathname === "/" || window.location.pathname === "";
    
    if (!isHomepage) {
      // Navigate to homepage with contact hash
      window.location.href = "/#contact-section";
      return;
    }
    
    // Small delay to allow menu to close
    setTimeout(() => {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        const navbarHeight = 80; // Account for fixed navbar
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed left-0 right-0 z-50 transition-colors duration-300 overflow-hidden ${
          scrolled || mobileMenuOpen
            ? "bg-[var(--brand-brown)] shadow-sm py-3 md:py-4"
            : "bg-transparent py-4 md:py-6"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-between items-center">
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

            {/* Right side: Contact link + Language switcher + Reserve button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={scrollToContact}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors"
              >
                {t("nav.contact")}
              </button>

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
                    <a href="/booking">
                      <CustomButton
                        variant="outline"
                        className="!text-sm !tracking-wider !font-medium !border-white/20 !text-white hover:!border-white/40 !px-4"
                      >
                        {t("nav.reserve")}
                      </CustomButton>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-between">
            {/* Language Switcher - Left */}
            <MobileLanguageSwitcher />

            {/* Logo - Center */}
            <Link
              href="/"
              className="text-xl font-cormorant tracking-wide text-white absolute left-1/2 -translate-x-1/2"
            >
              {t("hero.title")}
            </Link>

            {/* Burger Menu - Right */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute top-[60px] left-4 right-4 bg-[var(--brand-brown)] rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Book Now Button */}
                <a
                  href="/booking"
                  className="flex items-center gap-3 w-full px-4 py-3 bg-[var(--brand-beige)] text-[var(--brand-brown)] rounded-xl font-medium transition-colors hover:bg-[var(--brand-beige)]/90"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5" />
                  <span>{t("nav.reserve")}</span>
                </a>

                {/* Contact Button */}
                <button
                  onClick={scrollToContact}
                  className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 text-white rounded-xl font-medium transition-colors hover:bg-white/20"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t("nav.contact")}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
