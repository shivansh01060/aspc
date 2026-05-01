import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Float, Preload } from "@react-three/drei";
import MortarPestle from "./Mortarpestle";
import SpiceParticles from "./SpiceParticles";
import FloatingSpices from "./FloatingSpices";

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      {/* Warm earthy lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 8, 4]} intensity={1.6} color="#F5C842" />
      <directionalLight
        position={[-4, -2, -4]}
        intensity={0.5}
        color="#C45E1A"
      />
      <pointLight position={[0, 2, 4]} intensity={1.2} color="#E8A020" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#FAF7F0" />

      <Suspense fallback={null}>
        {/* Mortar & pestle with subtle float */}
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
          <MortarPestle />
        </Float>

        {/* Orbiting spice spheres */}
        <FloatingSpices />

        {/* Background spice dust particles */}
        <SpiceParticles count={120} />

        <Preload all />
      </Suspense>
    </Canvas>
  );
}
