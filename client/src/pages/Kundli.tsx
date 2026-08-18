import React, { useEffect, useState } from 'react';
import { User, Calendar, MapPin, Clock, Sparkles, Loader2, Info, Moon, Sun, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface KundliFormData {
  name: string;
  dob: string;
  time: string;
  place: string;
}

interface KundliResult {
  ascendant: string;
  moonSign: string;
  sunSign: string;
  nakshatra: string;
   planetaryPositions: Array<{ planet: string, sign: string, degree: string }>;
  prediction: string;
}

const Kundli = () => {
  const [formData, setFormData] = useState<KundliFormData>({
    name: '',
    dob: '',
    time: '',
    place: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KundliResult | null>(null);
  const [errors, setErrors] = useState<Partial<KundliFormData>>({});

  useEffect(() => {
    document.title = "AstroNest - Kundli";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof KundliFormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Partial<KundliFormData> = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.time) newErrors.time = 'Time of birth is required';
    if (!formData.place) newErrors.place = 'Place of birth is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setResult({
        ascendant: "Leo (Simha)",
        moonSign: "Scorpio (Vrishchik)",
        sunSign: "Aries (Mesh)",
        nakshatra: "Anuradha",
        planetaryPositions: [
          { planet: "Sun", sign: "Aries", degree: "12° 45'" },
          { planet: "Moon", sign: "Scorpio", degree: "08° 12'" },
          { planet: "Mars", sign: "Gemini", degree: "21° 30'" },
          { planet: "Jupiter", sign: "Pisces", degree: "05° 18'" },
        ],
        prediction: "You are a natural leader with a strong will. Your Scorpio moon gives you deep intuition and emotional intensity. This year focuses on career growth and spiritual awakening."
      });
      setLoading(false);
      
      // Scroll to result
      setTimeout(() => {
        const element = document.getElementById('kundli-result');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">Generate Your Janam Kundli</h1>
          <p className="text-muted-foreground">Enter your birth details to get a detailed Vedic birth chart and analysis.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <Sparkles className="w-24 h-24 text-purple-500" />
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name
              </label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text" 
                className={cn(
                  "w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 transition-all",
                  errors.name ? "border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:ring-purple-500/30"
                )} 
                placeholder="Enter your name" 
              />
              {errors.name && <p className="text-red-400 text-xs mt-1 ml-2">{errors.name}</p>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Date of Birth
              </label>
              <input 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                type="date" 
                className={cn(
                  "w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 transition-all",
                  errors.dob ? "border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:ring-purple-500/30"
                )} 
              />
              {errors.dob && <p className="text-red-400 text-xs mt-1 ml-2">{errors.dob}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Time of Birth
              </label>
              <input 
                name="time"
                value={formData.time}
                onChange={handleChange}
                type="time" 
                className={cn(
                  "w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 transition-all",
                  errors.time ? "border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:ring-purple-500/30"
                )} 
              />
              {errors.time && <p className="text-red-400 text-xs mt-1 ml-2">{errors.time}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Place of Birth
              </label>
              <input 
                name="place"
                value={formData.place}
                onChange={handleChange}
                type="text" 
                className={cn(
                  "w-full bg-white/5 border rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 transition-all",
                  errors.place ? "border-red-500/50 focus:ring-red-500/30" : "border-white/10 focus:ring-purple-500/30"
                )} 
                placeholder="City, Country" 
              />
              {errors.place && <p className="text-red-400 text-xs mt-1 ml-2">{errors.place}</p>}
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                disabled={loading}
                type="submit"
                className="w-full py-5 rounded-2xl bg-cosmic text-white font-bold text-lg shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Generating your destiny...
                  </>
                ) : (
                  "Generate Free Kundli"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        {result && (
          <div id="kundli-result" className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Your Kundli Analysis</h2>
              <p className="text-purple-400">Personalized Vedic Insights for {formData.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Ascendant', value: result.ascendant, icon: Sun, color: 'text-orange-400' },
                { label: 'Moon Sign', value: result.moonSign, icon: Moon, color: 'text-blue-400' },
                { label: 'Sun Sign', value: result.sunSign, icon: Sparkles, color: 'text-yellow-400' },
                { label: 'Nakshatra', value: result.nakshatra, icon: Star, color: 'text-purple-400' },
              ].map((item, i) => (
                <div key={i} className="glass p-6 rounded-3xl border border-white/10 text-center hover:border-white/20 transition-colors">
                  <item.icon className={cn("w-8 h-8 mx-auto mb-4", item.color)} />
                  <p className="text-sm text-gray-400 mb-1">{item.label}</p>
                  <p className="text-white font-bold">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 glass p-8 rounded-[32px] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Info className="w-5 h-5 text-purple-400" /> General Prediction
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg italic">
                  "{result.prediction}"
                </p>
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500" /> Accurate Vedic Data</span>
                    <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500" /> Premium Analysis</span>
                  </div>
                </div>
              </div>

              <div className="glass p-8 rounded-[32px] border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Planetary Positions</h3>
                <div className="space-y-4">
                  {result.planetaryPositions.map((p, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-400">{p.planet}</span>
                      <div className="text-right">
                        <div className="text-white text-sm font-medium">{p.sign}</div>
                        <div className="text-purple-400 text-xs">{p.degree}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-center pt-8">
              <button className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">
                Download Full PDF Report (Coming Soon)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Kundli;
