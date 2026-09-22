import React from 'react';
import { FileText, AlertTriangle, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';

export default function Terms() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" }
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.terms.title}
        description={pageSeoConfig.terms.description}
        canonical={pageSeoConfig.terms.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Scale className="w-3.5 h-3.5" />
              Terms & Conditions
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              Terms of Service & Astrological Disclaimer
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: September 2026 • Please read carefully before using AstroNest
            </p>
          </div>

          <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
            {/* Critical Disclaimer Banner */}
            <div className="p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-200">
              <h2 className="text-base font-bold text-yellow-400 flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                Mandatory Astrological Guidance Disclaimer
              </h2>
              <p className="text-xs leading-relaxed">
                All Janam Kundli charts, horoscope predictions, marriage compatibility analyses (Gun Milan), numerology readings, and AI/astrologer consultations available on AstroNest (https://astronest.in) are interpretive opinions derived from traditional Vedic principles and computational models. They are intended strictly for educational, personal introspection, and spiritual guidance purposes.
              </p>
              <p className="text-xs leading-relaxed mt-2 font-semibold">
                Astrological guidance is NOT a substitute for professional medical diagnosis, mental health treatment, legal counsel, or certified financial advice. AstroNest does not claim or guarantee 100% predictive certainty.
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">1. Acceptance of Terms</h2>
              <p>
                By accessing or using AstroNest, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">2. User Eligibility & Accurate Information</h2>
              <p>
                To utilize our personalized Kundli and horoscope calculations, you must provide accurate birth information (date, time, and geographic location). AstroNest is not responsible for inaccurate calculations resulting from erroneous user input.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">3. Astrologer Consultations and Payments</h2>
              <p>
                AstroNest offers both free automated tools and premium live consultations with independent astrologers. By initiating a paid consultation:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-xs md:text-sm text-gray-400">
                <li>You authorize our payment partner (Razorpay) to charge the designated fee.</li>
                <li>All fees are clearly displayed in Indian Rupees (INR) prior to payment confirmation.</li>
                <li>Consultation sessions are billed per minute or per session as stated on the astrologer profile.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">4. Refund and Cancellation Policy</h2>
              <p>
                Due to the immediate digital nature of astrological computations and time-allocated astrologer consultations, fees paid for completed services are non-refundable. If a session is interrupted due to technical failures on our servers, please contact <a href="mailto:support@astronest.in" className="text-purple-400 hover:underline">support@astronest.in</a> within 48 hours for session credit or refund review.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">5. Intellectual Property Rights</h2>
              <p>
                All proprietary algorithms, UI designs, logos, 3D animations, software code, and educational content on AstroNest are the intellectual property of AstroNest. You may not scrape, reproduce, reverse engineer, or redistribute our materials without explicit prior written authorization.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">6. Limitation of Liability</h2>
              <p>
                Under no circumstances shall AstroNest, its developers, astrologers, or partners be liable for any direct, indirect, incidental, or consequential damages resulting from your interpretation or reliance upon astrological guidance obtained through this platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">7. Governing Law & Dispute Resolution</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any legal disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in Gujarat, India.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">8. Contact Information</h2>
              <p>
                For questions regarding these Terms of Service:<br />
                <span className="text-purple-400 font-semibold">Email: support@astronest.in</span><br />
                Website: https://astronest.in/
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
