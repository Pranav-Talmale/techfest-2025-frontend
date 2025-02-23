import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const aboutData = {
  title: "Technovate'25",
  date: "March 1st - 2nd, 2025",
  mainHeading: "Experience the Future",
  description: "Join us for an electrifying showcase of technology, creativity, and innovation at RAIT's premier technical festival. Immerse yourself in cutting-edge demonstrations, participate in thrilling competitions, and connect with fellow tech enthusiasts.",
  highlights: [
    "20+ Technical Events",
    "Expert Workshops",
    "Amazing Prizes"
  ],
  stats: [
    { number: "200+", label: "Participants" },
    { number: "10+", label: "Events" },
    { number: "20+", label: "Workshops" },
    { number: "₹20k+", label: "Prize Pool" }
  ],
  poster: {
    src: "/Poster-final.png",
    alt: "Technovate'25 Poster"
  }
};

export function About() {
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
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white"
          >
            {aboutData.title}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 flex items-center justify-center gap-2 text-white/50"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-lg">{aboutData.date}</span>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center text-center md:text-left">
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8 md:space-y-12 "
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              {aboutData.mainHeading}
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
              {aboutData.description}
            </p>
            <div className="flex flex-col gap-4 text-neutral-300">
              {aboutData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
            <div className="relative aspect-[9/13] rounded-xl overflow-hidden border border-white/10">
              <img
                src={aboutData.poster.src}
                alt={aboutData.poster.alt}
                className="w-full h-full scale-105 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {aboutData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-neutral-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
