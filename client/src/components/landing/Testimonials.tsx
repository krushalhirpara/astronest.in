import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

const reviews = [
  {
    name: "Aarav Mehta",
    city: "Mumbai",
    text: "The AI Kundali was scarily accurate. Predicted my career switch to the month. I've recommended GrahaGuru to my whole family.",
  },
  {
    name: "Sneha Iyer",
    city: "Bengaluru",
    text: "Tried 4 astrology apps. This is the only one with serious depth and a beautiful interface. The Guna Matching saved our family weeks of debate.",
  },
  {
    name: "Rahul Khanna",
    city: "Delhi",
    text: "AI astrologer at 3 AM when I needed answers — instant, calm, thoughtful. The gemstone recommendation has changed how I feel daily.",
  },
  {
    name: "Pooja Reddy",
    city: "Hyderabad",
    text: "I love the daily horoscope notifications. Beautiful design, fast app, and the readings actually feel personalized — not generic.",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const r = reviews[i];

  return (
    <section className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          Loved by 50,000+ seekers
        </div>
        <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
          Real stories from real seekers
        </h2>

        <div className="mt-10 rounded-2xl bg-white dark:bg-[#0F0F1F] border border-purple-100 dark:border-white/10 p-8 md:p-12 shadow-xl dark:shadow-[0_0_60px_rgba(168,85,247,0.15)]">
          <div className="flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-5 w-5 fill-purple-500 text-purple-500 dark:fill-purple-400 dark:text-purple-400" />
            ))}
          </div>
          <p className="mt-6 text-xl font-medium leading-relaxed text-slate-800 dark:text-white md:text-2xl italic">
            "{r.text}"
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-500 font-bold text-white shadow-lg shadow-purple-500/20">
              {r.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                {r.name}
                <BadgeCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-xs text-slate-500 dark:text-gray-500">{r.city}, India</div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setI((i - 1 + reviews.length) % reviews.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 dark:border-white/10 bg-purple-50 dark:bg-white/5 text-slate-800 dark:text-white transition-all duration-300 hover:bg-purple-100 dark:hover:bg-white/10 hover:border-purple-500/40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-8 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500" : "w-2 bg-purple-200 dark:bg-white/20"
                    }`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((i + 1) % reviews.length)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-200 dark:border-white/10 bg-purple-50 dark:bg-white/5 text-slate-800 dark:text-white transition-all duration-300 hover:bg-purple-100 dark:hover:bg-white/10 hover:border-purple-500/40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
