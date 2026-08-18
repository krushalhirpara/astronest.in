import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearch } from '@tanstack/react-router';
import { Send, ArrowLeft, MoreVertical, ShieldCheck, Sparkles, Lock, Loader2, Globe, Languages } from 'lucide-react';
import { getAstrologerBySlug } from '@/lib/astrologerData';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
];

export const Chat = () => {
  const { name } = useParams({ from: '/chat/$name' });
  const search = useSearch({ from: '/chat/$name' });
  const astrologer = getAstrologerBySlug(name);
  const { user, isLoading } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [selectedLang, setSelectedLang] = useState('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!astrologer) return;

    const checkAuthorization = () => {
      if (!astrologer.isPaid) {
        setIsAuthorized(true);
        return;
      }

      const hasPaid = sessionStorage.getItem(`paid_${astrologer.id}`) === 'true' || (search as any).paid === true;
      setIsAuthorized(hasPaid);
    };

    checkAuthorization();
  }, [astrologer, name, search]);

  useEffect(() => {
    if (isAuthorized && astrologer && messages.length === 0) {
      setMessages([
        { 
          id: 1, 
          text: `Namaste! I am ${astrologer.name}. To provide you with accurate Vedic insights regarding your ${astrologer.specialization.toLowerCase()}, I will need your birth details (Date, Time, and Place of birth). How can I assist you today?`, 
          sender: 'ai', 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }
      ]);
    }
  }, [isAuthorized, astrologer, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const sendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const textToSend = inputText.trim();
    if (!textToSend || !isAuthorized || !user) return;

    const userMessage = {
      id: Date.now(),
      text: textToSend,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      lang: selectedLang
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulated Auto-Detection & Translation logic
    const hasHindi = /[\u0900-\u097F]/.test(textToSend);
    const hasGujarati = /[\u0A80-\u0AFF]/.test(textToSend);
    
    if (hasHindi && selectedLang !== 'hi') {
      toast.info("Detected Hindi. Switching to Hindi for better insights.");
      setSelectedLang('hi');
    } else if (hasGujarati && selectedLang !== 'gu') {
      toast.info("Detected Gujarati. Switching to Gujarati.");
      setSelectedLang('gu');
    }

    // Simulate AI Response with "Translation"
    setTimeout(() => {
      let replyText = "The celestial bodies indicate a positive shift in your energy. I am analyzing your charts now.";
      
      const currentLang = hasHindi ? 'hi' : hasGujarati ? 'gu' : selectedLang;

      if (currentLang === 'hi') {
        replyText = "आकाशीय पिंड आपकी ऊर्जा में सकारात्मक बदलाव का संकेत दे रहे हैं। मैं अभी आपके चार्ट का विश्लेषण कर रहा हूँ।";
      } else if (currentLang === 'gu') {
        replyText = "આકાશી પદાર્થો તમારી ઉર્જામાં સકારાત્મક પરિવર્તન સૂચવે છે. હું અત્યારે તમારા ચાર્ટનું વિશ્લેષણ કરી રહ્યો છું.";
      } else if (currentLang === 'ta') {
        replyText = "விண்வெளிப் பொருட்கள் உங்கள் ஆற்றலில் நேர்மறையான மாற்றத்தைக் காட்டுகின்றன. நான் இப்போது உங்கள் விளக்கப்படங்களை ஆய்வு செய்கிறேன்.";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: replyText,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        lang: currentLang
      }]);
      setIsTyping(false);
    }, 2000);
  };

  if (isLoading || isAuthorized === null) {
    return <div className="h-screen bg-background flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
    </div>;
  }

  if (!user) {
    return (
      <div className="pt-24 h-screen flex flex-col items-center justify-center bg-background text-white p-6">
        <div className="glass p-12 rounded-[40px] border border-white/10 text-center max-w-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32 text-purple-500" />
          </div>
          <div className="w-20 h-20 bg-cosmic/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 font-display">Authentication Required</h2>
          <p className="text-muted-foreground mb-8">
            Please log in or create an account to start your personalized consultation.
          </p>
          <div className="flex flex-col gap-4">
            <Link
              to="/login"
              className="w-full py-4 bg-cosmic text-white rounded-2xl font-bold shadow-glow hover:scale-105 transition-all text-center"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/10 transition-all text-center"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!astrologer) {
    return (
      <div className="pt-24 h-screen flex flex-col items-center justify-center bg-background text-white">
        <h2 className="text-2xl font-bold mb-4">Astrologer Not Found</h2>
        <Link to="/" className="text-purple-400 hover:underline">Return Home</Link>
      </div>
    );
  }

  if (isAuthorized === false) {
    return (
      <div className="pt-24 h-screen flex flex-col items-center justify-center bg-background text-white p-6">
        <div className="glass p-12 rounded-[40px] border border-red-500/30 text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-8">
            This astrologer requires a paid consultation. Please return to the experts page to book a session.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-cosmic text-white rounded-2xl font-bold shadow-glow hover:scale-105 transition-all"
          >
            Go to Experts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen flex flex-col bg-[#0F0F1F]">
      <div className="container mx-auto max-w-4xl flex-grow flex flex-col p-2 md:p-6 overflow-hidden">
        {/* Chat Header */}
        <div className="glass rounded-t-[32px] p-4 border border-white/10 flex items-center justify-between relative z-50">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="relative">
              <img src={astrologer.image} alt={astrologer.name} className="w-12 h-12 rounded-full object-cover border border-purple-500/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0F0F1F]"></div>
            </div>
            <div>
              <h2 className="text-white font-bold text-sm md:text-base flex items-center gap-1.5">
                {astrologer.name}
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              </h2>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">{astrologer.specialization}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                <Languages className="w-3.5 h-3.5" />
                {languages.find(l => l.code === selectedLang)?.name}
              </button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-[#1A1A2E] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setShowLangMenu(false);
                        toast.success(`Language set to ${lang.name}`);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-[10px] font-bold text-left hover:bg-white/5 transition-colors uppercase tracking-widest",
                        selectedLang === lang.code ? "text-purple-400 bg-purple-500/5" : "text-gray-400"
                      )}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="p-2 text-muted-foreground hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message List */}
        <div
          ref={scrollRef}
          className="flex-grow glass border-x border-white/5 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-hide bg-black/20"
        >
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-3xl relative shadow-lg ${msg.sender === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-tr-none'
                  : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                }`}>
                <p className="text-sm leading-relaxed font-poppins">{msg.text}</p>
                <div className="flex items-center justify-between mt-2 opacity-50">
                   <span className="text-[9px] uppercase tracking-tighter">
                     {msg.sender === 'user' ? 'Sent' : 'Replied'}
                   </span>
                   <span className="text-[9px]">{msg.time}</span>
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 p-4 rounded-3xl rounded-tl-none flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-duration:0.8s]"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form
          onSubmit={sendMessage}
          className="glass rounded-b-[32px] p-3 md:p-4 border border-white/10 flex items-center gap-3 relative z-20"
        >
          <div className="flex-grow relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type in ${languages.find(l => l.code === selectedLang)?.name}...`}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all pr-12"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-400/30">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
