"use client";

import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import Image from "next/image";

const flags = {
  bg: "https://flagcdn.com/w40/bg.png",
  en: "https://flagcdn.com/w40/gb.png"
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <motion.div 
      className="flex items-center space-x-1.5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => setLanguage('bg')}
        className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-md transition-all ${
          language === 'bg' 
            ? 'bg-white/20' 
            : 'hover:bg-white/10'
        }`}
      >
        <div className="relative w-4 h-4 overflow-hidden rounded-sm">
          <img
            src={flags.bg}
            alt="Bulgarian"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <span className={`text-sm font-medium ${
          language === 'bg' ? 'text-white' : 'text-white/70'
        }`}>
          BG
        </span>
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-md transition-all ${
          language === 'en' 
            ? 'bg-white/20' 
            : 'hover:bg-white/10'
        }`}
      >
        <div className="relative w-4 h-4 overflow-hidden rounded-sm">
          <img
            src={flags.en}
            alt="English"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <span className={`text-sm font-medium ${
          language === 'en' ? 'text-white' : 'text-white/70'
        }`}>
          EN
        </span>
      </button>
    </motion.div>
  );
}