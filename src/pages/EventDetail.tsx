import { useSearchParams, Link } from 'react-router-dom';
import eventsData from '@/data/events.json';
import { ArrowLeft, Users, Calendar, MapPin, Clock, ChevronRight, ExternalLink, Camera } from 'lucide-react';
import { useState } from 'react';

export default function EventDetail() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const event = eventsData.events.find(e => e.id === eventId);
  const [selectedImage, setSelectedImage] = useState<null | { url: string; caption: string }>(null);

  if (!event) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/events"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Link>
          <h1 className="text-4xl font-bold text-white mt-8">
            Event not found
          </h1>
        </div>
      </div>
    );
  }

  // Format date and time
  const eventDate = new Date(event.datetime);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-black pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section with Full-width Image */}
        <div className="relative h-[50vh] md:h-[60vh] w-full">
          <div className="absolute inset-0">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          {/* Back Button - Floating */}
          <div className="absolute top-8 left-8 z-10">
            <Link 
              to="/events"
              className="inline-flex items-center bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Events
            </Link>
          </div>

          {/* Event Title and Category - Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-white/10 text-white mb-4">
                {event.category === 'tech' ? 'Technical' : 
                 event.category === 'non-tech' ? 'Non Technical' : 'Gaming'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-white mb-4">About the Event</h2>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {event.description}
                </p>

                {event.rules && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-white mb-6">Rules & Guidelines</h2>
                    <ul className="space-y-4">
                      {event.rules.map((rule, index) => (
                        <li key={index} className="flex items-start">
                          <ChevronRight className="w-5 h-5 text-white/50 mt-1 flex-shrink-0" />
                          <span className="text-neutral-300 ml-4">{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Event Details</h3>
                
                {/* Date & Time */}
                <div className="flex items-start space-x-4 mb-6">
                  <Calendar className="w-6 h-6 text-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{formattedDate}</p>
                    <p className="text-neutral-400">{formattedTime}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start space-x-4 mb-6">
                  <MapPin className="w-6 h-6 text-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Venue</p>
                    <p className="text-neutral-400">{event.venue}</p>
                  </div>
                </div>

                {/* Team Size */}
                <div className="flex items-start space-x-4 mb-8">
                  <Users className="w-6 h-6 text-white/50 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">Team Size</p>
                    <p className="text-neutral-400">{event.teamSize}</p>
                  </div>
                </div>

                {/* Register Button */}
                {event.enrollLink && (
                  <a
                    href={event.enrollLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-white text-black py-3 px-6 rounded-xl font-medium hover:bg-neutral-200 transition-colors"
                  >
                    Register Now
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                )}
              </div>

              {/* Timeline */}
              <div className="mt-8 bg-neutral-900 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6">Event Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <Clock className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Registration Opens</p>
                      <p className="text-neutral-400">1 hour before event</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="w-5 h-5 text-white/50 flex-shrink-0" />
                    <div>
                      <p className="text-white font-medium">Event Starts</p>
                      <p className="text-neutral-400">{formattedTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery Section */}
          {event.gallery && event.gallery.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-8">
                <Camera className="w-6 h-6 text-white/50" />
                <h2 className="text-2xl font-semibold text-white">Previous Event Gallery</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.gallery.map((photo, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <div className="aspect-video w-full border border-white/10 overflow-hidden rounded-xl">
                      <img 
                        src={photo.url} 
                        alt={photo.caption}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="absolute bottom-4 left-4 right-4 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-7xl w-full">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              <p className="text-white text-center mt-4">{selectedImage.caption}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 