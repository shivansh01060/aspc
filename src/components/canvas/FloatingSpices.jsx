import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Each entry: [orbitRadius, orbitSpeed, orbitTilt, color, size, phaseOffset]
const SPICE_ORBITS = [
  { r: 2.4, speed: 0.55, tilt: 0.4, color: "#C0392B", size: 0.12, phase: 0 }, // Red Chilli
  { r: 2.8, speed: 0.38, tilt: -0.6, color: "#E8A020", size: 0.1, phase: 1.0 }, // Haldi
  { r: 2.2, speed: 0.7, tilt: 0.9, color: "#8B6914", size: 0.09, phase: 2.1 }, // Cumin
  { r: 3.0, speed: 0.28, tilt: -0.3, color: "#4E7C59", size: 0.11, phase: 3.5 }, // Cardamom
  { r: 2.6, speed: 0.5, tilt: 1.1, color: "#2C2C2C", size: 0.08, phase: 4.2 }, // Black Pepper
  { r: 2.0, speed: 0.8, tilt: -0.8, color: "#D4A017", size: 0.09, phase: 0.8 }, // Yellow Chili
  { r: 3.2, speed: 0.22, tilt: 0.2, color: "#8B3A1A", size: 0.13, phase: 5.1 }, // Garam Masala
  { r: 2.5, speed: 0.6, tilt: -1.2, color: "#7B8B3A", size: 0.08, phase: 2.8 }, // Coriander
];

function OrbitingSphere({ r, speed, tilt, color, size, phase }) {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = t * speed + phase;

    ref.current.position.x = Math.cos(angle) * r;
    ref.current.position.y = Math.sin(angle * 0.6) * r * Math.sin(tilt);
    ref.current.position.z = Math.sin(angle) * r * Math.cos(tilt);

    // Pulse scale slightly
    const pulse = 1 + Math.sin(t * 2 + phase) * 0.12;
    ref.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        roughness={0.3}
        metalness={0.1}
      />
    </mesh>
  );
}

export default function FloatingSpices() {
  return (
    <group>
      {SPICE_ORBITS.map((props, i) => (
        <OrbitingSphere key={i} {...props} />
      ))}
    </group>
  );
}
