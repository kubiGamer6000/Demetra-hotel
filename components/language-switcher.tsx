"use client";

import { useI18n } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

const flags = {
  bg: "https://flagcdn.com/w40/bg.png",
  en: "https://flagcdn.com/w40/gb.png",
};

// Desktop Language Switcher - Shows both flags with labels
export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <motion.div
      className="flex items-center space-x-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setLanguage("bg")}
        className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-md transition-all ${
          language === "bg" ? "bg-white/20" : "hover:bg-white/10"
        }`}
      >
        <div className="relative w-5 h-4 overflow-hidden rounded-sm flex-shrink-0">
          <img
            src={flags.bg}
            alt="Bulgarian"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <span
          className={`text-sm font-medium ${
            language === "bg" ? "text-white" : "text-white/70"
          }`}
        >
          BG
        </span>
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-md transition-all ${
          language === "en" ? "bg-white/20" : "hover:bg-white/10"
        }`}
      >
        <div className="relative w-5 h-4 overflow-hidden rounded-sm flex-shrink-0">
          <img
            src={flags.en}
            alt="English"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <span
          className={`text-sm font-medium ${
            language === "en" ? "text-white" : "text-white/70"
          }`}
        >
          EN
        </span>
      </button>
    </motion.div>
  );
}

// Mobile Language Switcher - Single flag that toggles
export function MobileLanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "bg" ? "en" : "bg");
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      aria-label={`Switch to ${language === "bg" ? "English" : "Bulgarian"}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={language}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative w-6 h-5 overflow-hidden rounded-sm shadow-sm"
        >
          <img
            src={flags[language]}
            alt={language === "bg" ? "Bulgarian" : "English"}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
