import { Entity } from "../classes/Entity";
import { Point } from "../classes/Point";
import { Ship } from "../classes/Ship";

// Find angle between two points.
export function getAngle(p1: Point, p2: Point) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}

// Euclidean modulo.
export function mod(x: number, value: number) {
  return x >= 0 ? x % value : value + x % value;
}

// Distance between two points.
export function lineDistance(point1: Point, point2: Point) {
  let xs = 0;
  let ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}

// Point from distance and angle
export function pointFromAngle(
  point: Point,
  angle: number,
  distance: number
): Point {
  const radians = angle * (Math.PI / 180);

  let x = Math.cos(radians) * distance;
  let y = Math.sin(radians) * distance;

  x = point.x + x;
  y = point.y + y;

  return { x, y };
}

export function getRandomPointOnCanvas(renderCtx: CanvasRenderingContext2D) {
  return new Point(
    chance(50)
      ? getRandomInt(50, 300)
      : getRandomInt(
          renderCtx.canvas.width - 250,
          renderCtx.canvas.width - 400
        ),
    chance(50)
      ? getRandomInt(50, 300)
      : getRandomInt(
          renderCtx.canvas.height - 250,
          renderCtx.canvas.height - 400
        )
  );
}

// Returns a random number between min and max.
export function getRandomArbitary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Returns a random integer between min and max.
export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Return true x percent of the time.
export function chance(percentage: number) {
  return Math.random() * 100 < percentage;
}

// Returns the angle if entity1 is facing entity2.
export function isFacing(entity1: Entity, entity2: Entity) {
  let result = 0;
  const diff = getAngle(entity1.center, entity2.center) - entity1.angle;
  if (Math.abs(diff) < 100) {
    result = diff;
  }

  return result;
}

// http://gamedev.stackexchange.com/a/26022/36040
export function isIntersecting1(
  Point1: Point,
  Point2: Point,
  Point3: Point,
  Point4: Point
) {
  const denominator =
    (Point2.x - Point1.x) * (Point4.y - Point3.y) -
    (Point2.y - Point1.y) * (Point4.x - Point3.x);
  const numerator1 =
    (Point1.y - Point3.y) * (Point4.x - Point3.x) -
    (Point1.x - Point3.x) * (Point4.y - Point3.y);
  const numerator2 =
    (Point1.y - Point3.y) * (Point2.x - Point1.x) -
    (Point1.x - Point3.x) * (Point2.y - Point1.y);

  // Detect coincident lines (has a problem, read below)
  if (denominator === 0) {
    return numerator1 === 0 && numerator2 === 0;
  }

  const r = numerator1 / denominator;
  const s = numerator2 / denominator;

  return r >= 0 && r <= 1 && (s >= 0 && s <= 1);
}

// Adapted from: http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect/1968345#1968345
// function line_intersects(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
//     var s1_x, s1_y, s2_x, s2_y;
//     s1_x = p1_x - p0_x;
//     s1_y = p1_y - p0_y;
//     s2_x = p3_x - p2_x;
//     s2_y = p3_y - p2_y;

//     var s, t;
//     s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
//     t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

//     if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
//         // Collision detected
//         return 1;
//     }

//     return 0; // No collision
// }

// http://stackoverflow.com/a/16725715/2407212
export function CCW(p1: Point, p2: Point, p3: Point) {
  return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
}

export function isIntersecting(p1: Point, p2: Point, p3: Point, p4: Point) {
  return (
    CCW(p1, p3, p4) !== CCW(p2, p3, p4) && CCW(p1, p2, p3) !== CCW(p1, p2, p4)
  );
}

export function lineIntersectsEntity(
  startpoint: Point,
  endpoint: Point,
  entity: Entity
) {
  // Corners.
  const p1 = { x: entity.center.x, y: entity.center.y };
  const p2 = { x: entity.center.x + entity.width, y: entity.center.y };
  const p3 = {
    x: entity.center.x + entity.width,
    y: entity.center.y + entity.height
  };
  const p4 = { x: entity.center.x, y: entity.center.y + entity.height };

  // Check if bullet line intersects the ship outline.
  return (
    isIntersecting(startpoint, endpoint, p1, p2) ||
    isIntersecting(startpoint, endpoint, p2, p3) ||
    isIntersecting(startpoint, endpoint, p3, p4) ||
    isIntersecting(startpoint, endpoint, p4, p1)
  );
}
