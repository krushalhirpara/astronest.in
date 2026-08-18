import { UserCircle, Sparkles, MessageSquare } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Enter Birth Details",
    desc: "Share your date, time and place of birth. Takes less than 30 seconds.",
  },
  {
    icon: Sparkles,
    title: "AI Generates Kundali",
    desc: "Our Vedic AI engine creates a precise birth chart in seconds.",
  },
  {
    icon: MessageSquare,
    title: "Ask AI Astrologer",
    desc: "Chat 24/7 about love, career, finance and life — in 12+ languages.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            Process
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            Your cosmic journey in 3 steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          {/* connector line */}
          <div className="absolute left-10 right-10 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-purple-500/20 dark:via-purple-500/10 to-transparent md:block -z-10" />

          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <div className="bg-white dark:bg-white/5 backdrop-blur-xl border border-purple-100 dark:border-white/10 shadow-md dark:shadow-none relative rounded-[2.5rem] p-10 text-center transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl hover:-translate-y-1 group">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <s.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400">
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white font-heading tracking-wide">{s.title}</h3>
                <p className="mt-3 text-[13px] text-slate-600 dark:text-gray-500 font-poppins leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
