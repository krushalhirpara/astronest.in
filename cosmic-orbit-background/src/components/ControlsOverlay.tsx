import React, { useState } from 'react';
import {
  Play,
  Pause,
  Eye,
  EyeOff,
  FastForward,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Code,
  Maximize2,
  Minimize2,
  Orbit,
  Tag,
  Sun,
  Disc,
  Compass,
} from 'lucide-react';
import { CosmicSettings } from '../types';
import { PLANETS } from '../data/planetsData';

interface ControlsOverlayProps {
  settings: CosmicSettings;
  onUpdateSettings: (updater: (prev: CosmicSettings) => CosmicSettings) => void;
  onOpenCodeExport: () => void;
  onSelectPlanet: (id: string | null) => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  settings,
  onUpdateSettings,
  onOpenCodeExport,
  onSelectPlanet,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'controls' | 'view' | 'planets'>('controls');

  const speedOptions = [
    { label: '0.2x', val: 0.2 },
    { label: '1.0x', val: 1.0 },
    { label: '2.5x', val: 2.5 },
    { label: '5.0x', val: 5.0 },
    { label: '⚡ Warp', val: 12.0 },
  ];

  return (
    <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex flex-col md:flex-row justify-between items-start gap-3">
      {/* Top Left Title Branding */}
      <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 px-4 shadow-2xl flex items-center justify-between gap-4 max-w-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-400 to-cyan-500 p-0.5 shadow-lg shadow-amber-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Orbit className="w-5 h-5 text-amber-300 animate-spin-slow" />
            </div>
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              Cosmic Solar Orbit <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono border border-amber-500/30">3D</span>
            </h1>
            <p className="text-[11px] text-gray-400">સૌરમંડળ એનિમેટેડ બેકગ્રાઉન્ડ (Universal Space Animation)</p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition"
          title={isCollapsed ? 'Show Controls' : 'Hide Controls (Wallpaper Mode)'}
        >
          {isCollapsed ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Control Panel */}
      {!isCollapsed && (
        <div className="pointer-events-auto bg-slate-950/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-2xl text-white w-full md:w-96 flex flex-col gap-3 transition-all duration-300">
          {/* Navigation Tabs */}
          <div className="flex bg-white/5 rounded-xl p-1 gap-1 border border-white/5 text-xs font-medium">
            <button
              onClick={() => setActiveTab('controls')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === 'controls' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Orbit
            </button>
            <button
              onClick={() => setActiveTab('view')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === 'view' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> View
            </button>
            <button
              onClick={() => setActiveTab('planets')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${
                activeTab === 'planets' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Disc className="w-3.5 h-3.5" /> Planets
            </button>
          </div>

          {/* TAB 1: Orbit Controls */}
          {activeTab === 'controls' && (
            <div className="flex flex-col gap-3">
              {/* Play / Pause & Speed Bar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({ ...s, isPlaying: !s.isPlaying }))
                  }
                  className={`p-2.5 rounded-xl flex items-center justify-center font-semibold text-xs gap-2 transition ${
                    settings.isPlaying
                      ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                  }`}
                >
                  {settings.isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Play
                    </>
                  )}
                </button>

                {/* Speed selector chips */}
                <div className="flex-1 flex bg-white/5 rounded-xl p-1 gap-1 border border-white/5 overflow-x-auto scrollbar-none">
                  {speedOptions.map((sp) => (
                    <button
                      key={sp.label}
                      onClick={() =>
                        onUpdateSettings((s) => ({
                          ...s,
                          speedMultiplier: sp.val,
                          isPlaying: true,
                        }))
                      }
                      className={`flex-1 min-w-[42px] py-1 text-[11px] font-mono rounded-lg transition ${
                        settings.speedMultiplier === sp.val && settings.isPlaying
                          ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/40'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Toggles Grid */}
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      showOrbitLines: !s.showOrbitLines,
                    }))
                  }
                  className={`flex items-center justify-between p-2 rounded-xl border transition ${
                    settings.showOrbitLines
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Orbit className="w-3.5 h-3.5" /> Orbit Lines
                  </span>
                  {settings.showOrbitLines ? (
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </button>

                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({ ...s, showLabels: !s.showLabels }))
                  }
                  className={`flex items-center justify-between p-2 rounded-xl border transition ${
                    settings.showLabels
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-200'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Labels
                  </span>
                  {settings.showLabels ? (
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </button>

                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      showDustDisk: !s.showDustDisk,
                    }))
                  }
                  className={`flex items-center justify-between p-2 rounded-xl border transition ${
                    settings.showDustDisk
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Galaxy Dust
                  </span>
                  {settings.showDustDisk ? (
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </button>

                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      showSolarFlares: !s.showSolarFlares,
                    }))
                  }
                  className={`flex items-center justify-between p-2 rounded-xl border transition ${
                    settings.showSolarFlares
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5" /> Sun Flares
                  </span>
                  {settings.showSolarFlares ? (
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <EyeOff className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </button>
              </div>

              {/* Ambient Sound Toggle */}
              <div className="flex items-center justify-between p-2 bg-white/5 border border-white/5 rounded-xl text-xs">
                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      ambientSound: !s.ambientSound,
                    }))
                  }
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition"
                >
                  {settings.ambientSound ? (
                    <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-gray-500" />
                  )}
                  <span>Ambient Cosmic Sound</span>
                </button>

                {settings.ambientSound && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={settings.volume}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      onUpdateSettings((s) => ({ ...s, volume: v }));
                    }}
                    className="w-20 accent-amber-400 h-1 bg-white/20 rounded-lg cursor-pointer"
                  />
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Camera Presets */}
          {activeTab === 'view' && (
            <div className="flex flex-col gap-3 text-xs">
              <label className="text-gray-400 font-medium">3D Perspective Presets</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      cameraPreset: 'reference',
                      cameraDistance: 95,
                    }))
                  }
                  className={`p-2.5 rounded-xl text-left border flex flex-col gap-1 transition ${
                    settings.cameraPreset === 'reference'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold text-amber-300 flex items-center justify-between">
                    Reference View
                    <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1 rounded">Image</span>
                  </span>
                  <span className="text-[10px] text-gray-400">Tilted elliptical angle matching your photo</span>
                </button>

                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      cameraPreset: 'cinematic',
                      cameraDistance: 80,
                    }))
                  }
                  className={`p-2.5 rounded-xl text-left border flex flex-col gap-1 transition ${
                    settings.cameraPreset === 'cinematic'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold text-amber-300">Cinematic Orbit</span>
                  <span className="text-[10px] text-gray-400">Continuous 360° sweeping view</span>
                </button>

                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      cameraPreset: 'topDown',
                      cameraDistance: 110,
                    }))
                  }
                  className={`p-2.5 rounded-xl text-left border flex flex-col gap-1 transition ${
                    settings.cameraPreset === 'topDown'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold text-amber-300">Top-Down Map</span>
                  <span className="text-[10px] text-gray-400">2D Solar system overhead map</span>
                </button>

                <button
                  onClick={() =>
                    onUpdateSettings((s) => ({
                      ...s,
                      cameraPreset: 'wallpaper',
                      cameraDistance: 120,
                    }))
                  }
                  className={`p-2.5 rounded-xl text-left border flex flex-col gap-1 transition ${
                    settings.cameraPreset === 'wallpaper'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                      : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <span className="font-semibold text-amber-300">Wallpaper Mode</span>
                  <span className="text-[10px] text-gray-400">Wide high-depth aesthetic framing</span>
                </button>
              </div>

              {/* Camera Zoom Distance Slider */}
              <div className="flex flex-col gap-1 pt-2">
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Zoom Distance</span>
                  <span>{Math.round(settings.cameraDistance)}</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="160"
                  value={settings.cameraDistance}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    onUpdateSettings((s) => ({ ...s, cameraDistance: val }));
                  }}
                  className="w-full accent-amber-400 h-1.5 bg-white/20 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Quick Planet Picker */}
          {activeTab === 'planets' && (
            <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1 text-xs scrollbar-thin">
              <button
                onClick={() => onSelectPlanet('sun')}
                className={`flex items-center gap-2 p-2 rounded-xl text-left border transition ${
                  settings.selectedPlanetId === 'sun'
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-semibold'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <span>સૂર્ય (Sun)</span>
              </button>

              {PLANETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPlanet(p.id)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-left border transition ${
                    settings.selectedPlanetId === p.id
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-semibold'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 text-gray-300'
                  }`}
                >
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20"
                    style={{ backgroundColor: p.color }}
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <span>{p.gujaratiName}</span>
                    <span className="text-[10px] text-gray-400">{p.details.type}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Footer Action Bar: Get Code Snippet */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onOpenCodeExport}
              className="w-full py-2 px-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <Code className="w-4 h-4" /> આ કોડ મેળવો (Get Animated Background Code)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
