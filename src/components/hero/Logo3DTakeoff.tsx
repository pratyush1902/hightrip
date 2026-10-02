'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Logo3DTakeoffProps {
  progress?: number;
  className?: string;
  isExpanded?: boolean;
}

// Coordinate paths from brand mark (viewBox: 730 x 668)
const AIRCRAFT_SVG_POINTS: [number, number][] = [
  [365.5, 0.5],
  [374.0, 3.0],
  [382.0, 8.5],
  [389.0, 17.5],
  [395.0, 30.5],
  [399.0, 46.5],
  [401.5, 64.5],
  [402.0, 82.5],
  [402.0, 258.5],
  [667.0, 402.5],
  [667.0, 426.5],
  [399.0, 364.5],
  [396.0, 438.5],
  [387.0, 582.5],
  [385.0, 598.5],
  [444.0, 640.5],
  [444.0, 666.5],
  [377.0, 656.5],
  [365.5, 672.5],
  [354.0, 656.5],
  [287.0, 666.5],
  [287.0, 640.5],
  [346.0, 598.5],
  [344.0, 582.5],
  [335.0, 438.5],
  [332.0, 364.5],
  [64.0, 426.5],
  [64.0, 402.5],
  [329.0, 258.5],
  [329.0, 82.5],
  [329.5, 64.5],
  [332.0, 46.5],
  [336.0, 30.5],
  [342.0, 17.5],
  [349.0, 8.5],
  [357.0, 3.0],
];

const LEFT_STRIPS_POINTS: [number, number][][] = [
  // Outer left column
  [
    [0.0, 203.5],
    [63.0, 171.5],
    [63.0, 668.0],
    [0.0, 668.0],
  ],
  // Inner left column top
  [
    [139.0, 138.5],
    [202.0, 106.5],
    [202.0, 316.0],
    [139.0, 350.2],
  ],
  // Inner left column bottom
  [
    [139.0, 419.5],
    [202.0, 404.7],
    [202.0, 668.0],
    [139.0, 668.0],
  ],
];

const RIGHT_STRIPS_POINTS: [number, number][][] = [
  // Inner right column top
  [
    [528.0, 74.5],
    [591.0, 106.5],
    [591.0, 349.7],
    [528.0, 315.5],
  ],
  // Inner right column bottom
  [
    [528.0, 404.5],
    [591.0, 419.2],
    [591.0, 668.0],
    [528.0, 668.0],
  ],
  // Outer right column
  [
    [667.0, 139.5],
    [730.0, 171.5],
    [730.0, 668.0],
    [667.0, 668.0],
  ],
];

const SCALE = 0.0092;
const CENTER_X = 365.0;
const CENTER_Y = 334.0;

function createShape(points: [number, number][]): THREE.Shape {
  const shape = new THREE.Shape();
  points.forEach(([x, y], idx) => {
    const px = (x - CENTER_X) * SCALE;
    const py = -(y - CENTER_Y) * SCALE;
    if (idx === 0) shape.moveTo(px, py);
    else shape.lineTo(px, py);
  });
  shape.closePath();
  return shape;
}

