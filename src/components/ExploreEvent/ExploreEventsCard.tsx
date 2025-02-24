import { motion } from "framer-motion";

interface ExploreCardProps {
  id: string;
  imgUrl: string;
  title: string;
  index: number;
  active: string;
  handleClick: (id: string) => void;
}

export default function ExploreEventsCard({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick,
}: ExploreCardProps) {
  const isActive = active === id;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`relative ${
        isActive ? "lg:flex-[3.5] flex-[10]" : "lg:flex-[0.5] flex-[2]"
      } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-700 ease-out-flex cursor-pointer overflow-hidden rounded-3xl`}
      onClick={() => handleClick(id)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 z-10" />

      {/* Background Image */}
      <motion.img
        src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      />

      {/* Content */}
      {!isActive ? (
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-semibold text-2xl text-white absolute z-20 lg:bottom-20 lg:-rotate-90 lg:origin-[0,0] drop-shadow-lg"
        >
          {title}
        </motion.h3>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 p-8 flex justify-start w-full flex-col z-20"
        >
          <div className="flex flex-col gap-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="font-bold text-[32px] text-white drop-shadow-lg"
            >
              {title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-1 h-1 rounded-full bg-white" />
              <p className="text-white/70 text-lg">Click to explore</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
