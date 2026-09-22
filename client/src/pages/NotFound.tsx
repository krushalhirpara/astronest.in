import React from 'react';
import { Link } from '@tanstack/react-router';
import { Sparkles, Home, ArrowLeft, Star, Compass, Heart, MessageCircle } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';

const NotFound = () => {
  return (
    <>
      <Seo
        title={pageSeoConfig.notFound.title}
        description={pageSeoConfig.notFound.description}
        canonical={pageSeoConfig.notFound.canonical}
        noindex={true}
      />

      <div className="min-h-screen flex items-center justify-center px-4 py-24 relative overflow-hidden font-poppins">
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

        <div className="glass max-w-xl w-full p-8 md:p-12 rounded-[40px] border border-white/10 text-center relative z-10 shadow-glow">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-purple-500/20 border border-purple-500/30 mb-6 animate-float">
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>

          <p className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-2">Error 404</p>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 font-display">
            Page Not Found
          </h1>
          <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
            The celestial coordinates you are looking for have drifted out of our planetary chart. Explore these popular sections instead:
          </p>

          {/* Quick links to core tools */}
          <div className="grid grid-cols-2 gap-3 text-left mb-8">
            <Link
              to="/"
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all flex items-center gap-2.5 text-xs text-white"
            >
              <Home className="w-4 h-4 text-purple-400" />
              <span>Home</span>
            </Link>
            <Link
              to="/kundli"
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all flex items-center gap-2.5 text-xs text-white"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Janam Kundli</span>
            </Link>
            <Link
              to="/kundli-matching"
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all flex items-center gap-2.5 text-xs text-white"
            >
              <Heart className="w-4 h-4 text-pink-400" />
              <span>Kundli Matching</span>
            </Link>
            <Link
              to="/horoscope"
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all flex items-center gap-2.5 text-xs text-white"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Daily Horoscope</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/30 hover:scale-105 transition-all"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Page
            </button>
          </div>
        </div>

        {/* Floating stars effect */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 29) % 100}%`,
                width: `${(i % 3) + 1}px`,
                height: `${(i % 3) + 1}px`,
                animationDelay: `${i % 4}s`
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotFound;
