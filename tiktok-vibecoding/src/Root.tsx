import { Composition } from "remotion";
import { Episode1 } from "./Episode1";
import { Cast, CastOops } from "./Cast";

export const FPS = 30;
export const DURATION = 32 * FPS;

export const RemotionRoot = () => (
  <>
    <Composition id="Episode1" component={Episode1} width={1080} height={1920} fps={FPS} durationInFrames={DURATION} />
    <Composition id="Cast" component={Cast} width={1080} height={1920} fps={FPS} durationInFrames={60} />
    <Composition id="CastOops" component={CastOops} width={1080} height={1920} fps={FPS} durationInFrames={60} />
  </>
);
