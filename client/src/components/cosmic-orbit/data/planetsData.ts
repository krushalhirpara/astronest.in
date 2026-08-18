import { PlanetData } from '../types';

export const SUN_DATA = {
  id: 'sun',
  name: 'Sun',
  gujaratiName: 'સૂર્ય (Sun)',
  radius: 6.2,
  color: '#ffcc00',
  emissiveColor: '#ffaa00',
  details: {
    type: 'Yellow Dwarf Star (G2V)',
    diameterKm: '1,392,700 km',
    distanceFromSun: '0 km (Center)',
    orbitPeriod: 'N/A',
    dayLength: '27 Earth days',
    moonsCount: 0,
    temperature: '5,500 °C (Surface) / 15M °C (Core)',
    description: 'The glowing heart of our solar system, providing gravity, warmth, and energy to all orbiting planets.',
    gujaratiDescription: 'સૂર્ય આપણા સૌરમંડળનું કેન્દ્રબિંદુ છે જે તમામ ગ્રહોને ગુરુત્વાકર્ષણ અને ઉર્જા પૂરી પાડે છે.'
  }
};

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercury',
    gujaratiName: 'બુધ (Mercury)',
    color: '#a8a5a0',
    secondaryColor: '#6c6a66',
    radius: 0.8,
    orbitRadiusX: 12,
    orbitRadiusZ: 9.5,
    orbitSpeed: 0.024,
    rotationSpeed: 0.005,
    tiltAngle: 0.03,
    details: {
      type: 'Terrestrial Planet',
      diameterKm: '4,879 km',
      distanceFromSun: '57.9 Million km',
      orbitPeriod: '88 Days',
      dayLength: '59 Earth days',
      moonsCount: 0,
      temperature: '-180 °C to 430 °C',
      description: 'The smallest planet in the Solar System and closest to the Sun.',
      gujaratiDescription: 'સૂર્યની સૌથી નજીકનો અને સૌથી નાનો પથરાળ ગ્રહ.'
    }
  },
  {
    id: 'venus',
    name: 'Venus',
    gujaratiName: 'શુક્ર (Venus)',
    color: '#e3bb76',
    secondaryColor: '#c29244',
    radius: 1.4,
    orbitRadiusX: 18,
    orbitRadiusZ: 14.5,
    orbitSpeed: 0.018,
    rotationSpeed: -0.002, // retrograde
    tiltAngle: 177.3,
    details: {
      type: 'Terrestrial Planet',
      diameterKm: '12,104 km',
      distanceFromSun: '108.2 Million km',
      orbitPeriod: '225 Days',
      dayLength: '243 Earth days',
      moonsCount: 0,
      temperature: '465 °C',
      description: 'The hottest planet with thick, reflective sulfuric acid clouds.',
      gujaratiDescription: 'સૌથી ગરમ અને તેજસ્વી ગ્રહ જે જાડા વાદળોથી ઘેરાયેલો છે.'
    }
  },
  {
    id: 'earth',
    name: 'Earth',
    gujaratiName: 'પૃથ્વી (Earth)',
    color: '#2b82c5',
    secondaryColor: '#3a9e4d',
    radius: 1.6,
    orbitRadiusX: 25,
    orbitRadiusZ: 20,
    orbitSpeed: 0.014,
    rotationSpeed: 0.015,
    tiltAngle: 23.4,
    moons: [
      {
        name: 'Moon',
        radius: 0.4,
        orbitRadius: 2.8,
        orbitSpeed: 0.05,
        color: '#d0d0d0'
      }
    ],
    details: {
      type: 'Terrestrial Planet',
      diameterKm: '12,742 km',
      distanceFromSun: '149.6 Million km',
      orbitPeriod: '365.25 Days',
      dayLength: '24 Hours',
      moonsCount: 1,
      temperature: '-88 °C to 58 °C',
      description: 'Our blue home planet, rich with liquid water and abundant life.',
      gujaratiDescription: 'આપણો બ્લુ હોમ પ્લેનેટ, જ્યાં જીવન અને પાણી સમૃદ્ધ છે.'
    }
  },
  {
    id: 'mars',
    name: 'Mars',
    gujaratiName: 'મંગળ (Mars)',
    color: '#c85a32',
    secondaryColor: '#8c3518',
    radius: 1.1,
    orbitRadiusX: 32,
    orbitRadiusZ: 25.5,
    orbitSpeed: 0.011,
    rotationSpeed: 0.014,
    tiltAngle: 25.2,
    details: {
      type: 'Terrestrial Planet',
      diameterKm: '6,779 km',
      distanceFromSun: '227.9 Million km',
      orbitPeriod: '687 Days',
      dayLength: '24h 37m',
      moonsCount: 2,
      temperature: '-125 °C to 20 °C',
      description: 'The Red Planet, home to vast dusty deserts and Olympus Mons.',
      gujaratiDescription: 'લાલ ગ્રહ, વિશાળ ધૂળિયા રણ અને પ્રાચીન જ્વાળામુખીઓથી ભરેલો.'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    gujaratiName: 'ગુરુ (Jupiter)',
    color: '#d4a373',
    secondaryColor: '#a66b38',
    radius: 3.5,
    orbitRadiusX: 43,
    orbitRadiusZ: 34,
    orbitSpeed: 0.007,
    rotationSpeed: 0.03,
    tiltAngle: 3.1,
    hasRings: true,
    ringInnerRadius: 4.2,
    ringOuterRadius: 5.0,
    ringColor: 'rgba(212, 163, 115, 0.2)',
    details: {
      type: 'Gas Giant',
      diameterKm: '139,820 km',
      distanceFromSun: '778.5 Million km',
      orbitPeriod: '11.86 Years',
      dayLength: '9h 55m',
      moonsCount: 95,
      temperature: '-110 °C',
      description: 'The largest planet with iconic swirling gas bands and Great Red Spot.',
      gujaratiDescription: 'સૌરમંડળનો સૌથી મોટો ગ્રહ જે વિરાટ વાયુમંડળ ધરાવે છે.'
    }
  },
  {
    id: 'saturn',
    name: 'Saturn',
    gujaratiName: 'શનિ (Saturn)',
    color: '#e2c08d',
    secondaryColor: '#c19a5b',
    radius: 2.9,
    orbitRadiusX: 55,
    orbitRadiusZ: 43,
    orbitSpeed: 0.005,
    rotationSpeed: 0.028,
    tiltAngle: 26.7,
    hasRings: true,
    ringInnerRadius: 3.8,
    ringOuterRadius: 7.2,
    ringColor: '#d6b885',
    details: {
      type: 'Gas Giant',
      diameterKm: '116,460 km',
      distanceFromSun: '1.43 Billion km',
      orbitPeriod: '29.45 Years',
      dayLength: '10h 33m',
      moonsCount: 146,
      temperature: '-140 °C',
      description: 'Famous for its stunning, complex system of icy rings.',
      gujaratiDescription: 'તેના સુંદર અને અદ્ભુત રિંગ્સ (વલયો) માટે જાણીતો ગ્રહ.'
    }
  },
  {
    id: 'uranus',
    name: 'Uranus',
    gujaratiName: 'યુરેનસ (Uranus)',
    color: '#7bd1d0',
    secondaryColor: '#4ca5a4',
    radius: 2.1,
    orbitRadiusX: 66,
    orbitRadiusZ: 52,
    orbitSpeed: 0.0035,
    rotationSpeed: -0.02,
    tiltAngle: 97.8, // rotates nearly on its side
    hasRings: true,
    ringInnerRadius: 2.8,
    ringOuterRadius: 3.8,
    ringColor: 'rgba(123, 209, 208, 0.3)',
    details: {
      type: 'Ice Giant',
      diameterKm: '50,724 km',
      distanceFromSun: '2.87 Billion km',
      orbitPeriod: '84 Years',
      dayLength: '17h 14m',
      moonsCount: 28,
      temperature: '-195 °C',
      description: 'An icy cyan giant that uniquely rotates almost on its side.',
      gujaratiDescription: 'બરફીલો વાદળી ગ્રહ જે લગભગ આડો નમેલો રહીને ફરે છે.'
    }
  },
  {
    id: 'neptune',
    name: 'Neptune',
    gujaratiName: 'નેપ્ચ્યુન (Neptune)',
    color: '#3855c7',
    secondaryColor: '#203487',
    radius: 2.0,
    orbitRadiusX: 76,
    orbitRadiusZ: 60,
    orbitSpeed: 0.0025,
    rotationSpeed: 0.022,
    tiltAngle: 28.3,
    details: {
      type: 'Ice Giant',
      diameterKm: '49,244 km',
      distanceFromSun: '4.5 Billion km',
      orbitPeriod: '164.8 Years',
      dayLength: '16h 6m',
      moonsCount: 16,
      temperature: '-200 °C',
      description: 'The furthest major planet, deep blue with supersonic atmospheric winds.',
      gujaratiDescription: 'સૌથી દૂરનો ઘેરો વાદળી પ્લેનેટ જ્યાં સુપરસોનિક પવનો ફૂંકાય છે.'
    }
  }
];
