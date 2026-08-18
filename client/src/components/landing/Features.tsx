import {
  ScrollText,
  Heart,
  Hand,
  Layers,
  Hash,
  CalendarDays,
  Flame,
  Moon,
  Clock,
  Gem,
} from "lucide-react";

const features = [
  { icon: ScrollText, title: "Kundali Generator", desc: "Precise Vedic birth charts with planetary positions." },
  { icon: Heart, title: "Guna Matching", desc: "36-point compatibility for marriage and partnerships." },
  { icon: Hand, title: "Palm Reading", desc: "AI palmistry — upload a photo, get instant insights." },
  { icon: Layers, title: "Tarot Reading", desc: "Daily, weekly and yearly tarot spreads with meanings." },
  { icon: Hash, title: "Numerology", desc: "Discover your life path, destiny and lucky numbers." },
  { icon: CalendarDays, title: "Panchang", desc: "Daily tithi, nakshatra, yoga and karana — always live." },
  { icon: Flame, title: "Mangal Dosha", desc: "Check Manglik status with instant remedy guidance." },
  { icon: Moon, title: "Sade Sati", desc: "Track Saturn's transit and its effect on your life." },
  { icon: Clock, title: "Muhurat Finder", desc: "Find auspicious timings for any important event." },
  { icon: Gem, title: "Gemstone Match", desc: "Get personalized gemstone & rudraksha recommendations." },
];

export function Features() {
  return (
    <section id="features" className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            Capabilities
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            One platform, infinite insights
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto font-poppins leading-relaxed">
            From Vedic Kundali to AI palm reading — every astrological tool you'll ever need.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-purple-100 dark:border-white/10 p-6 transition-all duration-300 shadow-md dark:shadow-none hover:border-purple-500/30 hover:shadow-xl hover:-translate-y-1 text-center"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-white/5 text-purple-600 dark:text-purple-400 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-pink-500 group-hover:text-white">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-poppins">{f.title}</h3>
              <p className="mt-3 text-[11px] text-slate-600 dark:text-gray-500 leading-relaxed font-poppins">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
