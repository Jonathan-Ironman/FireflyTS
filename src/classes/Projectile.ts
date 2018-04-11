import { getRandomInt } from "../helpers/Calculations";
import { Entity } from "./Entity";
import { ExplosionSprite } from "./Explosion";
import { Point } from "./Point";

interface IProjectileType {
  impactDamage: number;
  acceleration: number;
  maxLifeSpan: number;
  turnSpeed?: number;
}

const projectileTypes: { [key: string]: IProjectileType } = {
  dumbFire: {
    acceleration: 0.1,
    impactDamage: 10,
    maxLifeSpan: 100
  },
  homing: {
    acceleration: 0.1,
    impactDamage: 10,
    maxLifeSpan: 100,
    turnSpeed: 0.8
  }
};

const image = "images/objects/bolt1.png";
export class Projectile extends Entity {
  public target?: Entity;
  constructor(owner: Entity, type: string, target?: Entity) {
    super(image, owner.center);

    const properties = projectileTypes[type];

    this.owner = owner;
    this.target = target;

    this.speedX = owner.speedX;
    this.speedY = owner.speedY;
    this.angle = owner.angle;

    this.health = 1;
    this.impactDamage = properties.impactDamage;
    this.acceleration = owner.acceleration + properties.acceleration;
    this.maxLifeSpan = properties.maxLifeSpan;
    this.turnSpeed = properties.turnSpeed || 0;
  }

  public update() {
    if (this.status.isColliding) {
      return this.destroy();
    }

    if (this.target) {
      super.turn(this.target.center);
    }
    super.move({ forward: true });
    super.update();
  }

  public destroy() {
    // tslint:disable-next-line:no-unused-expression
    new ExplosionSprite(this.center);
    super.destroy();
  }
}
