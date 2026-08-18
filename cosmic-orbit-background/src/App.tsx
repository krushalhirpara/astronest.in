import React, { useState, useEffect } from 'react';
import { CosmicCanvas } from './components/CosmicCanvas';
import { ControlsOverlay } from './components/ControlsOverlay';
import { PlanetCard } from './components/PlanetCard';
import { CodeExportModal } from './components/CodeExportModal';
import { CosmicSettings } from './types';
import { spaceSoundEngine } from './utils/spaceAudio';

export default function App() {
  const [settings, setSettings] = useState<CosmicSettings>({
    isPlaying: true,
    speedMultiplier: 1.0,
    showOrbitLines: true,
    showLabels: true,
    showDustDisk: true,
    showSolarFlares: true,
    cameraPreset: 'reference', // Matches uploaded image perspective by default
    selectedPlanetId: null,
    ambientSound: false,
    volume: 0.5,
    cameraTilt: 32,
    cameraDistance: 95,
    autoRotateCamera: true,
  });

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Sync ambient audio engine with sound state
  useEffect(() => {
    spaceSoundEngine.toggle(settings.ambientSound, settings.volume);
  }, [settings.ambientSound, settings.volume]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setSettings((s) => ({ ...s, isPlaying: !s.isPlaying }));
      } else if (e.code === 'Escape') {
        setSettings((s) => ({ ...s, selectedPlanetId: null }));
        setIsCodeModalOpen(false);
      } else if (e.code === 'KeyM') {
        setSettings((s) => ({ ...s, ambientSound: !s.ambientSound }));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPlanet = (planetId: string | null) => {
    setSettings((s) => ({ ...s, selectedPlanetId: planetId }));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#020208] font-sans antialiased">
      {/* 3D WebGL Solar System Canvas */}
      <CosmicCanvas settings={settings} onSelectPlanet={handleSelectPlanet} />

      {/* Interactive Controls Overlay Panel */}
      <ControlsOverlay
        settings={settings}
        onUpdateSettings={setSettings}
        onOpenCodeExport={() => setIsCodeModalOpen(true)}
        onSelectPlanet={handleSelectPlanet}
      />

      {/* Selected Planet Details Glassmorphism Card */}
      <PlanetCard
        selectedPlanetId={settings.selectedPlanetId}
        onClose={() => handleSelectPlanet(null)}
      />

      {/* Code Export Modal */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
