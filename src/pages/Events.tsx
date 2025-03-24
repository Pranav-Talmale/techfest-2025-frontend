import { useSearchParams, Link } from "react-router-dom";
import eventsData from "@/data/events.json";
import { Filter, Calendar, MapPin, Users, Loader2, ChevronRight, Clock, Trophy, Gamepad2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Category = "all" | "tech" | "non-tech" | "gaming";

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All Events" },
  { value: "tech", label: "Technical" },
  { value: "non-tech", label: "Non Technical" },
  { value: "gaming", label: "Gaming" },
];

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get("category") as Category) || "all";
  const [isLoading, setIsLoading] = useState(true);

  const filteredEvents = eventsData.events.filter((event) => {
    return category === "all" || event.category === category;
  });

  // Get counts for each category
  const categoryCounts = {
    all: eventsData.events.length,
    tech: eventsData.events.filter((e) => e.category === "tech").length,
    "non-tech": eventsData.events.filter((e) => e.category === "non-tech")
      .length,
    gaming: eventsData.events.filter((e) => e.category === "gaming").length,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading state
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4">Events</h1>
          <p className="text-white/50 text-lg">
            Discover and participate in our exciting range of events
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-neutral-900 rounded-xl border border-white/10">
            <Filter className="w-5 h-5 text-white/50" />
            <span className="text-white/50 text-sm">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSearchParams({ category: cat.value })}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  category === cat.value
                    ? "bg-white text-black"
                    : "bg-neutral-900 text-white/70 hover:text-white border border-white/10 hover:border-white/20"
                )}
              >
                {cat.label}
                <span className="ml-2 text-xs">
                  ({categoryCounts[cat.value]})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center min-h-[400px]"
            >
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Empty State */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-white/50 text-lg">
                    No events found in this category.
                  </p>
                </div>
              ) : (
                /* Events Grid */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="group relative bg-neutral-900/80 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,255,255,0.07)]">
                        {/* Event Image */}
                        <div className="relative overflow-hidden h-56 w-full">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          />
                          
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/70 to-transparent opacity-80" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className={cn(
                              "px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/20 uppercase tracking-wider flex items-center gap-1.5",
                              event.category === "tech" 
                                ? "bg-black/10 text-white border-white/20" 
                                : event.category === "non-tech" 
                                ? "bg-black/10 text-white border-white/20" 
                                : "bg-black/10 text-white border-white/20"
                            )}>
                              {event.category === "tech" && <Trophy className="w-3 h-3" />}
                              {event.category === "non-tech" && <Users className="w-3 h-3" />}
                              {event.category === "gaming" && <Gamepad2 className="w-3 h-3" />}
                              {event.category === "tech"
                                ? "Technical"
                                : event.category === "non-tech"
                                ? "Non Technical"
                                : "Gaming"}
                            </span>
                          </div>
                          
                          {/* Date Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <div className="bg-black/50 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-white/95" />
                              <span className="text-xs font-medium text-white/90">
                                {new Date(event.datetime).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric"
                                })}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6 relative">
                          {/* Title and Description */}
                          <div className="mb-6">
                            <h3 className="text-2xl font-bold text-white mb-2 transition-colors group-hover:text-white">
                              {event.title}
                              <span className="block w-12 h-0.5 bg-white/20 mt-2 group-hover:w-24 group-hover:bg-white/40 transition-all duration-500" />
                            </h3>
                            <p className="text-neutral-400 line-clamp-2 group-hover:text-neutral-300 transition-colors text-sm leading-relaxed">
                              {event.description}
                            </p>
                          </div>

                          {/* Event Details */}
                          <div className="mb-6 border-t border-white/10 pt-4 mt-4">
                            <div className="grid grid-cols-3 gap-2">
                              {/* Location */}
                              <div className="flex flex-col items-center text-center group/venue">
                                <MapPin className="w-5 h-5 text-white/60 group-hover/venue:text-white/90 mb-1 transition-colors" />
                                <span className="text-xs text-white/60 group-hover/venue:text-white/90 transition-colors line-clamp-1">
                                  {event.venue}
                                </span>
                              </div>
                              
                              {/* Time */}
                              <div className="flex flex-col items-center text-center group/time">
                                <Clock className="w-5 h-5 text-white/60 group-hover/time:text-white/90 mb-1 transition-colors" />
                                <span className="text-xs text-white/60 group-hover/time:text-white/90 transition-colors">
                                  {new Date(event.datetime).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                  })}
                                </span>
                              </div>
                              
                              {/* Team Size */}
                              <div className="flex flex-col items-center text-center group/team">
                                <Users className="w-5 h-5 text-white/60 group-hover/team:text-white/90 mb-1 transition-colors" />
                                <span className="text-xs text-white/60 group-hover/team:text-white/90 transition-colors">
                                  {event.teamSize}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <Link
                            to={`/events/detail?id=${event.id}`}
                            className="group/btn flex w-full items-center justify-center gap-2 bg-white text-black text-base px-4 py-3 rounded-xl font-medium hover:bg-white/90 transition-all duration-300"
                          >
                            View Details
                            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
