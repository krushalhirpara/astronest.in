import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  // Generate cosmic stars for dark background
  const stars = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-hidden bg-[#05010A] text-white font-poppins pt-28 pb-12">
      {/* Dark Cosmic Background Nebulas */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-900/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-900/25 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-indigo-900/20 blur-[130px] pointer-events-none" />

      {/* Circular Cosmic Orbits */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-purple-500/10 animate-spin-slow pointer-events-none" style={{ animationDuration: '60s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-pink-500/10 animate-spin-slow pointer-events-none" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />

      {/* Twinkling stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-purple-300 animate-twinkle"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Auth Card wrapper */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-[420px] relative group">
          {/* Card Outer Glow Ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-[28px] blur-xl opacity-70 transition duration-1000 group-hover:opacity-100 -z-10" />

          {/* Form Card */}
          <div className="w-full bg-black/60 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(168,85,247,0.2)] rounded-[26px] p-8 md:p-10 relative overflow-hidden animate-fade-up text-white">
            
            {/* Cosmic sparkle at top */}
            <div className="flex justify-center mb-4">
              <span className="text-xl animate-pulse">✨</span>
            </div>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
