import * as THREE from 'three';

/**
 * Procedural texture creation for Three.js materials
 */

// Generate Sun Texture with solar flares & noise
export function createSunTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Base orange glow
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, '#ffcc00');
  grad.addColorStop(0.5, '#ff8800');
  grad.addColorStop(1, '#ff3300');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Solar flares and granulations
  for (let i = 0; i < 400; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 25 + 5;
    ctx.fillStyle = `rgba(255, 255, 200, ${Math.random() * 0.4})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // Coronal plasma spots
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const rx = Math.random() * 80 + 20;
    const ry = Math.random() * 30 + 10;
    ctx.fillStyle = `rgba(255, 100, 0, ${Math.random() * 0.5})`;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Generate Planet procedural textures based on primary and secondary colors
export function createPlanetTexture(
  planetId: string,
  primaryColor: string,
  secondaryColor?: string
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Base color
  ctx.fillStyle = primaryColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (planetId === 'earth') {
    // Oceans base
    ctx.fillStyle = '#1b5a96';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green/Brown Continents
    ctx.fillStyle = '#2f7532';
    for (let i = 0; i < 18; i++) {
      const x = Math.random() * canvas.width;
      const y = (Math.random() * 0.7 + 0.15) * canvas.height;
      const r = Math.random() * 60 + 20;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#8f7e4f';
      ctx.beginPath();
      ctx.arc(x + 10, y + 5, r * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2f7532';
    }

    // White Swirling Clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const rx = Math.random() * 90 + 30;
      const ry = Math.random() * 15 + 5;
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (planetId === 'jupiter') {
    // Jupiter Gas Bands
    const bandColors = ['#e6c8a3', '#b87e43', '#dca870', '#8d5028', '#f2e2ce', '#9d5d31'];
    const bandHeight = canvas.height / bandColors.length;

    for (let i = 0; i < bandColors.length; i++) {
      ctx.fillStyle = bandColors[i];
      ctx.fillRect(0, i * bandHeight, canvas.width, bandHeight);
    }

    // Great Red Spot
    ctx.fillStyle = '#b33118';
    ctx.beginPath();
    ctx.ellipse(320, 160, 45, 25, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Swirling storms
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.ellipse(x, y, Math.random() * 30 + 10, Math.random() * 8 + 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (planetId === 'saturn') {
    // Saturn subtle atmospheric bands
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#e8cf9b');
    grad.addColorStop(0.3, '#d3ab6b');
    grad.addColorStop(0.6, '#e8cf9b');
    grad.addColorStop(1, '#b58e52');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    // Generic noisy/cratered or banded surface
    const sec = secondaryColor || '#222222';
    ctx.fillStyle = sec;
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const r = Math.random() * 15 + 2;
      ctx.globalAlpha = Math.random() * 0.4 + 0.1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

// Generate Saturn / Ring Texture
export function createRingTexture(ringColor: string = '#d6b885'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, 'rgba(0,0,0,0)');
  grad.addColorStop(0.1, ringColor);
  grad.addColorStop(0.3, 'rgba(180,150,100,0.8)');
  grad.addColorStop(0.45, 'rgba(50,40,30,0.2)'); // Cassini Division gap
  grad.addColorStop(0.55, ringColor);
  grad.addColorStop(0.85, 'rgba(210,180,130,0.6)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, 1);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Soft glowing star particle texture
export function createStarGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.2, 'rgba(255, 220, 160, 0.8)');
  grad.addColorStop(0.5, 'rgba(255, 120, 40, 0.3)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);

  return new THREE.CanvasTexture(canvas);
}
