import { motion } from "framer-motion";
import { Users, Trophy, Calendar } from "lucide-react";

const highlights = [
  {
    icon: Users,
    title: "100+",
    description: "Participants"
  },
  {
    icon: Trophy,
    title: "15+",
    description: "Events"
  },
  {
    icon: Calendar,
    title: "2024",
    description: "March Edition"
  }
];

export function Technovate() {
  return (
    <section className="bg-black relative overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white"
          >
            Technovate'24
          </motion.h2>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative aspect-video rounded-2xl border border-white/10 overflow-hidden mb-16"
        >
          <img
            src="/technovate-2024.jpg"
            alt="Technovate 2024"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </motion.div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="w-8 h-8 text-white/50 mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/50">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}