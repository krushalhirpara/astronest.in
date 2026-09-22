import React, { useState } from 'react';
import { Compass, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';

const Vastu = () => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; suggestion: string; status: 'good' | 'average' | 'bad' } | null>(null);

  const checkVastu = () => {
    if (!selectedArea) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const vastuData: Record<string, { score: number; suggestion: string; status: 'good' | 'average' | 'bad' }> = {
        'Main Entrance': { score: 85, suggestion: 'North or East facing entrances are highly auspicious. Ensure the area is well-lit and clutter-free.', status: 'good' },
        'Bedroom': { score: 70, suggestion: 'South-West is ideal for the master bedroom. Avoid placing mirrors directly opposite the bed.', status: 'average' },
        'Kitchen': { score: 90, suggestion: 'South-East (Agni corner) is the perfect spot for the kitchen. Keep the sink and stove apart.', status: 'good' },
        'Living Room': { score: 65, suggestion: 'North or East directions are best. Keep heavy furniture in the South or West corners.', status: 'average' }
      };

      setResult(vastuData[selectedArea]);
      setLoading(false);
      console.log('Vastu check complete for:', selectedArea);
    }, 1200);
  };

  return (
    <>
      <Seo
        title={pageSeoConfig.calculatorVastu.title}
        description={pageSeoConfig.calculatorVastu.description}
        canonical={pageSeoConfig.calculatorVastu.canonical}
      />
      <div className="pt-32 pb-12 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/calculator" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-blue-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Compass className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Vastu Analysis</h1>
            <p className="text-muted-foreground mb-8">Select the area of your home you want to analyze for Vastu compliance.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {['Main Entrance', 'Bedroom', 'Kitchen', 'Living Room'].map((area) => (
                <button 
                  key={area} 
                  onClick={() => setSelectedArea(area)}
                  className={`p-4 rounded-2xl border transition-all text-sm ${
                    selectedArea === area 
                      ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/10' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>

            <button 
              onClick={checkVastu}
              disabled={loading || !selectedArea}
              className="w-full py-5 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Analyzing Energy...
                </>
              ) : (
                'Check Vastu Score'
              )}
            </button>

            {result && (
              <div className="mt-8 p-8 rounded-3xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vastu Score</p>
                    <p className={`text-4xl font-bold ${
                      result.status === 'good' ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {result.score}/100
                    </p>
                  </div>
                  {result.status === 'good' ? (
                    <CheckCircle2 className="w-12 h-12 text-green-400 opacity-50" />
                  ) : (
                    <AlertCircle className="w-12 h-12 text-yellow-400 opacity-50" />
                  )}
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-white leading-relaxed text-sm">
                    <span className="text-blue-400 font-bold block mb-1 uppercase tracking-wider text-[10px]">Recommendation</span>
                    {result.suggestion}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Vastu;
