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
  TrendingUp,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={cn(
          "fixed top-2 sm:top-4 left-1/2 -translate-x-1/2 w-[92%] sm:w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full px-3 sm:px-6",
          isScrolled 
            ? "bg-black/85 backdrop-blur-xl border border-white/20 shadow-[0_8px_40px_rgba(168,85,247,0.25)] py-1.5 sm:py-2" 
            : "bg-transparent py-2.5 sm:py-4 border border-transparent"
        )}
      >
        <nav className="flex items-center justify-between text-white">
          {/* Left Side: Logo */}
          <Link 
            to="/" 
            className="flex items-center group cursor-pointer py-1"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img 
              src={logo} 
              alt="AstroNest Logo" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Center: Navigation Menu (Desktop) */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative group"
              >
                <Link
                  to={item.to}
                  activeProps={{ className: "text-purple-950 bg-white font-extrabold shadow-md" }}
                  inactiveProps={{ className: "text-white/90 hover:text-white hover:bg-white/15 font-bold" }}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 drop-shadow-sm cursor-pointer"
                  )}
                >
                  <span>{item.label}</span>
                  {item.dropdownItems && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {item.dropdownItems && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="w-56 bg-[#0F0F1F]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 shadow-2xl space-y-1">
                      {item.dropdownItems.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-gray-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition-all"
                        >
                          <span className="text-purple-400">{sub.icon}</span>
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side: Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-white">{user.name.split(' ')[0]}</span>
                <button 
                  onClick={logout}
                  className="text-gray-300 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-bold text-white hover:text-purple-300 transition-colors drop-shadow-sm">
                  Login
                </Link>
                <Link to="/signup" className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-purple-500/30 hover:scale-105 transition-all duration-300">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Navigation Menu */}
      <div className={cn(
        "fixed inset-0 top-[72px] bg-[#0F0F1F]/98 backdrop-blur-2xl z-40 lg:hidden transition-all duration-500 transform",
        isMobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      )}>
        <div className="flex flex-col p-6 gap-4 h-full overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label} className="flex flex-col">
              <div 
                className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-white/5"
                onClick={() => {
                  if (item.dropdownItems) {
                    setActiveDropdown(activeDropdown === item.label ? null : item.label);
                  } else {
                    setIsMobileMenuOpen(false);
                  }
                }}
              >
                {item.dropdownItems ? (
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{item.label}</span>
                ) : (
                  <Link 
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    activeProps={{ className: "text-purple-600 dark:text-purple-400" }}
                    inactiveProps={{ className: "text-slate-900 dark:text-white" }}
                    className="text-lg font-bold"
                  >
                    {item.label}
                  </Link>
                )}
                {item.dropdownItems && (
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    activeDropdown === item.label ? "rotate-180 text-purple-600 dark:text-purple-400" : "text-gray-500"
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
                      className="flex items-center gap-3 text-slate-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-white py-2"
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
            {user ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.name} className="w-12 h-12 rounded-full border-2 border-purple-500/20 shadow-lg" />
                  ) : (
                    <UserIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  )}
                  <div>
                    <p className="text-slate-900 dark:text-white font-bold">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="w-full py-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 font-bold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-center"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold shadow-lg text-center"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
