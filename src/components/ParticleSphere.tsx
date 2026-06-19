"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate sphere particles
  const count = 3500;
  const [positions, originalPositions, randomDirections] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const dirs = new Float32Array(count * 3);
    const radius = 2.2;

    for (let i = 0; i < count; i++) {
      // Uniform distribution on a sphere
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      // Random direction for explosion
      dirs[i * 3] = (Math.random() - 0.5) * 4;
      dirs[i * 3 + 1] = (Math.random() - 0.5) * 4;
      dirs[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }

    return [pos, orig, dirs];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const posAttr = pointsRef.current.geometry.attributes.position;
    if (!posAttr || !posAttr.array) return;

    const time = state.clock.getElapsedTime();
    const pointer = state.pointer; // Mouse coordinates from -1 to 1
    const array = posAttr.array as Float32Array;

    // React to time (exploding and reforming)
    // Create a smooth pulsation where it expands and contracts
    const explodeFactor = Math.abs(Math.sin(time * 0.4)) * 0.8;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Base coordinates on the sphere
      const ox = originalPositions[idx];
      const oy = originalPositions[idx + 1];
      const oz = originalPositions[idx + 2];

      // Exploded coordinates
      const ex = ox + randomDirections[idx] * explodeFactor;
      const ey = oy + randomDirections[idx + 1] * explodeFactor;
      const ez = oz + randomDirections[idx + 2] * explodeFactor;

      // Mouse interactive deflection force
      const mx = pointer.x * 3.5;
      const my = pointer.y * 3.5;
      
      const dx = ex - mx;
      const dy = ey - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let force = 0;
      if (dist < 1.8) {
        force = (1.8 - dist) * 0.35; // deflection force strength
      }

      // Lerp current positions to calculated targets (exploded + mouse deflection)
      array[idx] = THREE.MathUtils.lerp(array[idx], ex + (dx / (dist + 0.001)) * force, 0.08);
      array[idx + 1] = THREE.MathUtils.lerp(array[idx + 1], ey + (dy / (dist + 0.001)) * force, 0.08);
      array[idx + 2] = THREE.MathUtils.lerp(array[idx + 2], ez, 0.08);
    }

    posAttr.needsUpdate = true;

    // Rotation speeds
    pointsRef.current.rotation.y = time * 0.04;
    pointsRef.current.rotation.x = time * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#2997ff"
        size={0.035}
        sizeAttenuation={true}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleSphere() {
  return (
    <div className="absolute inset-0 w-full h-full min-h-screen z-0 pointer-events-none opacity-60">
      <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  );
}
