import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const patronsData = {
  title: "Our Inspiration & Chief Patrons",
  subtitle:
    "Honoring the visionaries who guide us with their wisdom and leadership",
  quote: "Education is not preparation for life; education is life itself.",
  patrons: [
    {
      id: 1,
      name: "Dr. D. Y. Patil",
      role: "Founder President",
      organization: "D. Y. Patil Group",
      image: "/patrons/DrDYPatil.jpg",
      quote: "Excellence in education empowers future generations.",
    },
    {
      id: 2,
      name: "Dr. Vijay Patil",
      role: "Chancellor and President",
      organization: "D. Y. Patil Deemed to be University",
      image: "/patrons/VijayPatil.jpg",
      quote: "Innovation and tradition go hand in hand.",
    },
    {
      id: 3,
      name: "Dr. Shivani D. Patil",
      role: "Pro Chancellor and Vice President",
      organization: "D. Y. Patil Deemed to be University",
      image: "/patrons/ShivaniPatil.jpg",
      quote: "Education is the cornerstone of progress.",
    },
  ],
};

export function Inspiration() {
  return (
    <section className="bg-black relative overflow-hidden py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {patronsData.title}
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-8">
            {patronsData.subtitle}
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-3 text-white/30"
          >
            <Quote className="w-5 h-5" />
            <p className="text-lg italic">{patronsData.quote}</p>
            <Quote className="w-5 h-5 rotate-180" />
          </motion.div>
        </motion.div>

        {/* Patrons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {patronsData.patrons.map((patron, index) => (
            <motion.div
              key={patron.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {/* Image Container */}
                <div className="relative w-full h-full rounded-xl overflow-hidden mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={patron.image}
                    alt={patron.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Quote Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-2 text-white/90">
                      <Quote className="w-4 h-4" />
                      <p className="text-sm italic">{patron.quote}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <motion.h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {patron.name}
                  </motion.h3>
                  <motion.p className="text-white/70 text-sm mb-1 group-hover:text-white/80 transition-colors">
                    {patron.role}
                  </motion.p>
                  <motion.p className="text-white/50 text-sm group-hover:text-white/60 transition-colors">
                    {patron.organization}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
