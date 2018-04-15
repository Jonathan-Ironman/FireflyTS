import { Point } from "../../src/classes/Point";

describe("Point", () => {
  test("Correct distance should be measured", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(3, 4);

    expect(Point.getDistance(point1, point2)).toBe(5);
  });

  test("Correct angle should be measured diagonally", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(1, 1);

    expect(Point.getAngle(point1, point2)).toBe(45);
  });

  test("Correct angle should be measured vertically", () => {
    const point1 = new Point(0, 0);
    const point2 = new Point(0, 1);

    expect(Point.getAngle(point1, point2)).toBe(90);
  });

  test("Correct angle should be measured with negative value", () => {
    const point1 = new Point(1, 1);
    const point2 = new Point(0, 0);

    expect(Point.getAngle(point1, point2)).toBe(-135);
  });

  test("Correct point from angle and distance should be returned", () => {
    const point1 = new Point(0, 0);
    const point2 = Point.pointFromAngle(point1, 60, 8);
    const pointRounded = new Point(Math.round(point2.x), Math.round(point2.y));

    expect(pointRounded).toEqual(new Point(4, 7));
  });
});
