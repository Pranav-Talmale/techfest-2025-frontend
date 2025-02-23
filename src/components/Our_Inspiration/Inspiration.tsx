import { motion } from "framer-motion";

const patronsData = {
  title: "Our Inspiration & Chief Patrons",
  subtitle: "Honoring the visionaries who guide us with their wisdom and leadership",
  patrons: [
    {
      id: 1,
      name: "Dr. D. Y. Patil",
      role: "Founder President",
      organization: "D. Y. Patil Group",
      image: "/patrons/DYPatil.jpg"
    },
    {
      id: 2,
      name: "Dr. Vijay Patil",
      role: "Chancellor and President",
      organization: "D. Y. Patil Deemed to be University",
      image: "/patrons/VijayPatil.jpg"
    },
    {
      id: 3,
      name: "Dr. Shivani D. Patil",
      role: "Pro Chancellor and Vice President",
      organization: "D. Y. Patil Deemed to be University",
      image: "/patrons/ShivaniPatil.jpg"
    }
  ]
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
          <p className="text-white/50 max-w-2xl mx-auto">
            {patronsData.subtitle}
          </p>
        </motion.div>

        {/* Patrons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {patronsData.patrons.map((patron, index) => (
            <motion.div
              key={patron.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-colors">
                {/* Image */}
                <div className="aspect-square rounded-xl overflow-hidden mb-6 border border-white/10">
                  <img 
                    src={patron.image} 
                    alt={patron.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {patron.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-1">
                    {patron.role}
                  </p>
                  <p className="text-white/50 text-sm">
                    {patron.organization}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 