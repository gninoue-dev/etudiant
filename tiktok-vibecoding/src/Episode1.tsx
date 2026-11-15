import React from "react";
import { AbsoluteFill, Easing, interpolate, random, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import { Vibe } from "./Vibe";
import { AIBot } from "./AIBot";

// ---------- Chronologie (30 fps) ----------
const S = {
  hook: [0, 90],
  code: [90, 240],
  push: [240, 420],
  bots: [420, 600],
  bill: [600, 780],
  safe: [780, 900],
  loop: [900, 960],
} as const;

const inRange = (f: number, [a, b]: readonly [number, number]) => f >= a && f < b;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ease = Easing.inOut(Easing.cubic);

const GOLD = "#ffc933";

// ---------- Petits accessoires 3D ----------
const Mesh: React.FC<{ p?: [number, number, number]; r?: [number, number, number]; s?: [number, number, number]; c: string; e?: string; children: React.ReactNode }> = ({ p, r, s, c, e, children }) => (
  <mesh position={p} rotation={r} scale={s} castShadow receiveShadow>
    {children}
    <meshStandardMaterial color={c} roughness={0.5} emissive={e ?? "#000"} />
  </mesh>
);

const KeyProp: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <group scale={scale}>
    <Mesh c={GOLD} e="#6b4a00" r={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.2, 0.06, 12, 28]} /></Mesh>
    <Mesh c={GOLD} e="#6b4a00" p={[0.5, 0, 0]}><boxGeometry args={[0.8, 0.09, 0.09]} /></Mesh>
    <Mesh c={GOLD} e="#6b4a00" p={[0.75, -0.1, 0]}><boxGeometry args={[0.09, 0.14, 0.09]} /></Mesh>
    <Mesh c={GOLD} e="#6b4a00" p={[0.6, -0.1, 0]}><boxGeometry args={[0.09, 0.14, 0.09]} /></Mesh>
  </group>
);

const Floor: React.FC = () => (
  <>
    <Mesh p={[0, -0.1, 0.8]} c="#d61f8a"><cylinderGeometry args={[4.2, 4.2, 0.2, 48]} /></Mesh>
    <Mesh p={[0, -0.09, 0.8]} c="#1fa3d6"><cylinderGeometry args={[3.0, 3.0, 0.22, 48]} /></Mesh>
  </>
);

const Desk: React.FC<{ frame: number; scroll: number; keyAt: number; check?: boolean; safeOnDesk?: boolean }> = ({ frame, scroll, keyAt, check, safeOnDesk }) => {
  const lines = Array.from({ length: 10 }, (_, i) => i);
  const top = 3.2;
  const keyPop = keyAt >= 0 ? spring({ frame: frame - keyAt, fps: 30, config: { damping: 9 } }) : 0;
  return (
    <group>
      {/* bureau */}
      <Mesh p={[0, 1.25, -0.3]} c="#3b2f63"><boxGeometry args={[3.8, 0.12, 1.5]} /></Mesh>
      {[-1.7, 1.7].map((x) => (
        <Mesh key={x} p={[x, 0.62, -0.3]} c="#2a2150"><boxGeometry args={[0.14, 1.25, 1.3]} /></Mesh>
      ))}
      {/* écran */}
      <Mesh p={[0, 2.35, -0.75]} c="#10101c"><boxGeometry args={[3.3, 1.95, 0.12]} /></Mesh>
      <Mesh p={[0, 2.35, -0.68]} c="#0b1230" e="#070b22"><boxGeometry args={[3.05, 1.7, 0.02]} /></Mesh>
      {lines.map((i) => {
        const w = 0.5 + random("w" + i) * 1.8;
        const y = top - ((i * 0.17 + scroll) % 1.6) - 0.1;
        const col = ["#2de2ff", "#ff3dbd", "#2ee66b", "#a78bfa"][i % 4];
        return <Mesh key={i} p={[-1.35 + w / 2, y - 0.2, -0.65]} c={col} e={col}><boxGeometry args={[w, 0.07, 0.02]} /></Mesh>;
      })}
      {/* pied + clavier */}
      <Mesh p={[0, 1.45, -0.75]} c="#10101c"><boxGeometry args={[0.3, 0.3, 0.2]} /></Mesh>
      <Mesh p={[0, 1.33, 0.05]} c="#1b1b30"><boxGeometry args={[1.5, 0.06, 0.5]} /></Mesh>
      {/* ligne secrète + clé */}
      {keyAt >= 0 && (
        <group>
          <Mesh p={[0, 2.3, -0.64]} s={[keyPop, 1, 1]} c="#ff2d55" e="#b0002a"><boxGeometry args={[2.6, 0.2, 0.03]} /></Mesh>
          <group position={[1.1, 2.3, -0.5]} scale={0.7 * keyPop}><KeyProp /></group>
        </group>
      )}
      {check && (
        <group position={[0, 2.35, -0.6]}>
          <Mesh p={[-0.25, -0.1, 0]} r={[0, 0, -0.78]} c="#2ee66b" e="#1d9e48"><boxGeometry args={[0.28, 0.1, 0.05]} /></Mesh>
          <Mesh p={[0.1, 0.05, 0]} r={[0, 0, 0.78]} c="#2ee66b" e="#1d9e48"><boxGeometry args={[0.7, 0.1, 0.05]} /></Mesh>
        </group>
      )}
      {safeOnDesk && <MiniSafe />}
    </group>
  );
};

