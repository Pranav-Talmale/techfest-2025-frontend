import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Cpu, Briefcase, Gamepad2, Palette } from "lucide-react";

const festImages = [
  { 
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80",
    year: "2023",
    caption: "Hackathon Finals",
    description: "Students collaborating on innovative solutions during our 24-hour hackathon."
  },
  {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80",
    year: "2023",
    caption: "Gaming Tournament",
    description: "Intense esports competition featuring top collegiate gamers."
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80",
    year: "2022",
    caption: "Technical Exhibition",
    description: "Showcasing cutting-edge projects and technological innovations."
  },
  {
    src: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80",
    year: "2022",
    caption: "Robotics Competition",
    description: "Teams demonstrating their robotics engineering skills."
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
    year: "2021",
    caption: "Virtual Tech Summit",
    description: "Global tech leaders sharing insights and future trends."
  },
];

export default function AboutUs() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % festImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % festImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + festImages.length) % festImages.length);
  };

  return (
    <section className="bg-black min-h-screen pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Technovate
          </h1>
          <p className="text-white/60 text-lg max-w-3xl mx-auto">
            Where Innovation Meets Excellence
          </p>
        </motion.div>

        {/* Festival Description - Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10 mb-12"
        >
          <div className="md:text-center max-w-3xl mx-auto">
            <p className="text-white/70 leading-relaxed text-base md:text-lg">
              Technovate at RAIT is more than just a techfest; it is a festival of collaboration where 
              innovation meets creativity, and technology drives change.
            </p>
          </div>
        </motion.div>

        {/* Photo Gallery Section */}
        <div className="grid gap-12 mb-12">
          {/* Main Image Display */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-square md:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 z-10" />
            <img
              src={festImages[currentImageIndex].src}
              alt={festImages[currentImageIndex].caption}
              className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            />
            
            {/* Image Info Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-white/90 font-semibold text-sm md:text-base">
                    {festImages[currentImageIndex].year}
                  </p>
                  <div className="flex space-x-2">
                    {festImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white" : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
                  {festImages[currentImageIndex].caption}
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  {festImages[currentImageIndex].description}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={previousImage}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all z-20"
            >
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 rounded-full bg-black/50 text-white/70 hover:text-white hover:bg-black/70 transition-all z-20"
            >
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
            </button>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/5 rounded-2xl p-6 md:p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 md:p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Technology</h3>
              <p className="text-white/60 text-sm">Cutting-edge workshops and competitions</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all duration-300">
                <Briefcase className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Business</h3>
              <p className="text-white/60 text-sm">Startup challenges and entrepreneurship events</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all duration-300">
                <Gamepad2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Gaming</h3>
              <p className="text-white/60 text-sm">Esports tournaments and gaming showcases</p>
            </div>
            <div className="text-center p-4 md:p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                <Palette className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold mb-2">Creativity</h3>
              <p className="text-white/60 text-sm">Design challenges and artistic exhibitions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 