import { useSearchParams, Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Clock,
  ExternalLink,
  Camera,
  Share2,
  Phone,
  Trophy,
  IndianRupee,
  CircleSmall,
  Loader2,
  Check,
  Copy
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchEventById, Event } from "@/services/eventService";

export default function EventDetail() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const queryEventId = searchParams.get("id");
  const pathEventId = params.id;
  const eventId = pathEventId || queryEventId;
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<null | {
    url: string;
    caption: string;
  }>(null);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedItem, setCopiedItem] = useState("");

  useEffect(() => {
    async function loadEventDetails() {
      if (!eventId) {
        setError("No event ID provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const eventData = await fetchEventById(eventId);
        
        if (!eventData) {
          setError("Event not found");
        } else {
          setEvent(eventData);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to load event details:", err);
        setError("Failed to load event details. Please try again later.");
      } finally {
        setTimeout(() => setIsLoading(false), 300);
      }
    }

    loadEventDetails();
    window.scrollTo(0, 0);
  }, [eventId]);

  // Prepare meta data for Open Graph and Twitter cards
  let pageTitle = "Event | Technovate 2025";
  let pageDescription = "Join us for this exciting event at Technovate 2025!";
  let pageImage = event?.image; // Default image
  let eventUrl = `https://technovate-2025.vercel.app/events/detail/${eventId}`;
  let structuredData = {};

  if (event) {
    pageTitle = `${event.title} | Technovate 2025`;
    pageDescription = event.description.length > 160 
      ? `${event.description.substring(0, 157)}...` 
      : event.description;
    pageImage = event.image || (event.gallery && event.gallery.length > 0 ? event.gallery[0].url : pageImage);
    eventUrl = `https://technovate-2025.vercel.app/events/detail/${eventId}`;
    
    // Create structured data for this event
    structuredData = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "image": pageImage,
      "url": eventUrl,
      "startDate": event.datetime,
      "location": {
        "@type": "Place",
        "name": event.venue,
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
      },
      "offers": {
        "@type": "Offer",
        "price": event.fee?.replace('₹', '').replace(' per team', '').replace(' per person', '') || "0",
        "priceCurrency": "INR",
        "url": event.enrollLink || eventUrl
      }
    };
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  if (error || !event) {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h1 className="text-4xl font-bold text-white mb-4">
              {error || "Event not found"}
            </h1>
            <p className="text-white/60 mb-8">
              The event you're looking for could not be found.
            </p>
            <Link
              to="/events"
              className="inline-flex items-center bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
            >
              View All Events
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.datetime);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  const handleShare = () => {
    if (!event) return;
    setIsShareMenuOpen(!isShareMenuOpen);
  };

  const copyAllToClipboard = async () => {
    if (!event) return;
    
    try {
      // Create a temporary textarea element
      const textarea = document.createElement('textarea');
      textarea.value = `${event.title} | Technovate 2025

📝 ${event.description}

📅 ${formattedDate} at ${formattedTime}
📍 ${event.venue}
👥 Team Size: ${event.teamSize}
${event.fee ? `💰 Entry Fee: ${event.fee}` : ''}

🔗 View Details: ${window.location.href}`;
      
      // Add textarea to document
      document.body.appendChild(textarea);
      
      // Select and copy text
      textarea.select();
      document.execCommand('copy');
      
      // Remove textarea
      document.body.removeChild(textarea);
      
      // Show success feedback
      setCopied(true);
      setCopiedItem("all");
      setTimeout(() => {
        setCopied(false);
        setCopiedItem("");
      }, 2000);

      // Check if it's a mobile device and has Web Share API support
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile && navigator.share) {
        try {
          await navigator.share({
            title: `${event.title} | Technovate 2025`,
            text: textarea.value,
            // url: window.location.href, url is already in the text
          });
        } catch (shareError) {
          // User cancelled or share failed - do nothing
          console.log("Share cancelled or failed",shareError);
        }
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Failed to copy to clipboard. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* Event details Meta Tags */}
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={eventUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:site_name" content="Technovate 2025" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={eventUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-black md:pt-12 pt-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-[60vh] md:h-[60vh] w-full mt-4 md:mt-8"
          >
            <div className="absolute inset-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

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
                      className="absolute right-0 mt-2 w-72 bg-neutral-900 rounded-xl border border-white/10 overflow-hidden"
                    >
                      <div className="py-3 px-4 border-b border-white/10">
                        <h3 className="text-sm font-medium text-white">Share This Event</h3>
                      </div>                      
                      <div className="p-2">
                        <button
                          onClick={copyAllToClipboard}
                          className="w-full flex items-center px-4 py-3 text-left text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                          {copied && copiedItem === "all" ? (
                            <Check className="w-5 h-5 mr-3 text-green-400" />
                          ) : (
                            <Copy className="w-5 h-5 mr-3 text-white/70" />
                          )}
                          <span>
                            {copied && copiedItem === "all" ? "All content copied!" : "Share event details"}
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
            >
              <div className="max-w-7xl mx-auto">
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-white/10 backdrop-blur-sm text-white mb-4">
                  {event.category === "tech"
                    ? "Technical"
                    : event.category === "non-tech"
                    ? "Non Technical"
                    : "Gaming"}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  {event.title}
                </h1>
              </div>
            </motion.div>
          </motion.div>

          <div className="max-w-7xl mx-auto px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    About the Event
                  </h2>
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
                      <h2 className="text-2xl font-semibold text-white mb-6">
                        Rules & Guidelines
                      </h2>
                      <ul className="space-y-4">
                        {event.rules.map((rule, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            className="flex items-start"
                          >
                            <CircleSmall className="w-5 h-5 fill-white/80 text-white/80 mt-1 flex-shrink-0" />
                            <span className="text-neutral-300 ml-4">{rule}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Event Details
                  </h3>

                  <div className="flex items-start space-x-4 mb-6 group">
                    <Calendar className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                    <div>
                      <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                        {formattedDate}
                      </p>
                      <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {formattedTime}
                      </p>
                    </div>
                  </div>

                  {event.prizePool && (
                    <div className="flex items-start space-x-4 mb-6 group">
                      <Trophy className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                      <div>
                        <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                          Prize Pool/Prizes
                        </p>
                        <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                          {event.prizePool}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-4 mb-6 group">
                    <MapPin className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                    <div>
                      <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                        Venue
                      </p>
                      <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 mb-8 group">
                    <Users className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                    <div>
                      <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                        Team Size
                      </p>
                      <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {event.teamSize}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 mb-8 group">
                    <IndianRupee className="w-6 h-6 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                    <div>
                      <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                        Entry Fees
                      </p>
                      <p className="text-neutral-400 group-hover:text-neutral-300 transition-colors">
                        {event.fee}
                      </p>
                    </div>
                  </div>

                  {event.enrollLink && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
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

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8 bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  <h3 className="text-xl font-semibold text-white mb-6">
                    Event Timeline
                  </h3>
                  <div className="space-y-4">
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

                {event.contact && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 bg-neutral-900 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  >
                    <h3 className="text-xl font-semibold text-white mb-6">
                      Contact
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(event.contact).map(([name, phone]) => (
                        <div
                          key={name}
                          className="flex items-start space-x-4 group"
                        >
                          <Phone className="w-5 h-5 text-white/50 flex-shrink-0 group-hover:text-white/70 transition-colors" />
                          <div>
                            <p className="text-white font-medium group-hover:text-white/90 transition-colors">
                              {name}
                            </p>
                            <a
                              href={`tel:${phone}`}
                              className="text-neutral-400 group-hover:text-neutral-300 transition-colors"
                            >
                              {phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {event.gallery && event.gallery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-16"
              >
                <div className="flex items-center gap-3 mb-8">
                  <Camera className="w-6 h-6 text-white/50" />
                  <h2 className="text-2xl font-semibold text-white">
                    Event Gallery
                  </h2>
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
                  <p className="text-white text-center mt-4">
                    {selectedImage.caption}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
