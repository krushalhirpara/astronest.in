import React, { useState, useEffect } from 'react';
import { Briefcase, ArrowLeft, Loader2, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const CareerPrediction = () => {
  const [zodiac, setZodiac] = useState('');
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ forecast: string; luck: number; success: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "AstroNest - Career Prediction";
  }, []);

  const generateCareerPrediction = () => {
    setError('');
    if (!zodiac || !profession.trim()) {
      setError('Please select your zodiac sign and enter your profession');
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous result if any

    setTimeout(() => {
      const forecast = `For a ${profession} under the sign of ${zodiac}, the planetary alignment of Saturn indicates a period of structural growth. Professional gains are likely through meticulous planning. Mid-month brings unexpected financial opportunities through a distant connection.`;
      
      setPrediction({
        forecast,
        luck: 70 + Math.floor(Math.random() * 26),
        success: Math.random() > 0.5 ? 'High' : 'Moderate'
      });
      setLoading(false);
    }, 1500);
  };

  const setResult = (val: any) => setPrediction(val); // Shorthand helper

  return (
    <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/prediction" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Predictions
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Career & Wealth</h1>
            <p className="text-muted-foreground mb-12">Your professional and financial outlook for the current planetary cycle.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Zodiac Sign</label>
                  <select 
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Sign</option>
                    {zodiacs.map(z => <option key={z} value={z} className="bg-background">{z}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Profession</label>
                  <input 
                    type="text" 
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g. Designer"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
                  />
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                onClick={generateCareerPrediction}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Consulting Saturn...
                  </>
                ) : (
                  'Generate Prediction'
                )}
              </button>

              {prediction && (
                <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-16 h-16 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Today's Forecast</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prediction.forecast}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-center">
                      <p className="text-xs text-blue-400 mb-1">Luck Score</p>
                      <p className="text-2xl font-bold text-white">{prediction.luck}%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                      <p className="text-xs text-purple-400 mb-1">Success Rate</p>
                      <p className="text-2xl font-bold text-white">{prediction.success}</p>
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

export default CareerPrediction;
