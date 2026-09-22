import React, { useState } from 'react';
import { Mail, MessageCircle, Clock, MapPin, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Contact Us", url: "/contact" }
  ];

  return (
    <>
      <Seo
        title={pageSeoConfig.contact.title}
        description={pageSeoConfig.contact.description}
        canonical={pageSeoConfig.contact.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />

      <div className="pt-28 pb-24 min-h-screen bg-background text-foreground font-poppins">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-4">
              <Mail className="w-3.5 h-3.5" />
              Get in Touch
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display mb-4">
              Contact AstroNest
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Have questions about your Janam Kundli, consultation bookings, or payment support? Our team is here to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-8 mb-16">
            {/* Info Cards */}
            <div className="md:col-span-5 space-y-4">
              <div className="glass p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Email Support</h3>
                    <p className="text-xs text-gray-400">Response within 24 hours</p>
                  </div>
                </div>
                <a href="mailto:support@astronest.in" className="text-sm text-purple-400 font-semibold hover:underline block pl-13">
                  support@astronest.in
                </a>
              </div>

              <div className="glass p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Operational Hours</h3>
                    <p className="text-xs text-gray-400">Consultation & Customer Care</p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 pl-13">
                  Monday – Sunday: 9:00 AM – 9:00 PM IST<br />
                  AI Chatbot: Available 24/7
                </p>
              </div>

              <div className="glass p-6 rounded-3xl border border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Instant AI Astrologer</h3>
                    <p className="text-xs text-gray-400">No waiting time</p>
                  </div>
                </div>
                <p className="text-xs text-gray-300 pl-13 mb-3">
                  Ask astrological questions anytime with our intelligent AI Vedic assistant.
                </p>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="md:col-span-7">
              <div className="glass p-6 md:p-8 rounded-3xl border border-white/10">
                {submitted ? (
                  <div className="text-center py-12 space-y-3">
                    <CheckCircle2 className="w-14 h-14 text-green-400 mx-auto" />
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-xs text-gray-300 max-w-sm mx-auto">
                      Thank you for contacting AstroNest. Our customer support team will get back to you at {form.email} within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-bold text-white mb-4">Send Us a Message</h3>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Krushal Hirpara"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="e.g. Kundli Question / Consultation Query"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Your Message</label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="How can we assist you with your cosmic inquiries?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                      Send Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
