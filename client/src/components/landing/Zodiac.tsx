import { useState } from "react";
import { X } from "lucide-react";

const signs = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 – Apr 19", color: "Red", lucky: 9, compat: "Leo", reading: "Bold moves favor you today. Trust your instincts in matters of the heart." },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 – May 20", color: "Green", lucky: 6, compat: "Virgo", reading: "Patience brings rewards. A financial opportunity is on the horizon." },
  { name: "Gemini", symbol: "♊", dates: "May 21 – Jun 20", color: "Yellow", lucky: 5, compat: "Libra", reading: "Communication flows easily. Reach out to old friends." },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 – Jul 22", color: "Silver", lucky: 2, compat: "Pisces", reading: "Family bonds strengthen. Trust your intuition tonight." },
  { name: "Leo", symbol: "♌", dates: "Jul 23 – Aug 22", color: "Gold", lucky: 1, compat: "Aries", reading: "Your charisma shines. A creative project takes off." },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 – Sep 22", color: "Navy", lucky: 7, compat: "Taurus", reading: "Detail work pays off. Health choices matter today." },
  { name: "Libra", symbol: "♎", dates: "Sep 23 – Oct 22", color: "Pink", lucky: 4, compat: "Gemini", reading: "Balance returns to relationships. Beauty is everywhere." },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 – Nov 21", color: "Maroon", lucky: 8, compat: "Cancer", reading: "A secret is revealed. Transformation is your superpower." },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 – Dec 21", color: "Purple", lucky: 3, compat: "Aries", reading: "Adventure calls. Plan that journey you've been dreaming of." },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 – Jan 19", color: "Black", lucky: 10, compat: "Virgo", reading: "Career milestones approach. Stay disciplined." },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 – Feb 18", color: "Blue", lucky: 11, compat: "Gemini", reading: "Innovation strikes. Share your big ideas." },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 – Mar 20", color: "Sea Green", lucky: 12, compat: "Cancer", reading: "Dreams hold messages. Creative inspiration flows." },
];

export function Zodiac() {
  const [selected, setSelected] = useState<number | null>(null);
  const sign = selected !== null ? signs[selected] : null;

  return (
    <section id="horoscope" className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            Daily Horoscope
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2]">
            <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
              What the stars say today
            </span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto font-poppins leading-relaxed">
            Tap your sign for personalized lucky numbers, colors and a free reading.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {signs.map((s, i) => (
            <button
              key={s.name}
              onClick={() => setSelected(i)}
              className="group relative overflow-hidden rounded-[2rem] bg-white dark:bg-white/5 backdrop-blur-xl border border-purple-100 dark:border-white/10 p-8 text-center transition-all duration-300 shadow-md dark:shadow-none hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
            >
              <div className="font-heading text-5xl text-purple-600 dark:text-purple-400 transition-transform duration-300 group-hover:scale-110">{s.symbol}</div>
              <div className="mt-4 text-lg font-bold text-slate-900 dark:text-white font-heading">{s.name}</div>
              <div className="mt-1 text-[9px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-widest">{s.dates}</div>
            </button>
          ))}
        </div>
      </div>

      {sign && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 dark:bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white dark:bg-[#0F0F1F] border border-purple-200 dark:border-white/10 p-8 shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 dark:text-gray-500 dark:hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="font-display text-7xl text-purple-600 dark:text-purple-400">{sign.symbol}</div>
            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{sign.name}</h3>
            <p className="text-sm text-slate-500 dark:text-gray-400">{sign.dates}</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-purple-100 dark:border-white/10 bg-purple-50/50 dark:bg-white/5 p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500">Lucky #</div>
                <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">{sign.lucky}</div>
              </div>
              <div className="rounded-xl border border-purple-100 dark:border-white/10 bg-purple-50/50 dark:bg-white/5 p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500">Color</div>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{sign.color}</div>
              </div>
              <div className="rounded-xl border border-purple-100 dark:border-white/10 bg-purple-50/50 dark:bg-white/5 p-3">
                <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-gray-500">Match</div>
                <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">{sign.compat}</div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-50 dark:bg-purple-500/5 p-4">
              <div className="text-[10px] uppercase font-bold tracking-widest text-purple-700 dark:text-purple-400">Today's Reading</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-gray-300">{sign.reading}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
