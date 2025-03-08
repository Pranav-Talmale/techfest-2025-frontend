import { Link } from "react-router-dom";
import { HomeIcon, Instagram, Menu, X, CalendarIcon, MailIcon, UsersIcon, InfoIcon } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About Us", href: "/about", icon: InfoIcon },
  { name: "Events", href: "/events", icon: CalendarIcon },
  { name: "Contact", href: "/contact", icon: MailIcon },
  { name: "Leadership", href: "/leadership", icon: UsersIcon },
];

const social = [
  { name: "Instagram", href: "https://www.instagram.com/rait_technovate/", icon: Instagram },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50">
      {/* Main Navbar */}
      <div className="backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto p-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-center space-x-4">
            {/* Logo */}
            <Link to="https://dypatil.edu/schools/ramrao-adik-institute-of-technology" target="_blank" className="flex items-center space-x-4">
              <img
                src="/logos/dyp/white_dy.svg"
                alt="DY Patil University"
                className="h-10 w-auto"
              />
            </Link>
            <Link to="/" className="flex items-center space-x-4">
              <div className="h-8 w-px bg-white/10" />
              <img
                src="/technovate-logo.svg"
                alt="Technovate"
                className="h-8 w-auto p-2"
              />
            </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {/* Main Navigation */}
              <div className="flex space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="flex items-center space-x-2 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
                {social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-white/50 hover:text-white transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-md text-white/70 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-black/90 backdrop-blur-md border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-3 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center px-3 py-3 border border-white/10 text-white/90 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-lg transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-medium pl-3">{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 px-3 py-4 mt-1 border-t border-white/10">
                {social.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 