export function Logo3DTakeoff({
  progress = 0,
  className = '',
  isExpanded = false,
}: Logo3DTakeoffProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // References to 3D objects for real-time scrub & animation
  const sceneRef = useRef<{
    planeGroup: THREE.Group;
    leftStripsGroup: THREE.Group;
    rightStripsGroup: THREE.Group;
    contrailMesh: THREE.Mesh;
    contrailMaterial: THREE.MeshBasicMaterial;
    afterburnerLight: THREE.PointLight;
    stripsMaterial: THREE.MeshStandardMaterial;
    stripsBevelMaterial: THREE.MeshStandardMaterial;
    planeMaterial: THREE.MeshStandardMaterial;
    targetProgress: number;
    currentProgress: number;
  } | null>(null);

  // Update target progress for smooth interpolation
  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.targetProgress = progress;
    }
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // 2. Premium 3D Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff6ea, 1.4);
    scene.add(ambientLight);

    // Key Light: warm directional sun from top-right
    const keyLight = new THREE.DirectionalLight(0xffecd2, 2.8);
    keyLight.position.set(4, 6, 7);
    scene.add(keyLight);

    // Rim Light: cool bronze specular kicker from bottom-left
    const rimLight = new THREE.DirectionalLight(0xc48c58, 1.6);
    rimLight.position.set(-5, -4, 4);
    scene.add(rimLight);

    // Backlight for edge definition
    const backLight = new THREE.DirectionalLight(0xe2b785, 1.2);
    backLight.position.set(0, 5, -4);
    scene.add(backLight);

    // Twin Engine Afterburner Point Light
    const afterburnerLight = new THREE.PointLight(0xff7722, 0, 6, 2);
    afterburnerLight.position.set(0, -3.1, 0.2);
    scene.add(afterburnerLight);

    // 3. Materials
    // Luxury Metallic Bronze/Gold for the central aircraft
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd49b64,
      metalness: 0.88,
      roughness: 0.24,
      envMapIntensity: 1.2,
    });

    const planeBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5d3a8,
      metalness: 0.95,
      roughness: 0.15,
    });

    // Dark Titanium Obsidian Bronze for the pillar strips
    const stripsMaterial = new THREE.MeshStandardMaterial({
      color: 0x181512,
      metalness: 0.72,
      roughness: 0.38,
      transparent: true,
      opacity: 1,
    });

    const stripsBevelMaterial = new THREE.MeshStandardMaterial({
      color: 0xc48c58,
      metalness: 0.85,
      roughness: 0.25,
      transparent: true,
      opacity: 1,
    });

    // 4. Extruded Geometry - The Central Airplane
    const aircraftShape = createShape(AIRCRAFT_SVG_POINTS);
    const planeGeometry = new THREE.ExtrudeGeometry(aircraftShape, {
      depth: 0.16,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    });
    planeGeometry.center();

    const planeMesh = new THREE.Mesh(planeGeometry, [planeMaterial, planeBevelMaterial]);
    const planeGroup = new THREE.Group();
    planeGroup.add(planeMesh);

    // Add 3D Center Dorsal Spine detail to airplane
    const spineGeo = new THREE.CylinderGeometry(0.02, 0.04, 3.4, 8);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0xfce8d0,
      metalness: 0.95,
      roughness: 0.15,
    });
    const spineMesh = new THREE.Mesh(spineGeo, spineMat);
    spineMesh.position.set(0, 0.15, 0.12);
    planeGroup.add(spineMesh);

    // Add 3D Engine Exhaust Plumes (Contrails) attached to planeGroup
    const contrailGeo = new THREE.CylinderGeometry(0.08, 0.35, 3.2, 12, 1, true);
    contrailGeo.translate(0, -1.6, 0);
    const contrailMaterial = new THREE.MeshBasicMaterial({
      color: 0xffb770,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    const contrailMesh = new THREE.Mesh(contrailGeo, contrailMaterial);
    contrailMesh.position.set(0, -1.6, 0.05);
    planeGroup.add(contrailMesh);

    scene.add(planeGroup);

    // 5. Extruded Geometry - Left and Right Strips (Launch Pillars)
    const leftStripsGroup = new THREE.Group();
    LEFT_STRIPS_POINTS.forEach((pts) => {
      const shape = createShape(pts);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.24,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.025,
        bevelThickness: 0.025,
      });
      const mesh = new THREE.Mesh(geo, [stripsMaterial, stripsBevelMaterial]);
      leftStripsGroup.add(mesh);
    });
    scene.add(leftStripsGroup);

    const rightStripsGroup = new THREE.Group();
    RIGHT_STRIPS_POINTS.forEach((pts) => {
      const shape = createShape(pts);
      const geo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.24,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.025,
        bevelThickness: 0.025,
      });
      const mesh = new THREE.Mesh(geo, [stripsMaterial, stripsBevelMaterial]);
      rightStripsGroup.add(mesh);
    });
    scene.add(rightStripsGroup);

    // Align all elements to exact common center origin
    planeGroup.position.set(0, 0, 0.04);
    leftStripsGroup.position.set(0, 0, -0.04);
    rightStripsGroup.position.set(0, 0, -0.04);

    // Save scene references
    sceneRef.current = {
      planeGroup,
      leftStripsGroup,
      rightStripsGroup,
      contrailMesh,
      contrailMaterial,
      afterburnerLight,
      stripsMaterial,
      stripsBevelMaterial,
      planeMaterial,
      targetProgress: progress,
      currentProgress: progress,
    };

    // 6. Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          // Scale camera Z distance to fit neatly on mobile vs desktop
          camera.position.z = w < 300 ? 9.6 : w < 400 ? 9.2 : 8.8;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // 7. Render Animation Loop (60-120fps)
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const state = sceneRef.current;
      if (!state) return;

      // Instant, silky-smooth progress tracking with zero scroll lag
      state.currentProgress = state.targetProgress;
      const p = Math.max(0, Math.min(1, state.currentProgress));

      // STRICTLY LOCK ALL ROTATIONS TO ZERO:
      // Absolutely no revolving, no yaw/pitch/roll rotation, no tilting
      scene.rotation.set(0, 0, 0);
      state.planeGroup.rotation.set(0, 0, 0);
      state.leftStripsGroup.rotation.set(0, 0, 0);
      state.rightStripsGroup.rotation.set(0, 0, 0);

      // ========================================================
      // 3D TAKEOFF PHYSICS (Starts IMMEDIATELY on scroll at p = 0)
      // ========================================================
      if (p <= 0.20) {
        // CONTINUOUS ASCENT: Plane ascends straight UP (+Y) immediately as user scrolls
        const climbP = p / 0.20;
        const climbEase = Math.pow(climbP, 1.4);

        // Y ascends smoothly from 0 to 20.0 units immediately
        state.planeGroup.position.set(0, climbEase * 20.0, 0.04 + climbP * 0.45);
        state.planeGroup.scale.setScalar(1 + climbP * 0.25);

        // Strips stay grounded and dissolve smoothly
        state.leftStripsGroup.position.set(0, 0, -0.04);
        state.rightStripsGroup.position.set(0, 0, -0.04);
        const stripAlpha = Math.max(0, 1 - climbP * 1.8);
        state.stripsMaterial.opacity = stripAlpha;
        state.stripsBevelMaterial.opacity = stripAlpha;

        // Contrail trails & engine afterburner ignite immediately
        state.contrailMaterial.opacity = climbP < 0.7 ? climbP * 1.2 : Math.max(0, (1 - climbP) * 3);
        state.contrailMesh.scale.set(1, 0.3 + climbP * 2.2, 1);
        state.afterburnerLight.intensity = Math.sin(climbP * Math.PI) * 6.0;
        state.afterburnerLight.position.y = -3.1 + climbEase * 20.0;
      } else {
        // AIRBORNE / OUT OF VIEW
        state.planeGroup.position.set(0, 30, 0.49);
        state.contrailMaterial.opacity = 0;
        state.stripsMaterial.opacity = 0;
        state.stripsBevelMaterial.opacity = 0;
        state.afterburnerLight.intensity = 0;
      }

      // Live HUD DOM updates (Immediate fade out on scroll)
      const hudEl = document.getElementById('logo3d-flight-hud');
      const badgeEl = document.getElementById('logo3d-flight-badge');
      const statusEl = document.getElementById('logo3d-flight-status');
      const altEl = document.getElementById('logo3d-flight-altitude');
      const glowEl = document.getElementById('logo3d-flight-glow');

      if (hudEl) {
        const hudAlpha = Math.max(0, 1 - p / 0.12);
        hudEl.style.opacity = `${hudAlpha}`;
      }
      if (badgeEl) {
        const badgeAlpha = Math.max(0, 1 - p / 0.14);
        badgeEl.style.opacity = `${badgeAlpha}`;
        badgeEl.style.transform = `translate(-50%, ${p * 15}px)`;
      }
      if (statusEl && altEl) {
        if (p < 0.02) {
          statusEl.textContent = '3D FLIGHT READY';
          altEl.textContent = 'ALT 0 FT';
        } else if (p < 0.28) {
          statusEl.textContent = 'CLIMBING';
          const climbP = Math.min(1, p / 0.26);
          altEl.textContent = `ALT ${Math.round(climbP * 35000)} FT`;
        } else {
          statusEl.textContent = 'AIRBORNE';
          altEl.textContent = 'ALT 35,000 FT';
        }
      }
      if (glowEl) {
        const glowAlpha = p <= 0.22 ? 1 : Math.max(0, 1 - (p - 0.22) / 0.15);
        glowEl.style.opacity = `${glowAlpha}`;
      }

      renderer.render(scene, camera);
    };

    // Hook directly into ScrollTrigger for silky-smooth scrub with zero React re-render lag
    let scrollTriggerInstance: ScrollTrigger | null = null;
    const heroContainer = document.getElementById('hero-scroll-container');
    if (heroContainer) {
      scrollTriggerInstance = ScrollTrigger.create({
        trigger: heroContainer,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.05,
        onUpdate: (self) => {
          if (sceneRef.current) {
            sceneRef.current.targetProgress = self.progress;
          }
        },
      });
    }

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
      renderer.dispose();
      planeGeometry.dispose();
      spineGeo.dispose();
      contrailGeo.dispose();
      planeMaterial.dispose();
      planeBevelMaterial.dispose();
      stripsMaterial.dispose();
      stripsBevelMaterial.dispose();
      contrailMaterial.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* Ambient Runway / Luxury Radial Glow */}
      <div
        id="logo3d-flight-glow"
        className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-700 will-change-transform"
        style={{
          background: isExpanded
            ? 'radial-gradient(circle at 50% 50%, rgba(226,183,133,0.18) 0%, rgba(196,140,88,0.06) 45%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(196,140,88,0.22) 0%, rgba(196,140,88,0.08) 42%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Outer Telemetry & Compass Dial (Contained responsively) */}
      <div
        id="logo3d-flight-hud"
        className="absolute inset-[-4%] sm:inset-[-8%] lg:inset-[-12%] pointer-events-none rounded-full border border-[#c48c58]/20 flex items-center justify-center will-change-[transform,opacity]"
      >
        <div className="absolute top-1.5 sm:top-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          N · 000°
        </div>
        <div className="absolute bottom-1.5 sm:bottom-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          S · 180°
        </div>
        <div className="absolute left-1.5 sm:left-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          W
        </div>
        <div className="absolute right-1.5 sm:right-2 font-mono text-[8px] sm:text-[9px] tracking-widest text-[#c48c58]/60">
          E
        </div>
        <div className="w-[90%] h-[90%] rounded-full border border-dashed border-[#c48c58]/15" />
      </div>

      {/* The 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block drop-shadow-[0_20px_35px_rgba(24,21,18,0.2)]"
      />

      {/* Floating Aviation Flight Telemetry Badge */}
      <div
        id="logo3d-flight-badge"
        className="absolute -bottom-5 sm:-bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#181512]/90 text-[#fbf9f5] border border-[#c48c58]/35 backdrop-blur-md shadow-lg pointer-events-none font-mono text-[9px] sm:text-[10px] tracking-wider whitespace-nowrap will-change-[transform,opacity]"
      >
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c48c58] opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#c48c58]" />
        </span>
        <span id="logo3d-flight-status" className="text-[#c48c58] font-semibold">
          3D FLIGHT READY
        </span>
        <span className="text-[#8a8278]">·</span>
        <span id="logo3d-flight-altitude">ALT 0 FT</span>
      </div>
    </div>
  );
}
