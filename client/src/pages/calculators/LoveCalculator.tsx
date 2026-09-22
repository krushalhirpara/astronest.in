import React, { useState } from 'react';
import { Heart, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';

const LoveCalculator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; message: string } | null>(null);
  const [error, setError] = useState('');

  const calculateLove = () => {
    setError('');
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }

    setLoading(true);
    setResult(null);

    // Vedic inspired calculation logic (deterministic)
    setTimeout(() => {
      const combined = (name1.toLowerCase() + name2.toLowerCase()).replace(/\s/g, '');
      let score = 0;
      for (let i = 0; i < combined.length; i++) {
        score += combined.charCodeAt(i);
      }
      
      const finalScore = 60 + (score % 41); // Ranges from 60 to 100
      
      let message = "";
      if (finalScore >= 90) message = "A match made in the heavens! You are true soulmates.";
      else if (finalScore >= 80) message = "Great compatibility! Your energies align beautifully.";
      else if (finalScore >= 70) message = "Strong connection with minor adjustments needed.";
      else message = "Good potential. Communication will be your strongest bond.";

      setResult({ score: finalScore, message });
      setLoading(false);
      console.log('Love calculation complete:', finalScore);
    }, 1500);
  };

  return (
    <>
      <Seo
        title={pageSeoConfig.calculatorLove.title}
        description={pageSeoConfig.calculatorLove.description}
        canonical={pageSeoConfig.calculatorLove.canonical}
      />
      <div className="pt-32 pb-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/calculator" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Heart className="w-32 h-32 text-pink-500" />
          </div>

          <div className="relative z-10">
            <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Love Calculator</h1>
            <p className="text-muted-foreground mb-12">Enter your name and your partner's name to calculate your cosmic compatibility.</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Your Name</label>
                <input 
                  type="text" 
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all" 
                  placeholder="Enter your name" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Partner's Name</label>
                <input 
                  type="text" 
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all" 
                  placeholder="Enter partner's name" 
                />
              </div>
              
              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                onClick={calculateLove}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Compatibility'
                )}
              </button>

              {result && (
                <div className="mt-8 p-8 rounded-3xl bg-white/5 border border-white/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <p className="text-sm text-muted-foreground mb-2">Compatibility Score</p>
                  <div className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    {result.score}%
                  </div>
                  <p className="text-white text-lg font-medium">{result.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default LoveCalculator;
