import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { Helmet } from "react-helmet-async";

const representatives = [
  {
    name: "Technical Coordinator",
    role: "Technical Head",
    image: "/representatives/placeholder.jpg",
    contact: {
      email: "technical@technovate.com",
      phone: "+91 98765 43210",
      linkedin: "https://linkedin.com/in/"
    }
  },
  {
    name: "Event Coordinator",
    role: "Event Management",
    image: "/representatives/placeholder.jpg",
    contact: {
      email: "events@technovate.com",
      phone: "+91 98765 43211",
      linkedin: "https://linkedin.com/in/"
    }
  },
  {
    name: "Marketing Coordinator",
    role: "Marketing & PR",
    image: "/representatives/placeholder.jpg",
    contact: {
      email: "marketing@technovate.com",
      phone: "+91 98765 43212",
      linkedin: "https://linkedin.com/in/"
    }
  }
];

export default function Contact() {
  return (
    <section className="bg-black relative overflow-hidden pt-16">
      <Helmet>
        <title>Contact Us | Technovate 2025</title>
        <meta name="description" content="Get in touch with the Technovate 2025 team. Contact our representatives for queries about RAIT's premier technical festival." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.raittechnovate.co.in/contact" />
        <meta property="og:title" content="Contact Us | Technovate 2025" />
        <meta property="og:description" content="Get in touch with the Technovate 2025 team. Contact our representatives for queries about RAIT's premier technical festival." />
        <meta property="og:image" content="https://technovate-2025.vercel.app/Poster-final.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.raittechnovate.co.in/contact" />
        <meta name="twitter:title" content="Contact Us | Technovate 2025" />
        <meta name="twitter:description" content="Get in touch with the Technovate 2025 team. Contact our representatives for queries about RAIT's premier technical festival." />
        <meta name="twitter:image" content="https://www.raittechnovate.co.in/Poster-final.jpg" />
      </Helmet>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto"
          >
            Get in touch with our team representatives
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Representatives */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {representatives.map((rep) => (
              <div 
                key={rep.name}
                className="bg-neutral-900 rounded-2xl p-6 border border-white/10 flex gap-6 items-center"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full bg-neutral-800 overflow-hidden flex-shrink-0">
                  <img 
                    src={rep.image} 
                    alt={rep.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white">{rep.name}</h3>
                  <p className="text-white/50 text-sm mb-3">{rep.role}</p>
                  
                  <div className="flex gap-4">
                    <a 
                      href={`mailto:${rep.contact.email}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a 
                      href={`tel:${rep.contact.phone}`}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a 
                      href={rep.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-neutral-900 p-3 rounded-lg border border-white/10">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                <p className="text-white/50">contact@technovate.com</p>
                <a href="mailto:contact@technovate.com" className="text-sm text-white/70 hover:text-white mt-1 inline-block">
                  Send us an email →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-neutral-900 p-3 rounded-lg border border-white/10">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                <p className="text-white/50">+91 (123) 456-7890</p>
                <p className="text-sm text-white/70 mt-1">Mon-Fri from 9am to 6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-neutral-900 p-3 rounded-lg border border-white/10">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                <p className="text-white/50">
                  RAIT, DY Patil Vidyanagar,<br />
                  Sector 7, Nerul,<br />
                  Navi Mumbai, Maharashtra 400706
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 