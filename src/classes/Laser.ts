import * as Calculations from "../helpers/Calculations";
import { Entity } from "./Entity";
import { Point } from "./Point";
import { Ship } from "./Ship";
import { SoundPool } from "./SoundPool";

const laserSound = new SoundPool("sound/effects/laser.wav", 0.02, 200);
let renderContext: CanvasRenderingContext2D;
export function setRenderContext(ctx: CanvasRenderingContext2D): void {
  renderContext = ctx;
}

const laserDamage = 3;
const laserRange = 10000;
export function doubleLaserShot(owner: Ship) {
  const targets = Entity.getEntityList().filter(t => t !== owner);

  let endpoint = Calculations.pointFromAngle(
    owner.center,
    owner.angle,
    laserRange
  );
  const intersecting = [];

  for (const entity of targets) {
    if (Calculations.lineIntersectsEntity(owner.center, endpoint, entity)) {
      intersecting.push(entity);
    }
  }

  let target;
  let distance1 = Infinity;
  let distance2;

  // Only hit closest target.
  for (const intersect of intersecting) {
    distance2 = Calculations.lineDistance(owner.center, intersect.center);
    if (distance2 < distance1) {
      distance1 = distance2;
      target = intersect;
    }
  }

  if (target) {
    target.health -= laserDamage;
    target.status.takingFire = 6;

    endpoint = Calculations.pointFromAngle(
      owner.center,
      owner.angle,
      distance1
    );
  }

  // Draw double laser.
  const offset = 12;
  const p1 = Calculations.pointFromAngle(
    owner.center,
    owner.angle - 90,
    offset
  );
  const p2 = Calculations.pointFromAngle(
    owner.center,
    owner.angle - 90,
    -offset
  );
  const t1 = Calculations.pointFromAngle(endpoint, owner.angle - 90, offset);
  const t2 = Calculations.pointFromAngle(endpoint, owner.angle - 90, -offset);

  renderContext.beginPath();
  renderContext.moveTo(p1.x, p1.y);
  renderContext.lineTo(t1.x, t1.y);
  renderContext.moveTo(p2.x, p2.y);
  renderContext.lineTo(t2.x, t2.y);

  renderContext.lineWidth = 0.8;
  // renderContext.setLineDash([1]);
  renderContext.strokeStyle = "orange";
  renderContext.stroke();

  owner.cooldown = owner.cooldownTime;
  laserSound.play();
}
