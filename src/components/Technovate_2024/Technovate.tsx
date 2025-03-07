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

// Double the array for seamless infinite scroll
const doubledCommittees = [...committees, ...committees];

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
            Organized By
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

        {/* Committees Carousel */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
          
          {/* First Row */}
          <div className="flex animate-scroll-left">
            {doubledCommittees.slice(0, Math.ceil(doubledCommittees.length/2)).map((committee, index) => (
              <div
                key={index}
                className="flex-none mx-8 w-32 group"
              >
                <div className="relative h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <img
                    src={committee.logo}
                    alt={`${committee.name} Logo`}
                    className="w-full h-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-white/50 text-xs font-medium group-hover:text-white/90 transition-colors">
                    {committee.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex animate-scroll-right mt-12">
            {doubledCommittees.slice(Math.ceil(doubledCommittees.length/2)).map((committee, index) => (
              <div
                key={index}
                className="flex-none mx-8 w-32 group"
              >
                <div className="relative h-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <img
                    src={committee.logo}
                    alt={`${committee.name} Logo`}
                    className="w-full h-full object-contain filter brightness-75 group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-white/50 text-xs font-medium group-hover:text-white/90 transition-colors">
                    {committee.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}