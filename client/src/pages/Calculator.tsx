import React, { useEffect } from 'react';
import { Calculator as CalcIcon, Heart, Hash, Compass, Star } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const tools = [
  { name: 'Love Calculator', icon: <Heart className="w-6 h-6" />, desc: 'Check compatibility between you and your partner.', to: '/calculator/love' },
  { name: 'Numerology', icon: <Hash className="w-6 h-6" />, desc: 'Discover the hidden meaning of your numbers.', to: '/calculator/numerology' },
  { name: 'Vastu Shastra', icon: <Compass className="w-6 h-6" />, desc: 'Balance the energies in your living space.', to: '/calculator/vastu' },
  { name: 'Muhurat', icon: <Star className="w-6 h-6" />, desc: 'Find the most auspicious time for your events.', to: '/calculator/muhurat' },
];

const Calculator = () => {
  useEffect(() => {
    document.title = "AstroNest - Calculator";
  }, []);

  return (
    <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cosmic/10 border border-cosmic/20 text-purple-400 text-sm font-medium mb-4">
            <CalcIcon className="w-4 h-4" />
            <span>Astrology Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Cosmic Calculators</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use our precise calculators based on ancient Vedic mathematics to gain deeper insights into your life, relationships, and future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.name} 
              to={tool.to}
              className="glass group hover:bg-white/10 p-8 rounded-3xl transition-all duration-500 cursor-pointer border border-white/5 hover:border-purple-500/30 active:scale-95 hover:scale-105 hover:shadow-glow block"
            >
              <div className="bg-cosmic/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <div className="text-purple-400">{tool.icon}</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{tool.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