const MiniSafe: React.FC = () => (
  <group position={[1.3, 1.6, 0.0]}>
    <Mesh c="#8a8f99"><boxGeometry args={[0.6, 0.6, 0.55]} /></Mesh>
    <Mesh p={[0, 0, 0.29]} c="#5c6270"><boxGeometry args={[0.5, 0.5, 0.04]} /></Mesh>
    <Mesh p={[0, 0, 0.33]} c={GOLD} e="#6b4a00" r={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.1, 0.025, 8, 20]} /></Mesh>
  </group>
);

const Cloud: React.FC = () => (
  <group>
    {[[-0.9, 0, 0, 0.9], [0, 0.35, 0, 1.15], [1, 0, 0, 0.95], [0.3, -0.2, 0.4, 0.8], [-0.4, -0.15, 0.4, 0.7]].map(([x, y, z, r], i) => (
      <Mesh key={i} p={[x, y, z]} c="#f2f4ff" e="#6d78c9"><sphereGeometry args={[r, 28, 20]} /></Mesh>
    ))}
  </group>
);

const Robot: React.FC<{ t: number; seed: string }> = ({ t, seed }) => {
  const hue = ["#ff3dbd", "#2de2ff", "#ff7a1a"][Math.floor(random(seed) * 3)];
  return (
    <group rotation={[0, 0, Math.sin(t * 0.3 + random(seed) * 6) * 0.15]}>
      <Mesh c="#7c8196"><boxGeometry args={[0.55, 0.45, 0.45]} /></Mesh>
      <Mesh p={[0, 0.34, 0]} c="#9aa0b8"><sphereGeometry args={[0.17, 16, 12]} /></Mesh>
      <Mesh p={[0, 0.58, 0]} c="#ff2d55" e="#b0002a"><sphereGeometry args={[0.06, 12, 10]} /></Mesh>
      {[-0.13, 0.13].map((x) => (
        <Mesh key={x} p={[x, 0.02, 0.23]} c={hue} e={hue}><sphereGeometry args={[0.07, 12, 10]} /></Mesh>
      ))}
      <Mesh p={[0, -0.34, 0]} c="#555a6e"><cylinderGeometry args={[0.06, 0.12, 0.25, 10]} /></Mesh>
    </group>
  );
};

const Bills: React.FC<{ t: number }> = ({ t }) => (
  <group>
    {Array.from({ length: 16 }, (_, i) => {
      const a = random("a" + i) * Math.PI * 2;
      const sp = 0.5 + random("s" + i) * 0.9;
      const tt = (t * 0.06 * sp + random("o" + i) * 3) % 3;
      const x = Math.cos(a) * tt * 1.6;
      const y = 2.2 + tt * 1.5 - tt * tt * 0.5;
      const z = 0.8 + Math.sin(a) * tt * 0.8;
      return (
        <Mesh key={i} p={[x, y, z]} r={[t * 0.07 + i, t * 0.05, t * 0.06]} c="#2ee66b" e="#127a34">
          <boxGeometry args={[0.55, 0.28, 0.02]} />
        </Mesh>
      );
    })}
  </group>
);

const Safe: React.FC<{ close: number }> = ({ close }) => (
  <group position={[1.35, 0.95, 0]} scale={0.75}>
    <Mesh c="#8a8f99"><boxGeometry args={[2.0, 2.2, 1.5]} /></Mesh>
    <Mesh p={[0, 0, 0.4]} c="#10101c"><boxGeometry args={[1.6, 1.8, 0.7]} /></Mesh>
    {/* porte : charnière à gauche */}
    <group position={[-0.95, 0, 0.78]} rotation={[0, -1.7 * (1 - close), 0]}>
      <Mesh p={[0.95, 0, 0.0]} c="#6b7180"><boxGeometry args={[1.9, 2.1, 0.12]} /></Mesh>
      <Mesh p={[0.95, 0, 0.1]} c={GOLD} e="#6b4a00" r={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.35, 0.06, 10, 28]} /></Mesh>
      <Mesh p={[0.95, 0, 0.1]} c={GOLD} e="#6b4a00"><boxGeometry args={[0.9, 0.07, 0.07]} /></Mesh>
    </group>
  </group>
);

