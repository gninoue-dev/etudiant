import { Composition } from "remotion";
import { Episode1 } from "./Episode1";

export const FPS = 30;
export const DURATION = 32 * FPS;

export const RemotionRoot = () => (
  <Composition id="Episode1" component={Episode1} width={1080} height={1920} fps={FPS} durationInFrames={DURATION} />
);
