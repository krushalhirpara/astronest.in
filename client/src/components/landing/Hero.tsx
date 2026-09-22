import React, { lazy, Suspense } from "react";
import { Sparkles, Star, Users, Globe, Gift, ArrowRight, MessageCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import cosmicHero from "@/assets/cosmic-hero.jpg";
import { CosmicSettings } from "@/components/cosmic-orbit/types";

const CosmicCanvas = lazy(() =>
  import("@/components/cosmic-orbit/CosmicCanvas").then((m) => ({
    default: m.CosmicCanvas,
  }))
);

const defaultCosmicSettings: CosmicSettings = {
  isPlaying: true,
  speedMultiplier: 1.0,
  showOrbitLines: true,
  showLabels: false,
  showDustDisk: true,
  showSolarFlares: true,
  cameraPreset: 'reference',
  selectedPlanetId: null,
  ambientSound: false,
  volume: 0.5,
  cameraTilt: 32,
  cameraDistance: 95,
  autoRotateCamera: true,
};

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen pt-28 md:pt-36 pb-10 md:pb-14 font-poppins overflow-hidden flex flex-col justify-center">
      {/* 3D WebGL Cosmic Orbit Background */}
      <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-90">
        <Suspense fallback={<div className="w-full h-full bg-[#020208]" />}>
          <CosmicCanvas settings={defaultCosmicSettings} />
        </Suspense>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-[10px] text-purple-300 font-bold uppercase tracking-[0.2em] mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Bharat ka Super or Powerful Astro Platform</span>
          </div>
          
          <div className="flex justify-center max-w-4xl mx-auto py-4 mb-8">
            <h1 
              style={{ fontFamily: 'Samarkan, sans-serif' }} 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 text-center leading-[1.3] tracking-wide drop-shadow-md py-2"
            >
              Online Kundli & Vedic Astrology<br/>
              <span className="text-2xl sm:text-4xl md:text-5xl opacity-90 font-poppins font-bold tracking-normal">Bharat's AI Astro Platform</span>
            </h1>
          </div>
          
          <p className="mt-6 text-white font-medium text-lg font-poppins leading-relaxed max-w-2xl drop-shadow-sm opacity-95">
            Unlock the secrets of the cosmos with our advanced AI-powered platform. 
            Get precise Kundali, daily horoscopes, and personalized guidance in seconds.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate({ to: '/kundli' })}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-purple-500/30 hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </button>
            <button 
              onClick={() => navigate({ to: '/astrologers' })}
              className="border border-white/30 bg-white/10 backdrop-blur-md text-white rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/20 shadow-lg transition-all duration-300"
            >
              Chat with AI
            </button>
          </div>
        </div>

        <div className="mt-16 relative group perspective-1000 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-purple-900/20 via-black/40 to-black border border-white/20 shadow-2xl aspect-video w-full max-w-4xl mx-auto transition-all duration-700 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)]">
              <img
                src={cosmicHero}
                alt="AstroNest Online Janam Kundli & Vedic Astrology Platform"
                width={1200}
                height={675}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#05010A] via-transparent to-transparent opacity-80" />

              <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-2xl rounded-full px-5 py-2 border border-white/20 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                  <span className="text-[9px] font-bold text-white uppercase tracking-[0.2em]">100% Accurate</span>
                </div>
              </div>
              
              <div className="absolute bottom-8 left-6 right-6 bg-black/60 backdrop-blur-2xl rounded-[2rem] p-5 border border-white/20 shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">AI Reading</p>
                    <p className="text-xs text-white font-medium mt-1 leading-relaxed line-clamp-2">
                      "Jupiter's alignment indicates a prosperous period for career growth."
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 py-8 border-t border-white/10 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          {[
            { icon: Users, value: "50K+", label: "Happy Seekers" },
            { icon: Star, value: "4.8", label: "Average Rating" },
            { icon: Globe, value: "12+", label: "Regional Languages" },
            { icon: Gift, value: "100%", label: "Accuracy Rate" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-purple-300 border border-white/20 backdrop-blur-md shadow-md">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-white font-heading drop-shadow-sm">{s.value}</div>
                <div className="text-[10px] text-gray-300 mt-0.5 uppercase tracking-[0.2em] font-bold">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