// ---------- Caméra pilotée par la frame ----------
const Rig: React.FC<{ pos: [number, number, number]; look: [number, number, number] }> = ({ pos, look }) => {
  const { camera } = useThree();
  const k = 1.5; // recul global : le format portrait est étroit
  camera.position.set(look[0] + (pos[0] - look[0]) * k, look[1] + (pos[1] - look[1]) * k, look[2] + (pos[2] - look[2]) * k);
  camera.lookAt(...look);
  return null;
};

// ---------- Scène 3D ----------
const World: React.FC<{ frame: number }> = ({ frame: f }) => {
  const sec = (a: number, b: number, from = 0, to = 1) => interpolate(f, [a, b], [from, to], { ...clamp, easing: ease });

  let cam: { pos: [number, number, number]; look: [number, number, number] };
  const deskScene = f < S.push[0] || f >= S.safe[1];

  if (inRange(f, S.hook)) cam = { pos: [0, 3.6, 8.2 - sec(0, 90, 0, 0.8)], look: [0, 2.4, 0] };
  else if (inRange(f, S.code)) cam = { pos: [sec(90, 240, -0.6, 0.6), 3.4, 6.8 - sec(90, 240, 0, 0.8)], look: [0, 2.4, -0.4] };
  else if (inRange(f, S.push)) cam = { pos: [sec(240, 420, 1.5, 3.5), 3.8, 9.5], look: [sec(240, 420, 1.2, 2.8), 3.6, -1] };
  else if (inRange(f, S.bots)) cam = { pos: [4.2 + sec(420, 600, 0, 0.5), 5.0, 5.2], look: [4.5, 5.2, -3] };
  else if (inRange(f, S.bill)) cam = { pos: [0, 2.9, 6.2 - sec(600, 780, 0, 0.6)], look: [0, 2.5, 0] };
  else if (inRange(f, S.safe)) cam = { pos: [0, 2.9, 7.6], look: [0.1, 2.0, 0] };
  else cam = { pos: [0, 3.5, 7.4], look: [0, 2.4, 0] };

  // éclairage : pulsation rouge pendant la scène de la facture
  const alarm = inRange(f, S.bill) ? 30 + Math.sin(f * 0.5) * 25 : 0;

  // clé qui vole du PC au cloud, puis se fait voler
  const flyT = sec(300, 380, 0, 1);
  const filePos: [number, number, number] = [
    interpolate(flyT, [0, 1], [0, 4.5]),
    interpolate(flyT, [0, 1], [2.6, 5.2]) + Math.sin(flyT * Math.PI) * 1.2,
    interpolate(flyT, [0, 1], [-0.4, -2.0]),
  ];

  const vibeMode = inRange(f, S.code) ? "type" : inRange(f, S.bill) ? "scared" : inRange(f, S.safe) ? "relief" : deskScene && f >= S.loop[0] ? "relief" : "idle";
  const faceCam = inRange(f, S.bill) || inRange(f, S.safe);
  const vibePos: [number, number, number] = inRange(f, S.safe) ? [-1.1, 0, 1.2] : [0, 0, 1.0];

  return (
    <>
      <Rig {...cam} />
      <color attach="background" args={[inRange(f, S.push) || inRange(f, S.bots) ? "#0e1a4d" : "#1a0f3d"]} />
      <ambientLight intensity={1.7} color="#aaa0ff" />
      <directionalLight position={[4, 8, 6]} intensity={3} castShadow />
      <pointLight position={[-4, 3, -3]} intensity={40} color="#ff3dbd" />
      <pointLight position={[4, 2, -3]} intensity={40} color="#2de2ff" />
      <pointLight position={[0, 4, 4]} intensity={alarm} color="#ff1744" distance={14} />

      {/* bureau + Vibe : scènes 1, 2, 3 (départ) et boucle finale */}
      {(f < S.push[1] || f >= S.loop[0]) && (
        <>
          <Floor />
          <Desk frame={f} scroll={f * 0.012} keyAt={f >= 190 && f < S.loop[0] ? 190 : -1} check={f >= S.loop[0]} safeOnDesk={f >= S.loop[0]} />
        </>
      )}
      {f < S.push[1] && f >= S.push[0] ? null : null}

      {/* Pixel, l'IA : au bureau (hook, code, boucle) et à côté de Vibe pendant la facture */}
      {(f < S.push[0] || inRange(f, S.bill) || f >= S.loop[0]) && (() => {
        const bill = inRange(f, S.bill);
        const oops = bill || inRange(f, S.hook);
        const appear = spring({ frame: f - (bill ? 600 : 0), fps: 30, config: { damping: 12 } });
        const pos: [number, number, number] = bill ? [0.95, 0.1, 2.2] : [0.95, 0.7, 1.3];
        return (
          <group position={pos} scale={(bill ? 0.42 : 0.5) * appear} rotation={[0, -0.35, 0]}>
            <AIBot t={f} mood={oops ? "oops" : "happy"} y={1.6} />
          </group>
        );
      })()}

      {/* Vibe */}
      {(f < S.push[0] || inRange(f, S.bill) || inRange(f, S.safe) || f >= S.loop[0]) && (
        <group position={vibePos} rotation={[0, faceCam ? 0 : Math.PI, 0]}>
          <Vibe t={f} mode={vibeMode as any} />
        </group>
      )}

      {/* hook : ticket de caisse qui tombe */}
      {inRange(f, S.hook) && (() => {
        const drop = spring({ frame: f - 12, fps: 30, config: { damping: 11, stiffness: 90 } });
        return (
          <group position={[0, interpolate(drop, [0, 1], [9, 5.6]), 1.4]} rotation={[0, 0, Math.sin(f * 0.25) * 0.08]}>
            <Mesh c="#fffdf5"><boxGeometry args={[1.8, 2.4, 0.03]} /></Mesh>
            {[0, 1, 2, 3].map((i) => <Mesh key={i} p={[-0.2, 0.7 - i * 0.28, 0.03]} c="#8a8a8a"><boxGeometry args={[1.0 + (i % 2) * 0.3, 0.07, 0.01]} /></Mesh>)}
            <Mesh p={[0, -0.85, 0.03]} c="#ff2d55" e="#b0002a"><boxGeometry args={[1.3, 0.2, 0.01]} /></Mesh>
          </group>
        );
      })()}

      {/* push : fichier + clé voyagent vers le cloud */}
      {(inRange(f, S.push) || inRange(f, S.bots)) && (
        <group>
          <group position={[4.5, 5.2, -3]}><Cloud /></group>
          {inRange(f, S.push) && (
            <group position={f < 300 ? [0, 2.6, -0.4] : filePos}>
              <Mesh c="#ffffff" e="#9aa6ff"><boxGeometry args={[0.9, 1.15, 0.06]} /></Mesh>
              <group position={[-0.15, 0, 0.06]} scale={0.55}><KeyProp /></group>
            </group>
          )}
          {f >= S.push[0] && f < 300 && (
            <Mesh p={[0, 2.6, -0.4]} c="#ffffff"><boxGeometry args={[0.9, 1.15, 0.06]} /></Mesh>
          )}
        </group>
      )}

      {/* bots : robots convergent vers la clé puis s'enfuient avec */}
      {inRange(f, S.bots) && (
        <group>
          <group position={[4.5, 5.2, -3]}><Cloud /></group>
          {Array.from({ length: 7 }, (_, i) => {
            const a = (i / 7) * Math.PI * 2 + random("ra" + i);
            const dist = interpolate(f, [420, 520], [9, 0.9 + (i % 3) * 0.25], { ...clamp, easing: Easing.out(Easing.cubic) });
            const leave = interpolate(f, [540, 600], [0, 10], { ...clamp, easing: Easing.in(Easing.cubic) });
            const x = 4.5 + Math.cos(a) * dist + (i === 0 ? leave : 0);
            const y = 5.0 + Math.sin(a) * dist * 0.6 + Math.sin(f * 0.2 + i) * 0.12 + (i === 0 ? leave * 0.5 : 0);
            return (
              <group key={i} position={[x, y, -1.8 + (i % 3) * 0.3]}>
                <Robot t={f} seed={"r" + i} />
                {i === 0 && f > 530 && <group position={[0, -0.7, 0.2]} scale={0.7}><KeyProp /></group>}
              </group>
            );
          })}
          {f <= 530 && <group position={[4.5, 5.0, -1.2]} scale={1.1}><KeyProp /></group>}
        </group>
      )}

      {/* facture : billets qui s'envolent */}
      {inRange(f, S.bill) && (
        <group>
          <Floor />
          <Bills t={f - S.bill[0] + 20} />
        </group>
      )}

      {/* coffre-fort */}
      {inRange(f, S.safe) && (
        <group>
          <Floor />
          <Safe close={interpolate(f, [830, 862], [0, 1], { ...clamp, easing: Easing.out(Easing.back(1.6)) })} />
          {f < 835 && (
            <group position={[interpolate(f, [780, 830], [-0.5, 1.35], clamp), interpolate(f, [780, 830], [2.2, 1.2], clamp) + Math.sin(interpolate(f, [780, 830], [0, Math.PI], clamp)) * 0.8, 0.8]} scale={0.8}>
              <KeyProp />
            </group>
          )}
        </group>
      )}
    </>
  );
};

