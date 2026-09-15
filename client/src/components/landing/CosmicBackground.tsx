import React, { useMemo } from 'react';

export const CosmicBackground = React.memo(function CosmicBackground() {
  const stars = useMemo(() => {
    return [
      // Layer 1: Subtle background stars (50 stars)
      ...Array.from({ length: 50 }, (_, i) => ({
        id: `s1-${i}`,
        x: ((i * 23) % 100),
        y: ((i * 37) % 100),
        size: (i % 2) + 0.8,
        opacity: (i % 3 === 0 ? 0.3 : 0.15),
        duration: 3 + (i % 4),
        delay: (i % 5),
        className: 'animate-twinkle'
      })),
      // Layer 2: Medium glowing stars (20 stars)
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `s2-${i}`,
        x: ((i * 47 + 13) % 100),
        y: ((i * 61 + 7) % 100),
        size: (i % 2) + 1.5,
        opacity: 0.4 + (i % 3) * 0.1,
        duration: 4 + (i % 3),
        delay: (i % 4) * 1.5,
        className: 'animate-twinkle'
      })),
      // Layer 3: Accent bright stars (8 stars)
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `s3-${i}`,
        x: ((i * 71 + 29) % 100),
        y: ((i * 83 + 19) % 100),
        size: 2.5,
        opacity: 0.7,
        duration: 5,
        delay: i * 1.2,
        className: 'animate-pulse'
      })),
    ];
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-slate-50 dark:bg-[#05010A] transition-colors duration-500 will-change-transform" style={{ transform: 'translateZ(0)' }}>
      {/* Deep Space / Soft Light Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F1F5F9_0%,#E2E8F0_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,#1A0F2E_0%,#05010A_100%)] opacity-70 dark:opacity-40" />
      
      {/* Optimized Nebula Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-300/20 dark:bg-purple-900/15 blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-nebula-pulse" style={{ willChange: 'opacity, transform' }} />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-300/15 dark:bg-pink-900/10 blur-[70px] mix-blend-multiply dark:mix-blend-screen animate-nebula-pulse" style={{ animationDelay: '-5s', willChange: 'opacity, transform' }} />
      
      {/* Star Field */}
      <div className="absolute inset-0 animate-cosmic-drift" style={{ willChange: 'transform' }}>
        {stars.map((s) => (
          <div
            key={s.id}
            className={`absolute rounded-full bg-purple-600/40 dark:bg-white ${s.className}`}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              contain: 'layout style paint',
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(226,232,240,0.5)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,1,10,0.4)_100%)]" />
    </div>
  );
});

