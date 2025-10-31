"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-[var(--brand-brown)] text-white py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-cormorant mb-3 sm:mb-4">{t('footer.about.title')}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {t('footer.about.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-cormorant mb-3 sm:mb-4">{t('footer.contact.title')}</h3>
            <div className="flex items-start space-x-3 text-white/80">
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm">{t('footer.contact.address')}</p>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Phone className="w-5 h-5" />
              <p className="text-sm">{t('footer.contact.phone')}</p>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Mail className="w-5 h-5" />
              <p className="text-sm">{t('footer.contact.email')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl font-cormorant mb-3 sm:mb-4">{t('footer.links.title')}</h3>
            <ul className="space-y-2">
              {['about', 'rooms', 'spa', 'restaurant', 'contacts'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href="#" 
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {t(`footer.links.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-xl font-cormorant mb-3 sm:mb-4">{t('footer.social.title')}</h3>
            <div className="flex space-x-4">
              <Link 
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/10 text-center"
        >
          <p className="text-sm text-white/60">
            {t('footer.copyright')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}