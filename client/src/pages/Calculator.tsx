import React from 'react';
import { Calculator as CalcIcon, Heart, Hash, Compass, Star, Sparkles } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';

const tools = [
  { name: 'Kundli Matching', icon: <Heart className="w-6 h-6" />, desc: 'Check 36 Gunas marriage compatibility between partners.', to: '/kundli-matching' },
  { name: 'Love Calculator', icon: <Sparkles className="w-6 h-6" />, desc: 'Calculate romantic harmony using Vedic astrology.', to: '/calculator/love' },
  { name: 'Numerology', icon: <Hash className="w-6 h-6" />, desc: 'Discover the hidden meaning of your destiny numbers.', to: '/calculator/numerology' },
  { name: 'Vastu Shastra', icon: <Compass className="w-6 h-6" />, desc: 'Balance cosmic energies in your home and workspace.', to: '/calculator/vastu' },
  { name: 'Shubh Muhurat', icon: <Star className="w-6 h-6" />, desc: 'Find the most auspicious timings for your events.', to: '/calculator/muhurat' },
];

const Calculator = () => {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Calculators", url: "/calculator" }
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.calculator.title}
        description={pageSeoConfig.calculator.description}
        canonical={pageSeoConfig.calculator.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />

      <div className="pt-32 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <CalcIcon className="w-3.5 h-3.5" />
              <span>Astrological Calculations</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-display">Vedic Astrology Calculators</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Use our precise computational tools based on classical Vedic mathematics to gain deeper insights into your relationships, destiny, and cosmic timing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link 
                key={tool.name} 
                to={tool.to}
                className="glass group hover:bg-white/10 p-8 rounded-3xl transition-all duration-500 cursor-pointer border border-white/5 hover:border-purple-500/30 active:scale-95 hover:scale-105 hover:shadow-glow block"
              >
                <div className="bg-purple-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-purple-400">{tool.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-heading">{tool.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
