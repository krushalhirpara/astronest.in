import React, { useState, useEffect } from 'react';
import { Hash, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';

const Numerology = () => {
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ number: number; traits: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "AstroNest - Numerology";
  }, []);

  const calculateNumerology = () => {
    setError('');
    if (!dob) {
      setError('Please select your date of birth');
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      // Life Path Number Calculation
      const digits = dob.replace(/-/g, '').split('').map(Number);
      let sum = digits.reduce((a, b) => a + b, 0);
      
      const reduce = (num: number): number => {
        if (num === 11 || num === 22 || num <= 9) return num;
        const s = num.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        return reduce(s);
      };

      const finalNumber = reduce(sum);
      
      const traitMap: Record<number, string> = {
        1: "The Leader: Independent, creative, and pioneering.",
        2: "The Peacemaker: Diplomatic, intuitive, and cooperative.",
        3: "The Communicator: Expressive, social, and imaginative.",
        4: "The Builder: Practical, disciplined, and steady.",
        5: "The Adventurer: Versatile, freedom-loving, and curious.",
        6: "The Nurturer: Responsible, harmonious, and caring.",
        7: "The Seeker: Analytical, spiritual, and introspective.",
        8: "The Achiever: Ambitious, authoritative, and focused.",
        9: "The Humanitarian: Compassionate, idealistic, and generous.",
        11: "The Master Teacher: High intuition, spiritual insight, and inspiration.",
        22: "The Master Builder: Ability to turn large-scale dreams into reality."
      };

      setResult({ number: finalNumber, traits: traitMap[finalNumber] || "A unique cosmic journey." });
      setLoading(false);
      console.log('Numerology calculation complete:', finalNumber);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/calculator" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-purple-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Hash className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Numerology Calculator</h1>
            <p className="text-muted-foreground mb-12">Enter your date of birth to find your Life Path Number.</p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Date of Birth</label>
                <input 
                  type="date" 
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all" 
                />
              </div>
              
              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button 
                onClick={calculateNumerology}
                disabled={loading}
                className="w-full py-5 rounded-2xl bg-cosmic text-white font-bold text-lg shadow-glow hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Calculating Path...
                  </>
                ) : (
                  'Calculate Life Path'
                )}
              </button>

              {result && (
                <div className="mt-8 p-8 rounded-3xl bg-white/5 border border-white/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <p className="text-sm text-muted-foreground mb-2">Your Life Path Number</p>
                  <p className="text-6xl font-bold gradient-text mb-4">{result.number}</p>
                  <p className="text-white text-lg leading-relaxed">{result.traits}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Numerology;
