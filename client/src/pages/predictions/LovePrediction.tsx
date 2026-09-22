import React, { useState } from 'react';
import { Heart, ArrowLeft, Loader2, Sparkles, Flame } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';

const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const statuses = ['Single', 'In a Relationship', 'Married', 'Complicated'];

const LovePrediction = () => {
  const [zodiac, setZodiac] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ forecast: string; index: number; vibe: string } | null>(null);
  const [error, setError] = useState('');

  const generateLovePrediction = () => {
    setError('');
    if (!zodiac || !status) {
      setError('Please select your zodiac sign and relationship status');
      return;
    }

    setLoading(true);
    setPrediction(null);

    setTimeout(() => {
      const forecast = `Venus in your 5th house brings a magnetic charm to your personality today. For those who are ${status.toLowerCase()}, this is a day for deep emotional connection and expressing suppressed feelings. A surprise romantic gesture from someone unexpected is on the cards.`;
      
      setPrediction({
        forecast,
        index: 75 + Math.floor(Math.random() * 21),
        vibe: status === 'Single' ? 'Magnetic' : 'Harmonious'
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Seo metadata={pageSeoConfig.predictionLove} />
      <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/prediction" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Predictions
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-pink-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-pink-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Love & Relationship</h1>
            <p className="text-muted-foreground mb-12">Insights into your romantic future and current relationship dynamics.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Zodiac Sign</label>
                  <select 
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Sign</option>
                    {zodiacs.map(z => <option key={z} value={z} className="bg-background">{z}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Status</option>
                    {statuses.map(s => <option key={s} value={s} className="bg-background">{s}</option>)}
                  </select>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                onClick={generateLovePrediction}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg shadow-lg shadow-pink-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Consulting Venus...
                  </>
                ) : (
                  'Generate Prediction'
                )}
              </button>

              {prediction && (
                <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                      <Sparkles className="w-16 h-16 text-pink-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Romantic Outlook</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prediction.forecast}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-center">
                      <p className="text-xs text-pink-400 mb-1">Compatibility Index</p>
                      <p className="text-2xl font-bold text-white">{prediction.index}%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center">
                      <p className="text-xs text-orange-400 mb-1">Current Vibe</p>
                      <p className="text-2xl font-bold text-white flex items-center justify-center gap-1.5">
                        <Flame className="w-5 h-5 text-orange-500" />
                        {prediction.vibe}
                      </p>
                    </div>
                  </div>
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

export default LovePrediction;