// ---------- Textes à l'écran (zones sûres TikTok) ----------
const CAPTIONS: { range: readonly [number, number]; text: string; color?: string }[] = [
  { range: [0, 90], text: "4 800 €", color: "#ff2d55" },
  { range: [90, 240], text: "Clé secrète = dans le code" },
  { range: [240, 420], text: "Clé API = ta carte bancaire" },
  { range: [420, 600], text: "Des bots la trouvent en minutes" },
  { range: [600, 780], text: "C'est TOI qui paies", color: "#ff2d55" },
  { range: [780, 960], text: ".env  +  .gitignore", color: "#2ee66b" },
];

const Caption: React.FC<{ frame: number }> = ({ frame }) => {
  const c = CAPTIONS.find((x) => inRange(frame, x.range));
  if (!c) return null;
  const local = frame - c.range[0];
  const pop = spring({ frame: local, fps: 30, config: { damping: 10, stiffness: 140 } });
  const big = c.text.length < 10;
  return (
    <div
      style={{
        position: "absolute", top: 230, left: 70, right: 170, textAlign: "center",
        fontFamily: "Arial, Helvetica, sans-serif", fontWeight: 900, textTransform: "uppercase",
        fontSize: big ? 170 : 84, lineHeight: 1.05, color: c.color ?? "#fff",
        WebkitTextStroke: "10px #000", paintOrder: "stroke fill",
        transform: `scale(${0.6 + pop * 0.4})`, textShadow: "0 8px 0 rgba(0,0,0,.45)",
      }}
    >
      {c.text}
    </div>
  );
};

