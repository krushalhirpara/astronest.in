import { Sparkles, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { celebrities } from "@/lib/celebrityData";

export function Celebrities() {
  return (
    <section className="relative py-10 md:py-14 overflow-hidden font-poppins">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            Celebrity Kundli
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            Stars of the stars
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto font-poppins leading-relaxed">
            Explore birth charts of legends and decode their cosmic blueprint.
          </p>
        </div>
      </div>

      <div className="mt-10 overflow-x-auto pb-6 scrollbar-hide">
        <div className="mx-auto flex w-max gap-6 px-4 md:px-6">
          {celebrities.map((c) => (
            <Link
              key={c.slug}
              to="/celebrity/$slug"
              params={{ slug: c.slug }}
              className="group w-72 flex-shrink-0 overflow-hidden rounded-xl bg-white dark:bg-[#0F0F1F] border border-purple-100 dark:border-white/10 p-4 transition-all duration-300 shadow-md dark:shadow-none hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 cursor-pointer block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
                <img
                  src={c.image}
                  alt={c.name}
                  width={288}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback in case of image load error
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 dark:from-[#0F0F1F] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                <div className="absolute top-3 right-3">
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-[10px] font-bold text-white uppercase">
                    {c.zodiac}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-300">
                    <Star className="w-3 h-3 fill-current text-amber-400" />
                    VEDIC CHART
                  </div>
                </div>
              </div>

              <div className="mt-5 px-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">{c.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-gray-400 line-clamp-2 italic">"{c.kundliSummary}"</p>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-800 dark:group-hover:text-white transition-all uppercase tracking-tight">
                    View Insights
                  </span>
                  <div className="flex -space-x-2">
                    {c.traits.slice(0, 2).map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-full border border-white/20 bg-purple-600 flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 text-white/80" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
