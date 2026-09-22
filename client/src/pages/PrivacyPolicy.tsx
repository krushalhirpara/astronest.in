import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';

export default function PrivacyPolicy() {
  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" }
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.privacyPolicy.title}
        description={pageSeoConfig.privacyPolicy.description}
        canonical={pageSeoConfig.privacyPolicy.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              Your Privacy Matters
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              AstroNest Privacy Policy
            </h1>
            <p className="text-muted-foreground text-sm">
              Last updated: September 2026 • Effective Date: January 1, 2024
            </p>
          </div>

          <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                1. Introduction & Core Privacy Commitment
              </h2>
              <p>
                At AstroNest (accessible from <a href="https://astronest.in" className="text-purple-400 hover:underline">https://astronest.in</a>), we prioritize the confidentiality and security of our users' personal data. Astrological consultations require deeply personal details such as date, time, and location of birth. We handle this sacred information with utmost reverence and rigorous cryptographic security.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                2. Information We Collect
              </h2>
              <p>
                To provide accurate Vedic astronomical calculations and personalized horoscopes, we collect:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-xs md:text-sm text-gray-400">
                <li><strong className="text-white">Birth Data:</strong> Full Name, Date of Birth, Exact Time of Birth, and City/Country of Birth.</li>
                <li><strong className="text-white">Account Information:</strong> Email address and profile information provided during authentication.</li>
                <li><strong className="text-white">Consultation Queries:</strong> Chat messages and inquiries submitted to our AI chatbot or consulting astrologers.</li>
                <li><strong className="text-white">Technical Usage Data:</strong> IP address, browser type, device information, and interaction timestamps collected via Google Analytics to enhance platform speed and responsiveness.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" />
                3. How We Use Your Data
              </h2>
              <p>Your information is used strictly to:</p>
              <ul className="list-disc pl-6 space-y-1.5 text-xs md:text-sm text-gray-400">
                <li>Compute accurate planetary positions (Graha Sthiti), Lagna charts, and Dasha periods.</li>
                <li>Perform Ashtakoot Guna Milan compatibility calculations for marriage.</li>
                <li>Power personalized responses from our Vedic AI Chatbot.</li>
                <li>Process secure payment transactions through authorized gateways.</li>
              </ul>
              <p className="font-semibold text-purple-300">
                We strictly NEVER sell, rent, or monetize your birth details, names, or chat logs to any third-party marketing companies or data brokers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">4. Payment Processing Security</h2>
              <p>
                All online payments on AstroNest are handled exclusively by certified, PCI-DSS Level 1 compliant payment gateways (Razorpay). AstroNest does NOT store, process, or have access to your credit/debit card numbers, CVVs, UPI PINs, or net banking passwords.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">5. Cookies and Google Analytics</h2>
              <p>
                AstroNest uses standard session cookies to remember authentication sessions and user preferences (such as dark/light theme). We utilize Google Analytics (gtag.js) with anonymized IP tracking to monitor site stability and performance. You may disable cookies through your browser settings without losing access to basic horoscope features.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">6. Data Retention and Your Rights</h2>
              <p>
                You hold full ownership of your personal data. You may request deletion or export of your account and saved birth records at any time by contacting our privacy compliance team at <a href="mailto:support@astronest.in" className="text-purple-400 hover:underline">support@astronest.in</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-white">7. Contact Information</h2>
              <p>
                For any privacy questions or data protection requests:
              </p>
              <p className="text-purple-400">
                Email: support@astronest.in<br />
                Website: https://astronest.in/
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
