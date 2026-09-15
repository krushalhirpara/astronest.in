import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PLANETS, SUN_DATA } from './data/planetsData';
import { CosmicSettings, PlanetData } from './types';
import {
  createPlanetTexture,
  createRingTexture,
  createStarGlowTexture,
  createSunTexture,
} from './utils/canvasTextures';

interface CosmicCanvasProps {
  settings: CosmicSettings;
  onSelectPlanet?: (planetId: string | null) => void;
}

export const CosmicCanvas: React.FC<CosmicCanvasProps> = ({
  settings,
  onSelectPlanet,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedPlanetIdRef = useRef<string | null>(settings.selectedPlanetId);
  const settingsRef = useRef<CosmicSettings>(settings);

  // Screen space label coordinates for rendering floating tags
  const [planetLabels, setPlanetLabels] = useState<
    { id: string; name: string; x: number; y: number; visible: boolean }[]
  >([]);

  // Keep refs up to date without triggering re-renders inside animation loop
  useEffect(() => {
    settingsRef.current = settings;
    selectedPlanetIdRef.current = settings.selectedPlanetId;
  }, [settings]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020208, 0.0018);

    // 2. Camera Setup (Tilted view matching the reference image)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Initial camera placement for the reference image perspective
    camera.position.set(0, 55, 95);
    camera.lookAt(0, 0, 0);

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Clear existing canvas children if any
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x333355, 0.8);
    scene.add(ambientLight);

    const sunPointLight = new THREE.PointLight(0xfffae6, 3.5, 300, 0.5);
    sunPointLight.position.set(0, 0, 0);
    scene.add(sunPointLight);

    // Additional directional rim light for dramatic depth
    const rimLight = new THREE.DirectionalLight(0x6080ff, 0.5);
    rimLight.position.set(50, 100, -50);
    scene.add(rimLight);

    // 5. Sun Mesh & Glow Aura
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    const sunTexture = createSunTexture();
    const sunGeo = new THREE.SphereGeometry(SUN_DATA.radius, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({
      map: sunTexture,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Sun Outer Glow Flare
    const starGlowTex = createStarGlowTexture();
    const glowSpriteMat = new THREE.SpriteMaterial({
      map: starGlowTex,
      color: 0xffaa00,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.9,
    });
    const glowSprite = new THREE.Sprite(glowSpriteMat);
    glowSprite.scale.set(SUN_DATA.radius * 5.5, SUN_DATA.radius * 5.5, 1);
    sunGroup.add(glowSprite);

    // 6. Accretion Disk / Cosmic Dust Particles (Matching Galaxy Arms in Reference Image)
    const dustCount = 3500;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    const palette = [
      new THREE.Color(0xff8833), // Warm solar orange
      new THREE.Color(0xd4a259), // Golden dust
      new THREE.Color(0x388ee7), // Cosmic cyan/blue
      new THREE.Color(0xaa55ff), // Deep galaxy violet
      new THREE.Color(0xffffff), // Bright star white
    ];

    for (let i = 0; i < dustCount; i++) {
      // Elliptical distribution around solar system plane
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 80 + 10;
      const spreadY = (Math.random() - 0.5) * (distance * 0.15); // Thin disk thickness

      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * (distance * 0.78); // Elliptical perspective ratio

      dustPositions[i * 3] = x;
      dustPositions[i * 3 + 1] = spreadY;
      dustPositions[i * 3 + 2] = z;

      const color = palette[Math.floor(Math.random() * palette.length)];
      dustColors[i * 3] = color.r;
      dustColors[i * 3 + 1] = color.g;
      dustColors[i * 3 + 2] = color.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.55,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // Starfield Background
    const starsCount = 2000;
    const starsGeo = new THREE.BufferGeometry();
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 300 + Math.random() * 200;

      starsPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starsPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starsPositions[i * 3 + 2] = r * Math.cos(phi);
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      transparent: true,
      opacity: 0.8,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 7. Planet Meshes, Orbit Lines & Selection Highlights
    interface PlanetMeshObj {
      data: PlanetData;
      mesh: THREE.Mesh;
      group: THREE.Group; // Contains planet + moons + rings
      angle: number;
      orbitLine: THREE.LineLoop;
      selectionHighlight: THREE.Mesh;
      moonsMeshes: { mesh: THREE.Mesh; angle: number; speed: number; dist: number }[];
    }

    const planetObjects: PlanetMeshObj[] = [];
    const planetGroupMap = new Map<string, THREE.Group>();

    PLANETS.forEach((planetData) => {
      const planetGroup = new THREE.Group();
      scene.add(planetGroup);

      // Create Planet Texture & Material
      const texture = createPlanetTexture(
        planetData.id,
        planetData.color,
        planetData.secondaryColor
      );
      const planetGeo = new THREE.SphereGeometry(planetData.radius, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.6,
        metalness: 0.1,
      });

      const planetMesh = new THREE.Mesh(planetGeo, planetMat);
      // Apply axial tilt
      planetMesh.rotation.z = THREE.MathUtils.degToRad(planetData.tiltAngle);
      planetGroup.add(planetMesh);

      // Save name for raycaster identification
      planetMesh.userData = { id: planetData.id, name: planetData.name };

      // Rings (Saturn, Uranus, Jupiter)
      if (planetData.hasRings && planetData.ringInnerRadius && planetData.ringOuterRadius) {
        const ringGeo = new THREE.RingGeometry(
          planetData.ringInnerRadius,
          planetData.ringOuterRadius,
          64
        );

        // Orient ring horizontally along planetary equator
        ringGeo.rotateX(Math.PI / 2);

        const ringTex = createRingTexture(planetData.ringColor || planetData.color);
        const ringMat = new THREE.MeshBasicMaterial({
          map: ringTex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.85,
        });

        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        planetGroup.add(ringMesh);
      }

      // Moons (e.g. Earth's Moon)
      const moonsMeshes: { mesh: THREE.Mesh; angle: number; speed: number; dist: number }[] = [];
      if (planetData.moons) {
        planetData.moons.forEach((m) => {
          const mGeo = new THREE.SphereGeometry(m.radius, 16, 16);
          const mMat = new THREE.MeshStandardMaterial({ color: m.color, roughness: 0.8 });
          const mMesh = new THREE.Mesh(mGeo, mMat);
          mMesh.position.set(m.orbitRadius, 0, 0);
          planetGroup.add(mMesh);
          moonsMeshes.push({
            mesh: mMesh,
            angle: Math.random() * Math.PI * 2,
            speed: m.orbitSpeed,
            dist: m.orbitRadius,
          });
        });
      }

      // Selection Highlight Pulse Ring
      const highlightGeo = new THREE.RingGeometry(
        planetData.radius * 1.3,
        planetData.radius * 1.5,
        32
      );
      const highlightMat = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      });
      const highlightMesh = new THREE.Mesh(highlightGeo, highlightMat);
      highlightMesh.rotation.x = Math.PI / 2;
      planetGroup.add(highlightMesh);

      // Orbit Line (Elliptical Path matching X and Z radii)
      const orbitCurvePoints: THREE.Vector3[] = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        const ox = Math.cos(theta) * planetData.orbitRadiusX;
        const oz = Math.sin(theta) * planetData.orbitRadiusZ;
        orbitCurvePoints.push(new THREE.Vector3(ox, 0, oz));
      }

      const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitCurvePoints);
      const orbitMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(planetData.color),
        transparent: true,
        opacity: 0.35,
      });

      const orbitLine = new THREE.LineLoop(orbitGeo, orbitMat);
      scene.add(orbitLine);

      // Initial random orbital starting angle
      const initialAngle = Math.random() * Math.PI * 2;

      planetObjects.push({
        data: planetData,
        mesh: planetMesh,
        group: planetGroup,
        angle: initialAngle,
        orbitLine,
        selectionHighlight: highlightMesh,
        moonsMeshes,
      });

      planetGroupMap.set(planetData.id, planetGroup);
    });

    // 8. Mouse & Interaction Handling
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isMouseDown = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cameraRotationY = 0;
    let cameraRotationX = THREE.MathUtils.degToRad(28);

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isMouseDown = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      cameraRotationY -= deltaX * 0.005;
      cameraRotationX = THREE.MathUtils.clamp(
        cameraRotationX + deltaY * 0.005,
        0.05,
        Math.PI / 2.2
      );

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (!isMouseDown) return;
      isMouseDown = false;

      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

      const distMoved = Math.hypot(
        clientX - previousMousePosition.x,
        clientY - previousMousePosition.y
      );

      // Click / Tap detection if mouse didn't drag significantly
      if (distMoved < 6 && onSelectPlanet && renderer.domElement) {
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // Raycast against all planet meshes & sun
        const meshesToTest = planetObjects.map((p) => p.mesh);
        meshesToTest.push(sunMesh);

        const intersects = raycaster.intersectObjects(meshesToTest);

        if (intersects.length > 0) {
          const hitObj = intersects[0].object;
          if (hitObj === sunMesh) {
            onSelectPlanet('sun');
          } else if (hitObj.userData && hitObj.userData.id) {
            onSelectPlanet(hitObj.userData.id);
          }
        } else {
          onSelectPlanet(null);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const zoomDelta = e.deltaY * 0.05;
      settingsRef.current.cameraDistance = THREE.MathUtils.clamp(
        settingsRef.current.cameraDistance + zoomDelta,
        25,
        180
      );
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    domElem.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);
    domElem.addEventListener('wheel', handleWheel, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let frameCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      frameCount++;

      const delta = Math.min(clock.getDelta(), 0.1);
      const st = settingsRef.current;

      // A. Update Camera Position based on preset or custom Orbit controls
      const camDist = st.cameraDistance;

      if (st.cameraPreset === 'reference') {
        cameraRotationX = THREE.MathUtils.degToRad(32);
        if (st.autoRotateCamera) {
          cameraRotationY += delta * 0.05;
        }
      } else if (st.cameraPreset === 'topDown') {
        cameraRotationX = THREE.MathUtils.degToRad(85);
      } else if (st.cameraPreset === 'cinematic') {
        cameraRotationX = THREE.MathUtils.degToRad(18);
        cameraRotationY += delta * 0.12;
      } else if (st.cameraPreset === 'wallpaper') {
        cameraRotationX = THREE.MathUtils.degToRad(25);
        if (st.autoRotateCamera) {
          cameraRotationY += delta * 0.03;
        }
      }

      // Convert Spherical angles to Cartesian camera position
      camera.position.x = camDist * Math.sin(cameraRotationX) * Math.sin(cameraRotationY);
      camera.position.y = camDist * Math.cos(cameraRotationX);
      camera.position.z = camDist * Math.sin(cameraRotationX) * Math.cos(cameraRotationY);
      camera.lookAt(0, -2, 0);

      // B. Sun Self-Rotation & Coronal Flare pulsating
      sunMesh.rotation.y += delta * 0.1;
      const pulseOpacity = 0.8 + Math.sin(clock.getElapsedTime() * 2) * 0.15;
      glowSpriteMat.opacity = st.showSolarFlares ? pulseOpacity : 0;

      // C. Galaxy Dust Particles slow drift
      if (dustParticles) {
        dustParticles.rotation.y += delta * 0.015;
        dustParticles.visible = st.showDustDisk;
      }

      // D. Update Planets Movement
      const speedMult = st.isPlaying ? st.speedMultiplier : 0;

      const newLabelCoords: { id: string; name: string; x: number; y: number; visible: boolean }[] =
        [];

      planetObjects.forEach((pObj) => {
        // Orbit progression
        pObj.angle += pObj.data.orbitSpeed * speedMult * 0.8;

        // Position on elliptical orbit plane (X axis semi-major, Z axis semi-minor)
        const posX = Math.cos(pObj.angle) * pObj.data.orbitRadiusX;
        const posZ = Math.sin(pObj.angle) * pObj.data.orbitRadiusZ;

        pObj.group.position.set(posX, 0, posZ);

        // Planet self-rotation around axis
        pObj.mesh.rotation.y += pObj.data.rotationSpeed * (speedMult || 1);

        // Update Moons orbital movement
        pObj.moonsMeshes.forEach((m) => {
          m.angle += m.speed * (speedMult || 1);
          m.mesh.position.x = Math.cos(m.angle) * m.dist;
          m.mesh.position.z = Math.sin(m.angle) * m.dist;
        });

        // Orbit Lines Visibility
        pObj.orbitLine.visible = st.showOrbitLines;

        // Selection Pulse
        const isSelected = selectedPlanetIdRef.current === pObj.data.id;
        if (isSelected) {
          pObj.selectionHighlight.visible = true;
          (pObj.selectionHighlight.material as THREE.MeshBasicMaterial).opacity =
            0.6 + Math.sin(clock.getElapsedTime() * 6) * 0.3;
        } else {
          pObj.selectionHighlight.visible = false;
        }

        // Project 3D position to 2D Screen Space for HTML Labels (throttle label updates to every 4 frames)
        if (st.showLabels && frameCount % 4 === 0) {
          const planetWorldPos = new THREE.Vector3();
          pObj.group.getWorldPosition(planetWorldPos);

          const screenPos = planetWorldPos.clone().project(camera);

          const sx = (screenPos.x * 0.5 + 0.5) * width;
          const sy = (-(screenPos.y * 0.5) + 0.5) * height;

          const isBehindCamera = screenPos.z > 1;

          newLabelCoords.push({
            id: pObj.data.id,
            name: pObj.data.name,
            x: sx,
            y: sy,
            visible: !isBehindCamera && sx > 0 && sx < width && sy > 0 && sy < height,
          });
        }
      });

      // Sun Label position
      if (st.showLabels && frameCount % 4 === 0) {
        const sunWorldPos = new THREE.Vector3(0, 0, 0);
        const sunScreenPos = sunWorldPos.project(camera);
        const sx = (sunScreenPos.x * 0.5 + 0.5) * width;
        const sy = (-(sunScreenPos.y * 0.5) + 0.5) * height;
        newLabelCoords.push({
          id: 'sun',
          name: 'Sun',
          x: sx,
          y: sy,
          visible: sunScreenPos.z <= 1 && sx > 0 && sx < width && sy > 0 && sy < height,
        });
        setPlanetLabels(newLabelCoords);
      }

      renderer.render(scene, camera);
    };

    let isVisible = true;
    let lastTime = performance.now();

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting && document.visibilityState === 'visible';
        if (nowVisible && !isVisible) {
          isVisible = true;
          lastTime = performance.now();
          clock.getDelta(); // reset delta
          animate();
        } else if (!nowVisible) {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        isVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else if (containerRef.current) {
        isVisible = true;
        lastTime = performance.now();
        clock.getDelta(); // reset delta
        animate();
      }
    };

    observer.observe(container);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    animate();

    // Clean up
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElem.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      domElem.removeEventListener('wheel', handleWheel);

      // Dispose all planet resources
      planetObjects.forEach((pObj) => {
        pObj.mesh.geometry.dispose();
        if (Array.isArray(pObj.mesh.material)) {
          pObj.mesh.material.forEach((m) => m.dispose());
        } else {
          pObj.mesh.material.dispose();
        }
        pObj.orbitLine.geometry.dispose();
        (pObj.orbitLine.material as THREE.Material).dispose();
        pObj.selectionHighlight.geometry.dispose();
        (pObj.selectionHighlight.material as THREE.Material).dispose();
        pObj.moonsMeshes.forEach((m) => {
          m.mesh.geometry.dispose();
          if (Array.isArray(m.mesh.material)) {
            m.mesh.material.forEach((mat) => mat.dispose());
          } else {
            m.mesh.material.dispose();
          }
        });
      });

      renderer.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      sunGeo.dispose();
      sunMat.dispose();
      sunTexture.dispose();
      starGlowTex.dispose();
      glowSpriteMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#020208]">
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Floating 2D Screen-space Planet Labels */}
      {settings.showLabels &&
        planetLabels.map(
          (label) =>
            label.visible && (
              <div
                key={label.id}
                onClick={() => onSelectPlanet && onSelectPlanet(label.id)}
                style={{
                  transform: `translate(${label.x}px, ${label.y}px)`,
                }}
                className={`absolute top-0 left-0 -translate-x-1/2 -translate-y-full mb-2 pointer-events-auto cursor-pointer transition-all duration-200 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md border ${
                  settings.selectedPlanetId === label.id
                    ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.5)] scale-110'
                    : 'bg-black/40 text-gray-200 border-white/10 hover:bg-black/70 hover:border-white/30'
                }`}
              >
                {label.name}
              </div>
            )
        )}
    </div>
  );
};
