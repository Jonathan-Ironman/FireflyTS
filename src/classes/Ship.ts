import * as Calculations from "../helpers/Calculations";
import { IDirection } from "../interfaces/IDirection";
import { Entity } from "./Entity";
import { ExplosionSprite } from "./Explosion";
import { doubleLaserShot } from "./Laser";
import { Point } from "./Point";
import { Projectile } from "./Projectile";
import { SoundPool } from "./SoundPool";

const laserSound = new SoundPool("sound/effects/laser.wav", 0.02, 200);

export class Ship extends Entity {
  public health = 50;
  public shield = 0;
  public cooldown = 0;
  public cooldownTime = 20;
  public acceleration = 0.3;
  public inaccuracy = 100;
  public turnSpeed = 3;

  constructor(imageSrc: string, initialPosition: Point) {
    super(imageSrc, initialPosition);
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
    // tslint:disable-next-line:no-unused-expression
    new ExplosionSprite(this.center);
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

    // const offset = this.width / 2.4;
    // tslint:disable-next-line:no-unused-expression
    new Projectile(this, "dumbFire");

    this.cooldown = this.cooldownTime;
    laserSound.play();
  }
}
