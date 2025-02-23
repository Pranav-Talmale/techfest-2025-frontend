import { useSearchParams, Link } from 'react-router-dom';
import eventsData from '@/data/events.json';
import { Filter, ChevronRight, Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Category = 'all' | 'tech' | 'non-tech' | 'gaming';

const categories: { value: Category; label: string }[] = [
  { value: 'all', label: 'All Events' },
  { value: 'tech', label: 'Technical' },
  { value: 'non-tech', label: 'Non Technical' },
  { value: 'gaming', label: 'Gaming' }
];

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as Category) || 'all';
  const [isLoading, setIsLoading] = useState(true);

  const filteredEvents = eventsData.events.filter(event => {
    return category === 'all' || event.category === category;
  });

  // Get counts for each category
  const categoryCounts = {
    all: eventsData.events.length,
    tech: eventsData.events.filter(e => e.category === 'tech').length,
    'non-tech': eventsData.events.filter(e => e.category === 'non-tech').length,
    gaming: eventsData.events.filter(e => e.category === 'gaming').length
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4">
            Events
          </h1>
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
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300',
                  category === cat.value
                    ? 'bg-white text-black'
                    : 'bg-neutral-900 text-white/70 hover:text-white border border-white/10 hover:border-white/20'
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
                  <p className="text-white/50 text-lg">No events found in this category.</p>
                </div>
              ) : (
                /* Events Grid */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {filteredEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={`/events/detail?id=${event.id}`}
                        className="group block bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-500 border border-white/10 hover:border-white/20"
                      >
                        {/* Event Image */}
                        <div className="relative overflow-hidden h-64 w-full">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                          
                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white backdrop-blur-sm border border-white/20">
                              {event.category === 'tech' ? 'Technical' : 
                               event.category === 'non-tech' ? 'Non Technical' : 'Gaming'}
                            </span>
                          </div>
                        </div>

                        {/* Event Content */}
                        <div className="p-6">
                          <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-white/90 transition-colors">
                              {event.title}
                            </h3>
                            <p className="text-neutral-400 mb-6 line-clamp-2 group-hover:text-neutral-300 transition-colors">
                              {event.description}
                            </p>

                            {/* Event Details */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="flex items-center gap-2 group/item">
                                <Calendar className="w-4 h-4 text-white/50 group-hover/item:text-white/70 transition-colors" />
                                <span className="text-sm text-neutral-300 group-hover/item:text-neutral-200 transition-colors">
                                  {new Date(event.datetime).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 group/item">
                                <MapPin className="w-4 h-4 text-white/50 group-hover/item:text-white/70 transition-colors" />
                                <span className="text-sm text-neutral-300 truncate group-hover/item:text-neutral-200 transition-colors">
                                  {event.venue}
                                </span>
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                              <div className="flex items-center gap-2 group/item">
                                <Users className="w-4 h-4 text-white/50 group-hover/item:text-white/70 transition-colors" />
                                <span className="text-sm text-white/80 group-hover/item:text-white/90 transition-colors">
                                  {event.teamSize}
                                </span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                          </div>
                        </div>
                      </Link>
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