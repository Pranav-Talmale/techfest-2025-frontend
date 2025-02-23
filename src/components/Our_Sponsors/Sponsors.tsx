import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Simplified sponsor data
const sponsors = [
  { id: 1, name: "TechCorp Global" },
  { id: 2, name: "InnovateX" },
  { id: 3, name: "Future Systems" },
  { id: 4, name: "Digital Dynamics" },
  { id: 5, name: "Tech Ventures" },
];

export function Sponsors() {
  return (
    <section className="bg-black relative overflow-hidden py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white text-center mb-12"
        >
          Our Sponsors
        </motion.h2>

        {/* Sponsors Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-neutral-900 rounded-xl p-6 border border-white/10 h-full flex items-center justify-center hover:border-white/20 transition-colors">
                <div className="text-white/30 font-medium text-center">
                  {sponsor.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="text-white/50 hover:text-white transition-colors text-sm"
          >
            Become a Sponsor →
          </Link>
        </div>
      </div>
    </section>
  );
}