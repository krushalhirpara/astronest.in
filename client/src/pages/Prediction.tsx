import React, { useState } from 'react';
import { Zap, TrendingUp, ShieldAlert, Briefcase, Heart, Sparkles, Loader2, RefreshCw, Flame, Award } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';

const predictions = [
  { 
    title: 'Love Calculator by Name', 
    subtitle: 'Calculate Your Love Percentage',
    description: 'Find instant cosmic compatibility percentage between you and your partner by name.',
    icon: <Heart className="w-6 h-6 text-pink-400" />, 
    color: 'bg-pink-500/20 border-pink-500/30', 
    to: '/calculator/love',
    badge: 'Featured'
  },
  { 
    title: 'Career & Wealth', 
    subtitle: 'Financial & Growth Forecast',
    description: 'Detailed analysis of your career trajectory based on current planetary transits.',
    icon: <Briefcase className="w-6 h-6 text-blue-400" />, 
    color: 'bg-blue-500/20 border-blue-500/30', 
    to: '/prediction/career' 
  },
  { 
    title: 'Love & Relationship', 
    subtitle: 'Zodiac Romantic Outlook',
    description: 'Insights into your romantic future and current relationship dynamics.',
    icon: <Heart className="w-6 h-6 text-rose-400" />, 
    color: 'bg-rose-500/20 border-rose-500/30', 
    to: '/prediction/love' 
  },
  { 
    title: 'Health & Wellness', 
    subtitle: 'Mind & Body Alignment',
    description: 'Vedic wellness forecast and energy balance analysis.',
    icon: <ShieldAlert className="w-6 h-6 text-emerald-400" />, 
    color: 'bg-emerald-500/20 border-emerald-500/30', 
    to: '/prediction/health' 
  },
  { 
    title: 'Future Trends', 
    subtitle: 'Long-term Predictions',
    description: 'Future astrological patterns, planetary periods, and life milestones.',
    icon: <TrendingUp className="w-6 h-6 text-purple-400" />, 
    color: 'bg-purple-500/20 border-purple-500/30', 
    to: '/prediction/future' 
  },
];

