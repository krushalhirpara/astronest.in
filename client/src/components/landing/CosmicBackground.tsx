import { useMemo } from 'react';

export function CosmicBackground() {
  const stars = useMemo(() => {
    return [
      // Layer 1: Far, tiny stars
      ...Array.from({ length: 150 }, (_, i) => ({
        id: `s1-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 5,
        className: 'animate-twinkle'
      })),
      // Layer 2: Medium stars
      ...Array.from({ length: 50 }, (_, i) => ({
        id: `s2-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
        className: 'animate-twinkle'
      })),
      // Layer 3: Occasional bright stars
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `s3-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1.5,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 10,
        className: 'animate-pulse'
      })),
    ];
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden bg-slate-50 dark:bg-[#05010A] transition-colors duration-500">
      {/* Deep Space / Soft Light Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#F1F5F9_0%,#E2E8F0_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,#1A0F2E_0%,#05010A_100%)] opacity-70 dark:opacity-40" />
      
      {/* Premium Nebula Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-purple-300/30 dark:bg-purple-900/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-nebula-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-pink-300/20 dark:bg-pink-900/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-nebula-pulse" style={{ animationDelay: '-5s' }} />
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-300/20 dark:bg-indigo-900/10 blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-nebula-pulse" style={{ animationDelay: '-10s' }} />
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Star Field */}
      <div className="absolute inset-0 animate-cosmic-drift">
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
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(226,232,240,0.5)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(5,1,10,0.4)_100%)]" />
    </div>
  );
}
