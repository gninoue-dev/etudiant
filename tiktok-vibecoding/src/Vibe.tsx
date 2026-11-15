import React from "react";

type Mode = "idle" | "type" | "scared" | "relief";

const Part: React.FC<{
  c: string;
  p?: [number, number, number];
  s?: [number, number, number];
  r?: [number, number, number];
  emissive?: string;
  rough?: number;
  children: React.ReactNode;
}> = ({ c, p = [0, 0, 0], s = [1, 1, 1], r = [0, 0, 0], emissive, rough = 0.55, children }) => (
  <mesh position={p} scale={s} rotation={r} castShadow receiveShadow>
    {children}
    <meshStandardMaterial color={c} roughness={rough} emissive={emissive ?? "#000000"} />
  </mesh>
);

const RED = "#d62839";
const PANTS = "#24243e";
const SHOE = "#f4f4f4";
const HAIR = "#151515";
const GREEN = "#2ee66b";

// Personnage « Vibe » : anatomie cohérente (hanches, épaules, coudes, cou, tête).
export const Vibe: React.FC<{ t: number; mode?: Mode; skin?: string }> = ({ t, mode = "idle", skin = "#8d5a3b" }) => {
  const sin = Math.sin;
  // poses (angles en radians)
  let shX = 0, shZ = 0.14, elX = -0.35, wob = 0, headZ = 0, headX = 0.04, bodyY = 0;
  if (mode === "type") {
    shX = -1.1; shZ = 0.1; elX = -0.75;
    headX = 0.12;
  } else if (mode === "scared") {
    shX = -0.25; shZ = 2.45; elX = -0.3;
    wob = sin(t * 1.6) * 0.05;
    headZ = sin(t * 1.9) * 0.07;
    bodyY = Math.abs(sin(t * 0.8)) * 0.04;
  } else if (mode === "relief") {
    headX = 0.04 + sin(t * 0.25) * 0.05;
    shZ = 0.14 + sin(t * 0.2) * 0.02;
  } else {
    bodyY = sin(t * 0.12) * 0.015;
  }

  return (
    <group position={[0, bodyY, 0]} rotation={[0, 0, wob]}>
      {/* jambes */}
      {[-1, 1].map((side) => (
        <group key={"leg" + side} position={[side * 0.2, 1.1, 0]} rotation={[0, 0, side * -0.03]}>
          <Part c={PANTS} p={[0, -0.45, 0]}><capsuleGeometry args={[0.15, 0.6, 10, 20]} /></Part>
          <Part c={SHOE} p={[0, -0.98, 0.1]} s={[0.95, 0.55, 1.5]}><sphereGeometry args={[0.22, 24, 16]} /></Part>
          <Part c={SHOE} p={[0, -0.88, 0]}><cylinderGeometry args={[0.16, 0.16, 0.06, 20]} /></Part>
        </group>
      ))}
      {/* torse */}
      <Part c={RED} p={[0, 1.55, 0]} s={[1, 1, 0.78]}><capsuleGeometry args={[0.42, 0.42, 14, 28]} /></Part>
      {/* bras */}
      {[-1, 1].map((side) => {
        const typing = mode === "type" ? sin(t * 0.9 + side * 1.7) * 0.12 : 0;
        return (
          <group key={"arm" + side} position={[side * 0.4, 2.0, 0]} rotation={[shX, 0, side * shZ]}>
            <Part c={RED}><sphereGeometry args={[0.17, 20, 16]} /></Part>
            <Part c={RED} p={[0, -0.27, 0]}><capsuleGeometry args={[0.12, 0.3, 8, 16]} /></Part>
            <group position={[0, -0.5, 0]} rotation={[elX + typing, 0, 0]}>
              <Part c={RED}><sphereGeometry args={[0.125, 16, 12]} /></Part>
              <Part c={RED} p={[0, -0.24, 0]}><capsuleGeometry args={[0.105, 0.28, 8, 16]} /></Part>
              <Part c={skin} p={[0, -0.5, 0]}><sphereGeometry args={[0.135, 20, 16]} /></Part>
            </group>
          </group>
        );
      })}
      {/* cou + capuche */}
      <Part c={skin} p={[0, 2.28, 0.02]}><cylinderGeometry args={[0.14, 0.16, 0.3, 20]} /></Part>
      <Part c={RED} p={[0, 2.15, -0.04]} r={[Math.PI / 2 - 0.15, 0, 0]}><torusGeometry args={[0.27, 0.11, 16, 32]} /></Part>
      {/* tête */}
      <group position={[0, 2.88, 0.03]} rotation={[headX, 0, headZ]}>
        <Part c={skin} s={[1, 1.04, 0.96]}><sphereGeometry args={[0.55, 40, 28]} /></Part>
        <Part c={HAIR} p={[0, 0.04, -0.02]}><sphereGeometry args={[0.57, 40, 28, 0, Math.PI * 2, 0, Math.PI * 0.45]} /></Part>
        {[-0.2, 0.2].map((x) => (
          <React.Fragment key={"eye" + x}>
            <Part c="#ffffff" p={[x, 0.04, 0.45]} s={[1, 1.1, 0.5]} rough={0.3}><sphereGeometry args={[0.12, 20, 16]} /></Part>
            <Part c="#111111" p={[x, 0.04, 0.505]}><sphereGeometry args={[0.06, 16, 12]} /></Part>
            <Part c="#111111" p={[x, 0.04, 0.48]}><torusGeometry args={[0.16, 0.028, 12, 32]} /></Part>
          </React.Fragment>
        ))}
        <Part c="#111111" p={[0, 0.08, 0.5]} r={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.016, 0.016, 0.08, 8]} /></Part>
        <Part c={skin} p={[0, -0.1, 0.53]}><sphereGeometry args={[0.06, 16, 12]} /></Part>
        {mode === "scared" ? (
          <Part c="#3a1d12" p={[0, -0.2, 0.47]} s={[1, 1.4, 0.5]}><sphereGeometry args={[0.07, 16, 12]} /></Part>
        ) : (
          <Part c="#3a1d12" p={[0, -0.14, 0.46]} r={[0, 0, Math.PI]}><torusGeometry args={[0.14, 0.025, 8, 24, Math.PI]} /></Part>
        )}
        {[-1, 1].map((x) => (
          <Part key={"ear" + x} c={skin} p={[x * 0.55, -0.02, 0]} s={[0.5, 1, 0.8]}><sphereGeometry args={[0.07, 12, 10]} /></Part>
        ))}
        <Part c={GREEN} emissive="#0b5a22"><torusGeometry args={[0.61, 0.04, 12, 40, Math.PI]} /></Part>
        {[-1, 1].map((x) => (
          <Part key={"cup" + x} c={GREEN} emissive="#0b5a22" p={[x * 0.59, -0.02, 0]} r={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.19, 0.19, 0.13, 24]} />
          </Part>
        ))}
      </group>
    </group>
  );
};