const Prediction = () => {
  const [yourName, setYourName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [loveResult, setLoveResult] = useState<{
    score: number;
    title: string;
    message: string;
    vibe: string;
    harmony: number;
  } | null>(null);
  const [error, setError] = useState('');

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Predictions", url: "/prediction" }
  ];

  const handleCalculateLove = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!yourName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!partnerName.trim()) {
      setError('Please enter partner\'s name.');
      return;
    }

    setCalculating(true);
    setLoveResult(null);

    setTimeout(() => {
      const nameCombo = (yourName.trim() + partnerName.trim()).toLowerCase().replace(/[^a-z]/g, '');
      let charSum = 0;
      for (let i = 0; i < nameCombo.length; i++) {
        charSum += nameCombo.charCodeAt(i);
      }

      // Deterministic calculation between 68% and 99%
      const score = 68 + (charSum % 32);
      const harmony = 70 + ((charSum * 7) % 29);

      let title = "";
      let message = "";
      let vibe = "";

      if (score >= 92) {
        title = "Celestial Soulmates ✨";
        message = `Venus and Jupiter create an extraordinary cosmic synergy between ${yourName} and ${partnerName}! Your souls share an eternal romantic connection.`;
        vibe = "Unbreakable Bond 💖";
      } else if (score >= 82) {
        title = "Harmonious Cosmic Match 🌟";
        message = `High energetic resonance between ${yourName} and ${partnerName}. You bring out the absolute best in each other with deep mutual affection.`;
        vibe = "Deep Passion & Trust 🔥";
      } else if (score >= 74) {
        title = "Promising Romantic Alliance 💫";
        message = `Strong love potential! With clear communication and care, ${yourName} and ${partnerName} can build an inspiring lifelong journey together.`;
        vibe = "Growing Harmony 🌸";
      } else {
        title = "Dynamic Planetary Pair 🔮";
        message = `An exciting and unique match! ${yourName} and ${partnerName} share a passionate dynamic that thrives on mutual respect.`;
        vibe = "Magnetic Energy ⚡";
      }

      setLoveResult({
        score,
        title,
        message,
        vibe,
        harmony
      });
      setCalculating(false);
    }, 1200);
  };

  return (
    <>
      <Seo
        title={pageSeoConfig.prediction.title}
        description={pageSeoConfig.prediction.description}
        canonical={pageSeoConfig.prediction.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />
      <div className="pt-32 pb-16 min-h-screen text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>AI Powered Astrology & Predictions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display mb-4">
            Personalized Predictions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-base">
            Unlock deep insights into your love life, career, health, and future trends with our 100% accurate cosmic algorithms.
          </p>
        </div>

        {/* 100% WORKING LOVE CALCULATOR BY NAME SECTION */}
        <div className="mb-16">
          <div className="relative group rounded-[36px] p-1 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 shadow-[0_0_50px_rgba(236,72,153,0.25)]">
            <div className="bg-[#0c0714] rounded-[34px] p-6 md:p-10 relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Form Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-pink-400 fill-pink-400/30 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">100% Working Tool</span>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                        Love Calculator by Name
                      </h2>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm">
                    Calculate your exact Love Percentage and cosmic compatibility score instantly by entering both names below.
                  </p>

                  <form onSubmit={handleCalculateLove} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-200 uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Rahul"
                          value={yourName}
                          onChange={(e) => setYourName(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm font-medium focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-200 uppercase tracking-wider">Partner's Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Ananya"
                          value={partnerName}
                          onChange={(e) => setPartnerName(e.target.value)}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-500 text-sm font-medium focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-xs font-semibold bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={calculating}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 text-white font-extrabold text-base shadow-lg shadow-pink-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {calculating ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Calculating Love Percentage...</span>
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5 fill-white" />
                          <span>Calculate Love Percentage</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Result / Feature Display Column */}
                <div className="lg:col-span-5 flex flex-col justify-center items-center">
                  {loveResult ? (
                    <div className="w-full bg-gradient-to-b from-white/10 to-white/5 border border-pink-500/30 rounded-3xl p-6 text-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => setLoveResult(null)}
                          className="p-1.5 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-all text-xs"
                          title="Reset"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                      </div>

                      <span className="text-xs font-bold uppercase tracking-widest text-pink-400 mb-1 block">
                        Compatibility Result
                      </span>
                      
                      <div className="relative my-3 inline-block">
                        <div className="text-6xl font-black bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(244,63,94,0.4)]">
                          {loveResult.score}%
                        </div>
                        <div className="text-xs font-semibold text-pink-300 mt-1">LOVE MATCH SCORE</div>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2">{loveResult.title}</h3>
                      <p className="text-xs text-gray-300 leading-relaxed mb-4">{loveResult.message}</p>

                      <div className="grid grid-cols-2 gap-2 text-left">
                        <div className="p-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20">
                          <span className="text-[10px] uppercase font-bold text-pink-300 block">Vibe</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-pink-400" />
                            {loveResult.vibe}
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                          <span className="text-[10px] uppercase font-bold text-purple-300 block">Harmony</span>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Award className="w-3.5 h-3.5 text-purple-400" />
                            {loveResult.harmony}% Alignment
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[260px]">
                      <div className="w-16 h-16 rounded-full bg-pink-500/15 flex items-center justify-center mb-4 border border-pink-500/20 animate-bounce">
                        <Heart className="w-8 h-8 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">Calculate Your Love %</h3>
                      <p className="text-xs text-gray-400 max-w-xs">
                        Enter your name & your partner's name to unlock instant cosmic compatibility percentage!
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Prediction Cards Grid */}
        <h2 className="text-2xl font-bold text-white mb-6">Explore All Predictions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((p) => (
            <Link 
              key={p.title} 
              to={p.to}
              className="bg-black/50 backdrop-blur-xl p-6 rounded-[28px] border border-white/10 hover:border-pink-500/40 transition-all duration-300 group cursor-pointer active:scale-98 hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(236,72,153,0.15)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`${p.color} border w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {p.icon}
                  </div>
                  {p.badge && (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-sm">
                      {p.badge}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-pink-300 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs font-medium text-pink-400 mb-3">{p.subtitle}</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-6">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                <span>Try Now</span>
                <Zap className="w-4 h-4 text-pink-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  </>
);
};

export default Prediction;
