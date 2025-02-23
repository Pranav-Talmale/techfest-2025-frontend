import { useSearchParams, Link } from 'react-router-dom';
import eventsData from '@/data/events.json';
import { Filter, ChevronRight, Calendar, MapPin, Users } from 'lucide-react';
import { useEffect } from 'react';

type Category = 'all' | 'tech' | 'non-tech' | 'gaming';

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as Category) || 'all';

  const filteredEvents = eventsData.events.filter(event => {
    return category === 'all' || event.category === category;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-6xl font-bold text-white mb-8">
          Events
        </h1>
        
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-white/50" />
          <select
            value={category}
            onChange={(e) => setSearchParams({ category: e.target.value })}
            className="bg-neutral-900 text-white border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white"
          >
            <option value="all">All Events</option>
            <option value="tech">Technical</option>
            <option value="non-tech">Non Technical</option>
            <option value="gaming">Gaming</option>
          </select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/detail?id=${event.id}`}
              className="bg-neutral-900 rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 border border-white/10 group"
            >
              {/* Event Image */}
              <div className="relative overflow-hidden h-64 w-full">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover overflow-hidden group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Category Badge - Floating */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white backdrop-blur-sm">
                    {event.category === 'tech' ? 'Technical' : 
                     event.category === 'non-tech' ? 'Non Technical' : 'Gaming'}
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="flex-1 p-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {event.title}
                  </h3>
                  <p className="text-neutral-400 mb-6 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-neutral-300">
                        {new Date(event.datetime).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-neutral-300 truncate">
                        {event.venue}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-white/50" />
                      <span className="text-sm text-white/80">
                        {event.teamSize}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 