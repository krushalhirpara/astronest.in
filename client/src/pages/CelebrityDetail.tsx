import React, { useEffect, useState } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { ArrowLeft, Star, MapPin, Calendar, Briefcase, Sparkles, User, ShieldCheck, Lock } from 'lucide-react';
import { getCelebrityBySlug } from '@/lib/celebrityData';

const CelebrityDetail = () => {
  const { slug } = useParams({ from: '/celebrity/$slug' });
  const celebrity = getCelebrityBySlug(slug);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (celebrity) {
      document.title = `AstroNest - ${celebrity.name}'s Kundli`;
    }
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [celebrity]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!celebrity) {
    return (
      <div className="pt-32 pb-12 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Celebrity Not Found</h1>
        <p className="text-muted-foreground mb-8">The cosmic blueprint for this star is currently unavailable.</p>
        <Link to="/" className="px-8 py-3 bg-cosmic text-white rounded-2xl font-bold shadow-glow hover:scale-105 transition-all">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container max-w-6xl px-4 mx-auto">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Stars
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Column: Image & Basic Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-[40px] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 shadow-glow">
                <img 
                  src={celebrity.image} 
                  alt={celebrity.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs text-white mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    Verified Cosmic Data
                  </div>
                  <h1 className="text-4xl font-bold text-white font-display">{celebrity.name}</h1>
                  <p className="text-gold font-medium">{celebrity.zodiac} Rising</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-[32px] border border-white/10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Born On</p>
                  <p className="text-white font-medium">{celebrity.dob}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Birth Place</p>
                  <p className="text-white font-medium">{celebrity.birthPlace}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">Career Dominance</p>
                  <p className="text-white font-medium">{celebrity.career}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Insights */}
          <div className="lg:col-span-7 space-y-8">
            {/* AI Summary */}
            <div className="glass p-10 rounded-[40px] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles className="w-32 h-32 text-purple-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <ShieldCheck className="w-7 h-7 text-purple-400" />
                Kundli Blueprint
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed italic mb-8">
                "{celebrity.kundliSummary}"
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {celebrity.traits.map((trait, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-white font-medium">{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Planetary Chart Placeholder */}
            <div className="glass p-10 rounded-[40px] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-8">Vedic Birth Chart</h3>
              <div className="aspect-square max-w-sm mx-auto relative border-2 border-white/10 rounded-xl overflow-hidden bg-white/5 p-4">
                {/* SVG for a simple North Indian chart style */}
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 fill-none">
                  <rect x="0" y="0" width="100" height="100" />
                  <line x1="0" y1="0" x2="100" y2="100" />
                  <line x1="100" y1="0" x2="0" y2="100" />
                  <rect x="25" y="25" width="50" height="50" className="rotate-45" transform-origin="center" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8 bg-black/40 backdrop-blur-[2px]">
                  <Lock className="w-10 h-10 text-gold mb-4" />
                  <p className="text-white font-bold mb-2">Unlock Full Analysis</p>
                  <p className="text-xs text-muted-foreground mb-6">Upgrade to Pro to see detailed planetary degrees and house aspects.</p>
                  <button className="px-6 py-2 bg-gold text-gold-foreground text-xs font-bold rounded-full hover:scale-105 transition-all">
                    Go Pro
                  </button>
                </div>
              </div>
            </div>

            {/* Career Insights */}
            <div className="glass p-8 rounded-[32px] border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-gold" />
                Success Secrets
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The planetary alignment during {celebrity.name.split(' ')[0]}'s birth indicates a unique path to global recognition. 
                His/Her dominance in the {celebrity.zodiac} house suggests that the upcoming 2026-2028 transit will bring even 
                more stability and creative expansion in the {celebrity.career} domain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrityDetail;
