"use client";
import { motion } from "framer-motion";
import { Stars } from "lucide-react";

const themeData = {
  title: "Space Odyssey",
  subtitle: "Exploring the Final Frontier",
  description: [
    "The vast expanse of space is a cosmic wonder, filled with shimmering galaxies, distant stars, and endless mysteries. Nebulas glow like celestial paintings, while planets drift in silent orbits, bathed in the light of ancient suns.",
    "Amidst the darkness, comets streak across the void, leaving trails of stardust in their wake. Space is a frontier of infinite possibilities, where the unknown invites exploration and the universe whispers its secrets to those who dare to listen."
  ],
  image: {
    src: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80",
    alt: "Space Theme - A nebula in deep space with vibrant colors and countless stars"
  }
};

export function Theme() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <Stars className="w-8 h-8 text-white/50" />
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
              {themeData.title}
            </h2>
            <Stars className="w-8 h-8 text-white/50" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-lg md:text-xl"
          >
            {themeData.subtitle}
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group order-2 md:order-1"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10">
              <img
                src={themeData.image.src}
                alt={themeData.image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8 order-1 md:order-2"
          >
            <div className="space-y-6">
              {themeData.description.map((paragraph, index) => (
                <p key={index} className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