const Counter: React.FC<{ frame: number }> = ({ frame }) => {
  if (!inRange(frame, S.bill)) return null;
  const v = Math.round(interpolate(frame, [600, 770], [0, 4800], { ...clamp, easing: Easing.in(Easing.quad) }));
  const txt = v.toLocaleString("fr-FR").replace(/ | /g, " ") + " €";
  return (
    <div style={{ position: "absolute", bottom: 330, left: 0, right: 140, textAlign: "center", fontFamily: "Arial, sans-serif", fontWeight: 900, fontSize: 130, color: "#ff2d55", WebkitTextStroke: "9px #000", paintOrder: "stroke fill" }}>
      {txt}
    </div>
  );
};

const Bubble: React.FC<{ frame: number }> = ({ frame }) => {
  const a = inRange(frame, [105, 205] as const);
  const b = inRange(frame, [905, 960] as const);
  if (!a && !b) return null;
  const start = a ? 105 : 905;
  const pop = spring({ frame: frame - start, fps: 30, config: { damping: 11 } });
  return (
    <div style={{ position: "absolute", top: 740, right: 90, maxWidth: 400, padding: "18px 28px", background: "#fff", color: "#111", border: "6px solid #000", borderRadius: 32, fontFamily: "Arial, sans-serif", fontWeight: 900, fontSize: 46, textAlign: "center", transform: `scale(${pop})`, transformOrigin: "bottom right" }}>
      {a ? "Pas de souci, je gère !" : "Je range ça au coffre !"}
    </div>
  );
};

const Badge: React.FC<{ frame: number }> = ({ frame }) => {
  if (!(inRange(frame, S.push) || inRange(frame, S.bots))) return null;
  return (
    <div style={{ position: "absolute", top: 560, right: 190, fontFamily: "Arial, sans-serif", fontWeight: 900, fontSize: 56, color: "#fff", background: "#ff2d55", padding: "10px 26px", borderRadius: 18, border: "6px solid #000", transform: "rotate(-6deg)" }}>
      GitHub · PUBLIC
    </div>
  );
};

export const Episode1: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#1a0f3d" }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 38, position: [0, 3.5, 8], near: 0.1, far: 80 }} shadows gl={{ antialias: true }}>
        <World frame={frame} />
      </ThreeCanvas>
      <Caption frame={frame} />
      <Counter frame={frame} />
      <Badge frame={frame} />
      <Bubble frame={frame} />
    </AbsoluteFill>
  );
};
