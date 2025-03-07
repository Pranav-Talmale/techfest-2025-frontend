import { useState } from "react";
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
  { name: "Instagram", href: "https://www.instagram.com/rait_technovate/", icon: Instagram },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center justify-center gap-2 md:justify-between">
                {/* DYPU Logo */}
                <Link to="/" className="flex items-center md:mx-0">
                  <img
                    src="/white_dy.png"
                    alt="DYPU logo"
                    className="h-8 w-auto"
                  />
                </Link>
                {/* Logo */}
                <Link to="/" className="flex items-center md:mx-0 ml-12">
                  <img
                    src="/technovate logo.png"
                    alt="Technovate"
                    className="h-8 w-auto"
                  />
                </Link>
            </div>

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
                    <item.icon className="size-4" />
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
                    <social.icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(true)}
              className="md:hidden p-2 rounded-md text-white/50 hover:text-white focus:outline-none"
            >
              <Menu className="size-6" />
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
            <div className="flex justify-between items-center">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src="/white_dy.png"
                alt="DYPU logo"
                className="h-12 w-auto"
              />
            </Link>
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img
                src="/technovate logo.png"
                alt="Technovate"
                className="h-12 w-auto"
              />
            </Link>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white/50 hover:text-white focus:outline-none"
            >
              <X className="size-5" />
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
                    <item.icon className="size-5 mr-3" />
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
                    <social.icon className="size-7" />
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
