"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HotelHero } from "@/components/sections/hotel/hero-section";
import { HotelFeatures } from "@/components/sections/hotel/features-section";
import { HotelRooms } from "@/components/sections/hotel/rooms-section";
import { CTASection } from "@/components/sections/cta-section";

export default function HotelPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col min-h-screen"
    >
      <Navbar />
      <HotelHero />
      <HotelFeatures />
      <HotelRooms />
      <CTASection />
      <Footer />
    </motion.div>
  );
}