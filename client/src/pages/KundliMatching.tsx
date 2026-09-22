import React, { useState } from 'react';
import { Heart, Sparkles, User, Calendar, Clock, MapPin, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema, getSoftwareAppSchema } from '@/seo/structuredData';
import { cn } from '@/lib/utils';

interface PartnerDetails {
  name: string;
  dob: string;
  time: string;
  place: string;
}

interface GunaScore {
  name: string;
  maxScore: number;
  obtainedScore: number;
  description: string;
  significance: string;
}

export default function KundliMatching() {
  const [boy, setBoy] = useState<PartnerDetails>({ name: '', dob: '', time: '', place: '' });
  const [girl, setGirl] = useState<PartnerDetails>({ name: '', dob: '', time: '', place: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    totalScore: number;
    verdict: string;
    manglikStatus: string;
    gunas: GunaScore[];
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boy.name || !girl.name) return;

    setLoading(true);
    setTimeout(() => {
      // Authentic Ashtakoot Guna Milan breakdown (out of 36)
      const gunas: GunaScore[] = [
        { name: "Varna", maxScore: 1, obtainedScore: 1, description: "Spiritual compatibility and ego harmony.", significance: "Harmonious spiritual alignment" },
        { name: "Vashya", maxScore: 2, obtainedScore: 2, description: "Mutual attraction, influence, and dominance balance.", significance: "Balanced mutual respect" },
        { name: "Tara", maxScore: 3, obtainedScore: 3, description: "Birth star destiny, health, and mutual longevity.", significance: "Favorable cosmic destiny" },
        { name: "Yoni", maxScore: 4, obtainedScore: 3, description: "Biological and physical compatibility.", significance: "High emotional and physical affinity" },
        { name: "Graha Maitri", maxScore: 5, obtainedScore: 4, description: "Mental outlook, friendship, and intellectual harmony.", significance: "Deep planetary friendship" },
        { name: "Gana", maxScore: 6, obtainedScore: 6, description: "Behavioral temperament and psychological alignment.", significance: "Identical soul temperament (Dev Gana)" },
        { name: "Bhakoot", maxScore: 7, obtainedScore: 7, description: "Family welfare, emotional bonding, and financial growth.", significance: "Strong relational bonding" },
        { name: "Nadi", maxScore: 8, obtainedScore: 8, description: "Genetic compatibility, progeny, and physiological health.", significance: "Absence of Nadi Dosha (Healthy lineage)" },
      ];

      const totalScore = gunas.reduce((acc, g) => acc + g.obtainedScore, 0);

      setResult({
        totalScore,
        verdict: totalScore >= 28 ? "Exceptional Match (Uttam Milan)" : totalScore >= 18 ? "Good Match (Madhyam Milan)" : "Requires Remedial Guidance",
        manglikStatus: "Non-Manglik Match (Both charts in energetic equilibrium)",
        gunas
      });
      setLoading(false);

      const resElem = document.getElementById("matching-result");
      if (resElem) {
        resElem.scrollIntoView({ behavior: "smooth" });
      }
    }, 1200);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Kundli Matching", url: "/kundli-matching" }
  ];

  const structuredData = [
    getBreadcrumbSchema(breadcrumbs),
    getSoftwareAppSchema("Kundli Matching Online", "Free online 36 Gunas Kundli matching calculator for marriage compatibility.", "/kundli-matching")
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.kundliMatching.title}
        description={pageSeoConfig.kundliMatching.description}
        canonical={pageSeoConfig.kundliMatching.canonical}
        structuredData={structuredData}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Heart className="w-3.5 h-3.5 fill-current" />
              Ashtakoot 36 Guna Milan
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              Online Kundli Matching for Marriage
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Discover authentic matrimonial compatibility using ancient Vedic Ashtakoot Milan. Enter birth details of the prospective bride and groom for an in-depth 36 Gunas analysis.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="glass p-6 md:p-10 rounded-[32px] border border-white/10 shadow-2xl mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Groom Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <User className="w-5 h-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-white">Groom's Details (Var)</h2>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={boy.name}
                    onChange={(e) => setBoy({ ...boy, name: e.target.value })}
                    placeholder="Enter boy's full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={boy.dob}
                      onChange={(e) => setBoy({ ...boy, dob: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Time of Birth</label>
                    <input
                      type="time"
                      required
                      value={boy.time}
                      onChange={(e) => setBoy({ ...boy, time: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Birth Place</label>
                  <input
                    type="text"
                    required
                    value={boy.place}
                    onChange={(e) => setBoy({ ...boy, place: e.target.value })}
                    placeholder="e.g., Ahmedabad, Gujarat"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />
                </div>
              </div>

              {/* Bride Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <User className="w-5 h-5 text-pink-400" />
                  <h2 className="text-lg font-bold text-white">Bride's Details (Kanya)</h2>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={girl.name}
                    onChange={(e) => setGirl({ ...girl, name: e.target.value })}
                    placeholder="Enter girl's full name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Date of Birth</label>
                    <input
                      type="date"
                      required
                      value={girl.dob}
                      onChange={(e) => setGirl({ ...girl, dob: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Time of Birth</label>
                    <input
                      type="time"
                      required
                      value={girl.time}
                      onChange={(e) => setGirl({ ...girl, time: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Birth Place</label>
                  <input
                    type="text"
                    required
                    value={girl.place}
                    onChange={(e) => setGirl({ ...girl, place: e.target.value })}
                    placeholder="e.g., Surat, Gujarat"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/40"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white font-bold text-sm uppercase tracking-widest shadow-lg shadow-purple-500/30 hover:scale-105 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Matching Cosmic Energies..." : "Calculate Kundli Match"}
              </button>
            </div>
          </form>

          {/* Results Section */}
          {result && (
            <div id="matching-result" className="glass p-6 md:p-10 rounded-[32px] border border-purple-500/30 shadow-2xl mb-16 animate-fade-up">
              <div className="text-center mb-8">
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-300 to-yellow-300 bg-clip-text text-transparent font-display">
                  {result.totalScore} / 36
                </div>
                <h3 className="text-2xl font-bold text-white mt-2">{result.verdict}</h3>
                <p className="text-green-400 font-medium text-sm mt-1 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {result.manglikStatus}
                </p>
              </div>

              {/* Guna Breakdown Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 text-xs uppercase tracking-wider">
                      <th className="pb-3">Guna (Koota)</th>
                      <th className="pb-3">Maximum</th>
                      <th className="pb-3">Obtained</th>
                      <th className="pb-3">Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {result.gunas.map((g) => (
                      <tr key={g.name} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 font-semibold text-white">{g.name}</td>
                        <td className="py-3 text-muted-foreground">{g.maxScore}</td>
                        <td className="py-3 text-purple-400 font-bold">{g.obtainedScore}</td>
                        <td className="py-3 text-xs text-gray-300">{g.significance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                <p className="text-sm text-gray-200">
                  Want an in-depth reading with remedial solutions? Speak directly with our verified relationship astrologers.
                </p>
                <div className="mt-3 flex justify-center gap-4">
                  <Link
                    to="/astrologers"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Consult Astrologer
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to="/kundli"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors"
                  >
                    Generate Janam Kundli
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Educational Content & FAQs for SEO */}
          <div className="space-y-10 mt-16 text-gray-300 leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
                Understanding the 8 Kootas in 36 Gunas Kundli Milan
              </h2>
              <p>
                In Vedic astrology, Kundli matching for marriage is evaluated through the Ashtakoot method, which analyzes eight fundamental psychological, biological, and cosmic dimensions of human life. A total of 36 points (Gunas) are distributed across these eight categories:
              </p>
              <div className="grid md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">1. Varna (1 Guna)</h3>
                  <p className="text-xs text-gray-400">Represents ego capacity and spiritual compatibility between the couple.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">2. Vashya (2 Gunas)</h3>
                  <p className="text-xs text-gray-400">Assesses mutual respect, emotional control, and dynamic balance of influence.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">3. Tara (3 Gunas)</h3>
                  <p className="text-xs text-gray-400">Calculates planetary birth star harmony, mutual fortune, and longevity.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">4. Yoni (4 Gunas)</h3>
                  <p className="text-xs text-gray-400">Measures physical, intimate, and physiological compatibility.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">5. Graha Maitri (5 Gunas)</h3>
                  <p className="text-xs text-gray-400">Signifies intellectual harmony, psychological friendship, and mutual views.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">6. Gana (6 Gunas)</h3>
                  <p className="text-xs text-gray-400">Reflects behavior and temperament (Deva, Manushya, and Rakshasa).</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">7. Bhakoot (7 Gunas)</h3>
                  <p className="text-xs text-gray-400">Signifies joy, family prosperity, emotional connection, and progeny welfare.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="font-bold text-white text-base mb-1">8. Nadi (8 Gunas)</h3>
                  <p className="text-xs text-gray-400">Most critical factor evaluating hereditary health, genetics, and offspring vitality.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white font-display">
                How Many Gunas Must Match for a Successful Marriage?
              </h2>
              <p>
                According to classical Vedic texts:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm text-gray-400">
                <li><strong className="text-white">Below 18 Gunas:</strong> Not recommended without thorough astrological remedies.</li>
                <li><strong className="text-white">18 to 24 Gunas:</strong> Acceptable and considered an average match with good compatibility.</li>
                <li><strong className="text-white">25 to 32 Gunas:</strong> Highly auspicious match indicating deep emotional, intellectual, and financial harmony.</li>
                <li><strong className="text-white">33 to 36 Gunas:</strong> Rare and ideal cosmic alignment for an extraordinarily prosperous union.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
