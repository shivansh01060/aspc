import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Float, Preload, Environment } from "@react-three/drei";
import SpiceOrb from "./SpiceOrb";
import SpiceParticles from "./SpiceParticles";
import FloatingSpices from "./FloatingSpices";

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      {/* ── Lighting — warm, rich, layered ── */}
      <ambientLight intensity={0.5} color="#FFF3DC" />

      {/* Key light — warm golden from upper-right */}
      <directionalLight
        position={[5, 8, 4]}
        intensity={2.0}
        color="#F5C842"
        castShadow
      />

      {/* Rim light — spicy orange from lower-left */}
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.8}
        color="#C8421A"
      />

      {/* Fill point — soft warm white from front */}
      <pointLight position={[0, 3, 5]} intensity={1.5} color="#FFF8ED" />

      {/* Under-glow — turmeric gold from below */}
      <pointLight position={[0, -3, 1]} intensity={1.0} color="#E8A020" />

      {/* Accent — deep red from behind for depth */}
      <pointLight position={[-3, 1, -4]} intensity={0.6} color="#9B2D1A" />

      <Suspense fallback={null}>
        {/* ── Central hero orb with gentle float ── */}
        <Float
          speed={1.8}
          rotationIntensity={0.3}
          floatIntensity={0.5}
          floatingRange={[-0.15, 0.15]}
        >
          <SpiceOrb />
        </Float>

        {/* ── Orbiting spice spheres ── */}
        <FloatingSpices />

        {/* ── Background particle dust ── */}
        <SpiceParticles count={180} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
