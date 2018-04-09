import { getRandomInt } from "../helpers/Calculations";
import { SoundPool } from "../helpers/SoundPool";
import { IRenderObect } from "../interfaces/IRenderObject";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";

const explosionSound = new SoundPool("sound/effects/explosion1.wav", 0.1, 300);
const explosionSprites = [
  {
    url: "images/sprites/explosions/explosion_1.png",
    frames: 43,
    duration: 60
  },
  {
    url: "images/sprites/explosions/explosion_2.png",
    frames: 46,
    duration: 60
  },
  {
    url: "images/sprites/explosions/explosion_3.png",
    frames: 47,
    duration: 60
  },
  {
    url: "images/sprites/explosions/explosion_4.png",
    frames: 45,
    duration: 60
  },
  { url: "images/sprites/explosions/explosion_5.png", frames: 44, duration: 60 }
];

export class ExplosionSprite extends RenderObject {
  constructor(location: Point, scale?: number) {
    const sprite = explosionSprites[getRandomInt(0, 4)];
    const options: IRenderObect = {
      angle: getRandomInt(1, 360),
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
