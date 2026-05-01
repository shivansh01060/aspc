import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";

export default function MortarPestle() {
  const groupRef = useRef();
  const pestleRef = useRef();
  const rimRef = useRef();
  const { mouse } = useThree();

  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Slow rotate whole group
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;

      // Mouse parallax tilt
      target.current.x += (mouse.y * 0.2 - target.current.x) * 0.04;
      target.current.y += (mouse.x * 0.1 - target.current.y) * 0.04;
      groupRef.current.rotation.x = target.current.x;
    }

    // Pestle grinds in a gentle circle
    if (pestleRef.current) {
      pestleRef.current.position.x = Math.sin(t * 1.2) * 0.22;
      pestleRef.current.position.z = Math.cos(t * 1.2) * 0.22;
      pestleRef.current.rotation.z = Math.sin(t * 1.2) * 0.18;
    }

    // Rim pulses subtly
    if (rimRef.current) {
      rimRef.current.rotation.y -= delta * 0.15;
    }
  });

  const stoneColor = "#C4A882";
  const stoneDark = "#8B6914";
  const stoneEmit = "#5C3D1E";
  const pestleColor = "#D4B896";

  return (
    <group ref={groupRef}>
      {/* ── Mortar body (outer wall) ─────────────── */}
      {/* Bottom base disc */}
      <mesh position={[0, -0.82, 0]}>
        <cylinderGeometry args={[0.85, 0.7, 0.14, 40]} />
        <meshStandardMaterial
          color={stoneDark}
          roughness={0.9}
          metalness={0.0}
          emissive={stoneEmit}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Outer cylinder wall */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[1.1, 0.85, 1.05, 40, 1, true]} />
        <meshStandardMaterial
          color={stoneColor}
          roughness={0.85}
          metalness={0.02}
          side={2}
        />
      </mesh>

      {/* Inner bowl (hemisphere) — darker stone */}
      <mesh position={[0, -0.28, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry
          args={[0.9, 40, 40, 0, Math.PI * 2, 0, Math.PI * 0.55]}
        />
        <meshStandardMaterial
          color={stoneDark}
          roughness={0.95}
          metalness={0.0}
          emissive={stoneEmit}
          emissiveIntensity={0.08}
          side={2}
        />
      </mesh>

      {/* Top rim ring */}
      <mesh ref={rimRef} position={[0, 0.25, 0]}>
        <torusGeometry args={[1.08, 0.09, 14, 60]} />
        <meshStandardMaterial
          color={stoneDark}
          roughness={0.8}
          metalness={0.05}
          emissive={stoneEmit}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* ── Pestle ───────────────────────────────── */}
      <group ref={pestleRef} position={[0, 0.5, 0]}>
        {/* Handle — tapered cylinder */}
        <mesh position={[0, 0.85, 0]} rotation={[0.15, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.2, 1.6, 24]} />
          <meshStandardMaterial
            color={pestleColor}
            roughness={0.75}
            metalness={0.0}
          />
        </mesh>

        {/* Grinding head — rounded bottom */}
        <mesh position={[0, -0.08, 0]}>
          <sphereGeometry args={[0.26, 28, 28]} />
          <meshStandardMaterial
            color={stoneDark}
            roughness={0.9}
            metalness={0.0}
            emissive={stoneEmit}
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>

      {/* ── Spice powder glow inside bowl ────────── */}
      <mesh position={[0, -0.55, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.08, 32]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#C47A0A"
          emissiveIntensity={0.8}
          transparent
          opacity={0.55}
          roughness={0.3}
        />
      </mesh>

      {/* ── Decorative outer glow ring ────────────── */}
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.35, 0.012, 8, 80]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#C47A0A"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
