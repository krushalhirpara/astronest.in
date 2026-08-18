import { Check, Sparkles } from "lucide-react";
import { PaymentButton } from "../PaymentButton";
import { cn } from "@/lib/utils";


const plans = [
  {
    name: "Free",
    price: "₹99",
    period: "",
    desc: "Get started with daily horoscopes and basic Kundali.",
    features: ["Daily Rashifal", "Basic Kundali", "5 AI questions/day", "Tarot of the day"],
    cta: "Start Now",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    desc: "For seekers who want unlimited cosmic guidance.",
    features: [
      "Unlimited AI Astrologer",
      "Detailed Kundali PDF",
      "Guna Matching",
      "Palm & Tarot Reading",
      "Personalized Remedies",
      "Priority support",
    ],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Premium Reports",
    price: "₹499",
    period: "one-time",
    desc: "Full life report by AI + verified astrologer review.",
    features: ["100+ page report", "Career & Finance", "Marriage timeline", "Yearly forecast", "Gemstone plan"],
    cta: "Order Report",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            Investment
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            Simple, cosmic pricing
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto font-poppins leading-relaxed">
            Choose the plan that fits your cosmic journey. Transparent pricing with no hidden costs.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={cn(
                "relative rounded-[2rem] p-8 transition-all duration-300 hover:scale-105 bg-white dark:bg-white/5 backdrop-blur-xl border border-purple-100 dark:border-white/10 shadow-md dark:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:shadow-xl flex flex-col",
                p.popular ? "scale-105 border-purple-500/80 shadow-purple-500/15 shadow-xl" : ""
              )}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 px-5 py-1.5 text-[10px] font-bold text-white shadow-lg uppercase tracking-widest">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}

              <div className="flex flex-col flex-grow">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-gray-500 mb-4">
                  {p.name}
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white font-heading">{p.price}</span>
                  <span className="text-sm text-slate-500 dark:text-gray-500">{p.period}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-8">{p.desc}</p>

                <ul className="space-y-4 border-t border-purple-100 dark:border-white/5 pt-8 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20">
                        <Check className="h-2.5 w-2.5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-slate-700 dark:text-gray-300 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <PaymentButton
                amount={parseInt(p.price.replace("₹", ""))}
                planName={p.name}
                className={cn(
                  "w-full rounded-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300",
                  p.popular
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                    : "border border-purple-200 dark:border-white/20 bg-purple-50/50 dark:bg-transparent text-slate-800 dark:text-white hover:bg-purple-100 dark:hover:bg-white/10"
                )}
              >
                {p.cta}
              </PaymentButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
