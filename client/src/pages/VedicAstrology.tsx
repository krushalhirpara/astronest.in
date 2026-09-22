import React from 'react';
import { Sparkles, Sun, Moon, Compass, Star, BookOpen, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema, getArticleSchema } from '@/seo/structuredData';

const houses = [
  { num: 1, name: "Tanu Bhava", meaning: "House of Self", desc: "Physical body, vitality, appearance, childhood, personality, and overall life path." },
  { num: 2, name: "Dhana Bhava", meaning: "House of Wealth", desc: "Liquid assets, speech, immediate family, vocal expressions, and dietary habits." },
  { num: 3, name: "Sahaja Bhava", meaning: "House of Siblings", desc: "Courage, communication, short travels, younger siblings, and creative endeavors." },
  { num: 4, name: "Sukha Bhava", meaning: "House of Home & Mother", desc: "Mother, inner peace, land, vehicles, domestic happiness, and ancestral heritage." },
  { num: 5, name: "Putra Bhava", meaning: "House of Intellect & Progeny", desc: "Children, creativity, romantic pursuits, higher knowledge, and Purva Punya (past karma)." },
  { num: 6, name: "Ari Bhava", meaning: "House of Health & Obstacles", desc: "Daily routines, debts, competitive strength, healing, and overcoming adversaries." },
  { num: 7, name: "Yuvati Bhava", meaning: "House of Marriage & Partnerships", desc: "Spouse, lifelong partnerships, legal contracts, business dealings, and public interactions." },
  { num: 8, name: "Randhra Bhava", meaning: "House of Transformation", desc: "Longevity, occult wisdom, inheritance, unexpected transformations, and spiritual awakening." },
  { num: 9, name: "Dharma Bhava", meaning: "House of Fortune & Truth", desc: "Higher learning, guru blessings, pilgrimage, long-distance journeys, and righteous living." },
  { num: 10, name: "Karma Bhava", meaning: "House of Career & Status", desc: "Professional achievements, reputation, societal impact, ambition, and leadership." },
  { num: 11, name: "Labha Bhava", meaning: "House of Gains & Aspirations", desc: "Financial gains, large social circles, elder siblings, fulfillment of desires, and community." },
  { num: 12, name: "Vyaya Bhava", meaning: "House of Liberation & Loss", desc: "Spiritual liberation (Moksha), foreign travels, subconscious realm, solitude, and philanthropy." },
];

const planets = [
  { name: "Surya (Sun)", symbol: "☉", role: "Atmakaraka - Soul, Vitality, Father, Authority, Government, and Self-Realization." },
  { name: "Chandra (Moon)", symbol: "☽", role: "Manas - Mind, Emotional Well-being, Mother, Perception, and Inner Memory." },
  { name: "Mangal (Mars)", symbol: "♂", role: "Courage, Ambition, Physical Energy, Real Estate, Brothers, and Tactical Strength." },
  { name: "Budha (Mercury)", symbol: "☿", role: "Intellect, Logic, Analytical Mind, Business, Communication, and Humor." },
  { name: "Guru (Jupiter)", symbol: "♃", role: "Wisdom, Higher Learning, Spiritual Expansion, Wealth, Children, and Divine Grace." },
  { name: "Shukra (Venus)", symbol: "♀", role: "Beauty, Romance, Arts, Refinement, Vehicles, Luxury, and Harmonious Relationships." },
  { name: "Shani (Saturn)", symbol: "♄", role: "Discipline, Karma, Perseverance, Time, Humility, Longevity, and Life Lessons." },
  { name: "Rahu (North Node)", symbol: "☊", role: "Cosmic Desire, Unconventional Breakthroughs, Worldly Ambition, and Digital Expansion." },
  { name: "Ketu (South Node)", symbol: "☋", role: "Spiritual Liberation, Detachment, Intuition, Occult Mastery, and Transcendent Knowledge." },
];

export default function VedicAstrology() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Vedic Astrology", url: "/vedic-astrology" }
  ];

  const structuredData = [
    getBreadcrumbSchema(breadcrumbs),
    getArticleSchema({
      title: pageSeoConfig.vedicAstrology.title,
      description: pageSeoConfig.vedicAstrology.description,
      url: "/vedic-astrology",
      datePublished: "2024-01-15T00:00:00+05:30",
      dateModified: "2026-09-22T00:00:00+05:30"
    })
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.vedicAstrology.title}
        description={pageSeoConfig.vedicAstrology.description}
        canonical={pageSeoConfig.vedicAstrology.canonical}
        structuredData={structuredData}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Foundations of Jyotish
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              The Complete Guide to Vedic Astrology
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base">
              Vedic Astrology (Jyotish, or "the Science of Light") is an ancient computational and spiritual science developed over 5,000 years ago in India. Learn how the 12 houses, 9 planets, and lunar mansions shape your life blueprint.
            </p>
          </div>

          {/* Core Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-3xl glass border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">12 Bhavas (Houses)</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                The 12 sectors of the sky at birth represent all domains of human experience: health, wealth, family, relationships, career, and spiritual evolution.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">9 Navagrahas (Planets)</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                The planetary forces are energetic lenses focusing cosmic frequencies, delivering karmic results through Dasha periods and current transits.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass border border-white/10 hover:border-purple-500/30 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">27 Nakshatras</h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                The sidereal lunar constellations provide fine-grained psychological nuance, determining innate temperament, hidden strengths, and destiny timings.
              </p>
            </div>
          </div>

          {/* 12 Houses Detailed Guide */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
                The 12 Houses in Vedic Astrology
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Each house (Bhava) in your Janam Kundli governs specific life dimensions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {houses.map((h) => (
                <div key={h.num} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-xs">
                      {h.num}
                    </span>
                    <div>
                      <h3 className="font-bold text-white text-sm">{h.name}</h3>
                      <p className="text-[11px] text-purple-400 font-medium">{h.meaning}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed pl-11">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 9 Navagrahas Detailed Guide */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-display">
                The 9 Navagrahas (Celestial Forces)
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                In Vedic Jyotish, planets are agents of cosmic karma that shape mental, physical, and worldly experiences.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {planets.map((p) => (
                <div key={p.name} className="p-5 rounded-2xl glass border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="text-2xl text-purple-400 font-bold mb-2">{p.symbol}</div>
                  <h3 className="font-bold text-white text-base mb-1">{p.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{p.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Tool Links */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 via-black to-pink-900/30 border border-white/15 text-center">
            <h2 className="text-2xl font-bold text-white font-display mb-3">
              Explore Your Personal Cosmic Blueprint
            </h2>
            <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6">
              Calculate your personal Lagna (Ascendant), Moon sign, and full planetary chart instantly with AstroNest's free Vedic calculation tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/kundli"
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/25 hover:scale-105 transition-all"
              >
                Generate Free Kundli
              </Link>
              <Link
                to="/kundli-matching"
                className="px-6 py-3 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Kundli Matching
              </Link>
              <Link
                to="/horoscope"
                className="px-6 py-3 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all"
              >
                Today's Horoscope
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
