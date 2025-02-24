import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Calendar,
  Phone,
  Twitter,
  Instagram,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Contact", href: "/contact", icon: Phone },
];

const socials = [
  { name: "Twitter", href: "https://twitter.com/", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  // On non-home pages, header should be visible.
  // On the homepage, hide header until user scrolls beyond half the viewport height.
  const [showHeader, setShowHeader] = useState(!isHome);

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        if (window.scrollY >= window.innerHeight / 2) {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      // Check initial scroll position
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setShowHeader(true);
    }
  }, [isHome]);

  return (
    <>
      {/* Fixed Navbar */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10 transition-opacity duration-300",
          showHeader ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="technovate_logo.svg"
                alt="Technovate"
                className="h-6 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              {/* Main Nav */}
              <div className="flex items-center space-x-8 mr-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "text-sm font-medium tracking-wide transition-colors flex items-center gap-2",
                      location.pathname === item.href
                        ? "text-white"
                        : "text-white/50 hover:text-white"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-md text-white/50 hover:text-white focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/90 backdrop-blur-md md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      >
        {/* Drawer Panel */}
        <div
          className={cn(
            "fixed inset-x-0 top-0 h-auto max-h-[85vh] bg-black shadow-xl transition-transform duration-300 ease-in-out border-b border-white/10",
            isOpen ? "translate-y-0" : "-translate-y-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src="technovate_logo.svg"
                alt="Technovate"
                className="h-12 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/50 hover:text-white focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="px-4 py-6">
            {/* Main Navigation */}
            <div className="grid gap-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-lg font-medium tracking-wide transition-colors border border-white/10",
                      isActive
                        ? "bg-white text-black"
                        : "text-white hover:bg-white hover:text-black"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-8">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/70 transition-colors p-2"
                  >
                    <social.icon className="w-7 h-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
