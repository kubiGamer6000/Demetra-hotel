"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const COOKIE_CONSENT_KEY = "cookie-consent";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay before showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-[var(--brand-brown)]/10 p-4 sm:p-6 relative">
            {/* Close button (mobile) - positioned in card */}
            <button
              onClick={handleDecline}
              className="absolute top-2 right-2 p-2 sm:hidden text-[var(--brand-brown)]/40 hover:text-[var(--brand-brown)] transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              {/* Icon */}
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-[var(--brand-beige)] flex-shrink-0">
                <Cookie className="w-5 h-5 text-[var(--brand-brown)]" />
              </div>

              {/* Text */}
              <div className="flex-grow pr-6 sm:pr-0">
                <p className="text-sm text-[var(--brand-brown)]/80 leading-relaxed">
                  {t("cookies.message")}{" "}
                  <Link 
                    href="/privacy" 
                    className="text-[var(--brand-brown)] underline hover:no-underline"
                  >
                    {t("cookies.learnMore")}
                  </Link>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 text-sm text-[var(--brand-brown)]/70 hover:text-[var(--brand-brown)] transition-colors"
                >
                  {t("cookies.decline")}
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-4 sm:px-5 py-2 text-sm bg-[var(--brand-brown)] text-white rounded-lg hover:bg-[var(--brand-brown)]/90 transition-colors"
                >
                  {t("cookies.accept")}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

