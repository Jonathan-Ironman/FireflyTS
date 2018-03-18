import { Point } from "../classes/Point";

interface ISprite {
  frames: number;
  ticksPerFrame: number;
  loop?: boolean;
}

export interface IRenderObect {
  imageSrc: string;
  initialPosition: Point;
  angle?: number;
  scale?: number;
  sprite?: ISprite;
  lifeSpan?: number;
}
