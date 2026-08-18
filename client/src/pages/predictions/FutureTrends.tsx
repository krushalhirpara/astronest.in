import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowLeft, Loader2, Zap, Target } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const focusAreas = ['Growth', 'Stability', 'Adventure', 'Spirituality'];

const FutureTrends = () => {
  const [zodiac, setZodiac] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ forecast: string; score: number; keyDate: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "AstroNest - Future Trends";
  }, []);

  const generateFutureTrends = () => {
    setError('');
    if (!zodiac || !focusArea) {
      setError('Please select your zodiac sign and focus area');
      return;
    }

    setLoading(true);
    setPrediction(null);

    setTimeout(() => {
      const forecast = `The outer planets are shifting into a rare alignment that favors your chosen path of ${focusArea.toLowerCase()}. As a ${zodiac}, you will find yourself at the center of significant social changes. Trust your intuition when faced with big decisions in the coming quarter.`;
      
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 15 + Math.floor(Math.random() * 30));
      
      setPrediction({
        forecast,
        score: 75 + Math.floor(Math.random() * 22),
        keyDate: futureDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/prediction" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Predictions
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Future Trends</h1>
            <p className="text-muted-foreground mb-12">Identify the major cosmic themes and opportunities shaping your road ahead.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Zodiac Sign</label>
                  <select 
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Sign</option>
                    {zodiacs.map(z => <option key={z} value={z} className="bg-background">{z}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Focus Area</label>
                  <select 
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Focus</option>
                    {focusAreas.map(f => <option key={f} value={f} className="bg-background">{f}</option>)}
                  </select>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                onClick={generateFutureTrends}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-cosmic text-white font-bold text-lg shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Scanning Timeline...
                  </>
                ) : (
                  'Generate Prediction'
                )}
              </button>

              {prediction && (
                <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                      <Target className="w-16 h-16 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Timeline Insight</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prediction.forecast}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <p className="text-xs text-purple-400 mb-1">Opportunity Score</p>
                      <p className="text-2xl font-bold text-white">{prediction.score}%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                      <p className="text-xs text-blue-400 mb-1">Key Manifestation Date</p>
                      <p className="text-sm font-bold text-white mt-1">{prediction.keyDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FutureTrends;
