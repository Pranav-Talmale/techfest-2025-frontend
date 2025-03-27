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
import { Helmet } from "react-helmet-async";

function Home() {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <>
      <Helmet>
        <title>Technovate 2025 | RAIT's Premier Technical Festival</title>
        <meta name="title" content="Technovate 2025" />
        <meta name="description" content="Experience the future at Technovate'25, RAIT's premier technical festival featuring 20+ technical events, expert workshops, gaming competitions, and amazing prizes." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.raittechnovate.co.in/" />
        <meta property="og:title" content="Technovate 2025 TechFest" />
        <meta property="og:site_name" content="Technovate 2025 TechFest" />
        <meta property="og:description" content="Experience the Future Join us for an electrifying showcase of technology, creativity, and innovation at RAIT's premier technical festival." />
        <meta property="og:image" content="https://technovate-2025.vercel.app/Poster-final.jpg" />
        <meta property="og:image:alt" content="Technovate'25 Event Poster" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.raittechnovate.co.in/" />
        <meta name="twitter:title" content="Technovate'25 | RAIT's Premier Technical Festival" />
        <meta name="twitter:description" content="Experience the future at Technovate'25, featuring 20+ technical events, workshops, and amazing prizes." />
        <meta name="twitter:image" content="https://www.raittechnovate.co.in/Poster-final.jpg" />
        
        {/* Structured Data - Event */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Technovate'25",
            "description": "RAIT's premier technical festival featuring technical events, workshops, and competitions",
            "image": "https://www.raittechnovate.co.in/Poster-final.jpg",
            "url": "https://www.raittechnovate.co.in/",
            "startDate": "2025-03-01T09:00:00+05:30",
            "endDate": "2025-03-03T18:00:00+05:30",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Ramrao Adik Institute of Technology",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Navi Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "Technovate RAIT",
              "url": "https://www.raittechnovate.co.in/"
            }
          })}
        </script>
      </Helmet>

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
      <Technovate />
      <FAQ />
    </>
  );
}

export default Home;
