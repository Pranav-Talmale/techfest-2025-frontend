import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const navigation = {
  main: [
    { name: "Events", href: "/events" },
    { name: "Leadership", href: "/leadership" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ],
  social: [
    { name: "Instagram", href: "https://www.instagram.com/rait_technovate/", icon: Instagram },
  ],
};

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo & Links */}
          <div className="flex flex-col items-center md:items-start">
              <img
                src="/technovate-logo.svg"
                alt="Technovate"
                className="h-8 w-auto pb-2 mb-4"
              />
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
                  <Icon className="w-8 h-8" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center justify-between">
          {/* Main Contributors */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-s text-white/70 font-medium">
              Made with ❤️ by
            </p>
            <div className="flex flex-col lg:flex-row justify-center gap-x-6 gap-y-2 text-sm text-white/50 text-center">
              <span><strong className="text-white/70 hover:text-white transition-colors"><a href="https://deeptanshu.is-a.dev" target="_blank" rel="noopener noreferrer">Deeptanshu</a></strong> • 3D Website Development</span>
              <span><strong className="text-white/70 hover:text-white transition-colors"><a href="https://github.com/Pranav-Talmale" target="_blank" rel="noopener noreferrer">Pranav</a> </strong> • Hosting & Code Management</span>
              <span><strong className="text-white/70 hover:text-white transition-colors"><a href="" target="_blank" rel="noopener noreferrer">Jatin</a> </strong> • UI/UX Wireframing</span>
              <span><strong className="text-white/70 hover:text-white transition-colors"><a href="https://www.linkedin.com/in/rushil-vishwakarma/" target="_blank" rel="noopener noreferrer">Rushil</a> </strong> • 3D Optimizations & UI/UX</span>
            </div>
            
            {/* Additional Contributors */}
            <p className="mt-4 text-sm text-white/50">
              Additional contributions by Vishwajeet
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
