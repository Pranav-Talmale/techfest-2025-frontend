import { useSearchParams, Link } from 'react-router-dom';
import eventsData from '@/data/events.json';
import { ArrowLeft, Users, Calendar, MapPin, Clock, ChevronRight, ExternalLink, Camera, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventDetail() {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('id');
  const event = eventsData.events.find(e => e.id === eventId);
  const [selectedImage, setSelectedImage] = useState<null | { url: string; caption: string }>(null);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/events"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mt-8"
          >
            Event not found
          </motion.h1>
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      setIsShareMenuOpen(!isShareMenuOpen);
    }
  };

  return (
    <div className="min-h-screen bg-black md:pt-10 pt-15">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section with Full-width Image */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[50vh] md:h-[60vh] w-full mt-4 md:mt-8"
        >
          <div className="absolute inset-0">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          </div>
          
          {/* Navigation and Share Buttons */}
          <div className="absolute top-8 left-8 right-8 flex justify-between z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/events"
                className="inline-flex items-center bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Events
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <button
                onClick={handleShare}
                className="inline-flex items-center bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-black/50 transition-colors"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </button>

              <AnimatePresence>
                {isShareMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-neutral-900 rounded-xl border border-white/10 overflow-hidden"
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href);
                          setIsShareMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors"
                      >
                        Copy Link
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Event Title and Category */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          >
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm text-white mb-4">
                {event.category === 'tech' ? 'Technical' : 
                 event.category === 'non-tech' ? 'Non Technical' : 'Gaming'}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {event.title}
              </h1>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="prose prose-invert max-w-none">
                <h2 className="text-2xl font-semibold text-white mb-4">About the Event</h2>
                <p className="text-neutral-300 text-lg leading-relaxed">
                  {event.description}
                </p>

                {event.rules && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12"
                  >
                    <h2 className="text-2xl font-semibold text-white mb-6">Rules & Guidelines</h2>
                    <ul className="space-y-4">
                      {event.rules.map((rule, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          className="flex items-start"
                        >
                          <ChevronRight className="w-5 h-5 text-white/50 mt-1 flex-shrink-0" />
                          <span className="text-neutral-300 ml-4">{rule}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <h3 className="text-xl font-semibold text-white mb-6">Event Details</h3>
                
                {/* Date & Time */}
                <div className="flex items-start space-x-4 mb-6 group">
                  <Calendar className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                  <div>
                    <p className="text-white font-medium group-hover:text-white/90 transition-colors">{formattedDate}</p>
                    <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">{formattedTime}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start space-x-4 mb-6 group">
                  <MapPin className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                  <div>
                    <p className="text-white font-medium group-hover:text-white/90 transition-colors">Venue</p>
                    <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">{event.venue}</p>
                  </div>
                </div>

                {/* Team Size */}
                <div className="flex items-start space-x-4 mb-8 group">
                  <Users className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                  <div>
                    <p className="text-white font-medium group-hover:text-white/90 transition-colors">Team Size</p>
                    <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">{event.teamSize}</p>
                  </div>
                </div>

                {/* Register Button */}
                {event.enrollLink && (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  {event.closed ? (
                    <button
                      className="flex items-center justify-center w-full bg-gray-500 text-white py-3 px-6 rounded-xl font-medium cursor-not-allowed"
                      disabled
                    >
                      Registrations Are Closed
                    </button>
                  ) : (
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
                </motion.div>
              )}
              </div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
              >
                <h3 className="text-xl font-semibold text-white mb-6">Event Timeline</h3>
                <div className="space-y-4">
                  {/* Conditional Registration Section for tech events */}
                  <div className="flex items-start space-x-4 group">
                    <Clock className="w-5 h-5 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                    <div>
                    {/* <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                    Registration Status
                      </p> */}
                      <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                        {event.category === "tech" && !event.closed
                          ? "Registration closes a day before the event"
                          : event.closed
                          ? "Registrations not started yet"
                          : "Registration Opens"}
                      </p>

                      {!event.closed && event.category !== "tech" && (
                        <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          1 hour before event
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Constant Event Start Section */}
                  <div className="flex items-start space-x-4 group">
                    <Clock className="w-5 h-5 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                    <div>
                      <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                        Event Starts
                      </p>
                      <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {formattedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>

          {/* Photo Gallery Section */}
          {event.gallery && event.gallery.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-16"
            >
              <div className="flex items-center gap-3 mb-8">
                <Camera className="w-6 h-6 text-white/50" />
                <h2 className="text-2xl font-semibold text-white">Previous Event Gallery</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.gallery.map((photo, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedImage(photo)}
                  >
                    <div className="aspect-video w-full border border-white/10 overflow-hidden rounded-xl group-hover:border-white/20 transition-all duration-500">
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-7xl w-full"
              >
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.caption}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                />
                <p className="text-white text-center mt-4">{selectedImage.caption}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 