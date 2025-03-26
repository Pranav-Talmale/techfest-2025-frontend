import React from 'react';
import { motion } from 'framer-motion';

interface Committee {
  name: string;
  logo: string;
  fullName: string;
}

const committees: Committee[] = [
  {
    name: "CSI",
    logo: "/logos/committees/csi-logo.svg",
    fullName: "Computer Society of India",
  },
  {
    name: "ACM",
    logo: "/logos/committees/acm-logo.svg",
    fullName: "Association for Computing Machinery",
  },
  {
    name: "IEEE",
    logo: "/logos/committees/ieee-logo.svg",
    fullName: "Institute of Electrical and Electronics Engineers",
  },
  {
    name: "GDG",
    logo: "/logos/committees/gdg-logo.svg",
    fullName: "Google Developer Groups",
  },
  {
    name: "ISA",
    logo: "/logos/committees/isa-logo.png",
    fullName: "International Society of Automation",
  },
  {
    name: "ISTE",
    logo: "/logos/committees/iste-logo.svg",
    fullName: "Indian Society for Technical Education",
  },
  {
    name: "ECELL",
    logo: "/logos/committees/ecell-logo.svg",
    fullName: "ECELL",
  },
  {
    name: "PCR",
    logo: "/logos/committees/pcr-logo.svg",
    fullName: "Photo Circle RAIT",
  },
  {
    name: "IIC",
    logo: "/logos/committees/iic-logo.svg",
    fullName: "Institution's Innovation Council",
  },
  {
    name: "WALL",
    logo: "/logos/committees/the-wall-logo.svg",
    fullName: "The Wall",
  },
];

export const Technovate: React.FC = () => {
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

        {/* Existing Container */}
        <div className="container mx-auto px-4 py-8">
          {/* Committees Cards: Logo above Text with fixed image container */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {committees.map((committee, index) => (
              <motion.div
                key={committee.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-neutral-900 rounded-xl p-6 border border-white/10 h-full flex items-center justify-center transition-colors">
                  <div className="flex flex-col items-center">
                    {/* Fixed container for image */}
                    <div className="h-22 md:h-30 flex items-center justify-center w-full">
                      <img
                        src={committee.logo}
                        alt={`${committee.name} Logo`}
                        className="max-h-full object-contain"
                      />
                    </div>
                    {/* Fixed spacing for committee name */}
                    <div className="mt-6 md:pt-4">
                      <div className="text-white font-medium text-center">
                        {committee.name}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technovate;
