export class Point {
  public static getAngle(point1: Point, point2: Point) {
    return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
  }

  public static getDistance(point1: Point, point2: Point) {
    const xs = Math.pow(point2.x - point1.x, 2);
    const ys = Math.pow(point2.y - point1.y, 2);

    return Math.sqrt(xs + ys);
  }

  public static pointFromAngle(
    point: Point,
    angle: number,
    distance: number
  ): Point {
    const radians = angle * (Math.PI / 180);
    const x = Math.cos(radians) * distance + point.x;
    const y = Math.sin(radians) * distance + point.y;

    return new Point(x, y);
  }

  constructor(public readonly x: number, public readonly y: number) {}
}
