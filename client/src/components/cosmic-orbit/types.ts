export interface PlanetData {
  id: string;
  name: string;
  gujaratiName: string;
  color: string;
  secondaryColor?: string;
  emissiveColor?: string;
  radius: number; // visual scale size
  orbitRadiusX: number; // semi-major axis
  orbitRadiusZ: number; // semi-minor axis for tilted/elliptical perspective
  orbitSpeed: number; // radians per frame at 1x
  rotationSpeed: number; // self rotation
  tiltAngle: number; // axial tilt in degrees
  hasRings?: boolean;
  ringInnerRadius?: number;
  ringOuterRadius?: number;
  ringColor?: string;
  moons?: {
    name: string;
    radius: number;
    orbitRadius: number;
    orbitSpeed: number;
    color: string;
  }[];
  details: {
    type: string;
    diameterKm: string;
    distanceFromSun: string;
    orbitPeriod: string;
    dayLength: string;
    moonsCount: number;
    temperature: string;
    description: string;
    gujaratiDescription: string;
  };
}

export interface CosmicSettings {
  isPlaying: boolean;
  speedMultiplier: number;
  showOrbitLines: boolean;
  showLabels: boolean;
  showDustDisk: boolean;
  showSolarFlares: boolean;
  cameraPreset: 'reference' | 'topDown' | 'cinematic' | 'wallpaper';
  selectedPlanetId: string | null;
  ambientSound: boolean;
  volume: number;
  cameraTilt: number;
  cameraDistance: number;
  autoRotateCamera: boolean;
}
