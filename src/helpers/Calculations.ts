import { Entity } from "../classes/Entity";
import { Point } from "../classes/Point";

// Euclidean modulo.
export function mod(x: number, value: number) {
  return x >= 0 ? x % value : value + x % value;
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
