import { useSearchParams, Link } from 'react-router-dom';
import eventsData from '@/data/events.json';
import { Filter, ChevronRight } from 'lucide-react';

type Category = 'all' | 'tech' | 'non-tech' | 'gaming';

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = (searchParams.get('category') as Category) || 'all';

  const filteredEvents = eventsData.events.filter(event => {
    return category === 'all' || event.category === category;
  });

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Events</h1>
        
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8">
          <Filter className="w-5 h-5 text-white" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Link
              key={event.id}
              to={`/events/detail?id=${event.id}`}
              className="bg-neutral-900 rounded-lg overflow-hidden flex flex-col hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow border border-white/10"
            >
              {/* Event Image */}
              {event.image && (
                <div className="w-full h-48 relative group">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              {/* Event Content */}
              <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-medium text-white">
                      {event.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm whitespace-nowrap flex-shrink-0 bg-white/10 text-white`}>
                      {event.category === 'tech' ? 'Technical' : 
                       event.category === 'non-tech' ? 'Non Technical' : 'Gaming'}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400 mt-2">
                    {event.description}
                  </p>
                </div>

                {/* Event Details */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white/80">
                      {event.teamSize}
                    </div>
                    <ChevronRight className="w-5 h-5 text-white" />
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