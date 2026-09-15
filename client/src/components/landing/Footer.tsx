import { Sparkles, Instagram, Twitter, Youtube, Facebook } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative py-12 border-t border-white/10 font-poppins overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 -z-10" />
      
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-heading font-bold text-white tracking-widest">ASTRO<span className="text-purple-400">NEST</span></span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Ancient wisdom meets modern AI. Unlock your cosmic blueprint with the world's most advanced astrology platform.
            </p>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/horoscope" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Daily Horoscope</Link>
              </li>
              <li>
                <Link to="/kundli" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Free Janam Kundli</Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">AI Astro Chatbot</Link>
              </li>
              <li>
                <Link to="/astrologers" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Vedic Astrologers</Link>
              </li>
              <li>
                <Link to="/prediction" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Predictions</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Calculators</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/calculator/love" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Love Calculator</Link>
              </li>
              <li>
                <Link to="/calculator/numerology" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Numerology</Link>
              </li>
              <li>
                <Link to="/calculator/vastu" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Vastu Shastra</Link>
              </li>
              <li>
                <Link to="/calculator/muhurat" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">Shubh Muhurat</Link>
              </li>
              <li>
                <Link to="/calculator" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">All Calculators</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Trust & Safety</h4>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Your data is encrypted and private. We never share your birth details with third parties.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                SSL Secured
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                PCI-DSS Compliant
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold">
            © 2024 AstroNest AI. All celestial rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[11px] text-gray-400 hover:text-white uppercase tracking-widest font-bold">Privacy Policy</a>
            <a href="#" className="text-[11px] text-gray-400 hover:text-white uppercase tracking-widest font-bold">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
