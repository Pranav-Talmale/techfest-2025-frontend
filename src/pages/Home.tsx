import Experience from "@/components/Spaceship/Experience";
import Explore from "@/components/ExploreEvent/ExploreComponent";
import { About } from "@/components/About_Section/About";
import { Theme } from "@/components/Our_Theme/Theme";
import { Sponsors } from "@/components/Our_Sponsors/Sponsors";
import { FAQ } from "@/components/Frequently_Asked_Questions/FAQ";
import { Technovate } from "@/components/Technovate_2024/Technovate";
import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <>
      {/* Controls Indicator */}
      {/* <div className="fixed bottom-4 left-4 z-10 rounded bg-black/50 p-4 text-white">
        <p className="text-sm">Controls:</p>
        <p className="text-xs text-gray-300">MouseClick - Turbo boost</p>
        <p className="text-xs text-gray-300">
          Mouse - Steer ship (disabled during turbo)
        </p>
      </div> */}
      <div className="h-screen">
        <Experience />
      </div>

      {/* Warning Banner */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 inset-x-0 z-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-yellow-500/10 backdrop-blur-sm border border-yellow-500/20 rounded-lg shadow-lg">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle
                      className="h-6 w-6 text-yellow-500"
                      aria-hidden="true"
                    />
                    <p className="ml-3 font-medium text-yellow-500">
                      <span className="hidden md:inline">
                        Warning: This website is currently in development. All
                        information, dates, and events shown are placeholder
                        data and not final.
                      </span>
                      <span className="md:hidden">
                        Development version - All information here is
                        placeholder.
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowWarning(false)}
                    className="flex p-2 rounded-md hover:bg-yellow-500/10 focus:outline-none"
                  >
                    <span className="sr-only">Dismiss</span>
                    <X className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <About />
      <Theme />
      <Explore />
      <Sponsors />
      <FAQ />
      <Technovate />
    </>
  );
}

export default Home;
