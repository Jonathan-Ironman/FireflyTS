import { getRandomInt } from "../Calculations";
import { IRenderObect } from "../interfaces/IRenderObject";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";
import { SoundPool } from "./SoundPool";

const explosionSound = new SoundPool("sound/effects/explosion1.wav", 0.1, 300);
const explosionSprites = [
  { url: "images/sprites/explosions/explosion_1.png", frames: 43, duration: 180 },
  { url: "images/sprites/explosions/explosion_2.png", frames: 46, duration: 180 },
  { url: "images/sprites/explosions/explosion_3.png", frames: 47, duration: 180 },
  { url: "images/sprites/explosions/explosion_4.png", frames: 45, duration: 180 },
  { url: "images/sprites/explosions/explosion_5.png", frames: 44, duration: 180 }
];

export class ExplosionSprite extends RenderObject {
  constructor(location: Point, scale?: number) {
    const sprite = explosionSprites[getRandomInt(0, 4)];
    const options: IRenderObect = {
      imageSrc: sprite.url,
      initialPosition: location,
      sprite: {
        frames: sprite.frames,
        ticksPerFrame: Math.round(sprite.duration / sprite.frames)
      }
    };
    super(options);
    explosionSound.play();
  }
}
