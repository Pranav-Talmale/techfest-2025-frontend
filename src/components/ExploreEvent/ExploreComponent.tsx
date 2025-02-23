import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ExploreEventsCard from "./ExploreEventsCard";

interface World {
  id: string;
  imgUrl: string;
  title: string;
}

const exploreWorlds: World[] = [
  { id: "world-1", imgUrl: "/planet-01.png", title: "Technical Events" },
  { id: "world-2", imgUrl: "/planet-02.png", title: "Non Technical Events" },
  { id: "world-3", imgUrl: "/planet-03.png", title: "Competitions" },
];

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

const Explore: React.FC = () => {
  const [active, setActive] = useState<string>("world-2");

  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 bg-black" id="explore">
      <motion.div
        variants={staggerContainer(0.25, 0)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TitleText title={<>Our Events</>} textStyles="text-center" />

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreEventsCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
          >
            Explore all events
            <svg
              className="fill-white"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                fill=""
              />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
