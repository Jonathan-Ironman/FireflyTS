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

  public health = Infinity;
  public maxHealth = Infinity;
  public speedX = 0;
  public speedY = 0;
  public impactDamage = 1;
  public status: IStatus = {};
  public faction?: string;
  public owner?: Entity;
  public acceleration = 0;
  protected turnSpeed = 0;
  protected initialized = false;

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

    this.processStatus();

    super.update();
  }

  public destroy() {
    const index = entityList.indexOf(this);
    entityList.splice(index, 1);
    super.destroy();
  }

  public isCollidingWith(entity: Entity) {
    return !(
      this === entity ||
      this.owner === entity ||
      this === entity.owner ||
      this.owner === entity.owner ||
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
    const targetAngle = Calculations.getAngle(this.center, point);
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
      this.status.firing--;
      // tslint:disable-next-line:no-unused-expression
      new RenderObject({
        angle: this.angle,
        imageSrc: "images/objects/GunFlare.png",
        initialPosition: this.center,
        lifeSpan: 1
      });
    }

    if (this.status.takingFire) {
      this.status.takingFire--;
      // tslint:disable-next-line:no-unused-expression
      new RenderObject({
        angle: this.angle,
        imageSrc: "images/objects/BulletImpact.png",
        initialPosition: this.center,
        lifeSpan: 1
      });
    }
  }
}
