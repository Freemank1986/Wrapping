"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  RoundedBox,
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  Float,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import type * as THREE from "three";

const GOLD = "#f0c667";

function RibbonMaterial() {
  return (
    <meshStandardMaterial
      color={GOLD}
      emissive={GOLD}
      emissiveIntensity={0.35}
      roughness={0.25}
      metalness={0.7}
    />
  );
}

/** Ribbon straps + bow, pushed slightly outside the glass box surface so it
 * doesn't intersect (and visually corrupt) the transmission material's
 * render-to-texture pass. */
function Ribbon() {
  const strapZ = 0.83;
  return (
    <group>
      {/* straps wrapping the box, offset just outside the glass surface */}
      <mesh position={[0, 0, strapZ]}>
        <boxGeometry args={[0.26, 1.66, 0.03]} />
        <RibbonMaterial />
      </mesh>
      <mesh position={[0, 0, -strapZ]}>
        <boxGeometry args={[0.26, 1.66, 0.03]} />
        <RibbonMaterial />
      </mesh>
      <mesh position={[strapZ, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.26, 1.66, 0.03]} />
        <RibbonMaterial />
      </mesh>
      <mesh position={[-strapZ, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.26, 1.66, 0.03]} />
        <RibbonMaterial />
      </mesh>

      {/* bow, sitting on the lid */}
      <group position={[0, 0.9, 0]}>
        {/* loops: partial-arc tori read as open ribbon loops, not rings */}
        <mesh position={[-0.34, 0, 0]} rotation={[Math.PI / 2.3, 0, 0.3]}>
          <torusGeometry args={[0.3, 0.075, 12, 24, Math.PI * 1.5]} />
          <RibbonMaterial />
        </mesh>
        <mesh position={[0.34, 0, 0]} rotation={[Math.PI / 2.3, 0, -0.3 + Math.PI]}>
          <torusGeometry args={[0.3, 0.075, 12, 24, Math.PI * 1.5]} />
          <RibbonMaterial />
        </mesh>

        {/* tails */}
        <mesh position={[-0.12, -0.22, 0.1]} rotation={[0.3, 0, 0.35]}>
          <coneGeometry args={[0.08, 0.42, 4]} />
          <RibbonMaterial />
        </mesh>
        <mesh position={[0.12, -0.22, 0.1]} rotation={[0.3, 0, -0.35]}>
          <coneGeometry args={[0.08, 0.42, 4]} />
          <RibbonMaterial />
        </mesh>

        {/* knot */}
        <mesh>
          <sphereGeometry args={[0.15, 24, 24]} />
          <RibbonMaterial />
        </mesh>

        {/* glow source, matching the reference art's glowing ribbon */}
        <pointLight position={[0, 0, 0.4]} color={GOLD} intensity={0.9} distance={2.4} />
      </group>
    </group>
  );
}

function GlassBox() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.22;
  });

  return (
    <group ref={group}>
      <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.1} smoothness={6}>
        <MeshTransmissionMaterial
          samples={6}
          resolution={512}
          thickness={0.6}
          roughness={0.02}
          transmission={1}
          ior={1.3}
          chromaticAberration={0.02}
          anisotropy={0.1}
          distortion={0.05}
          distortionScale={0.1}
          temporalDistortion={0.03}
          color="#ffffff"
        />
      </RoundedBox>
      <Ribbon />
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.85, 0]}>
      <planeGeometry args={[12, 12]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={1}
        mixStrength={25}
        roughness={1}
        depthScale={1}
        minDepthThreshold={0.85}
        color="#050d15"
        metalness={0.3}
      />
    </mesh>
  );
}

function StudioLights() {
  return (
    <Environment resolution={256}>
      <group rotation={[0, 0.5, 0]}>
        <Lightformer intensity={3} color="#6fc4dd" position={[-4, 2, -2]} scale={[4, 4, 1]} />
        <Lightformer intensity={2.5} color={GOLD} position={[4, 1, 2]} scale={[3, 3, 1]} />
        <Lightformer intensity={2} color="#ffffff" position={[0, 4, 3]} scale={[5, 2, 1]} />
        <Lightformer intensity={2} color="#ffffff" position={[0, -3, 2]} scale={[6, 2, 1]} />
      </group>
    </Environment>
  );
}

export function GlassGiftScene() {
  return (
    <Canvas
      camera={{ position: [2.2, 1.1, 3], fov: 34 }}
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 2]} intensity={0.7} />
      <directionalLight position={[-3, 1, -2]} intensity={0.25} color="#bfe6f2" />
      <StudioLights />

      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
        <GlassBox />
      </Float>

      <Floor />

      <EffectComposer>
        <Bloom intensity={0.35} luminanceThreshold={0.65} luminanceSmoothing={0.25} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.55} />
      </EffectComposer>
    </Canvas>
  );
}
