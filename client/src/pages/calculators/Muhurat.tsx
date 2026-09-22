import React, { useState } from 'react';
import { Star, ArrowLeft, Loader2, Calendar, Clock } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';

const Muhurat = () => {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ date: string; time: string; nakshatra: string; tithi: string }[] | null>(null);

  const findMuhurat = (event: string) => {
    setSelectedEvent(event);
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      // Mock data for auspicious timings
      const timings = [
        { date: 'May 15, 2026', time: '07:15 AM - 09:30 AM', nakshatra: 'Pushya', tithi: 'Shukla Navami' },
        { date: 'May 18, 2026', time: '11:45 AM - 02:15 PM', nakshatra: 'Rohini', tithi: 'Shukla Dwadashi' },
        { date: 'May 22, 2026', time: '05:30 PM - 08:00 PM', nakshatra: 'Uttara Phalguni', tithi: 'Purnima' }
      ];

      setResult(timings);
      setLoading(false);
      console.log('Muhurat calculation complete for:', event);
    }, 1200);
  };

  return (
    <>
      <Seo metadata={pageSeoConfig.calculatorMuhurat} />
      <div className="pt-32 pb-12 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link to="/calculator" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Calculators
        </Link>
        
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="bg-yellow-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 font-display">Shubh Muhurat</h1>
            <p className="text-muted-foreground mb-8">Find the most auspicious time for your special occasions.</p>
            
            <div className="space-y-4 mb-8">
              {['Marriage', 'Vehicle Purchase', 'Property Purchase', 'New Business'].map((event) => (
                <button 
                  key={event} 
                  onClick={() => findMuhurat(event)}
                  disabled={loading}
                  className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all group ${
                    selectedEvent === event 
                      ? 'bg-yellow-500/10 border-yellow-500/50 text-white' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium">{event}</span>
                  {loading && selectedEvent === event ? (
                    <Loader2 className="w-4 h-4 animate-spin text-yellow-400" />
                  ) : (
                    <ArrowLeft className="w-4 h-4 rotate-180 opacity-50 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>

            {result && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  Upcoming Auspicious Timings
                </h3>
                {result.map((item, index) => (
                  <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-yellow-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-yellow-400 font-bold">{item.date}</p>
                        <p className="text-white text-sm flex items-center gap-1.5 mt-1">
                          <Clock className="w-3.5 h-3.5 opacity-50" />
                          {item.time}
                        </p>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
                        Auspicious
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Nakshatra</p>
                        <p className="text-white text-sm font-medium">{item.nakshatra}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Tithi</p>
                        <p className="text-white text-sm font-medium">{item.tithi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!result && !loading && (
              <p className="text-xs text-center text-muted-foreground">Select an event to view upcoming auspicious timings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Muhurat;
