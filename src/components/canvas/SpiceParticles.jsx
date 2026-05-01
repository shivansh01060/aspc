import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPICE_COLORS = [
  "#E8A020", // turmeric
  "#C45E1A", // spice
  "#C0392B", // red chilli
  "#8B6914", // cumin
  "#4E7C59", // cardamom
  "#D4A017", // yellow chili
  "#8B3A1A", // garam masala
  "#7B8B3A", // coriander
];

export default function SpiceParticles({ count = 120 }) {
  const pointsRef = useRef();

  const { positions, colors, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random sphere shell distribution
      const radius = 2.8 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const hex = SPICE_COLORS[Math.floor(Math.random() * SPICE_COLORS.length)];
      const c = new THREE.Color(hex);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      speeds[i] = 0.02 + Math.random() * 0.06;
    }

    return { positions, colors, speeds };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.z -= 0.001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}
