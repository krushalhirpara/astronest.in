import React from 'react';
import { Sparkles, Shield, Heart, Award, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema, getOrganizationSchema } from '@/seo/structuredData';

export default function About() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" }
  ];

  const structuredData = [
    getBreadcrumbSchema(breadcrumbs),
    getOrganizationSchema()
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.about.title}
        description={pageSeoConfig.about.description}
        canonical={pageSeoConfig.about.canonical}
        structuredData={structuredData}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Our Cosmic Mission
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              About AstroNest
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Where ancient Vedic wisdom converges with modern AI. We empower individuals worldwide with authentic, accessible, and mathematically rigorous astrological guidance.
            </p>
          </div>

          {/* Core Story */}
          <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 mb-16 leading-relaxed space-y-6 text-gray-300">
            <h2 className="text-2xl font-bold text-white font-display">Bridging Ancient Jyotish & Modern Technology</h2>
            <p>
              For over five millennia, the sages of ancient India observed celestial cycles and synthesized the profound science of Jyotish (the "Science of Light"). Classical texts such as the <em>Brihat Parashara Hora Shastra</em> and <em>Surya Siddhanta</em> established intricate mathematical algorithms to calculate exact planetary movements, Ascendants, and predictive Dasha timelines.
            </p>
            <p>
              However, in the modern era, accessing authentic Vedic insights often involves cumbersome manual calculations or generic, impersonal horoscopes. AstroNest was founded to solve this problem: combining authentic astronomical sidereal algorithms with cutting-edge artificial intelligence to deliver precise, instantaneous, and deeply personalized astrological insights.
            </p>
            <p>
              Whether you are generating your free Janam Kundli, analyzing marriage compatibility through 36 Guna Milan, exploring daily planetary transits, or consulting with our verified astrologers, AstroNest maintains the highest standards of astrological precision and data confidentiality.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl glass border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">100% Confidentiality</h3>
              <p className="text-xs text-gray-400">
                Your birth time, date, place, and personal queries are encrypted with enterprise-grade security. We never sell or share user data.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Authentic Calculation</h3>
              <p className="text-xs text-gray-400">
                Calculations strictly follow established Vedic principles (Lahiri Ayanamsha, Vimshottari Dasha, and Ashtakoot Milan).
              </p>
            </div>

            <div className="p-6 rounded-3xl glass border border-white/10 text-center">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Verified Astrologers</h3>
              <p className="text-xs text-gray-400">
                Every consulting astrologer on our platform undergoes a multi-tier vetting process for astrological knowledge and ethical counseling.
              </p>
            </div>
          </div>

          {/* Astrological Ethics Disclaimer */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-400 leading-relaxed mb-12">
            <h4 className="font-bold text-white text-sm mb-1 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              Our Ethical Astrological Commitment
            </h4>
            AstroNest adheres to responsible, people-first astrology. We believe that astrology serves as a navigational compass for self-reflection and empowerment—not deterministic fatalism. We strictly discourage superstition, fear-based remedies, or unsubstantiated guarantees.
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              to="/kundli"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-purple-500/30 hover:scale-105 transition-all"
            >
              Explore Your Kundli Today
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
