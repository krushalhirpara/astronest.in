import React, { useState } from 'react';
import { Star, MessageCircle, ShieldCheck, Sparkles, Lock, CreditCard } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { cn } from '@/lib/utils';
import { astrologers, categories, Astrologer } from '@/lib/astrologerData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/AuthModal";

export const AIAstrologers = () => {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const navigate = useNavigate();

  const filteredAstrologers = activeCategory === 'All'
    ? astrologers
    : astrologers.filter(a => a.category === activeCategory);

  const handleChatClick = (astrologer: Astrologer) => {
    const action = () => {
      if (astrologer.isPaid) {
        setSelectedAstrologer(astrologer);
        setIsPaymentOpen(true);
      } else {
        navigate({
          to: '/chat/$name',
          params: { name: astrologer.id }
        });
      }
    };

    if (!user) {
      setPendingAction(() => action);
      setIsAuthOpen(true);
    } else {
      action();
    }
  };

  const handlePaymentComplete = () => {
    if (selectedAstrologer) {
      setIsPaymentOpen(false);
      // Simulate payment by adding a flag in sessionStorage or search param
      sessionStorage.setItem(`paid_${selectedAstrologer.id}`, 'true');
      navigate({
        to: '/chat/$name',
        params: { name: selectedAstrologer.id },
        search: { paid: true }
      });
    }
  };

  return (
    <section className="py-10 md:py-14 relative font-poppins" id="astrologers">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 dark:border-white/10 text-purple-700 dark:text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>24/7 Available Experts</span>
          </div>
          <h2 className="heading-astro text-center text-4xl md:text-6xl font-bold max-w-4xl mx-auto leading-[1.2] bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
            India's Top Vedic Astrologers
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 max-w-xl mx-auto text-base font-poppins leading-relaxed">
            Consult with our verified experts, masters of ancient Vedic wisdom and modern predictive techniques.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border",
                  activeCategory === category
                    ? "bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white border-transparent shadow-lg shadow-purple-500/20 scale-105"
                    : "bg-white dark:bg-white/5 text-slate-700 dark:text-gray-400 border-purple-100 dark:border-white/10 hover:border-purple-500/40 hover:text-purple-700 dark:hover:text-white shadow-sm dark:shadow-none"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredAstrologers.map((astrologer) => (
            <div
              key={astrologer.id}
              className="group relative bg-white dark:bg-white/5 backdrop-blur-md rounded-3xl border border-purple-100 dark:border-white/10 shadow-md dark:shadow-none overflow-hidden transition-all duration-500 hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1.5 flex flex-col"
            >
              {/* Profile Image & Online Indicator */}
              <div className="relative aspect-square overflow-hidden p-3 pb-0">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={astrologer.image}
                    alt={astrologer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 dark:from-black/80 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Online Indicator */}
                {astrologer.online && (
                  <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-slate-900/80 dark:bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-green-500/30">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-[9px] font-bold text-green-400 uppercase tracking-widest">Online</span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute bottom-2 left-5 flex items-center gap-1 bg-slate-900/80 dark:bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/20 dark:border-white/10">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-[10px] font-bold text-white">{astrologer.rating}</span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 pt-3 flex flex-col flex-grow">
                <div className="mb-2">
                  <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white font-heading tracking-wide line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {astrologer.name}
                  </h3>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest truncate">
                    {astrologer.specialization}
                  </p>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-gray-400">
                    <ShieldCheck className="w-3 h-3 text-purple-600 dark:text-purple-500" />
                    <span>{astrologer.experience} Exp</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-gray-400">
                    <MessageCircle className="w-3 h-3 text-purple-600 dark:text-purple-500" />
                    <span className="truncate">{astrologer.languages.join(", ")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 dark:text-gray-400">
                    <Star className="w-3 h-3 text-purple-600 dark:text-purple-500" />
                    <span>{astrologer.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-500 dark:text-gray-500 uppercase font-bold tracking-widest">Price</span>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        ₹{astrologer.price && astrologer.price > 0 ? astrologer.price : 15}
                        <span className="text-[10px] text-slate-500 dark:text-gray-500 font-normal">/min</span>
                      </p>
                      <span className="text-[8px] font-bold text-green-600 dark:text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 whitespace-nowrap">
                        Intro Offer
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleChatClick(astrologer)}
                    className="flex-grow py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-[10px] uppercase tracking-widest transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
                  >
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="glass border-white/10 text-white max-w-md rounded-[32px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-2">Pricing & Details</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Book a premium consultation with {selectedAstrologer?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
              <div className="relative">
                <img
                  src={selectedAstrologer?.image}
                  alt={selectedAstrologer?.name}
                  className="w-20 h-20 rounded-full object-cover border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                />
                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0F0F1F]"></div>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-white">{selectedAstrologer?.name}</h4>
                <p className="text-xs text-purple-400 font-bold uppercase tracking-widest">{selectedAstrologer?.specialization}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>{selectedAstrologer?.rating} ({selectedAstrologer?.reviews.toLocaleString()} reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Consultation Fee</span>
                  <span className="text-[10px] text-purple-300">Charged per minute of chat</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-white">₹{selectedAstrologer?.price || 15}</span>
                  <span className="text-sm text-gray-500 ml-1">/min</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span className="text-[10px] text-gray-400">Secure Payment</span>
                </div>
                <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-purple-500" />
                  <span className="text-[10px] text-gray-400">Refund Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-center gap-3">
            <Button
              variant="ghost"
              onClick={() => setIsPaymentOpen(false)}
              className="rounded-xl border border-white/5 hover:bg-white/5 flex-1 h-12 text-gray-400"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePaymentComplete}
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-glow-purple text-white rounded-xl flex-[2] h-12 font-bold uppercase tracking-widest text-xs"
            >
              Pay and Chat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => {
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />
    </section>
  );
};
