import React, { useState } from 'react';
import { ShieldAlert, ArrowLeft, Loader2, Zap, Activity } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';

const zodiacs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ageGroups = ['18-25', '26-35', '36-45', '46-60', '60+'];

const HealthPrediction = () => {
  const [zodiac, setZodiac] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ forecast: string; vitality: number; tip: string } | null>(null);
  const [error, setError] = useState('');

  const generateHealthPrediction = () => {
    setError('');
    if (!zodiac || !ageGroup) {
      setError('Please select your zodiac sign and age group');
      return;
    }

    setLoading(true);
    setPrediction(null);

    setTimeout(() => {
      const forecast = `The transition of Mars through your wellness sector indicates a spike in physical energy. For someone in the ${ageGroup} age group, this is a vital time to focus on cardiovascular health. Your mental clarity is peaking, making it an ideal time for meditation.`;
      
      setPrediction({
        forecast,
        vitality: 80 + Math.floor(Math.random() * 16),
        tip: "Incorporate more leafy greens and stay hydrated during peak hours."
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Seo metadata={pageSeoConfig.predictionHealth} />
      <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/prediction" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Predictions
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-green-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Health & Wellness</h1>
            <p className="text-muted-foreground mb-12">Your physical and mental well-being forecast based on planetary transits.</p>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Zodiac Sign</label>
                  <select 
                    value={zodiac}
                    onChange={(e) => setZodiac(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Sign</option>
                    {zodiacs.map(z => <option key={z} value={z} className="bg-background">{z}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">Age Group</label>
                  <select 
                    value={ageGroup}
                    onChange={(e) => setAgeGroup(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all appearance-none"
                  >
                    <option value="" className="bg-background">Select Age</option>
                    {ageGroups.map(a => <option key={a} value={a} className="bg-background">{a}</option>)}
                  </select>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                onClick={generateHealthPrediction}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-green-600 text-white font-bold text-lg shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Checking Alignments...
                  </>
                ) : (
                  'Generate Prediction'
                )}
              </button>

              {prediction && (
                <div className="space-y-8 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                      <Activity className="w-16 h-16 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">Wellness Forecast</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {prediction.forecast}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-center">
                      <p className="text-xs text-green-400 mb-1">Vitality Score</p>
                      <p className="text-2xl font-bold text-white">{prediction.vitality}%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                      <p className="text-xs text-yellow-400 mb-1">Wellness Tip</p>
                      <p className="text-[10px] font-medium text-white leading-tight mt-1">{prediction.tip}</p>
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

export default HealthPrediction;
