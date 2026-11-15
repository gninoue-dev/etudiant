import React from "react";

const Part: React.FC<{
  c: string;
  p?: [number, number, number];
  s?: [number, number, number];
  r?: [number, number, number];
  emissive?: string;
  rough?: number;
  metal?: number;
  children: React.ReactNode;
}> = ({ c, p = [0, 0, 0], s = [1, 1, 1], r = [0, 0, 0], emissive, rough = 0.35, metal = 0.1, children }) => (
  <mesh position={p} scale={s} rotation={r} castShadow receiveShadow>
    {children}
    <meshStandardMaterial color={c} roughness={rough} metalness={metal} emissive={emissive ?? "#000000"} />
  </mesh>
);

const SHELL = "#f2f5ff";
const DARK = "#14142b";
const CYAN = "#2de2ff";

// « Pixel » : l'IA qui aide Vibe. Elle flotte (pas de jambes), toujours sûre d'elle.
// mood: "happy" (yeux ronds + sourire) | "oops" (yeux en croix + bouche ondulée)
export const AIBot: React.FC<{ t: number; mood?: "happy" | "oops"; y?: number }> = ({ t, mood = "happy", y = 1.6 }) => {
  const float = Math.sin(t * 0.12) * 0.1;
  const sway = Math.sin(t * 0.08) * 0.05;
  const antPulse = 0.6 + 0.4 * Math.sin(t * 0.25);
  const eye = mood === "happy" ? CYAN : "#ff4d6d";
  return (
    <group position={[0, y + float, 0]} rotation={[0, 0, sway]}>
      {/* corps : coque blanche arrondie */}
      <Part c={SHELL} p={[0, -0.3, 0]} s={[1, 0.9, 0.9]}><sphereGeometry args={[0.72, 40, 28]} /></Part>
      {/* tête / visage : grand écran sombre arrondi */}
      <Part c={SHELL} p={[0, 0.65, 0]} s={[1.05, 0.85, 0.9]}><sphereGeometry args={[0.7, 40, 28]} /></Part>
      <Part c={DARK} p={[0, 0.65, 0.43]} s={[1.0, 0.72, 0.45]} rough={0.15} metal={0.4}><sphereGeometry args={[0.62, 40, 28]} /></Part>

      {/* yeux */}
      {[-0.26, 0.26].map((x) =>
        mood === "happy" ? (
          <Part key={x} c={eye} emissive={eye} p={[x, 0.72, 0.71]} s={[1, 1.25, 0.4]}><sphereGeometry args={[0.1, 20, 16]} /></Part>
        ) : (
          <group key={x} position={[x, 0.72, 0.72]}>
            <Part c={eye} emissive={eye} r={[0, 0, Math.PI / 4]}><boxGeometry args={[0.28, 0.06, 0.04]} /></Part>
            <Part c={eye} emissive={eye} r={[0, 0, -Math.PI / 4]}><boxGeometry args={[0.28, 0.06, 0.04]} /></Part>
          </group>
        )
      )}
      {/* bouche */}
      {mood === "happy" ? (
        <Part c={eye} emissive={eye} p={[0, 0.5, 0.71]} r={[0, 0, Math.PI]}><torusGeometry args={[0.17, 0.028, 8, 24, Math.PI]} /></Part>
      ) : (
        <Part c={eye} emissive={eye} p={[0, 0.46, 0.72]}><boxGeometry args={[0.3, 0.05, 0.03]} /></Part>
      )}

      {/* antenne avec balise lumineuse */}
      <Part c="#9aa3c7" p={[0, 1.4, 0]}><cylinderGeometry args={[0.025, 0.025, 0.4, 10]} /></Part>
      <Part c={eye} emissive={eye} p={[0, 1.65, 0]} s={[antPulse + 0.4, antPulse + 0.4, antPulse + 0.4]}><sphereGeometry args={[0.1, 16, 12]} /></Part>

      {/* oreilles (haut-parleurs) */}
      {[-1, 1].map((x) => (
        <Part key={"ear" + x} c={CYAN} emissive="#0b6a78" p={[x * 0.76, 0.65, 0]} r={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.17, 0.17, 0.14, 24]} />
        </Part>
      ))}

      {/* bras courts, accrochés au corps */}
      {[-1, 1].map((x) => (
        <group key={"arm" + x} position={[x * 0.68, -0.1, 0.05]} rotation={[0, 0, x * (0.6 + Math.sin(t * 0.1 + x) * 0.08)]}>
          <Part c={SHELL} p={[0, -0.25, 0]}><capsuleGeometry args={[0.1, 0.25, 8, 16]} /></Part>
          <Part c={CYAN} emissive="#0b6a78" p={[0, -0.55, 0]}><sphereGeometry args={[0.14, 16, 12]} /></Part>
        </group>
      ))}

      {/* propulseur : anneau + halo sous le corps */}
      <Part c={DARK} p={[0, -0.92, 0]}><cylinderGeometry args={[0.38, 0.28, 0.16, 24]} /></Part>
      <Part c={CYAN} emissive={CYAN} p={[0, -1.03, 0]} s={[1, 0.3 + 0.1 * Math.sin(t * 0.4), 1]}><cylinderGeometry args={[0.24, 0.1, 0.18, 20]} /></Part>
    </group>
  );
};
