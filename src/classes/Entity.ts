import { Factions } from "../enums/factions";
import * as Calculations from "../helpers/Calculations";
import { IDirection } from "../interfaces/IDirection";
import { IStatus } from "../interfaces/IStatus";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";

const entityList: Entity[] = [];
export class Entity extends RenderObject {
  public static getEntityList() {
    return entityList as ReadonlyArray<Entity>;
  }

  public static testCollision(entity1: Entity, entity2: Entity) {
    return entity1.isCollidingWith(entity2);
  }

  public static isFacing(entity1: Entity, entity2: Entity) {
    let result = 0;
    const diff = Point.getAngle(entity1.center, entity2.center) - entity1.angle;
    if (Math.abs(diff) < 100) {
      result = diff;
    }

    return result;
  }

  public maxHealth = Infinity;
  public shield = 0;
  public maxShield = 0;
  public energy = 0;
  public maxEnergy = 0;
  public speedX = 0;
  public speedY = 0;
  public impactDamage = 0;
  public status: IStatus = {};
  public faction?: Factions;
  public owner?: Entity;
  public acceleration = 0;

  public get health() {
    return this._health;
  }
  public set health(newHealth) {
    if (newHealth < this._health) {
      this.takeDamage(this._health - newHealth);
    } else {
      this._health = newHealth;
    }
  }

  protected turnSpeed = 0;
  protected initialized = false;

  private _health = 1;

  constructor(imageSrc: string, initialPosition: Point) {
    super({ imageSrc, initialPosition });
    entityList.push(this);
  }

  public update() {
    if (!this.initialized) {
      this.init();
    }

    if (this.health <= 0) {
      return this.destroy();
    }

    if (this.energy < this.maxEnergy) {
      this.energy++;
    }

    if (this.shield < this.maxShield && this.energy > 0) {
      this.energy--;
      this.shield += 0.1;
    }

    this.processStatus();

    super.update();
  }

  public destroy() {
    const index = entityList.indexOf(this);
    entityList.splice(index, 1);
    super.destroy();
  }

  public isCollidingWith(entity: Entity) {
    const shouldNotCheck =
      this === entity ||
      this.owner === entity ||
      this === entity.owner ||
      this.owner === entity.owner ||
      (this.faction !== undefined && this.faction === entity.faction);

    return !(
      shouldNotCheck ||
      this.center.x + this.width / 2 < entity.center.x - entity.width / 2 ||
      this.center.y + this.height / 2 < entity.center.y - entity.height / 2 ||
      this.center.x - this.width / 2 > entity.center.x + entity.width / 2 ||
      this.center.y - this.height / 2 > entity.center.y + entity.height / 2
    );
  }

  public init() {
    if (!this.initialized) {
      this.initialized = true;
      this.maxHealth = this.health;
      this.maxShield = this.shield;
      this.maxEnergy = this.energy;
    }
  }

  protected move(directions: IDirection) {
    // Angle 0 is X-axis, direction is in radians.
    const angle = this.angle * (Math.PI / 180);

    const forward = directions.forward ? 1 : 0;
    const back = directions.back ? -0.4 : 0;
    const left = directions.left ? 0.5 : 0;
    const right = directions.right ? -0.5 : 0;

    // Forward and backward.
    this.speedX =
      this.speedX + (forward + back) * this.acceleration * Math.cos(angle);
    this.speedY =
      this.speedY + (forward + back) * this.acceleration * Math.sin(angle);

    // Left and right.
    this.speedX =
      this.speedX +
      (left + right) * this.acceleration * Math.cos(angle - Math.PI / 2);
    this.speedY =
      this.speedY +
      (left + right) * this.acceleration * Math.sin(angle - Math.PI / 2);

    // Friction.
    this.speedX *= 0.97;
    this.speedY *= 0.97;

    this.center = new Point(
      this.center.x + this.speedX,
      this.center.y + this.speedY
    );
  }

  protected turn(point: Point) {
    const targetAngle = Point.getAngle(this.center, point);
    const turnDegrees =
      Calculations.mod(targetAngle - this.angle + 180, 360) - 180;

    if (turnDegrees > -4 && turnDegrees < 4) {
      this.angle = targetAngle;
    } else if (turnDegrees < 0) {
      this.angle -= this.turnSpeed;
    } else {
      this.angle += this.turnSpeed;
    }
  }

  private processStatus() {
    if (this.status.firing) {
      const _ = new RenderObject({
        angle: this.angle,
        imageSrc: "images/objects/GunFlare.png",
        initialPosition: this.center,
        lifeSpan: 1
      });
    }

    if (this.status.takingFire) {
      const _ = new RenderObject({
        angle: this.angle,
        imageSrc: "images/objects/BulletImpact.png",
        initialPosition: this.center,
        lifeSpan: 1
      });
    }

    for (const key in this.status) {
      if (this.status[key] > 0) {
        this.status[key]--;
      }
    }
  }

  private takeDamage(damage: number) {
    if (this.shield >= damage) {
      this.shield -= damage;
    } else {
      damage -= this.shield;
      this.shield = 0;
      this._health -= damage;
    }
  }
}
