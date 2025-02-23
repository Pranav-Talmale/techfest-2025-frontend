"use client";
import React from "react";
import { Spotlight } from "./Spotlight";
import { motion } from "framer-motion";

const staggerContainer = (staggerChildren: number, delayChildren: number) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const textVariant2 = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", ease: "easeIn" },
  },
};

interface TitleTextProps {
  title: React.ReactNode;
  textStyles?: string;
}

const TitleText: React.FC<TitleTextProps> = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);

export function About() {
  return (
    <div className="min-h-screen w-full rounded-md flex flex-col md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden p-8">
      <Spotlight />
      
      {/* Title */}
      <motion.div
        variants={staggerContainer(0.25, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="max-w-7xl mx-auto relative z-10 w-full text-center mb-36"
      >
        <TitleText title={<>About Us</>} />
      </motion.div>

      {/* Content: Paragraph + Image */}
      <motion.div
        variants={staggerContainer(0.25, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="max-w-full mx-auto mt-8 flex flex-col md:flex-row items-center justify-between gap-24"
      >
        {/* Text */}
        <motion.p
          variants={textVariant2}
          initial="hidden"
          whileInView="show"
          className="font-normal text-xl tracking-wide leading-tight text-neutral-300 max-w-lg text-center md:text-left"
        >
          Join us on April 7th and 8th for an electrifying showcase of technology, creativity and collaboration at Technovate'25, official techfest of RAIT
        </motion.p>

        {/* Image */}
        <motion.img
          variants={textVariant2}
          initial="hidden"
          whileInView="show"
          src="planet-01.png" // Change this to your actual image path
          alt="About Us"
          className="w-[500px] h-auto rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
}
