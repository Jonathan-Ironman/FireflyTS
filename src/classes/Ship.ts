import { SoundPool } from "../helpers/SoundPool";
import { Entity } from "./Entity";
import { ExplosionSprite } from "./Explosion";
import { doubleLaserShot } from "./Laser";
import { Point } from "./Point";
import { Projectile } from "./Projectile";

const laserSound = new SoundPool("sound/effects/laser.wav", 0.02, 200);

export class Ship extends Entity {
  public cooldown = 0;
  public cooldownTime = 20;
  public acceleration = 0.3;
  public inaccuracy = 100;
  public turnSpeed = 3;

  constructor(imageSrc: string, initialPosition: Point) {
    super(imageSrc, initialPosition);
    this.health = 50;
  }

  public canFire() {
    return this.cooldown === 0;
  }

  public update() {
    if (this.cooldown > 0) {
      this.cooldown--;
    }
    super.update();
  }

  public destroy() {
    const _ = new ExplosionSprite(this.center);
    super.destroy();
  }

  protected firePrimary() {
    if (!this.canFire()) {
      return;
    }
    this.status.firing = 1;
    doubleLaserShot(this);
  }

  protected fireSecondary() {
    if (!this.canFire()) {
      return;
    }
    this.status.firing = 1;
    const _ = new Projectile(this, "dumbFire");
    this.cooldown = this.cooldownTime;
    laserSound.play();
  }
}
