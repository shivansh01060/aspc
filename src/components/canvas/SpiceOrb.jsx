import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export default function SpiceOrb() {
  const orbRef = useRef();
  const wireRef = useRef();
  const outerRef = useRef();
  const { mouse } = useThree();

  // Target rotation for smooth mouse-follow
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Smooth mouse parallax
    target.current.x += (mouse.y * 0.25 - target.current.x) * 0.04;
    target.current.y += (mouse.x * 0.25 - target.current.y) * 0.04;

    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.25;
      orbRef.current.rotation.x = target.current.x;
    }

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.18;
      wireRef.current.rotation.z = Math.sin(t * 0.4) * 0.08;
    }

    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.12;
      outerRef.current.rotation.x = Math.sin(t * 0.3) * 0.1;
      outerRef.current.rotation.z -= delta * 0.06;
    }
  });

  return (
    <group>
      {/* Core orb — distorted sphere for organic look */}
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1.15, 5]} />
        <MeshDistortMaterial
          color="#E8A020"
          emissive="#7B4A08"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.15}
          distort={0.18}
          speed={1.5}
        />
      </mesh>

      {/* Inner glowing core */}
      <mesh>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial
          color="#F5C842"
          emissive="#C47A0A"
          emissiveIntensity={0.6}
          roughness={0.05}
          metalness={0.0}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Wireframe cage — counter-rotates */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.42, 2]} />
        <meshBasicMaterial
          color="#C45E1A"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Outer rotating ring */}
      <mesh ref={outerRef}>
        <torusGeometry args={[1.75, 0.015, 8, 80]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#C47A0A"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Second ring — perpendicular */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.75, 0.01, 8, 80]} />
        <meshStandardMaterial
          color="#C45E1A"
          emissive="#A04010"
          emissiveIntensity={0.4}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}
