import React, { useEffect, useState } from 'react';
import { Moon, Sun, Stars, Sparkles, Loader2, Calendar, Gem, Zap, Quote } from 'lucide-react';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

const signSymbols: Record<string, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓'
};

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState('Aries');
  const [forecastType, setForecastType] = useState('Daily');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHoroscope = async (sign: string, type: string) => {
    console.log(`[Horoscope] Fetching ${type} horoscope for ${sign}...`);
    setLoading(true);
    setError(null);
    try {
      const browserLang = navigator.language || 'en';
      const systemPrompt = `You are an expert Vedic astrologer. Provide a ${type} horoscope for ${sign} in Hindi language ONLY. 
            Style: Professional, mystical, and accurate.
            
            IMPORTANT: The entire "description" and "advice" MUST be in pure Hindi (Devanagari script) with no English words.
            
            Return ONLY a JSON object with this structure:
            {
              "description": "Main forecast text in Hindi (3-4 sentences)",
              "mood": "Single word mood in Hindi",
              "lucky_number": "A single lucky number",
              "advice": "One sentence of practical advice in Hindi"
            }`;

      const apiUrl = `${BACKEND_URL}/api/chat`;
      console.log(`[Horoscope] API URL: ${apiUrl}`);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: `Provide ${type} horoscope for ${sign}`,
          systemPrompt,
          response_format: { type: "json_object" }
        }),
      });

      const result = await response.json();
      console.log("[Horoscope] API Result:", result);

      if (!response.ok) {
        throw new Error(result.error || 'The stars are momentarily obscured.');
      }

      setData(result);
    } catch (err: any) {
      console.error("[Horoscope] Fetch Error:", err);
      setError(err.message || "The stars are momentarily obscured. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `AstroNest - ${selectedSign} Horoscope`;
    fetchHoroscope(selectedSign, forecastType);
  }, [selectedSign, forecastType]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <link href="https://fonts.googleapis.com/css2?family=Anek+Devanagari:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Cosmic Predictions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white font-display mb-4 flex items-center gap-4">
              <span className="text-purple-500 drop-shadow-glow-purple">{signSymbols[selectedSign]}</span>
              {selectedSign} <span className="text-purple-500/50 text-2xl md:text-4xl ml-2">{forecastType}</span>
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Tap into the wisdom of the ancients. Your planetary alignment reveals the path forward for your career, health, and soul.
            </p>
          </div>
          <div className="flex gap-2 p-1.5 bg-white/5 rounded-2xl border border-white/10">
            {['Daily', 'Weekly', 'Monthly'].map((type) => (
              <button
                key={type}
                onClick={() => setForecastType(type)}
                className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${type === forecastType
                    ? 'bg-cosmic text-white shadow-glow translate-y-[-2px]'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Sign Selector */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-gold" />
              Switch Zodiac Sign
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {signs.map((sign) => (
                <button
                  key={sign}
                  onClick={() => setSelectedSign(sign)}
                  className={`glass p-4 flex flex-col items-center justify-center gap-3 rounded-2xl transition-all duration-500 group border ${selectedSign === sign
                      ? 'border-purple-500 bg-purple-500/10 scale-105 shadow-glow'
                      : 'border-white/5 hover:border-white/20'
                    }`}
                >
                  <span className={`text-4xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${selectedSign === sign ? 'text-purple-400 drop-shadow-glow-purple' : 'text-muted-foreground opacity-50'
                    }`}>
                    {signSymbols[sign]}
                  </span>
                  <span className={`text-xs font-bold ${selectedSign === sign ? 'text-white' : 'text-muted-foreground'}`}>
                    {sign}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Horoscope Content */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="glass p-10 rounded-[40px] border border-white/10 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
              {loading ? (
                <div className="flex flex-col items-center gap-6 animate-in fade-in duration-300">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
                    <Sparkles className="absolute inset-0 m-auto w-6 h-6 text-purple-400 animate-pulse" />
                  </div>
                  <p className="text-purple-400 font-bold animate-pulse">Consulting the Elders...</p>
                </div>
              ) : error ? (
                <div className="text-center">
                  <Moon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">{error}</p>
                  <button
                    onClick={() => fetchHoroscope(selectedSign, forecastType)}
                    className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm transition-all"
                  >
                    Try Reconnecting
                  </button>
                </div>
              ) : data ? (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                    <Stars className="w-64 h-64 text-purple-500" />
                  </div>

                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <Quote className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-2xl text-white leading-relaxed" style={{ fontFamily: "'Anek Devanagari', sans-serif" }}>
                      {data.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl group hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3 mb-2 text-gold">
                        <Gem className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Mood</span>
                      </div>
                      <p className="text-white text-xl font-bold">{data.mood}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl group hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3 mb-2 text-purple-400">
                        <Zap className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Lucky No.</span>
                      </div>
                      <p className="text-white text-xl font-bold">{data.lucky_number}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl group hover:bg-white/10 transition-all">
                      <div className="flex items-center gap-3 mb-2 text-pink-400">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Advice</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed" style={{ fontFamily: "'Anek Devanagari', sans-serif" }}>{data.advice}</p>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horoscope;
