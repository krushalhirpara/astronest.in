import React, { useState } from 'react';
import { X, Copy, Check, Code2, Terminal, BookOpen } from 'lucide-react';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'react' | 'html'>('react');

  if (!isOpen) return null;

  const reactCodeSnippet = `import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// 3D Solar System Animated Background Component
export const CosmicBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 55, 95);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Sun & Lights
    const sunLight = new THREE.PointLight(0xfffae6, 3, 300);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x333355, 0.8));

    const sunGeo = new THREE.SphereGeometry(6, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Planets
    const planetData = [
      { name: 'Mercury', radius: 0.8, orbitX: 12, orbitZ: 9, color: 0xa8a5a0, speed: 0.02 },
      { name: 'Venus', radius: 1.4, orbitX: 18, orbitZ: 14, color: 0xe3bb76, speed: 0.015 },
      { name: 'Earth', radius: 1.6, orbitX: 25, orbitZ: 20, color: 0x2b82c5, speed: 0.012 },
      { name: 'Mars', radius: 1.1, orbitX: 32, orbitZ: 25, color: 0xc85a32, speed: 0.009 },
      { name: 'Jupiter', radius: 3.5, orbitX: 43, orbitZ: 34, color: 0xd4a373, speed: 0.006 },
      { name: 'Saturn', radius: 2.9, orbitX: 55, orbitZ: 43, color: 0xe2c08d, speed: 0.004 },
    ];

    const planets = planetData.map((p) => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.radius, 32, 32),
        new THREE.MeshStandardMaterial({ color: p.color })
      );
      scene.add(mesh);
      return { mesh, ...p, angle: Math.random() * Math.PI * 2 };
    });

    // Animation Loop
    let reqId: number;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      planets.forEach((p) => {
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitX;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitZ;
        p.mesh.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 bg-[#020208]" />;
};`;

  const htmlCodeSnippet = `<!DOCTYPE html>
<html lang="gu">
<head>
  <meta charset="UTF-8">
  <title>Cosmic Solar System Background</title>
  <style>
    body, html { margin: 0; padding: 0; overflow: hidden; background: #020208; }
    #canvas-container { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="canvas-container"></div>
  <script>
    const container = document.getElementById('canvas-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 55, 95);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const sunLight = new THREE.PointLight(0xfffae6, 3, 300);
    scene.add(sunLight);
    scene.add(new THREE.AmbientLight(0x333355, 0.8));

    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(6, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xffaa00 })
    );
    scene.add(sun);

    const planetsData = [
      { radius: 0.8, orbitX: 12, orbitZ: 9, color: 0xa8a5a0, speed: 0.02 },
      { radius: 1.4, orbitX: 18, orbitZ: 14, color: 0xe3bb76, speed: 0.015 },
      { radius: 1.6, orbitX: 25, orbitZ: 20, color: 0x2b82c5, speed: 0.012 },
      { radius: 1.1, orbitX: 32, orbitZ: 25, color: 0xc85a32, speed: 0.009 },
      { radius: 3.5, orbitX: 43, orbitZ: 34, color: 0xd4a373, speed: 0.006 },
      { radius: 2.9, orbitX: 55, orbitZ: 43, color: 0xe2c08d, speed: 0.004 }
    ];

    const planets = planetsData.map(p => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(p.radius, 32, 32),
        new THREE.MeshStandardMaterial({ color: p.color })
      );
      scene.add(mesh);
      return { mesh, ...p, angle: Math.random() * Math.PI * 2 };
    });

    function animate() {
      requestAnimationFrame(animate);
      planets.forEach(p => {
        p.angle += p.speed;
        p.mesh.position.x = Math.cos(p.angle) * p.orbitX;
        p.mesh.position.z = Math.sin(p.angle) * p.orbitZ;
      });
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>`;

  const currentSnippet = activeTab === 'react' ? reactCodeSnippet : htmlCodeSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-950 border border-white/20 rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">કોડ મેળવો (Get Animation Code)</h3>
              <p className="text-xs text-gray-400">તમારી વેબસાઇટમાં આ યુનિવર્સલ એનિમેટેડ બેકગ્રાઉન્ડ ઉમેરો</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Instructions & Selector */}
        <div className="p-4 bg-slate-900/60 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('react')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                activeTab === 'react' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" /> React + Three.js
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                activeTab === 'html' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" /> HTML + JS Canvas
            </button>
          </div>

          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> કોપી થઈ ગયું! (Copied)
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> કોડ કોપી કરો (Copy Code)
              </>
            )}
          </button>
        </div>

        {/* Code View */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-slate-950/90 text-amber-200/90 leading-relaxed scrollbar-thin">
          <pre className="whitespace-pre-wrap break-all">{currentSnippet}</pre>
        </div>

        {/* Gujarati Usage Notes */}
        <div className="p-4 bg-amber-500/10 border-t border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong>માર્ગદર્શન:</strong> આ કોડને તમારા પ્રોજેક્ટની મુખ્ય ફાઇલમાં મુકો અને <code className="bg-amber-400/20 px-1 py-0.5 rounded text-amber-300">position: fixed</code> સાથે બેકગ્રાઉન્ડ સેટ કરો. ગ્રહો અને સૂર્ય તેમની પોતાની કક્ષામાં ફરતા રહેશે.
          </p>
        </div>
      </div>
    </div>
  );
};
