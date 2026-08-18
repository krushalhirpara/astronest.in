import { useState } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";

const categories = ["All", "Ruby", "Emerald", "Sapphire", "Pearl", "Coral"];

const products = [
  { name: "Burmese Ruby", category: "Ruby", price: 12999, planet: "Sun", color: "oklch(0.55 0.22 25)" },
  { name: "Colombian Emerald", category: "Emerald", price: 9499, planet: "Mercury", color: "oklch(0.55 0.18 150)" },
  { name: "Blue Sapphire", category: "Sapphire", price: 14999, planet: "Saturn", color: "oklch(0.45 0.22 260)" },
  { name: "Yellow Sapphire", category: "Sapphire", price: 11499, planet: "Jupiter", color: "oklch(0.82 0.18 90)" },
  { name: "South Sea Pearl", category: "Pearl", price: 6499, planet: "Moon", color: "oklch(0.92 0.02 270)" },
  { name: "Italian Coral", category: "Coral", price: 7499, planet: "Mars", color: "oklch(0.65 0.2 30)" },
  { name: "Star Ruby", category: "Ruby", price: 18999, planet: "Sun", color: "oklch(0.5 0.2 20)" },
  { name: "Panna Stone", category: "Emerald", price: 5999, planet: "Mercury", color: "oklch(0.6 0.2 145)" },
];

export function Gemstones() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <section id="gemstones" className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            Gemstone Shop
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white tracking-wide max-w-3xl mx-auto py-2">
            Certified <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-amber-600 dark:from-purple-400 dark:to-pink-400 pb-1">gemstones</span> for your planets
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto font-poppins leading-relaxed">
            Lab-certified, hand-picked rudraksha and gemstones with personalized fitment guidance.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                active === c
                  ? "bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white shadow-lg shadow-purple-500/20 scale-105"
                  : "bg-white dark:bg-white/5 border border-purple-100 dark:border-white/10 text-slate-700 dark:text-gray-400 hover:text-purple-700 dark:hover:text-white hover:border-purple-500/40 shadow-sm dark:shadow-none"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0F0F1F] border border-purple-100 dark:border-white/10 p-5 transition-all duration-300 shadow-md dark:shadow-none hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-xl"
            >
              <div
                className="relative aspect-square overflow-hidden rounded-[2rem]"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${p.color}, oklch(0.15 0.05 270))`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background: `radial-gradient(circle at 70% 70%, transparent 30%, oklch(0 0 0 / 0.6))`,
                  }}
                />
                <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition hover:bg-white/30">
                    <Heart className="h-4 w-4 text-white" />
                  </button>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition hover:bg-white/30">
                    <Eye className="h-4 w-4 text-white" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-md border border-white/20">
                  Rules {p.planet}
                </div>
              </div>
              <div className="mt-4 flex items-start justify-between gap-2 px-1">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.name}</h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider">Lab-certified · 5–7 ct</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-amber-600 dark:text-yellow-500">
                    ₹{p.price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
              <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-purple-200 dark:border-white/10 bg-purple-50 dark:bg-white/5 py-3 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-widest transition-all duration-300 hover:border-purple-500/40 hover:bg-purple-100 dark:hover:bg-white/10 hover:scale-105">
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
