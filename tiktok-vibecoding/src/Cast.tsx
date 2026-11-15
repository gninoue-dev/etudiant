import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Vibe } from "./Vibe";
import { AIBot } from "./AIBot";

const Rig: React.FC = () => {
  const { camera } = useThree();
  camera.position.set(0, 3.2, 13);
  camera.lookAt(0, 2.0, 0);
  return null;
};

// Planche de personnages : Vibe + Pixel (l'IA), expressions « happy » et « oops ».
export const Cast: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#1a0f3d" }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 38 }} shadows>
        <Rig />
        <color attach="background" args={["#1a0f3d"]} />
        <ambientLight intensity={1.7} color="#aaa0ff" />
        <directionalLight position={[4, 8, 6]} intensity={3} castShadow />
        <pointLight position={[-4, 3, -3]} intensity={40} color="#ff3dbd" />
        <pointLight position={[4, 2, -3]} intensity={40} color="#2de2ff" />
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <cylinderGeometry args={[5, 5, 0.2, 48]} />
          <meshStandardMaterial color="#d61f8a" roughness={0.5} />
        </mesh>
        <group position={[-1.25, 0, 0]} rotation={[0, 0.3, 0]}><Vibe t={frame} mode="idle" /></group>
        <group position={[1.15, 0.6, 0.5]} rotation={[0, -0.35, 0]}><AIBot t={frame} mood="happy" /></group>
      </ThreeCanvas>
      <div style={{ position: "absolute", top: 230, left: 0, right: 0, textAlign: "center", fontFamily: "Arial, sans-serif", fontWeight: 900, fontSize: 90, color: "#fff", WebkitTextStroke: "9px #000", paintOrder: "stroke fill" }}>
        VIBE &amp; PIXEL
      </div>
    </AbsoluteFill>
  );
};

export const CastOops: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#1a0f3d" }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 38 }} shadows>
        <Rig />
        <color attach="background" args={["#1a0f3d"]} />
        <ambientLight intensity={1.7} color="#aaa0ff" />
        <directionalLight position={[4, 8, 6]} intensity={3} castShadow />
        <pointLight position={[-4, 3, -3]} intensity={40} color="#ff3dbd" />
        <pointLight position={[4, 2, -3]} intensity={40} color="#2de2ff" />
        <mesh position={[0, -0.1, 0]} receiveShadow>
          <cylinderGeometry args={[5, 5, 0.2, 48]} />
          <meshStandardMaterial color="#d61f8a" roughness={0.5} />
        </mesh>
        <group position={[-1.25, 0, 0]} rotation={[0, 0.3, 0]}><Vibe t={frame} mode="scared" /></group>
        <group position={[1.15, 0.6, 0.5]} rotation={[0, -0.35, 0]}><AIBot t={frame} mood="oops" /></group>
      </ThreeCanvas>
      <div style={{ position: "absolute", top: 230, left: 0, right: 0, textAlign: "center", fontFamily: "Arial, sans-serif", fontWeight: 900, fontSize: 90, color: "#ff2d55", WebkitTextStroke: "9px #000", paintOrder: "stroke fill" }}>
        « OUPS »
      </div>
    </AbsoluteFill>
  );
};
