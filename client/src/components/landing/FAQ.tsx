import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Is GrahaGuru's astrology authentic Vedic?", a: "Yes. Our AI is trained on classical texts including Brihat Parashara Hora Shastra and verified by practising Vedic astrologers." },
  { q: "Is the free trial really free?", a: "Absolutely. Daily horoscopes, basic Kundali and 5 AI questions per day are free forever. No card required." },
  { q: "How accurate is the AI Astrologer?", a: "Our model achieves 92%+ accuracy in birth chart computation and uses RAG over 10,000+ classical references for interpretation." },
  { q: "Can I get a printable Kundali PDF?", a: "Yes. Pro members get unlimited PDF downloads with detailed planetary analysis, dashas and remedies." },
  { q: "Are gemstones lab-certified?", a: "Every gemstone ships with a GIL/IGI certificate and an unconditional 7-day return guarantee." },
  { q: "Do you support regional languages?", a: "Yes — Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Punjabi, Odia and more." },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-10 md:py-14 font-poppins">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 px-4 py-1.5 text-[10px] text-purple-700 dark:text-gray-400 font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            FAQ
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            Questions? We have answers.
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div
              key={f.q}
              className={`rounded-2xl bg-white dark:bg-[#0F0F1F] border border-purple-100 dark:border-white/10 shadow-sm dark:shadow-none overflow-hidden transition-all duration-300 ${open === i ? "border-purple-500/50 shadow-md dark:shadow-[0_0_30px_rgba(168,85,247,0.1)]" : ""
                }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-bold text-slate-900 dark:text-white text-base">{f.q}</span>
                <Plus
                  className={`h-5 w-5 flex-shrink-0 text-purple-600 dark:text-purple-400 transition-transform duration-300 ${open === i ? "rotate-45" : ""
                    }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
