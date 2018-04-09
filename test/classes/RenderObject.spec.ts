import { Point } from "../../src/classes/Point";
import { RenderObject } from "../../src/classes/RenderObject";
import { IRenderObect } from "../../src/interfaces/IRenderObject";

const imageSrc = "image/objects/test80x100.png";

describe("RenderObject", () => {
  it("Add new objects to the object list", () => {
    const renderObject: IRenderObect = {
      imageSrc,
      initialPosition: new Point(10, 20)
    };
    const result = new RenderObject(renderObject);
    expect(RenderObject.getObjectList().length).toBe(1);
  });

  it("Remove objects from the object list once destroyed", () => {
    const renderObject = RenderObject.getObjectList()[0];
    renderObject.destroy();
    expect(RenderObject.getObjectList().length).toBe(0);
  });
});
