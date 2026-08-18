import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Calculator as CalcIcon,
  Calendar,
  Star,
  Heart,
  Hash,
  Compass,
  Clock,
  Briefcase,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import logo from "@/assets/logo.png";

interface NavItem {
  label: string;
  to: string;
  dropdownItems?: { label: string; to: string; icon?: React.ReactNode }[];
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Astrologers', to: '/astrologers' },
  { label: 'AI Chatbot', to: '/chatbot' },
  {
    label: 'Calculator',
    to: '/calculator',
    dropdownItems: [
      { label: 'Love Calculator', to: '/calculator/love', icon: <Heart className="w-4 h-4" /> },
      { label: 'Numerology', to: '/calculator/numerology', icon: <Hash className="w-4 h-4" /> },
      { label: 'Vastu', to: '/calculator/vastu', icon: <Compass className="w-4 h-4" /> },
      { label: 'Muhurat', to: '/calculator/muhurat', icon: <Star className="w-4 h-4" /> },
    ]
  },
  { label: 'Horoscope', to: '/horoscope' },
  { label: 'Kundli', to: '/kundli' },
  {
    label: 'Prediction',
    to: '/prediction',
    dropdownItems: [
      { label: 'Love Calculator by Name', to: '/calculator/love', icon: <Heart className="w-4 h-4" /> },
      { label: 'Career & Wealth', to: '/prediction/career', icon: <Briefcase className="w-4 h-4" /> },
      { label: 'Love & Relationship', to: '/prediction/love', icon: <Heart className="w-4 h-4" /> },
      { label: 'Health & Wellness', to: '/prediction/health', icon: <ShieldAlert className="w-4 h-4" /> },
      { label: 'Future Trends', to: '/prediction/future', icon: <TrendingUp className="w-4 h-4" /> },
    ]
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className={cn(
          "flex items-center justify-between rounded-full px-6 py-3 transition-all duration-500 border border-transparent",
          isScrolled ? "glass shadow-glow border-white/10" : "bg-transparent"
        )}>
          {/* Left Side: Logo */}
          <Link to="/" className="flex items-center group cursor-pointer py-1">
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <img
                src={logo}   // ✅ FIXED
                alt="AstroNest Logo"
                className="h-10 md:h-12 w-auto object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>

          {/* Center: Navigation Menu (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.dropdownItems && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.to}
                  activeProps={{ className: "text-purple-600 dark:text-purple-900 bg-white font-extrabold shadow-sm" }}
                  inactiveProps={{ className: "text-slate-700 dark:text-white hover:text-purple-300 font-bold" }}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full"
                  )}
                >
                  {item.label}
                  {item.dropdownItems && (
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      activeDropdown === item.label ? "rotate-180" : ""
                    )} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdownItems && (
                  <div className={cn(
                    "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 rounded-2xl glass p-2 shadow-2xl transition-all duration-300 transform origin-top",
                    activeDropdown === item.label
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  )}>
                    <div className="flex flex-col gap-1">
                      {item.dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.to}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                        >
                          {subItem.icon && <span className="text-purple-400">{subItem.icon}</span>}
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-bold text-white hover:text-purple-300 transition-colors">
              Login
            </button>
            <button className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-cosmic text-white text-sm font-semibold shadow-glow hover:scale-105 active:scale-95 transition-all duration-300">
              <span className="relative z-10">Sign Up</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-white bg-white/5 rounded-xl border border-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed inset-0 top-[88px] bg-black/95 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 transform",
        isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col p-6 gap-4 h-full overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="flex flex-col">
              <div
                className="flex items-center justify-between py-3 border-b border-white/5"
                onClick={() => {
                  if (item.dropdownItems) {
                    setActiveDropdown(activeDropdown === item.label ? null : item.label);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                {item.dropdownItems ? (
                  <span className="text-lg font-medium text-white">{item.label}</span>
                ) : (
                  <Link
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    activeProps={{ className: "text-purple-400" }}
                    inactiveProps={{ className: "text-white" }}
                    className="text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                )}
                {item.dropdownItems && (
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform",
                    activeDropdown === item.label ? "rotate-180 text-purple-400" : "text-gray-500"
                  )} />
                )}
              </div>

              {/* Mobile Dropdown Items */}
              {item.dropdownItems && activeDropdown === item.label && (
                <div className="flex flex-col gap-4 pl-4 mt-4 animate-in slide-in-from-top-2 duration-300">
                  {item.dropdownItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-muted-foreground hover:text-white py-1"
                    >
                      {subItem.icon}
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-8 flex flex-col gap-4 pb-12">
            <button className="w-full py-4 rounded-2xl border border-white/10 text-white font-medium hover:bg-white/5 transition-all">
              Login
            </button>
            <button className="w-full py-4 rounded-2xl bg-cosmic text-white font-bold shadow-glow">
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
