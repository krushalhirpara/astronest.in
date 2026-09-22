import React, { useEffect, useState } from 'react';
import { Bot, Send, Sparkles, Lock, Loader2 } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useAuth } from '@/hooks/useAuth';
import { Seo } from '@/seo/Seo';
import { pageSeoConfig } from '@/seo/seoConfig';
import { getBreadcrumbSchema } from '@/seo/structuredData';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

const Chatbot = () => {
  const { user, isLoading } = useAuth();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am your Astro AI assistant. How can I help you navigate the stars today?' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "AI Astro Chatbot", url: "/chatbot" }
  ];

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage = { role: 'user', content: inputText };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      const systemPrompt = `You are a professional Vedic astrologer AI.
            
            Rules:
            - Always give astrology-based answers (kundli, planets, zodiac, dasha, etc.)
            - Never give generic replies like "I am analyzing"
            - Always give a meaningful, confident answer
            
            Language Rules:
            - Reply in the SAME language as user input
            - If user writes Gujarati -> reply in Gujarati
            - If Hindi -> Hindi
            - If English -> English
            
            Style:
            - Friendly but expert tone
            - Short + clear + insightful
            - Add prediction + suggestion
            
            If user gives DOB or personal info -> give more personalized answer
            
            Never say:
            - "I am just AI"
            - "I cannot predict"`;

      const response = await fetch(`${BACKEND_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: inputText,
          history: messages.map(msg => ({ role: msg.role as "user" | "assistant", content: msg.content })),
          systemPrompt
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to connect to the cosmos');

      const botReply = data.reply || "The stars are silent right now. Please try again.";
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Apologies, the cosmic connection was interrupted. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };


  if (isLoading) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Seo
        title={pageSeoConfig.chatbot.title}
        description={pageSeoConfig.chatbot.description}
        canonical={pageSeoConfig.chatbot.canonical}
        structuredData={[getBreadcrumbSchema(breadcrumbs)]}
      />
      <div className="min-h-screen bg-background flex items-center justify-center p-4 pt-28 pb-12">
      <div className="w-full max-w-[700px]">
        <div className="glass rounded-3xl overflow-hidden flex flex-col h-[80vh] shadow-glow">
          {/* Chat Header */}
          <div className="bg-white/5 p-6 border-b border-white/10 flex items-center gap-4">
            <div className="bg-cosmic p-2 rounded-xl">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Astro AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Online • Powered by Vedic Knowledge</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-purple-500' : 'bg-cosmic'}`}>
                  {msg.role === 'user' ? <Sparkles className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] border border-white/10 ${
                  msg.role === 'user' 
                    ? 'bg-purple-500/10 rounded-tr-none' 
                    : 'bg-white/5 rounded-tl-none'
                }`}>
                  <p className="text-white text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-cosmic flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/10">
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-6 bg-white/5 border-t border-white/10">
            <div className="relative">
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your horoscope, kundli, or life events..."
                className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping}
                className={`absolute right-2 top-2 bottom-2 bg-cosmic px-4 rounded-xl text-white transition-all ${isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Chatbot;
