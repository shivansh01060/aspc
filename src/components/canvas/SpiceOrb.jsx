import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ── Spice-themed colour palettes — cycles on click ──────────
const SPICE_PALETTES = [
  {
    main: "#E8A020",
    emissive: "#7B4A08",
    wire: "#C45E1A",
    ring: "#E8A020",
    name: "Turmeric",
  },
  {
    main: "#C0392B",
    emissive: "#7B1A10",
    wire: "#F5C842",
    ring: "#C0392B",
    name: "Red Chilli",
  },
  {
    main: "#4E7C59",
    emissive: "#1A4A2A",
    wire: "#E8B820",
    ring: "#6AAF7A",
    name: "Cardamom",
  },
  {
    main: "#9B59B6",
    emissive: "#4A1A6B",
    wire: "#E8A020",
    ring: "#C39BD3",
    name: "Black Pepper",
  },
  {
    main: "#D4A017",
    emissive: "#7A5508",
    wire: "#C0392B",
    ring: "#D4A017",
    name: "Cumin",
  },
];

export default function SpiceOrb() {
  const groupRef = useRef();
  const orbRef = useRef();
  const matRef = useRef();
  const innerRef = useRef();
  const wireRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const burstRef = useRef();
  const burst2Ref = useRef();

  const { mouse, gl } = useThree();

  // ── Interaction state (all refs to avoid re-renders) ──────
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const manualRot = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);
  const hoverAmt = useRef(0);
  const paletteIdx = useRef(0);
  const currentPalette = useRef(SPICE_PALETTES[0]);
  const burst = useRef({ active: false, scale: 0.01, opacity: 0 });
  const burst2 = useRef({ active: false, scale: 0.01, opacity: 0 });
  const clickCooldown = useRef(false);

  // ── Pointer handlers ──────────────────────────────────────
  const onPointerDown = (e) => {
    e.stopPropagation();
    isDragging.current = true;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    gl.domElement.style.cursor = "grabbing";
  };

  const onPointerUp = () => {
    isDragging.current = false;
    gl.domElement.style.cursor = isHovered.current ? "grab" : "default";
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;
    // Accumulate velocity for inertia
    velocity.current.x = dy * 0.01;
    velocity.current.y = dx * 0.01;
    manualRot.current.x += velocity.current.x;
    manualRot.current.y += velocity.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const onClick = (e) => {
    e.stopPropagation();
    if (clickCooldown.current) return;
    clickCooldown.current = true;
    setTimeout(() => (clickCooldown.current = false), 600);

    // Cycle palette
    paletteIdx.current = (paletteIdx.current + 1) % SPICE_PALETTES.length;
    currentPalette.current = SPICE_PALETTES[paletteIdx.current];

    // Fire two staggered burst rings
    burst.current = { active: true, scale: 0.5, opacity: 1.0 };
    setTimeout(() => {
      burst2.current = { active: true, scale: 0.5, opacity: 0.7 };
    }, 120);
  };

  const onPointerEnter = () => {
    isHovered.current = true;
    gl.domElement.style.cursor = "grab";
  };

  const onPointerLeave = () => {
    isHovered.current = false;
    if (!isDragging.current) gl.domElement.style.cursor = "default";
    isDragging.current = false;
  };

  // ── Animation loop ─────────────────────────────────────────
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const pal = currentPalette.current;

    // Hover smoothing
    const hoverGoal = isHovered.current ? 1 : 0;
    hoverAmt.current += (hoverGoal - hoverAmt.current) * 0.06;
    const h = hoverAmt.current;

    // Inertia decay when not dragging
    if (!isDragging.current) {
      velocity.current.x *= 0.93;
      velocity.current.y *= 0.93;
      manualRot.current.x += velocity.current.x;
      manualRot.current.y += velocity.current.y;

      // Gentle mouse parallax
      mouseTarget.current.x += (mouse.y * 0.3 - mouseTarget.current.x) * 0.04;
      mouseTarget.current.y += (mouse.x * 0.3 - mouseTarget.current.y) * 0.04;
    }

    // Group rotation — manual drag + auto-spin + mouse parallax
    if (groupRef.current) {
      groupRef.current.rotation.y =
        manualRot.current.y + (isDragging.current ? 0 : t * 0.18);
      groupRef.current.rotation.x =
        manualRot.current.x + (isDragging.current ? 0 : mouseTarget.current.x);
    }

    // ── Core orb material ─────────────────────────────────
    if (matRef.current) {
      const distortGoal = 0.15 + h * 0.38 + Math.sin(t * 1.8) * 0.04;
      matRef.current.distort += (distortGoal - matRef.current.distort) * 0.05;
      matRef.current.emissiveIntensity =
        0.35 + h * 0.55 + Math.sin(t * 3.5) * 0.08 * h;

      matRef.current.color.lerp(new THREE.Color(pal.main), 0.05);
      matRef.current.emissive.lerp(new THREE.Color(pal.emissive), 0.05);
    }

    // ── Inner glow core ───────────────────────────────────
    if (innerRef.current) {
      const s = 1 + Math.sin(t * 2.5) * 0.06 + h * 0.18;
      innerRef.current.scale.setScalar(s);
      innerRef.current.material.opacity = 0.22 + h * 0.42;
      innerRef.current.material.emissiveIntensity = 0.6 + h * 1.0;
      innerRef.current.material.color.lerp(new THREE.Color(pal.main), 0.04);
      innerRef.current.material.emissive.lerp(
        new THREE.Color(pal.emissive),
        0.04,
      );
    }

    // ── Wire cage — counter-rotates, brightens on hover ───
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * (0.2 + h * 0.35);
      wireRef.current.rotation.z = Math.sin(t * 0.45) * 0.1;
      wireRef.current.material.opacity = 0.14 + h * 0.3;
      wireRef.current.material.color.lerp(new THREE.Color(pal.wire), 0.05);
    }

    // ── Equatorial ring ───────────────────────────────────
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = t * 0.14;
      ring1Ref.current.rotation.x = Math.sin(t * 0.35) * 0.12;
      ring1Ref.current.rotation.z -= delta * 0.07;
      ring1Ref.current.material.opacity = 0.55 + h * 0.35;
      ring1Ref.current.material.color.lerp(new THREE.Color(pal.ring), 0.05);
      ring1Ref.current.material.emissive.lerp(
        new THREE.Color(pal.emissive),
        0.05,
      );
      ring1Ref.current.material.emissiveIntensity = 0.5 + h * 0.6;
    }

    // ── Polar ring ────────────────────────────────────────
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = t * 0.1;
      ring2Ref.current.rotation.y = Math.sin(t * 0.28) * 0.08;
      ring2Ref.current.material.opacity = 0.3 + h * 0.35;
      ring2Ref.current.material.color.lerp(new THREE.Color(pal.wire), 0.05);
    }

    // ── Diagonal ring ─────────────────────────────────────
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -t * 0.08;
      ring3Ref.current.rotation.x = t * 0.06;
      ring3Ref.current.material.opacity = 0.1 + h * 0.45;
      ring3Ref.current.material.color.lerp(new THREE.Color(pal.ring), 0.05);
    }

    // ── Burst ring 1 ──────────────────────────────────────
    if (burst.current.active && burstRef.current) {
      burst.current.scale += delta * 4.5;
      burst.current.opacity -= delta * 2.8;
      burstRef.current.scale.setScalar(burst.current.scale);
      burstRef.current.material.opacity = Math.max(0, burst.current.opacity);
      burstRef.current.material.color.set(pal.main);
      burstRef.current.material.emissive.set(pal.main);
      if (burst.current.opacity <= 0) {
        burst.current.active = false;
        burstRef.current.scale.setScalar(0.001);
      }
    }

    // ── Burst ring 2 (staggered) ──────────────────────────
    if (burst2.current.active && burst2Ref.current) {
      burst2.current.scale += delta * 3.2;
      burst2.current.opacity -= delta * 2.2;
      burst2Ref.current.scale.setScalar(burst2.current.scale);
      burst2Ref.current.material.opacity = Math.max(0, burst2.current.opacity);
      burst2Ref.current.material.color.set(pal.ring);
      burst2Ref.current.material.emissive.set(pal.emissive);
      if (burst2.current.opacity <= 0) {
        burst2.current.active = false;
        burst2Ref.current.scale.setScalar(0.001);
      }
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      {/* ── Core orb ─────────────────────────────────────── */}
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1.15, 5]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#E8A020"
          emissive="#7B4A08"
          emissiveIntensity={0.35}
          roughness={0.18}
          metalness={0.18}
          distort={0.18}
          speed={1.8}
        />
      </mesh>

      {/* ── Inner glow ────────────────────────────────────── */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[0.82, 32, 32]} />
        <meshStandardMaterial
          color="#F5C842"
          emissive="#C47A0A"
          emissiveIntensity={0.6}
          roughness={0.05}
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* ── Wireframe cage ────────────────────────────────── */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.44, 2]} />
        <meshBasicMaterial
          color="#C45E1A"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      {/* ── Equatorial orbit ring ─────────────────────────── */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.78, 0.016, 8, 80]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#C47A0A"
          emissiveIntensity={0.5}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ── Polar orbit ring ──────────────────────────────── */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.78, 0.011, 8, 80]} />
        <meshStandardMaterial
          color="#C45E1A"
          emissive="#A04010"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ── Diagonal ring (new) ───────────────────────────── */}
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 5, 0]}>
        <torusGeometry args={[2.05, 0.009, 8, 80]} />
        <meshStandardMaterial
          color="#E8B820"
          emissive="#A08010"
          emissiveIntensity={0.3}
          transparent
          opacity={0.1}
        />
      </mesh>

      {/* ── Click burst ring 1 ────────────────────────────── */}
      <mesh ref={burstRef} rotation={[Math.PI / 2, 0, 0]} scale={0.001}>
        <torusGeometry args={[1.8, 0.045, 8, 60]} />
        <meshStandardMaterial
          color="#F5C842"
          emissive="#E8A020"
          emissiveIntensity={2.0}
          transparent
          opacity={0}
        />
      </mesh>

      {/* ── Click burst ring 2 ────────────────────────────── */}
      <mesh
        ref={burst2Ref}
        rotation={[Math.PI / 3, Math.PI / 6, 0]}
        scale={0.001}
      >
        <torusGeometry args={[1.8, 0.03, 8, 60]} />
        <meshStandardMaterial
          color="#E8A020"
          emissive="#C47A0A"
          emissiveIntensity={1.8}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
