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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* About */}
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

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-3"
          >
            <h3 className="text-xl font-cormorant mb-3 sm:mb-4">{t('footer.contact.title')}</h3>
            <a 
              href="https://maps.app.goo.gl/EkFdwLRJrLgo9PbC8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start space-x-3 text-white/80 hover:text-white transition-colors"
            >
              <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
              <span className="text-sm">{t('footer.contact.address')}</span>
            </a>
            <a 
              href="tel:+359895641292"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">+359 895 641 292</span>
            </a>
            <a 
              href="tel:+359884430292"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">+359 884 430 292</span>
            </a>
            <a 
              href="mailto:comvers@mail.bg"
              className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">comvers@mail.bg</span>
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
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
          className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-white/10"
        >
          {/* Policy Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4">
            <Link 
              href="/terms" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t('footer.policies.terms')}
            </Link>
            <Link 
              href="/privacy" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t('footer.policies.privacy')}
            </Link>
            <Link 
              href="/cancellation" 
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t('footer.policies.cancellation')}
            </Link>
          </div>
          
          <p className="text-sm text-white/60 text-center">
            {t('footer.copyright')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}