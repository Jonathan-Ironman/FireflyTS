import { expect } from "chai";
import "mocha";
import { IRenderObect } from "../interfaces/IRenderObject";
import { Point } from "./Point";
import { RenderObject } from "./RenderObject";

const imageSrc = "image/objects/test80x100.png";

describe("RenderObject", () => {
  it("Add new objects to the object list", () => {
    const renderObject: IRenderObect = {
      imageSrc,
      initialPosition: new Point(10, 20)
    };
    const result = new RenderObject(renderObject);
    expect(RenderObject.getObjectList().length).to.equal(1);
  });

  it("Remove objects from the object list once destroyed", () => {
    const renderObject = RenderObject.getObjectList()[0];
    renderObject.destroy();
    expect(RenderObject.getObjectList().length).to.equal(0);
  });
});
