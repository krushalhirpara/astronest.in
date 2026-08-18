import React from 'react';
import { X, Globe2, Thermometer, Clock, Ruler, Disc2, Orbit } from 'lucide-react';
import { PLANETS, SUN_DATA } from '../data/planetsData';

interface PlanetCardProps {
  selectedPlanetId: string | null;
  onClose: () => void;
}

export const PlanetCard: React.FC<PlanetCardProps> = ({ selectedPlanetId, onClose }) => {
  if (!selectedPlanetId) return null;

  const isSun = selectedPlanetId === 'sun';
  const planetData = isSun ? SUN_DATA : PLANETS.find((p) => p.id === selectedPlanetId);

  if (!planetData) return null;

  return (
    <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-30 pointer-events-auto bg-slate-950/85 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg border border-white/20"
            style={{
              backgroundColor: planetData.color,
              boxShadow: `0 0 20px ${planetData.color}80`,
            }}
          >
            <Orbit className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              {planetData.gujaratiName}
            </h2>
            <p className="text-xs text-amber-300/90 font-medium">
              {planetData.details.type}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Gujarati Description */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-xs leading-relaxed text-gray-200">
        <p className="font-medium text-amber-200/90 mb-1">શા માટે ખાસ છે?</p>
        <p>{planetData.details.gujaratiDescription}</p>
        <p className="text-gray-400 mt-1 italic text-[11px]">{planetData.details.description}</p>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center gap-2">
          <Ruler className="w-4 h-4 text-cyan-400 shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400">વ્યાસ (Diameter)</p>
            <p className="font-mono font-semibold">{planetData.details.diameterKm}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center gap-2">
          <Globe2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400">અંતર (Distance)</p>
            <p className="font-mono font-semibold">{planetData.details.distanceFromSun}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400">પરિભ્રમણ (Orbit)</p>
            <p className="font-mono font-semibold">{planetData.details.orbitPeriod}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-xl p-2.5 flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-rose-400 shrink-0" />
          <div>
            <p className="text-[10px] text-gray-400">તાપમાન (Temp)</p>
            <p className="font-mono font-semibold text-[11px]">{planetData.details.temperature}</p>
          </div>
        </div>
      </div>

      {/* Moons info */}
      <div className="flex items-center justify-between text-xs text-gray-300 pt-1 border-t border-white/10">
        <span className="flex items-center gap-1.5">
          <Disc2 className="w-4 h-4 text-amber-400" /> ઉપગ્રહો (Moons)
        </span>
        <span className="font-mono font-bold bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
          {planetData.details.moonsCount}
        </span>
      </div>
    </div>
  );
};
