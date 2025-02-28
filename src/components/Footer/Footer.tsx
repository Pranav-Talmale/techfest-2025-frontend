import { Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Events", href: "/events" },
  ],
  social: [
    { name: "Twitter", href: "https://twitter.com/", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/", icon: Instagram },
    { name: "Email", href: "mailto:contact@techfest.com", icon: Mail },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo & Links */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center mb-4 md:mb-0">
              <img
                src="/technovate logo.png"
                alt="Technovate"
                className="h-8 w-auto"
              />
            </Link>
            <nav className="flex gap-6 mt-4 md:mt-0">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            {navigation.social.map((item) => {
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

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center justify-between">
          {/* Main Contributors */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-s text-white/70 font-medium">
              Core Development Team
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-s text-white/50">
              <span><strong className="text-white/70">Deeptanshu</strong> • 3D Website Development</span>
              <span><strong className="text-white/70">Pranav</strong> • Hosting & Code Management</span>
              <span><strong className="text-white/70">Jatin</strong> • UI/UX Wireframing</span>
              <span><strong className="text-white/70">Rushil</strong> • 3D Optimizations</span>
            </div>
            
            {/* Additional Contributors */}
            <p className="mt-4 text-sm text-white/50">
              Additional contributions by Vishwajeet
            </p>
          </div>

          <div className="flex gap-6 mt-6 md:mt-4">
            <a
              href="#"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
