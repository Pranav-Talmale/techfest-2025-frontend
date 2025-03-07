import { motion } from "framer-motion";

const committees = [
  {
      name: "CSI",
      logo: "/logos/csi-logo.png",
      fullName: "Computer Society of India"
    },
    {
      name: "ACM",
      logo: "/logos/acm-logo.png",
      fullName: "Association for Computing Machinery"
    },
    {
      name: "IEEE",
      logo: "/logos/ieee-logo.png",
      fullName: "Institute of Electrical and Electronics Engineers"
    },
    {
      name: "GDG",
      logo: "/logos/gdg-logo.png",
      fullName: "Google Developer Groups"
    },
    {
      name: "ISA",
      logo: "/logos/isa-logo.png",
      fullName: "International Society of Automation"
    },
    {
      name: "The Wall",
      logo: "/logos/wall-logo.png",
      fullName: "The Wall"
    },
    {
      name: "ISTE",
      logo: "/logos/iste-logo.png",
      fullName: "Indian Society for Technical Education"
    },
    {
      name: "PCR",
      logo: "/logos/pcr-logo.png",
      fullName: "Photo Circle RAIT"
    },
    {
      name: "IIC",
      logo: "/logos/iic-logo.png",
      fullName: "Institution's Innovation Council"
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
            className="text-3xl font-bold text-white mb-4"
          >
            Our Committees
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/50 max-w-2xl mx-auto"
          >
            A collaborative tech fest brought to you by RAIT's leading technical committees
          </motion.p>
        </div>

        {/* Committee Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {committees.map((committee, index) => (
            <motion.div
              key={committee.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center"
            >
              {/* Logo Container */}
              <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 p-4 flex items-center justify-center transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                <img
                  src={committee.logo}
                  alt={`${committee.name} Logo`}
                  className="w-full h-full object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
                />
              </div>
              
              {/* Committee Name Tooltip */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
                <p className="text-sm text-white/70 font-medium">{committee.name}</p>
                <p className="text-xs text-white/40">{committee.fullName}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}