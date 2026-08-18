import React, { useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  useEffect(() => {
    document.title = "AstroNest - 404";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-pink-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      <div className="glass max-w-lg w-full p-12 rounded-[40px] border border-white/10 text-center relative z-10 shadow-glow">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-cosmic/20 border border-cosmic/30 mb-8 animate-float">
          <Sparkles className="w-10 h-10 text-purple-400" />
        </div>
        
        <h1 className="text-8xl font-bold text-white mb-4 font-display tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Lost in Space?</h2>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          The stars have misaligned. The page you are looking for has drifted into another galaxy.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-cosmic text-white font-bold shadow-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
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
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;
